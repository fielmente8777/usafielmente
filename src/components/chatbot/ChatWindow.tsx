// src/components/ChatWindow.jsx
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";

export type Option = {
  label: string;
  value: string;
};

type MessageFlow = {
  question: string;
  key: string;
  type?: string;
  options?: Option[];
};

type ChatMessage = {
  sender: "bot" | "user";
  text: string | string[];
  options?: Option[];
  key: string;
};

type ChatWindowProps = {
  messages: string;
  messageFlows: MessageFlow[];
  onClose: () => void;
  onSubmit?: (answers: Record<string, string | string[]>) => void;
  title: string;
  logo?: string;
  theme?: string;
  finalMessage?: string;
};
const ChatWindow = ({
  messages,
  messageFlows,
  onClose,
  onSubmit,
  title,
  logo,
  theme,
  finalMessage,
}: ChatWindowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // questions shown
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<
      string,
      {
        isSelected: boolean;
        value: string[];
      }
    >
  >({});

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // check date validation
  const isValidDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    if (!day || !month || !year || year.toString().length !== 4) return false;
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const toDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  // handleReset
  const onReset = () => {
    setChat([
      {
        sender: "bot",
        text: messageFlows[0].question,
        key: messageFlows[0].key as string,
      },
    ]);
    setCurrentIndex(0);
    setAnswers({});
    setShowFinalMessage(false);
    setSelectedOptions({});
  };

  // handleInputSumbit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentFlow = messageFlows[currentIndex];
    const key = currentFlow.key || `q${currentIndex}`;
    const answer = input;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (key.toLocaleLowerCase() === "check-in") {
      if (!isValidDate(input)) {
        addBotMessage(
          "❌ Invalid check-in date. Format should be DD-MM-YYYY.",
          key
        );
        return;
      }

      const checkInDate = toDate(input);
      setCheckInDate(checkInDate);

      if (key.toLocaleLowerCase() === "check-in" && checkInDate < today) {
        addBotMessage("❌ Check-in date cannot be in the past.", key);
        return;
      }
    }

    if (key.toLocaleLowerCase() === "check-out") {
      if (!isValidDate(input)) {
        addBotMessage(
          "❌ Invalid check-out date. Format should be DD-MM-YYYY.",
          key
        );
        return;
      }

      const checkOutDate = toDate(input);

      if (
        key.toLocaleLowerCase() === "check-out" &&
        checkOutDate <= checkInDate!
      ) {
        addBotMessage("❌ Check-out date must be after check-in date.", key);
        return;
      }
    }

    // Step 1: Show user's message
    setChat((prev) => [...prev, { sender: "user", text: answer, key }]);
    setAnswers((prev) => ({ ...prev, [key]: answer }));
    setInput("");
    setCurrentStep((prev) => prev + 1);
    // Step 2: Show typing... then bot message
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = currentIndex + 1;

      if (nextIndex < messageFlows.length) {
        setCurrentIndex(nextIndex);
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: messageFlows[nextIndex].question,
            ...(messageFlows[nextIndex].options && {
              options: messageFlows[nextIndex].options,
            }),
            key: messageFlows[nextIndex].key as string,
          },
        ]);
      } else {
        // End of questions
        setShowFinalMessage(true);
        if (onSubmit) onSubmit({ ...answers, [key]: answer });
      }
    }, 1000);
  };

  // handleOptionSelected
  const handleOptionSelect = (
    selectedOption: Option,
    allOptions: Option[],
    key: string
  ) => {
    if (selectedOption.value === "all") {
      setSelectedOptions((prev) => {
        const existing = prev[key] || { isSelcted: false, value: [] };
        if (existing.isSelected) {
          return prev;
        }
        // Prevent duplicates
        if (
          existing.value &&
          existing.value.length > 0 &&
          existing.value.includes(selectedOption.label)
        ) {
          return {
            ...prev,
            [key]: {
              ...existing,
              value: [],
            },
          };
        }

        return {
          ...prev,
          [key]: {
            ...existing,
            value: allOptions.map((item) => item.label),
          },
        };
      });
    } else {
      setSelectedOptions((prev) => {
        const existing = prev[key] || { isSelcted: false, value: [] };
        if (existing.isSelected) {
          return prev;
        }
        // Prevent duplicates
        if (
          existing.value &&
          existing.value.length > 0 &&
          existing.value.includes(selectedOption.label)
        ) {
          return {
            ...prev,
            [key]: {
              ...existing,
              value: existing.value.filter(
                (opt) => opt !== selectedOption.label
              ),
            },
          };
        }

        return {
          ...prev,
          [key]: {
            ...existing,
            value: [...existing.value, selectedOption.label],
          },
        };

        return prev;
      });
    }
  };

  // handleConfirm
  const handleConfirm = () => {
    const currentFlow = messageFlows[currentIndex];
    const key = currentFlow.key || `q${currentIndex}`;

    setChat((prev) => [
      ...prev,
      { sender: "user", text: selectedOptions[key].value, key },
    ]);

    setSelectedOptions((prev) => {
      const isExist = prev[key];

      if (isExist && isExist.value.length > 0) {
        return {
          ...prev,
          [key]: { ...isExist, isSelected: true },
        };
      }

      return {
        ...prev,
      };
    });

    setAnswers((prev) => ({ ...prev, [key]: selectedOptions[key].value }));
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = currentIndex + 1;

      if (nextIndex < messageFlows.length) {
        setCurrentIndex(nextIndex);
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: messageFlows[nextIndex].question,
            ...(messageFlows[nextIndex].options && {
              options: messageFlows[nextIndex].options,
            }),
            key: messageFlows[nextIndex].key as string,
          },
        ]);
      } else {
        setShowFinalMessage(true);
        if (onSubmit)
          onSubmit({ ...answers, [key]: selectedOptions[key]?.value });
      }
    }, 1000);
  };

  const addBotMessage = (text: string, key: string) => {
    setChat((prev) => [...prev, { sender: "bot", text, key }]);
  };

  // useEffect for set inital message
  useEffect(() => {
    // On first load: show first question
    if (chat.length === 0 && messageFlows.length > 0) {
      setChat([
        {
          sender: "bot",
          text: messageFlows[0].question,
          key: messageFlows[0].key as string,
        },
      ]);
    }
  }, [messageFlows]);

  // useEffect for scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  return (
    <div className="sm:rounded-2xl shadow-2xl sm:h-[80dvh] flex flex-col h-full scroll sm:w-[375px]">
      {/* Header */}
      <div
        className="p-4 flex justify-between items-center sm:rounded-t-xl"
        style={{
          background: theme || "#FD5C01",
          color: "white",
        }}
      >
        <div className="flex items-center">
          {logo && (
            <Image
              width={40}
              height={40}
              src={logo}
              alt="Hotel logo"
              className="h-8 w-8 mr-2 object-contain rounded-full"
            />
          )}
          <h3 className="font-medium">{title}</h3>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onReset}
            className="p-1 rounded hover:bg-opacity-20 hover:rotate-45 duration-500"
            aria-label="Start new conversation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-.75-.75H11.77a.75.75 0 000 1.5h2.43l-.31.31a7 7 0 00-11.712 3.138.75.75 0 001.45.389a5.5 5.5 0 019.2-2.466l.312.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-opacity-20 hover:rotate-180 duration-500"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Messages area */}
      <div className="flex-1 flex-grow bg-gray-50 flex flex-col p-4 gap-2 overflow-auto scroll-hidden">
        <p className="text-sm rounded-lg text-[#474747]">{title}</p>

        <div
          className={`max-w-[80%] px-3 py-2 rounded-lg text-sm self-start bg-gray-200 text-gray-800`}
        >
          {messages}
        </div>

        {chat.map((msg, index) => (
          <>
            {msg.sender === "bot" && index !== 0 && (
              <p className="text-sm rounded-lg text-[#474747]">{title}</p>
            )}

            <div
              key={index}
              style={{
                background: `${msg?.sender === "user" ? (!Array.isArray(msg.text) ? theme : "") : "#EEEEEE"}`,
              }}
              className={`max-w-[85%] break-words whitespace-wrap px-3 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "self-end bg-gray-100 text-white"
                  : "self-start bg-gray-200 text-gray-800"
              }`}
            >
              {Array.isArray(msg.text) ? (
                <div className="flex flex-wrap gap-2 justify-end border-t-[2px] py-2">
                  {msg.text.map((opt, index) => (
                    <div
                      key={index}
                      style={{
                        background: theme,
                      }}
                      className="text-white rounded-full px-3 py-1"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              ) : (
                msg.text
              )}
            </div>

            {msg?.options && (
              <div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.options.map((opt, idx: number) => (
                    <button
                      key={idx}
                      style={{
                        background: `${
                          selectedOptions[msg.key]?.value.includes(opt?.label)
                            ? theme
                            : "#eae6e6"
                        }`,

                        color: `${
                          selectedOptions[msg.key]?.value.includes(opt.label)
                            ? "#ffffff"
                            : "#393838"
                        }`,
                      }}
                      onClick={() =>
                        handleOptionSelect(
                          opt,
                          msg?.options as Option[],
                          msg?.key
                        )
                      }
                      className={`px-3 py-1 text-sm rounded-full border text-white`}
                      disabled={selectedOptions[msg.key]?.isSelected}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {selectedOptions[msg.key] &&
                  selectedOptions[msg.key].value.length > 0 &&
                  !selectedOptions[msg.key]?.isSelected && (
                    <div>
                      <button
                        className="mx-0 bg-slate-900 text-white rounded-full text-sm px-6 mt-2 py-1"
                        onClick={() => handleConfirm()}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
              </div>
            )}
          </>
        ))}

        {showFinalMessage && (
          <div className="max-w-full px-3 py-2 rounded-lg text-sm self-start bg-gray-200 text-gray-800">
            {`🎉 ${finalMessage}` || "🎉 Thank you for your responses!"}
          </div>
        )}

        {/* Typing Indicator */}

        {isTyping && (
          <div className="max-w-[80%] w-fit">
            <div>
              <p className="text-sm rounded-lg mt-1 text-[#474747]">{title}</p>
            </div>

            <div className="mt-1 w-fit">
              {/* <span class="loader"></span> */}
              <div className="flex bg-gray-200 py-3 gap-2 px-4 rounded-lg text-sm">
                <div className="h-[10px] animate-pulse w-[10px] rounded-full bg-gray-400" />
                <div className="h-[10px] animate-pulse w-[10px] rounded-full bg-gray-400" />
                <div className="h-[10px] animate-pulse w-[10px] rounded-full bg-gray-400" />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
      {/* input field form */}
      {currentIndex < messageFlows.length && (
        <form
          onSubmit={handleSubmit}
          className="p-1 border-t bg-gray-50 w-full sm:px-0 px-4 py-3 flex items-center sm:rounded-b-xl"
        >
          <div className="flex items-center gap-2 w-full border sm:border-none border-gray-600 sm:rounded-none rounded-full px-2">
            <input
              type={messageFlows[currentIndex]?.type}
              value={input}
              onChange={handleChange}
              placeholder="Type your answer..."
              className="w-full h-full flex-grow rounded-md px-3 py-4 text-sm outline-none bg-transparent"
              disabled={
                !!messageFlows[currentIndex].options ||
                messageFlows.length === currentStep
              }
              required
            />

            <button
              type="submit"
              // style={{
              //   background: theme || "#C2185B",
              // }}
              disabled={!!messageFlows[currentIndex].options}
              className=" flex justify-center items-center"
            >
              <span className="inline-block duration-200">
                <IoIosSend
                  size={24}
                  color={theme || "C2185B"}
                  opacity={`${messageFlows?.length === currentStep ? "0.4" : "1"}`}
                />
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatWindow;
