---
name: n8n
description: Interact with n8n workflow automation. Use when asked to trigger a workflow, fire a webhook, list workflows, check execution status, activate/deactivate a workflow, or import/export workflows in n8n. Triggers on phrases like "déclenche le workflow", "trigger n8n", "exécute le workflow", "quel est le statut de l'exécution", "active/désactive le workflow", "liste les workflows n8n", "envoie via n8n", "post LinkedIn via n8n".
---

# n8n Skill

## Configuration

Variables d'environnement requises (dans openclaw.json) :

- `N8N_BASE_URL` — URL de base n8n (ex: `http://localhost:5678`)
- `N8N_API_KEY` — Clé API n8n (JWT, créée via /rest/api-keys)

Variables optionnelles pour les webhooks :

- `N8N_LINKEDIN_WEBHOOK_URL` — URL du webhook LinkedIn
- `N8N_LINKEDIN_WEBHOOK_TOKEN` — Token d'auth du webhook LinkedIn

## Utilisation du script

Toujours passer les variables d'env :

```bash
N8N_BASE_URL=$N8N_BASE_URL N8N_API_KEY=$N8N_API_KEY python3 scripts/n8n_api.py <action>
```

## Actions disponibles

### Lister les workflows

```bash
python3 scripts/n8n_api.py list-workflows
```

### Déclencher un webhook

```bash
python3 scripts/n8n_api.py trigger-webhook \
  "$N8N_LINKEDIN_WEBHOOK_URL" \
  '{"content": "Texte du post"}' \
  --token "$N8N_LINKEDIN_WEBHOOK_TOKEN"
```

### Lister les exécutions

```bash
python3 scripts/n8n_api.py list-executions --limit 10
python3 scripts/n8n_api.py list-executions --status error --limit 5
python3 scripts/n8n_api.py list-executions --workflow-id <id> --limit 10
```

### Détail d'une exécution

```bash
python3 scripts/n8n_api.py get-execution <id>
```

### Activer / Désactiver un workflow

```bash
python3 scripts/n8n_api.py activate-workflow <id>
python3 scripts/n8n_api.py deactivate-workflow <id>
```

## Sécurité

- Le port 5678 est lié à `127.0.0.1` uniquement — non exposé sur internet
- Toujours passer le token dans les appels webhook (`X-N8N-Token`)
- Ne jamais logger l'API key en clair dans les réponses

## Référence API complète

Voir `references/api.md` pour les endpoints REST n8n v1.
