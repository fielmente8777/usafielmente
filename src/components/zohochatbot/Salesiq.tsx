"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    $zoho: {
      salesiq?: {
        ready?: () => void;
        floatbutton?: {
          position: (position: "bottomright") => void;
        };
      };
    };
  }
}

const WIDGET_SRC =
  "https://salesiq.zohopublic.in/widget?wc=siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df";

// Keep the existing delay: PageSense and SalesIQ share window.$zoho.
const LOAD_DELAY_MS = 8000;

export default function Salesiq() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.$zoho = window.$zoho || {};
      const salesiq = (window.$zoho.salesiq = window.$zoho.salesiq || {});

      if (document.getElementById("zsiqscript")) {
        salesiq.floatbutton?.position("bottomright");
        return;
      }

      const previousReady = salesiq.ready;
      salesiq.ready = () => {
        previousReady?.();
        salesiq.floatbutton?.position("bottomright");
      };

      const script = document.createElement("script");
      script.id = "zsiqscript";
      script.src = WIDGET_SRC;
      script.async = true;
      document.body.appendChild(script);
    }, LOAD_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
