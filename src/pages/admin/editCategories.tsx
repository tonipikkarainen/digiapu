import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingIcons from "react-loading-icons";
import ModalOpenButton from "../../components/button";
import Login from "../../components/login";
import Modal from "../../components/modal";
import { trpc } from "../../utils/trpc";
import CreateCatForm from "../../components/createCatForm";
import DeleteForm from "../../components/deleteForm";
import DeleteButton from "../../components/deleteIcon";
import VideoCatElement from "../../components/videoCatElement";

const EditCategories = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = trpc.videoCategory.getAll.useQuery();
  const [showModal, setShowModal] = useState(false);

  const utils = trpc.useContext();

  const delMutation = trpc.videoCategory.deleteCategory.useMutation({
    onSuccess({}) {
      console.log("Deleted");
      utils.videoCategory.getAll.invalidate();
    },
    onError({ message }) {
      console.log(message);
    },
  });

  const deleteCat = async (id: string) => {
    await delMutation.mutate({ id });
  };

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
            <VideoCatElement
              deleteCat={deleteCat}
              videocat={videocat}
              key={videocat.id}
            />
          ))
        )}
        <Modal
          content={
            <CreateCatForm setShowModal={setShowModal} value="" header=",ml" />
          }
          showModal={showModal}
          setShowModal={setShowModal}
          header={"Kategoriat"}
          openingElement={
            <ModalOpenButton
              setShowModal={setShowModal}
              buttonText={"Luo kategoria"}
            />
          }
        />
        <button
          className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {" "}
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
