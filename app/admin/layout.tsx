export const dynamic = "force-dynamic";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import AdminShell from "./AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <AdminShell>{children}</AdminShell>
    </ConvexAuthNextjsServerProvider>
  );
}
