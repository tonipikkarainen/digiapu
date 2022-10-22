import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../utils/trpc";

const Login = () => {
  return <AuthShowcase />;
};

const AuthShowcase: React.FC = () => {
  //const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {/* {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )} */}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Login;
