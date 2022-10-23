import { SubCategory, VideoCategory } from "@prisma/client";
import React, { useState } from "react";
import DeleteForm from "./deleteForm";
import DeleteButton from "./deleteIcon";
import Modal from "./modal";

type Props = {
  videocat: SubCategory;
  deleteCat: (id: string) => void;
};

const SubCatElement = (props: Props) => {
  const { videocat, deleteCat } = props;
  const [showDelModal, setShowDelModal] = useState(false);
  return (
    <div
      className="flex items-center justify-between rounded-3xl  border-2 border-solid border-pink-500  px-6"
      key={videocat.id}
    >
      <div className="main-color hover:main-color-hover ">{videocat.name}</div>
      <div className="main-color hover:main-color-hover ">
        <Modal
          content={
            <DeleteForm
              setShowModal={setShowDelModal}
              id={videocat.id}
              del={deleteCat}
            />
          }
          showModal={showDelModal}
          setShowModal={setShowDelModal}
          header={"Test"}
          openingElement={<DeleteButton setShowModal={setShowDelModal} />}
        />
      </div>
    </div>
  );
};

export default SubCatElement;
