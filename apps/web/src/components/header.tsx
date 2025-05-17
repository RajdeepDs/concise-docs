import Link from "next/link";

interface HeaderProps {
  readonly children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="box-border border-b">
      <div className="container mx-auto flex h-14 items-center justify-between px-5 ">
        <Link href={"/"} className="font-mono font-semibold">
          Concise Docs
        </Link>
        {children}
      </div>
    </header>
  );
}
