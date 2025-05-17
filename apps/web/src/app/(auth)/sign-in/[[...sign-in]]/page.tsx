import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const title = "Sign In";
const SignIn = dynamic(() =>
  import("@/components/auth/sign-in").then((mod) => mod.SignIn),
);

export const metadata: Metadata = {
  title,
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex h-full max-w-[20rem] flex-col justify-center space-y-3">
      <div className="flex flex-col">
        <h1 className="font-semibold text-base">{title}</h1>
        <p className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link
            href={"/sign-up"}
            className="text-blue-700 underline-offset-1 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
      <SignIn />
    </div>
  );
}
