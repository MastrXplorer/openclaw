---
title: "CR — Mise en place du Briefing Matin automatique via n8n"
date: 2026-03-22
statut: 🟢
tags: [n8n, automation, telegram, briefing, workflow]
projet: Infrastructure OpenClaw / Adam Bot
---

# CR — Briefing Matin automatique via n8n

## Contexte

Mise en place d'un workflow n8n qui envoie chaque matin un briefing d'actualités sur Telegram (chat Tarik, ID `7540890613`), couvrant 3 sources :

- 🌍 Monde (BBC World RSS)
- 🍁 Ottawa local (CBC Ottawa RSS)
- 💡 Tech Canada (Betakit RSS)

---

## Ce qui a été fait

### 1. Diagnostic du problème initial

Le workflow existant utilisait un nœud `Code` avec `require('https')` pour fetcher les flux RSS. Le sandbox n8n (Task Runner) **bloque tous les modules Node.js natifs** (`https`, `http`, `fs`, etc.). Résultat : `Module 'https' is disallowed`.

### 2. Nouvelle architecture — nœuds HTTP Request natifs

**Solution :** utiliser les nœuds `n8n-nodes-base.httpRequest` (natifs n8n) pour les appels réseau, et réserver le nœud `Code` uniquement au parsing/formatage.

### 3. Problème de timezone

n8n tourne avec `GENERIC_TIMEZONE=Europe/Paris`. Le cron `0 7 * * *` correspond donc à **7h heure Paris**, soit 6h UTC en hiver (5h UTC en été). Prise en compte pour tous les tests.

### 4. Problème feed Ottawa Citizen

Ottawa Citizen (`ottawacitizen.com/feed`) retourne **403 Forbidden** depuis le serveur AWS EC2 (blocage IP). Remplacé par **CBC Ottawa** (`rss.cbc.ca/lineup/canada-ottawa.xml`).

### 5. Problème regex CBC — `<item>` avec attributs

Le RSS de CBC utilise `<item cbc:type="video" cbc:deptid="...">` au lieu de `<item>`. Le regex initial `<item>(...)` ne capturait pas ces balises → sections Ottawa vides.

**Fix :** regex mis à jour pour accepter les attributs :

```
/<(?:item|entry)(?:\s[^>]*)?>[\s\S]*?<title...
```

### 6. Problème architecture — flux HTTP chaînés en série

**Bug critique :** les 3 nœuds HTTP étaient branchés en série (BBC → Ottawa → Betakit → Code). Le nœud Code ne recevait donc que l'item du dernier flux (Betakit).

**Fix :** ajout d'un nœud **Merge** (mode `append`) qui collecte les 3 flux en parallèle avant de les passer au parser. Le Trigger déclenche les 3 fetches simultanément via 3 connexions de sortie.

```
Trigger ──┬──► Fetch BBC     ──► Merge (input 0) ─┐
          ├──► Fetch Ottawa  ──► Merge (input 1) ─┤──► Parser ──► Telegram
          └──► Fetch Betakit ──► Merge (input 2) ─┘
```

---

## Workflows actifs en production

| Nom                                  | ID                 | Cron                   | Usage         |
| ------------------------------------ | ------------------ | ---------------------- | ------------- |
| 📰 Briefing Matin — Monde + Ottawa   | `keyXtIbEPtysLj6E` | `0 7 * * *` (7h Paris) | Production    |
| 📰 Briefing TEST — toutes les heures | `MsgtV6rZQZOA9SUU` | `0 * * * *`            | Test en cours |

---

## Infrastructure

- **n8n** : Docker, image `n8nio/n8n`, restart policy `unless-stopped` → persistance garantie
- **Port** : 5678 (localhost uniquement)
- **Timezone** : Europe/Paris
- **Persistance workflows** : SQLite interne Docker

---

## JSON du workflow production final

> Workflow ID : `keyXtIbEPtysLj6E`  
> Exporté le 2026-03-22

