import React from "react";

type Props = {
  setShowModal: (a: boolean) => void;
  buttonText: string;
};

const ModalOpenButton = (props: Props) => {
  return (
    <button
      className="rounded-md bg-pink-500 px-6 py-3 text-purple-100"
      type="button"
      onClick={() => props.setShowModal(true)}
    >
      {props.buttonText}
    </button>
  );
};

export default ModalOpenButton;
