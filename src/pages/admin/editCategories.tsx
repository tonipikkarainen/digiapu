import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Login from "../../components/login";

const EditCategories = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  if (!sessionData) return <Login />;

  return (
    <div className="bg-white">
      Edit
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default EditCategories;