```json
{
  "id": "keyXtIbEPtysLj6E",
  "name": "📰 Briefing Matin — Monde + Ottawa",
  "active": true,
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{ "field": "cronExpression", "expression": "0 7 * * *" }]
        }
      },
      "id": "cc000001-0000-0000-0000-000000000001",
      "name": "Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.1,
      "position": [100, 300]
    },
    {
      "parameters": {
        "url": "https://feeds.bbci.co.uk/news/world/rss.xml",
        "options": {
          "redirect": { "redirect": { "followRedirects": true } },
          "response": { "response": { "responseFormat": "text" } }
        }
      },
      "id": "cc000002-0000-0000-0000-000000000002",
      "name": "Fetch BBC",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [320, 180]
    },
    {
      "parameters": {
        "url": "https://rss.cbc.ca/lineup/canada-ottawa.xml",
        "options": {
          "redirect": { "redirect": { "followRedirects": true } },
          "response": { "response": { "responseFormat": "text" } }
        }
      },
      "id": "cc000003-0000-0000-0000-000000000003",
      "name": "Fetch Ottawa",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [320, 300]
    },
    {
      "parameters": {
        "url": "https://betakit.com/feed/",
        "options": {
          "redirect": { "redirect": { "followRedirects": true } },
          "response": { "response": { "responseFormat": "text" } }
        }
      },
      "id": "cc000004-0000-0000-0000-000000000004",
      "name": "Fetch Betakit",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [320, 420]
    },
    {
      "parameters": { "mode": "append" },
      "id": "cc000005-0000-0000-0000-000000000005",
      "name": "Merge",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3,
      "position": [540, 300]
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all();\nconst worldXml = items[0]?.json?.data || \"\";\nconst ottawaXml = items[1]?.json?.data || \"\";\nconst techXml = items[2]?.json?.data || \"\";\n\nfunction parseRSS(xml, limit) {\n  const results = [];\n  const re = /<(?:item|entry)(?:\\s[^>]*)?>[\\/\\s\\S]*?<title[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/title>([\\s\\S]*?)<\\/(?:item|entry)>/g;\n  let m;\n  while ((m = re.exec(xml)) !== null && results.length < limit) {\n    let title = m[1].trim().replace(/<[^>]+>/g,\"\")\n      .replace(/&#(\\d+);/g,(x,c)=>String.fromCharCode(c))\n      .replace(/&amp;/g,\"&\").replace(/&lt;/g,\"<\").replace(/&gt;/g,\">\");\n    if (!title) continue;\n    const rest = m[2];\n    const lm = rest.match(/<link[^>]*href=\"([^\"]+)\"/) || rest.match(/<link>([^<]+)<\\/link>/);\n    results.push({ title, link: lm ? lm[1].trim() : \"\" });\n  }\n  return results;\n}\n\nfunction esc(s){ return (s||\"\").replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\"); }\n\nconst worldItems = parseRSS(worldXml, 6);\nconst ottawaItems = parseRSS(ottawaXml, 5);\nconst techItems = parseRSS(techXml, 5);\n\nconst today = new Date().toLocaleDateString(\"fr-FR\",{\n  weekday:\"long\",year:\"numeric\",month:\"long\",day:\"numeric\",timeZone:\"Europe/Paris\"\n});\nconst todayCap = today.charAt(0).toUpperCase()+today.slice(1);\n\nlet msg = `📰 <b>Briefing — ${esc(todayCap)}</b>\\n\\n`;\nmsg += `🌍 <b>Monde</b>\\n`;\nworldItems.forEach((it,i)=>{ const t=esc(it.title); msg+=`${i+1}. ${it.link?`<a href=\"${it.link}\">${t}</a>`:t}\\n`; });\nmsg += `\\n🍁 <b>Ottawa</b>\\n`;\nif(ottawaItems.length===0) msg+=\"(aucun article)\\n\";\nottawaItems.forEach((it,i)=>{ const t=esc(it.title); msg+=`${i+1}. ${it.link?`<a href=\"${it.link}\">${t}</a>`:t}\\n`; });\nmsg += `\\n💡 <b>Tech Canada</b>\\n`;\nif(techItems.length===0) msg+=\"(aucun article)\\n\";\ntechItems.forEach((it,i)=>{ const t=esc(it.title); msg+=`${i+1}. ${it.link?`<a href=\"${it.link}\">${t}</a>`:t}\\n`; });\nmsg += `\\n<i>🌅 Bonne journée !</i>`;\nreturn [{ json: { message: msg } }];",
        "mode": "runOnceForAllItems"
      },
      "id": "cc000006-0000-0000-0000-000000000006",
      "name": "Parser formater",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [760, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.telegram.org/bot8666916939:AAH2xccEhLDyziqNRdt5B9SXohCvguOrb6A/sendMessage",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            { "name": "chat_id", "value": "7540890613" },
            { "name": "text", "value": "={{ $json.message }}" },
            { "name": "parse_mode", "value": "HTML" }
          ]
        }
      },
      "id": "cc000007-0000-0000-0000-000000000007",
      "name": "Envoyer Telegram",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [980, 300]
    }
  ],
  "connections": {
    "Trigger": {
      "main": [
        [
          { "node": "Fetch BBC", "type": "main", "index": 0 },
          { "node": "Fetch Ottawa", "type": "main", "index": 0 },
          { "node": "Fetch Betakit", "type": "main", "index": 0 }
        ]
      ]
    },
    "Fetch BBC": { "main": [[{ "node": "Merge", "type": "main", "index": 0 }]] },
    "Fetch Ottawa": { "main": [[{ "node": "Merge", "type": "main", "index": 1 }]] },
    "Fetch Betakit": { "main": [[{ "node": "Merge", "type": "main", "index": 2 }]] },
    "Merge": { "main": [[{ "node": "Parser formater", "type": "main", "index": 0 }]] },
    "Parser formater": { "main": [[{ "node": "Envoyer Telegram", "type": "main", "index": 0 }]] }
  },
  "settings": { "executionOrder": "v1" }
}
```

