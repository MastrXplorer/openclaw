import type { OpenClawConfig } from "../config/config.js";

export function collectEnabledInsecureOrDangerousFlags(cfg: OpenClawConfig): string[] {
  const enabledFlags: string[] = [];
  if (cfg.gateway?.controlUi?.allowInsecureAuth === true) {
    enabledFlags.push("gateway.controlUi.allowInsecureAuth=true");
  }
  if (cfg.gateway?.controlUi?.dangerouslyAllowHostHeaderOriginFallback === true) {
    enabledFlags.push("gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback=true");
  }
  if (cfg.gateway?.controlUi?.dangerouslyDisableDeviceAuth === true) {
    enabledFlags.push("gateway.controlUi.dangerouslyDisableDeviceAuth=true");
  }
  if (cfg.hooks?.gmail?.allowUnsafeExternalContent === true) {
    enabledFlags.push("hooks.gmail.allowUnsafeExternalContent=true");
  }
  if (Array.isArray(cfg.hooks?.mappings)) {
    for (const [index, mapping] of cfg.hooks.mappings.entries()) {
      if (mapping?.allowUnsafeExternalContent === true) {
        enabledFlags.push(`hooks.mappings[${index}].allowUnsafeExternalContent=true`);
      }
    }
  }
  if (cfg.tools?.exec?.applyPatch?.workspaceOnly === false) {
    enabledFlags.push("tools.exec.applyPatch.workspaceOnly=false");
  }
  // [HARDENED] sandbox explicitly set to off — skills/sub-agents run with full host access.
  // Only flag when mode is explicitly "off", not when undefined/missing (default applies).
  const sandboxMode = cfg.agents?.defaults?.sandbox?.mode;
  if (sandboxMode !== undefined && sandboxMode === "off") {
    enabledFlags.push(
      "agents.defaults.sandbox.mode=off (skills run on host without isolation — enable Docker sandbox)",
    );
  }
  // [HARDENED] mode=none disables authentication entirely — flag as dangerous.
  if (cfg.gateway?.auth?.mode === "none") {
    enabledFlags.push("gateway.auth.mode=none (authentication fully disabled)");
  }
  // [HARDENED] trusted-proxy without allowUsers (undefined or []) accepts ALL proxy users.
  if (cfg.gateway?.auth?.mode === "trusted-proxy") {
    const allowUsers = cfg.gateway?.auth?.trustedProxy?.allowUsers;
    if (!Array.isArray(allowUsers) || allowUsers.length === 0) {
      enabledFlags.push(
        "gateway.auth.trustedProxy.allowUsers not set (all proxy-authenticated users accepted)",
      );
    }
  }
  return enabledFlags;
}
