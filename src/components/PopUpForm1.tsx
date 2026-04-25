"use client";
import { usePathname } from "next/navigation";

import axios from "axios";
import React, { useState } from "react";
import { countries } from "@/utils/countryCode";
import {
  OutlineCallIcon,
  OutlineDrpopdown,
  OutlineMail,
  OutlineMessageIcon,
  OutlineUserIcon,
  WhatsAppIcon,
} from "@/utils/icons";
import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";

const PopUpForm1 = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [formRes, setFormRes] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setUserPhone(value);
      setErrorMessage(value.length < 10 ? "Please enter a valid number" : "");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
    setEmailErrorMessage(
      !emailRegex.test(value) ? "Please enter a valid email address" : "",
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormRes(true);

    if (userPhone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (!emailRegex.test(userEmail)) {
      setEmailErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://nexon.eazotel.com/eazotel/addcontacts`,
        // `https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/7lHAUjtz#generic-webhook`,
        {
          Domain: "fielmente",
          // Domain: "abhijeet",
          email: userEmail,
          Name: userName,
          Contact: `${countryCode}${userPhone}`,
          Description: userMessage,
          created_from: "webform",
          source_url: window.location.href,
          // email: userEmail,
          // name: userName,
          // phone: `${countryCode}${userPhone}`,
          // message: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      //   if (data.success) {
      if (data.Status) {
        setFormRes(true);
        setUserName("");
        setUserEmail("");
        setUserMessage("");
        setUserPhone("");
        setCountryCode("+91"); // Reset country code
        setFormRes(false);
        // router.push(`/thank-you/`);
        window.open("/thank-you/", "_blank");
        // router.push(`/thank-you/?name=${encodeURIComponent(userName)}`);
      } else {
        setFormRes(false);
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const codeRef = React.useRef(null);

  useClickOutside(codeRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const formData = [
    {
      tag: "input",
      icon: <OutlineUserIcon />,
      type: "text",
      name: "name",
      placeholder: "Your Name*",
      required: true,
      value: userName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
      },
    },
    {
      tag: "div", // Use div to wrap select and input for phone number
      icon: <OutlineCallIcon />,
      name: "phone",
      placeholder: "Your Phone*",
      required: true,
      content: (
        <div className="flex gap-px text-base">
          {/* <select
                        id="countryCode"
                        name="countryCode"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-auto bg-transparent rounded-lg text-[#333333] focus:outline-none"
                        style={{ inlineSize: `${countryCode.length + 2}ch` }}
                        aria-label="Country Code"
                    >
                        {countries.map((country, index) => (
                            <option
                                key={index}
                                value={country.code}
                                className="text-black bg-gray-100"
                            >
                                {`${country.code}`}
                            </option>
                        ))}
                    </select> */}
          {/* dropdown for country code */}
          <div className="">
            <div
              ref={codeRef}
              className="relative  border-white bg-transparent h-auto"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                className="w-max pr-2 h-full flex items-center justify-between gap-2"
              >
                <span className="text-start text-blue-dark md:text-lg">
                  {countryCode}
                </span>
                <OutlineDrpopdown
                  className={` text-orange-primary transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute  top-full left-0 right-0 shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-40 opacity-100 pointer-events-auto w-28 overflow-y-auto hide-scrollbar rounded"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setCountryCode(country.code);
                      setIsOpen(false); // Close after selection
                    }}
                    className={`w-full px-1 bg-white text-nowrap py-2 border-b border-clr6 text-left  uppercase text-sm font-medium hover:text-clr2 hover:border-clr2 transition-colors duration-300 ease-in-out ${
                      countryCode === country.code
                        ? "text-clr2 border-clr2 bg-blue-800"
                        : ""
                    }`}
                  >
                    {country.name} ({country.code})
                  </button>
                ))}
              </div>
            </div>
          </div>
          <input
            type="number"
            id="phone"
            name="phone"
            max={"9999999999"}
            placeholder="Your Phone Number*"
            value={userPhone}
            onChange={handlePhoneChange}
            className="w-full bg-transparent rounded-md placeholder:text-black-primary text-black no-spinner focus:outline-none"
          />
        </div>
      ),
    },
    {
      tag: "input",
      icon: <OutlineMail />,
      type: "email",
      name: "email",
      placeholder: "Your Email Id*",
      required: true,
      value: userEmail,
      onChange: handleEmailChange,
    },
    {
      tag: "textarea",
      icon: <OutlineMessageIcon />,
      type: "text",
      name: "",
      placeholder: "Your Message*",
      required: true,
      value: userMessage,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMessage(e.target.value);
      },
    },
  ];

  const pathname = usePathname();
  const ukno = "+447438375533";
  const indNo = "+918178939108";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-md:px-4 p-6 text-base w-full"
    >
      <div className="flex flex-col gap-px items-center justify-center">
        <h2 className="text-xl lg:text-[1.8rem]/[2.5rem] font-normal text-blue-dark helv">
          CONTACT US
        </h2>
        <p className="text-gray-primary md:text-lg poppins">
          Our Team is Just a Message Away!
        </p>
      </div>

      {formData.map((data, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="flex  gap-2 text-gray-primary p-3 bg-white box_shadow2">
            <label
              htmlFor={data.name}
              className={`${data.tag === "textarea" && "mt-1"}`}
            >
              {data.icon}
            </label>
            {data.tag === "div"
              ? data.content
              : React.createElement(data.tag, {
                  id: data.name,
                  type: data.type,
                  name: data.name,
                  value: data.value,
                  onChange: data.onChange,
                  placeholder: data.placeholder,
                  required: data.required,
                  autoComplete: "off",
                  spellCheck: "false",
                  rows: data.tag === "textarea" ? 3 : undefined,
                  className:
                    "w-full bg-transparent no-spinner resize-none focus:outline-none rounded-md valid:outline-blue-primary invalid:outline-Saffron-primary",
                })}
          </div>
          {data.name === "phone" && errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
          {data.name === "email" && emailErrorMessage && (
            <p className="text-sm text-red-500 mt-2">{emailErrorMessage}</p>
          )}
        </div>
      ))}

      <button className="w-full text-center bg-orange-primary text-white justify-center border-orange-primary text-md px-8 py-3 md:text-lg font-semibold rounded-md hover:bg-white hover:text-orange-primary duration-300 active:scale-75 hover:scale-105 border border-blue-primary">
        {formRes ? "Loading...." : "Get a Free Consultation"}
      </button>

      <Link
        target="_blank"
        href={`https://wa.me/${pathname === "/uk" ? ukno : indNo}`}
        className="text-blue-dark flex items-center justify-center gap-1 text-md font-semibold px-8 py-2 duration-300 active:scale-75 hover:scale-105 group"
      >
        <span className="mr-2">
          <WhatsAppIcon />
        </span>
        <span className="underline group-hover:no-underline">WhatsApp Now</span>
      </Link>
    </form>
  );
};

export default PopUpForm1;
