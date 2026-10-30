"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import LeadDialog from "@/components/LeadDialog";

const PopUpForm = dynamic(() => import("./PopUpForm1"));

export default function PopupForm({ showModal, setShowModal }: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const close = useCallback(() => setShowModal(false), [setShowModal]);
  return (
    <LeadDialog open={showModal} onClose={close}>
      <div className="grid md:grid-cols-2">
        <div className="relative hidden md:block">
          <Image src="/popup2.jpg" alt="Hospitality Marketing" fill className="object-cover" sizes="384px" />
        </div>
        <PopUpForm />
      </div>
    </LeadDialog>
  );
}
