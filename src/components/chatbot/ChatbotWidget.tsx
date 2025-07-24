// src/components/ChatbotWidget.jsx
import React, { useEffect, useState } from "react";
import "./chatbot.css";
import ChatbotButton from "./ChatbotButton";
import ChatWindow, { Option } from "./ChatWindow";

export type ChatbotFormData<Flows extends readonly { key: string }[]> = {
  [K in Flows[number]["key"]]: string | string[];
};

interface MessagesFlowType {
  key: string;
  question: string;
  type?: string;
  options?: Option[];
}

interface ChatbotWidgetProps {
  onSubmit?: (formData: Record<string, string | string[]>) => Promise<void>;
  messages: string; // You can replace `any` with a Message[] type if you define it
  messageFlows: MessagesFlowType[]; // You can replace `any` with a MessageFlow[] type if you define it
  openInterval?: number;
  finalMessage?: string;
  title: string;
  logo?: string;
  theme?: string;
}

const ChatbotWidget = ({
  onSubmit,
  messages,
  messageFlows,
  openInterval,
  finalMessage,
  title,
  logo,
  theme = "#7D684D",
}: ChatbotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number | null>(null);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const hanldeSubmit = async (formData: Record<string, string | string[]>) => {
    try {
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setIsOpen(true);
    }, openInterval || 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      const handleResize = () => {
        setInnerWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      if (isOpen) {
        if (innerWidth && innerWidth < 640) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen, innerWidth]);

  return (
    <div>
      {isOpen && (
        <div
          className={`fixed sm:bottom-4 md:right-4 sm:right-2 right-0 z-[99999999] sm:w-fit w-full sm:h-fit h-dvh`}
        >
          <div
            className={`w-full h-full ${
              isOpen
                ? "transition-all duration-500 translate-y-0 block"
                : "translate-y-full opacity-0 hidden"
            }`}
          >
            <ChatWindow
              messages={messages}
              messageFlows={messageFlows}
              onClose={toggleChat}
              onSubmit={hanldeSubmit}
              title={title}
              logo={logo}
              theme={theme}
              finalMessage={finalMessage}
            />
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="px-2 fixed bottom-6 right-4 z-[99999]">
          <ChatbotButton onClick={toggleChat} theme={theme} />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
