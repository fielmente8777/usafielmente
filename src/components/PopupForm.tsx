"use client";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import AuditCapture from "./AuditCapture";
export default function PopupForm({ showModal, setShowModal }: { showModal: boolean; setShowModal: Dispatch<SetStateAction<boolean>> }) {
  const close = useCallback(() => setShowModal(false), [setShowModal]);
  return <AuditCapture automatic={false} externalOpen={showModal} onExternalClose={close} audience="Hotel Marketing" defaultCode="+1" />;
}
