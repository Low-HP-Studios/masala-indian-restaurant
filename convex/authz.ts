import { getAuthUserId } from "@convex-dev/auth/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";

type AuthCtx = QueryCtx | MutationCtx;

function configuredAdminEmail() {
  return (process.env.ADMIN_EMAIL ?? process.env.CMS_ADMIN_EMAIL ?? "")
    .trim()
    .toLowerCase();
}

export function getConfiguredAdminEmail() {
  return configuredAdminEmail();
}

export async function requireAdmin(ctx: AuthCtx) {
  const adminEmail = configuredAdminEmail();
  if (!adminEmail) {
    throw new Error("Admin allowlist is not configured");
  }

  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await ctx.db.get(userId);
  if (user?.email?.trim().toLowerCase() !== adminEmail) {
    throw new Error("Unauthorized");
  }

  return { userId, email: user.email };
}
