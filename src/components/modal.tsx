import { useState } from "react";

type Props = {
  content: JSX.Element;
  showModal: boolean;
  setShowModal: (a: boolean) => void;
  openingElement: JSX.Element;
};

export default function Modal(props: Props) {
  const { showModal, setShowModal, content, openingElement } = props;
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
                <div className="mt-3 sm:flex">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Delete account ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Mieti miten modalin sisältö parametrisoidaan - onko lomake
                      vai vahvistus poistoon?
                    </p>
                    {content}
                    <div className="mt-3 items-center gap-2 sm:flex">
                      <button
                        className="mt-2 w-full flex-1 rounded-md bg-red-600 p-2.5 text-white outline-none ring-red-600 ring-offset-2 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Delete
                      </button>
                      <button
                        className="mt-2 w-full flex-1 rounded-md border p-2.5 text-gray-800 outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
