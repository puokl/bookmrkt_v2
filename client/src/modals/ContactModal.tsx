import React, { useState } from "react";
import ContactForm from "../components/ContactForm";

type ContactModalProps = {
  buttonText: string;
  productId: string;
  productImage: string;
  sellerName: string;
  sellerId: string;
  title: string;
};

const ContactModal: React.FC<ContactModalProps> = ({
  buttonText,
  productId,
  productImage,
  sellerName,
  sellerId,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-auto bg-smoke-light">
          <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg">
            <div className="flex items-center justify-between pb-3">
              <p className="text-2xl font-bold">Contact Seller</p>
              <button className="cursor-pointer" onClick={closeModal}>
                <span className="text-black">X</span>
              </button>
            </div>
            <div className="mt-2">
              <ContactForm
                productId={productId}
                sellerId={sellerId}
                sellerName={sellerName}
                closeModal={closeModal}
                title={title}
                productImage={productImage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
