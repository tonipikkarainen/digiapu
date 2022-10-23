import { useState } from "react";

type Props = {
  content: JSX.Element;
  showModal: boolean;
  setShowModal: (a: boolean) => void;
  openingElement: JSX.Element;
  header: string;
};

export default function Modal(props: Props) {
  const { showModal, setShowModal, content, openingElement, header } = props;
  return (
    <>
      <div className="flex items-center justify-center">{openingElement}</div>
      {showModal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 h-full w-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex min-h-screen items-center px-4 py-8">
              <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
                <div className="mt-2 text-center sm:mx-auto  sm:max-w-sm  ">
                  <h4 className="text-lg font-medium text-gray-800">
                    {header}
                  </h4>

                  {content}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
