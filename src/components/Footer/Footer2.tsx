"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import PopupForm from "../PopupForm";
import { Container } from "@/app/(home)/components";
import { landingFooterData } from "./footerData";

function Footer2() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const host = "https://eazotel.eazotel.com/api/dashboard/editnewsletter";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrorMessage(
      !emailRegex.test(value) ? "Please enter a valid email address" : "",
    );
  };

  const handleNewsletter = async () => {
    const data = {
      // Domain: "abhijeet",
      Domain: "fielmente",
      email: email,
    };
    try {
      const response = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }

    setEmail("");
  };

  interface linkTypeProps {
    title: string;
    href: string;
  }

  const socialLink: linkTypeProps[] = [
    {
      title: "Instagram",
      href: "https://www.instagram.com/fielmente_hospitality/?hl=en",
    },
    {
      title: "Facebook",
      href: "https://www.facebook.com/fielmentebusiness?mibextid=ViGcVu",
    },
    {
      title: "Twitter",
      href: "https://x.com/fieladvisors?lang=en",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/company/fielmente/",
    },
  ];

  if (pathname === "/thank-you/") {
    return null;
  }

  // const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="max_screen_width bg-[#0A0A0C] md:py-[120px] py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            <div className="flex flex-col gap-6">
              <div className="relative w-full max-w-[183px]  aspect-[4/1.46]">
                <Image
                  src={landingFooterData.logo}
                  alt="fielment logo"
                  fill
                  className="object-cover"
                  priority
                  loading="eager"
                  sizes="100vw"
                />
              </div>
              <p className="text-white">{landingFooterData.description}</p>
            </div>
            <div className="grid md:grid-cols-2 md:gap-10 gap-6 ">
              {landingFooterData.linksData.map((item, index) => (
                <div className="flex flex-col  gap-4" key={index}>
                  <h3 className="text-white text-lg font-medium flex items-center gap-2">
                    {item.icon && <span className="">{item.icon}</span>}
                    {item.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {item.listOfLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FFFFFFB2] max-md:text-sm hover:text-secondary transition-all duration-300 ease-in-out"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </footer>
      {pathname === "/contact/" || pathname === "/contact-us/" ? null : (
        <PopupForm setShowModal={setShowModal} showModal={showModal} />
      )}
    </>
  );
}

export default Footer2;
