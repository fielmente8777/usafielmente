"use client";
import React from "react";
import ChatbotWidget from "./ChatbotWidget";
import axios from "axios";
import { usePathname } from "next/navigation";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  [key: string]: string; // For additional dynamic fields
}

const RenderChatBot = () => {
  const pathName = usePathname();
  const welcomeMessage = "Welcome to Fielmente! How can I help you today?";
  const thankYouMessage = `Thank you so much for filling up the details, one of our representative will speak to you as soon as possible!`;

  const messageFlows = [
    { key: "name", question: "What's your Name?", type: "text" },
    { key: "phone", question: "What's your Phone Number?", type: "number" },
    { key: "email", question: "What's your Email ?", type: "email" },
    { key: "city", question: "Please enter your city!", type: "text" },
    {
      key: "services",
      question: "What services are you looking for?(option type)",
      type: "text",
      options: [
        {
          label: "Hotel Marketing",
          value: "Hotel Marketing",
        },
        {
          label: "Resort Marketing",
          value: "Resort Marketing",
        },
        {
          label: "Restaurant Marketing",
          value: "Restaurant Marketing",
        },
        {
          label: "Cloud Kitchen",
          value: "Cloud Kitchen",
        },
        {
          label: "Villa/ Homestay",
          value: "Villa/ Homestay",
        },
      ],
    },
    {
      key: "services2",
      question: "Choose a service you are looking for?",
      options: [
        { label: "OTA Listing", value: "ota_listing" },
        { label: "OTA Management", value: "ota_management" },
        { label: "Sales Automation", value: "sales_automation" },
        { label: "Performance Mktg", value: "performance_marketing" },
        { label: "Social Media", value: "social_media" },
        { label: "Influencer Marketing", value: "influencer_marketing" },
        { label: "Website Development", value: "website_development" },
        { label: "SEO", value: "seo" },
        { label: "All the above", value: "all" },
      ],
    },
    { key: "rooms", question: "How many rooms do you have?", type: "text" },
    {
      key: "room rate",
      question: "May I know your average room rate?",
      type: "text",
    },
    {
      key: "approximate budget",
      question: "Please tell us your approximate budget?",
      type: "text",
    },
  ];

  const handleSumbit = async (formData: Record<string, string | string[]>) => {
    // Extract the known fields
    const { name, email, phone, ...otherFields } = formData;
    const description = Object.entries(otherFields)
      .map(([key, value]) => `${key}: ${value}`)
      .join(",");

    try {
      const { data } = await axios.post(
        "https://nexon.eazotel.com/eazotel/addcontacts",
        {
          Domain: "fielmente",
          Contact: `${formData?.phone}`,
          email: `${formData?.email}`,
          Description: description,
          Name: `${formData?.name}`,
          Remark: "",
          Subject: null,
          created_from: "Chatbot",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.Status) {
        window.open("thank-you", "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if(pathName === "/thank-you/"){
    return null
  }

  return (
    <div>
      <ChatbotWidget
        onSubmit={handleSumbit}
        messages={welcomeMessage}
        finalMessage={thankYouMessage}
        messageFlows={messageFlows}
        title="Fielmente"
        theme={"#0A081E"}
        openInterval={2000}
        logo={"/favicon-32x32.png"}
      />
    </div>
  );
};

export default RenderChatBot;
