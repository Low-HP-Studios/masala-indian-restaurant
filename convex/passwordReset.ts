import {
  modifyAccountCredentials,
  retrieveAccount,
} from "@convex-dev/auth/server";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { getConfiguredAdminEmail } from "./authz";

const INVALID_CREDENTIALS = "Invalid credentials";

function ensureAdminEmail(email: string) {
  const adminEmail = getConfiguredAdminEmail();
  if (!adminEmail) {
    throw new Error("Admin allowlist is not configured");
  }
  const normalized = String(email ?? "").trim().toLowerCase();
  if (normalized !== adminEmail) {
    throw new Error(INVALID_CREDENTIALS);
  }
  return normalized;
}

export const verifyCurrentPassword = action({
  args: { email: v.string(), currentPassword: v.string() },
  handler: async (ctx, { email, currentPassword }) => {
    const id = ensureAdminEmail(email);
    try {
      await retrieveAccount(ctx, {
        provider: "password",
        account: { id, secret: currentPassword },
      });
    } catch {
      throw new Error(INVALID_CREDENTIALS);
    }
    return { ok: true } as const;
  },
});

export const changePassword = action({
  args: {
    email: v.string(),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, { email, currentPassword, newPassword }) => {
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    const id = ensureAdminEmail(email);
    try {
      await retrieveAccount(ctx, {
        provider: "password",
        account: { id, secret: currentPassword },
      });
    } catch {
      throw new Error(INVALID_CREDENTIALS);
    }
    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id, secret: newPassword },
    });
    return { ok: true } as const;
  },
});
