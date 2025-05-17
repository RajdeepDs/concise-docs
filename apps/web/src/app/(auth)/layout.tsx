import Link from "next/link";

import { Header } from "@/components/header";
import { Button } from "@concise-docs/ui/components/button";
import { Icons } from "@concise-docs/ui/icons";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header>
        <Button asChild size={"icon"} variant={"secondary"}>
          <Link href={"/"}>
            <Icons.x className="size-4" />
          </Link>
        </Button>
      </Header>
      <main className="mt-28 flex">
        <div className="w-full overflow-auto">{children}</div>
      </main>
    </div>
  );
}
