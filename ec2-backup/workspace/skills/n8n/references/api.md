# n8n API v1 — Référence

Base URL: `{N8N_BASE_URL}/api/v1`
Auth header: `X-N8N-API-KEY: {N8N_API_KEY}`

## Workflows

```
GET    /workflows                  # Lister les workflows
GET    /workflows/{id}             # Détail d'un workflow
POST   /workflows                  # Créer un workflow
PUT    /workflows/{id}/activate    # Activer
PUT    /workflows/{id}/deactivate  # Désactiver
DELETE /workflows/{id}             # Supprimer
```

## Exécutions

```
GET  /executions                   # Lister les exécutions
GET  /executions/{id}              # Détail d'une exécution (avec données)
POST /executions/{id}/retry        # Relancer une exécution échouée
DEL  /executions/{id}              # Supprimer une exécution
```

Filtres utiles sur GET /executions :

- `?workflowId={id}` — filtrer par workflow
- `?status=success|error|running|waiting`
- `?limit=20`

## Webhooks (hors API key)

Format URL : `{N8N_BASE_URL}/webhook/{path}`
Auth : header `X-N8N-Token: {token}` (si configuré dans le noeud webhook)

Exemple POST :

```bash
curl -X POST http://localhost:5678/webhook/linkedin-post \
  -H "Content-Type: application/json" \
  -H "X-N8N-Token: {N8N_LINKEDIN_WEBHOOK_TOKEN}" \
  -d '{"content": "Mon post LinkedIn"}'
```

## Gestion des clés API

```
GET    /rest/api-keys              # Lister (auth cookie)
POST   /rest/api-keys              # Créer (auth cookie)
DELETE /rest/api-keys/{id}         # Révoquer (auth cookie)
```
