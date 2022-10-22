import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import ModalOpenButton from "../../components/button";
import Login from "../../components/login";
import Modal from "../../components/modal";
import Test from "../../components/test";
import { trpc } from "../../utils/trpc";

const EditCategories = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { data, isLoading } = trpc.videoCategory.getAll.useQuery();
  const [showModal, setShowModal] = useState(false);

  if (!sessionData) return <Login />;
  // Get categories
  // create form / modal dialog
  // edit
  // delete
  // Form inside the modal
  //
  return (
    <div className="flex h-full flex-col px-4">
      <div className="bg-white">
        Header - tähän linkit eri taulujen muokkaamiseen.
      </div>
      <div className="mx-auto w-80 bg-slate-300">
        {isLoading ? (
          <LoadingIcons.Circles className="max-h-9" />
        ) : (
          data?.map((videocat) => (
            <div
              className="main-color hover:main-color-hover rounded-3xl"
              key={videocat.id}
            >
              <div>{videocat.name}</div>
            </div>
          ))
        )}
        <Modal
          content={<Test />}
          showModal={showModal}
          setShowModal={setShowModal}
          openingElement={
            <ModalOpenButton
              setShowModal={setShowModal}
              buttonText={"Luo kategoria"}
            />
          }
        />
      </div>
    </div>
  );
};

export default EditCategories;
