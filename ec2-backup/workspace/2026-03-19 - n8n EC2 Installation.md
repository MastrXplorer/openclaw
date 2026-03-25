---
title: "n8n — Installation EC2"
date: 2026-03-19
statut: 🟢 Opérationnel
tags: [n8n, ec2, infrastructure, credentials]
---

# n8n — Instance EC2

## Statut

🟢 Installé et opérationnel le 2026-03-19

## Accès UI

| Paramètre        | Valeur                             |
| ---------------- | ---------------------------------- |
| **URL interne**  | `http://localhost:5678`            |
| **Health check** | `http://localhost:5678/healthz`    |
| **Email**        | `adam@pragmaltar.local`            |
| **Password**     | `vIKqu0unG16xHCq0yjF518YstYZQFK2e` |

> ⚠️ Port 5678 lié à `127.0.0.1` uniquement — non exposé publiquement.
> Pour accéder à l'UI depuis ton poste : SSH tunnel `ssh -L 5678:localhost:5678 <EC2>`

## API

| Paramètre         | Valeur                                                                                                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Key label** | `OpenClaw-Adam`                                                                                                                                                                                                                                                                                         |
| **API Key**       | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDYwMGExNy1kOGI0LTQ5MmEtOTI5YS02NzAzYzZjODkxNzQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2I4MjBlMjctYjJhMC00ZDU0LTgwNDEtNTc2MzUyZGE1NjI0IiwiaWF0IjoxNzczOTAzNjc2LCJleHAiOjE4OTM0NTYwMDAwMDB9.4xy6f9YIAbCzRk_VfJe1k3Y_A0LoO3VlQtQKVpQ9vJ0` |
| **Expiration**    | 2030-01-01                                                                                                                                                                                                                                                                                              |
| **Scopes**        | Tous (full access)                                                                                                                                                                                                                                                                                      |

## Skill OpenClaw

- Skill `n8n` créé et packagé : `skills/n8n.skill`
- API key mise à jour dans `openclaw.json`
- Script helper : `skills/n8n/scripts/n8n_api.py`
- Référence API : `skills/n8n/references/api.md`

## Configuration Docker

```bash
docker volume create n8n_data

docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 127.0.0.1:5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_API_ENABLED=true \
  -e N8N_HOST=localhost \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=http \
  -e WEBHOOK_URL=http://localhost:5678 \
  -e GENERIC_TIMEZONE=Europe/Paris \
  n8nio/n8n
```

## Commandes utiles

```bash
# Statut
docker ps --filter name=n8n

# Logs
docker logs n8n --tail 50

# Redémarrer
docker restart n8n

# Accès UI depuis ton poste (SSH tunnel)
ssh -L 5678:localhost:5678 <user>@<EC2_IP>
# Puis ouvrir http://localhost:5678 dans ton navigateur
```

## Prochaines étapes

- [ ] Importer le workflow LinkedIn (export JSON depuis l'ancienne instance → importer dans la nouvelle UI)
- [ ] Enregistrer le skill `n8n` dans la config agents OpenClaw
- [ ] Redémarrer le gateway OpenClaw
- [ ] Test end-to-end : "déclenche le workflow LinkedIn"
