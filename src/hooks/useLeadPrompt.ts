"use client";

import { useEffect } from "react";
import { startLeadPrompt } from "@/lib/leadPrompt";

export default function useLeadPrompt(open: () => void) {
  useEffect(() => startLeadPrompt(open), [open]);
}