---

## Leçons retenues

1. **n8n sandbox Task Runner** : `require()` est totalement bloqué — toujours utiliser les nœuds natifs pour les appels réseau
2. **Timezone n8n** : `GENERIC_TIMEZONE=Europe/Paris` — les expressions cron sont interprétées en heure Paris
3. **Feeds RSS avec attributs** : certains providers (CBC) utilisent `<item attr="val">` — le regex doit accepter `(?:\s[^>]*)?`
4. **Architecture parallèle avec Merge** : pour agréger N sources en parallèle, il faut un nœud Merge (mode `append`) — le chaînage en série ne passe qu'un seul flux au nœud suivant
5. **Ottawa Citizen bloque les IP EC2** — utiliser CBC Ottawa à la place

---

## Statut final (22 mars 2026, 16h Paris)

| Workflow                             | ID                 | Cron                   | Statut       |
| ------------------------------------ | ------------------ | ---------------------- | ------------ |
| 📰 Briefing Matin — Monde + Ottawa   | `keyXtIbEPtysLj6E` | `0 7 * * *` (7h Paris) | ✅ Actif     |
| 📰 Briefing TEST — toutes les heures | `MsgtV6rZQZOA9SUU` | `0 * * * *`            | ⛔ Désactivé |

Validation complète effectuée : 3 sections correctement remplies (6 BBC + 5 CBC Ottawa + 5 Betakit), message Telegram reçu avec liens cliquables et formatage HTML.

## Prochaines étapes possibles

- [ ] Ajouter une section Météo Ottawa (API OpenWeatherMap)
- [ ] Ajouter Radio-Canada francophone (`radio-canada.ca/rss/4159`)
- [ ] Personnaliser l'heure selon les jours (ex : 7h semaine, 9h weekend)
- [ ] Configurer rclone pour synchronisation automatique workspace → vault OneDrive Obsidian
