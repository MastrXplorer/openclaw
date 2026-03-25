#!/usr/bin/env python3
"""
n8n API helper — OpenClaw skill
Usage: python3 n8n_api.py <action> [args]

Actions:
  list-workflows
  get-workflow <id>
  list-executions [--workflow-id <id>] [--status success|error|running] [--limit 20]
  get-execution <id>
  activate-workflow <id>
  deactivate-workflow <id>
  trigger-webhook <url> <json_payload> [--token <token>]
"""

import os
import sys
import json
import urllib.request
import urllib.error

BASE_URL = os.environ.get("N8N_BASE_URL", "http://localhost:5678")
API_KEY = os.environ.get("N8N_API_KEY", "")


def api_request(method, path, data=None, extra_headers=None):
    url = f"{BASE_URL}/api/v1{path}"
    headers = {
        "X-N8N-API-KEY": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    if extra_headers:
        headers.update(extra_headers)

    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        return {"error": e.code, "message": e.read().decode()}


def trigger_webhook(url, payload, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["X-N8N-Token"] = token
    body = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            return {"status": resp.status, "response": resp.read().decode()}
    except urllib.error.HTTPError as e:
        return {"error": e.code, "message": e.read().decode()}


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)

    action = args[0]

    if action == "list-workflows":
        result = api_request("GET", "/workflows")
        for wf in result.get("data", []):
            status = "✅" if wf.get("active") else "⏸️"
            print(f"{status} [{wf['id']}] {wf['name']}")

    elif action == "get-workflow":
        wf_id = args[1]
        result = api_request("GET", f"/workflows/{wf_id}")
        print(json.dumps(result, indent=2))

    elif action == "list-executions":
        params = []
        i = 1
        while i < len(args):
            if args[i] == "--workflow-id":
                params.append(f"workflowId={args[i+1]}")
                i += 2
            elif args[i] == "--status":
                params.append(f"status={args[i+1]}")
                i += 2
            elif args[i] == "--limit":
                params.append(f"limit={args[i+1]}")
                i += 2
            else:
                i += 1
        qs = "?" + "&".join(params) if params else ""
        result = api_request("GET", f"/executions{qs}")
        for ex in result.get("data", []):
            print(f"[{ex['id']}] {ex.get('status','?')} — {ex.get('startedAt','')} — workflow: {ex.get('workflowId','')}")

    elif action == "get-execution":
        ex_id = args[1]
        result = api_request("GET", f"/executions/{ex_id}")
        print(json.dumps(result, indent=2))

    elif action == "activate-workflow":
        wf_id = args[1]
        result = api_request("PUT", f"/workflows/{wf_id}/activate")
        print(json.dumps(result, indent=2))

    elif action == "deactivate-workflow":
        wf_id = args[1]
        result = api_request("PUT", f"/workflows/{wf_id}/deactivate")
        print(json.dumps(result, indent=2))

    elif action == "trigger-webhook":
        url = args[1]
        payload = json.loads(args[2])
        token = None
        if "--token" in args:
            token = args[args.index("--token") + 1]
        result = trigger_webhook(url, payload, token)
        print(json.dumps(result, indent=2))

    else:
        print(f"Action inconnue: {action}")
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
