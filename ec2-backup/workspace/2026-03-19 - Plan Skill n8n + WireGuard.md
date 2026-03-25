---
title: "Plan — Skill n8n + Connectivité WireGuard"
date: 2026-03-19
statut: 🔴 À démarrer
tags: [openclaw, n8n, wireguard, skill, infrastructure]
---

# Plan : Skill n8n pour OpenClaw

## Contexte

- **OpenClaw** : installé sur instance EC2 AWS
- **n8n** : Docker sur poste local (Windows/WSL2), exposé via MCP Toolkit Docker
- **Objectif** : permettre à Adam (agent OpenClaw) de piloter les workflows n8n via un skill dédié
- **Contrainte principale** : EC2 et poste local ne sont pas sur le même réseau → connectivité à établir

## Hypothèses retenues

- OpenClaw ne parle pas MCP client-side → utilisation de l'**API REST n8n** (port 5678)
- Exposition via **WireGuard self-hosted** : aucun tiers, chiffrement E2E, gratuit
- Docker réduit le blast radius en cas de compromission n8n

---

## Phase 1 — Connectivité WireGuard (EC2 ↔ Poste local)

### Étapes

1. **Sur l'EC2 (Ubuntu)**
   - Installer WireGuard : `apt install wireguard`
   - Générer une paire de clés serveur
   - Configurer `/etc/wireguard/wg0.conf` (réseau privé ex: `10.10.0.1/24`)
   - Ouvrir le port UDP WireGuard dans le Security Group AWS (ex: UDP 51820)

2. **Sur le poste local (WSL2 ou Windows)**
   - Installer WireGuard client
   - Générer une paire de clés client
   - Configurer le peer avec l'IP publique de l'EC2
   - Ajouter la clé publique du client dans la config serveur EC2

3. **Valider la connectivité**
   - Ping `10.10.0.2` depuis l'EC2 → poste local
   - `curl http://10.10.0.2:5678/healthz` → doit répondre `{"status":"ok"}`

4. **Mettre à jour OpenClaw**
   - Modifier `N8N_BASE_URL` dans `openclaw.json` : `http://10.10.0.2:5678`
   - (si n8n tourne sur WSL2, utiliser l'IP WSL, pas `localhost`)

### Risques Phase 1

| Risque                         | Probabilité | Impact   | Mitigation                                    |
| ------------------------------ | ----------- | -------- | --------------------------------------------- |
| Port UDP 51820 bloqué côté FAI | Faible      | Bloquant | Changer le port WireGuard (ex: 443 UDP)       |
| IP WSL2 change au redémarrage  | Élevée      | Faible   | Script de mise à jour ou config statique WSL2 |
| Clés WireGuard mal sécurisées  | Faible      | Élevé    | `chmod 600` sur tous les fichiers de config   |

---

## Phase 2 — Création du Skill n8n

### Fonctionnalités cibles

- **Déclencher un webhook** (ex: workflow LinkedIn post) avec payload custom
- **Lister les workflows actifs** via API REST n8n
- **Déclencher un workflow par ID** via l'API
- **Consulter le statut d'une exécution** (succès / erreur / en cours)

### Structure du skill

```
n8n/
├── SKILL.md               ← instructions + déclencheurs
└── references/
    └── api.md             ← endpoints clés de l'API REST n8n v1
```

### Variables d'environnement utilisées

| Variable                     | Rôle                                                   |
| ---------------------------- | ------------------------------------------------------ |
| `N8N_BASE_URL`               | URL de base de n8n (sera mis à jour avec IP WireGuard) |
| `N8N_API_KEY`                | Auth API REST n8n                                      |
| `N8N_LINKEDIN_WEBHOOK_URL`   | URL du webhook LinkedIn (déjà configurée)              |
| `N8N_LINKEDIN_WEBHOOK_TOKEN` | Token d'auth du webhook (déjà configuré)               |

### Risques Phase 2

| Risque                                   | Probabilité | Impact   | Mitigation                                              |
| ---------------------------------------- | ----------- | -------- | ------------------------------------------------------- |
| API n8n non activée dans Docker          | Moyenne     | Bloquant | Vérifier `N8N_API_ENABLED=true` dans l'env Docker       |
| Webhook sans auth forte                  | Élevée      | Moyen    | Toujours passer le token dans le header `X-N8N-Token`   |
| Skill déclenche des workflows par erreur | Faible      | Moyen    | Confirmation explicite avant tout déclenchement en prod |

---

## Phase 3 — Enregistrement du skill dans OpenClaw

- Ajouter le skill dans `openclaw.json` → `agents.list[main].skills` : ajouter `"n8n"`
- Redémarrer le gateway OpenClaw
- Tester avec une phrase déclencheur : _"déclenche le workflow LinkedIn avec ce texte"_

---

## Prochaines actions (dans l'ordre)

- [ ] Installer WireGuard sur l'EC2
- [ ] Installer WireGuard sur le poste (WSL2 ou Windows)
- [ ] Valider le `curl` vers n8n via l'IP WireGuard
- [ ] Mettre à jour `N8N_BASE_URL` dans OpenClaw
- [ ] Créer le skill `n8n` (SKILL.md + references/api.md)
- [ ] Enregistrer le skill dans la config + restart gateway
- [ ] Test end-to-end : déclencher le workflow LinkedIn depuis Adam
