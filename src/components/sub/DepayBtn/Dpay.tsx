import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export const Dpay = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>

<button
          type="button"
          onClick={openModal}
          className="cursor-pointer z-[50] text-xs group relative flex gap-1.5 px-5 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
        >
          Activate Account
          
        </button>



      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Activate your account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <a
                    href="https://link.depay.com/4tuqcVjw3naGPs31GL2xc9"
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Pay now
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
