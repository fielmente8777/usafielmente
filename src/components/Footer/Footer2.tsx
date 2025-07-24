"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/images/footer-fielmente.webp";
import { usePathname } from "next/navigation";
import PopupForm from "../PopupForm";


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
      !emailRegex.test(value) ? "Please enter a valid email address" : ""
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
      <footer className="bg-gray-100 pt-8 pb-4">
        <div className="max-width">
          <div className="flex flex-col gap-8">
            <h2 className="text-center text-gray-primary text-3xl ">
              Find Us On
            </h2>
            <div className="grid lg:grid-cols-4 grid-cols-2 items-center justify-center lg:gap-8 gap-2">
              {socialLink.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  target="_blank"
                  className="text-blue-dark lg:text-[2rem]/[2.5rem] text-base font-semibold md:text-center text-center"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <p className="text-gray-primary sm:text-xl text-lg text-center">
              Hotel Marketing Agency | Restaurant Marketing Agency | Hotel
              Marketing Company | Hotel Digital Marketing | Hotel Website
              Development | Hotel Social Media Management | Restaurant Marketing
              Agency in India | Restaurant Digital Marketing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            <div className="flex flex-col md:gap-20 gap-8 ">
              <Link
                href={"/"}
                className="flex items-center justify-center lg:justify-start"
              >
                <Image src={Logo} alt="fielmente-logo" />
              </Link>
              <Link
                // href={"https://maps.app.goo.gl/hHjjUZHsAJbqQojZ6"}
                href={"#"}
                // target="_blank"
                className="text-gray-primary sm:text-xl text-lg md:w-[60%]"
              >
                {/* <b>Office Address</b> – Level 2, Augusta Point, Golf Course Rd,
                Parsvnath Exotica, Sarswati Kunj II, DLF Phase 5, Sector 53,
                Gurugram, Haryana 122002
                <br />
                <br />
                <b>Office Address</b> – Raheja Platinum, Road, off Andheri -
                Kurla Road, Sag Baug, Marol, Andheri East, Mumbai, Maharashtra
                400059 */}
                <br />
                <b>Office Address</b> – Suncity Success Tower, Golf Course Ext
                Rd, Sector 65, Gurugram, Haryana 122005
              </Link>
            </div>
            <div className="flex flex-col  gap-5 lg:ms-20">
              <div className="flex flex-col gap-6">
                <h2 className="text-blue-dark lg:text-2xl text-[1.7rem] font-bold">
                  Let’s Stay Connected
                </h2>
                <div className="w-full bg-white rounded-md flex items-center py-3 px-4 border">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Your Email"
                    className="w-full outline-none bg-transparent text-base text-black"
                  />
                  <button
                    onClick={handleNewsletter}
                    className="text-orange-primary font-medium text-base capitalize hover:text-blue-dark duration-150"
                  >
                    send
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </div>

              <div className="flex flex-col gap-6 ">
                <h2 className="text-blue-dark max-md:text-center text-3xl font-bold">
                  To Know More
                </h2>
                <div className="w-full flex md:flex-row flex-col gap-8 max-md:gap-3 max-md:items-center text-gray-primary text-lg">
                  <Link href={"tel:+919501868775"}>+91 9501868775</Link>
                  <Link href={"mailto:sachin@fielmente.com"}>
                    sachin@fielmente.com
                  </Link>
                </div>
                <div className="flex gap-2 max-md:justify-center text-blue-dark text-xl">
                  <b>Dubai</b> | <b>Canada</b> | <b>USA</b> | <b>UK</b>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col max-md:items-center gap-4 text-gray-primary justify-between text-xl max-md:mt-5 mt-10">
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
            <Link href={"/terms-and-conditions/"}>Terms & Conditions</Link>
          </div>
        </div>
      </footer>
      {pathname === "/contact/" || pathname === "/contact-us/" ? null : (
        <PopupForm setShowModal={setShowModal} showModal={showModal} />
      )}
    </>
  );
}

export default Footer2;
