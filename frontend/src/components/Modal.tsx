import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, onDelete }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200 hidden"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 hidden"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200 hidden"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95 hidden"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6
              text-center align-middle shadow-xl transition-all px-10 md:px-14 py-8 md:py-16"
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl md:text-2xl font-bold text-danger"
                >
                  Delete Modal
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-md text-gray-600">
                    Are you sure you want to delete this event?
                  </p>
                </div>

                <div className="mt-5 flex gap-x-6">
                  <button
                    className="form-buttom btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button className="form-buttom btn-able" onClick={onDelete}>
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
