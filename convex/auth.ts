import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import bcrypt from "bcryptjs";
import { getConfiguredAdminEmail } from "./authz";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const adminEmail = getConfiguredAdminEmail();
        if (!adminEmail) {
          throw new Error("Admin allowlist is not configured");
        }

        const email = String(params.email ?? "").trim().toLowerCase();
        if (email !== adminEmail) {
          throw new Error("Unauthorized");
        }

        return { email, name: "Masala Admin" };
      },
      crypto: {
        async hashSecret(password) {
          return bcrypt.hashSync(password, 12);
        },
        async verifySecret(password, hash) {
          return bcrypt.compareSync(password, hash);
        },
      },
    }),
  ],
  session: {
    totalDurationMs: 1000 * 60 * 60 * 4,
    inactiveDurationMs: 1000 * 60 * 60 * 4,
  },
  jwt: {
    durationMs: 1000 * 60 * 15,
  },
});
