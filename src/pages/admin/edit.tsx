import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminHeader from "../../components/adminHeader";
import Login from "../../components/login";

const EditCategories = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) return <Login />;

  return (
    <div className="flex h-full flex-col">
      <AdminHeader />

      <div className="main-color flex flex-1 flex-col items-center justify-center">
        <div className=" rounded-2xl border-2 border-solid border-pink-500  py-20 px-9 text-center">
          <div className="text-3xl ">Tervetuloa admin-näkymään</div>
          <div>Jos sinulla on admin-oikeudet, voit muokata sivua.</div>
          <button
            className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
