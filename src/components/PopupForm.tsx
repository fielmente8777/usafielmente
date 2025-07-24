"use client";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import React from "react";
import { OutlineClose } from "@/utils/icons";
import PopUpForm from "./PopUpForm1";

const PopupForm = ({
  setShowModal,
  showModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [hasShown, setHasShown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only show if not already shown and modal isn't open
    if (!hasShown && !showModal) {
      timerRef.current = setTimeout(() => {
        setShowModal(true);
        setHasShown(true);
        document.body.style.overflow = "hidden";
      }, 30000); // Show after 30 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showModal, hasShown, setShowModal]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    
    // Clear any pending timer when modal is closed
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [setShowModal]);

  return (
    <>
      <section 
        className={`fixed inset-0 z-[999] bg-black bg-opacity-50 duration-700 ease-in-out transition-all ${showModal ? "block" : "hidden"}`}
        onClick={closeModal}
      >
        <article 
          className={`${showModal ? "flex justify-center items-center h-full scale-100 opacity-100 max-md:px-4" : "h-0 scale-0 opacity-0"} transition-all duration-700 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex max-w-3xl w-full shadow-2xl relative rounded-lg overflow-hidden bg-white">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 w-8 h-8 flex justify-center items-center text-lg rounded-full text-orange-primary bg-white z-10 transition-all duration-300"
              aria-label="Close popup"
            >
              <OutlineClose />
            </button>
            <div className="relative w-full md:aspect-[4/4] max-md:hidden">
              <Image
                src={"/popup1.jpg"}
                alt="Hospitality Marketing"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PopUpForm />
          </div>
        </article>
      </section>

      {openPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-dark bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-4 rounded">
            <p>{popupMsg}</p>
            <button
              onClick={() => setOpenPopup(false)}
              className="mt-2 bg-blue-dark text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;