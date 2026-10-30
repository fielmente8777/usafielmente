"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import PopupForm from "./PopupForm";
import useLeadPrompt from "@/hooks/useLeadPrompt";
import { isLeadThankYouPage } from "@/lib/leadPrompt";

export default function GlobalLeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const open = useCallback(() => setIsOpen(true), []);
  useLeadPrompt(open);
  return <PopupForm showModal={isOpen && !isLeadThankYouPage(pathname)} setShowModal={setIsOpen} />;
}
