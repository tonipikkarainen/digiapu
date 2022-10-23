import React from "react";
import { AiFillDelete } from "react-icons/ai";

type Props = {
  setShowModal: (a: boolean) => void;
};

const DeleteButton = (props: Props) => {
  return <AiFillDelete onClick={() => props.setShowModal(true)} />;
};

export default DeleteButton;
