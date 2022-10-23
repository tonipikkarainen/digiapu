import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingIcons from "react-loading-icons";
import ModalOpenButton from "../../components/modaOpenButton";
import Login from "../../components/login";
import Modal from "../../components/modal";
import { trpc } from "../../utils/trpc";
import CreateCatForm from "../../components/createCatForm";
import VideoCatElement from "../../components/videoCatElement";
import AdminHeader from "../../components/adminHeader";
import CreateSubCatForm from "../../components/createSubCatForm";

const EditSubCategories = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = trpc.subCategory.getAll.useQuery();
  const [showModal, setShowModal] = useState(false);

  const utils = trpc.useContext();

  const delMutation = trpc.subCategory.deleteCategory.useMutation({
    onSuccess({}) {
      console.log("Deleted");
      utils.subCategory.getAll.invalidate();
    },
    onError({ message }) {
      console.log(message);
    },
  });

  const deleteCat = async (id: string) => {
    await delMutation.mutate({ id });
  };

  if (!sessionData) return <Login />;

  return (
    <div className="flex h-full flex-col px-4">
      <AdminHeader />

      <div className="flex h-full flex-col items-center justify-center">
        <div>
          <div className="flex max-h-96 w-96 flex-col justify-between space-y-5 overflow-y-scroll rounded-2xl  border-2 border-solid border-pink-500  py-20 px-9">
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
                <CreateSubCatForm
                  setShowModal={setShowModal}
                  value=""
                  header=",ml"
                />
              }
              showModal={showModal}
              setShowModal={setShowModal}
              header={"Kategoriat"}
              openingElement={
                <ModalOpenButton
                  setShowModal={setShowModal}
                  buttonText={"Luo alikategoria"}
                />
              }
            />
          </div>
          <div className="mt-3">
            <button
              className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
              onClick={sessionData ? () => signOut() : () => signIn()}
            >
              {" "}
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategories;
