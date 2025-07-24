"use client";
import Container from "./Container";
import Section from "./Section";
import { BannerProps } from "../types/index";
import { useState } from "react";
import Image from "next/image";
import PopupForm from "@/components/PopupForm";

const Banner: React.FC<BannerProps> = ({ title, heading, link, img }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Section className="bg-blue-dark lg:py-16 mb-8">
      <Container>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col gap-7 justify-center">
            <p className="text-white lg:text-xl text-base">{title}</p>
            <h1
              className="text-2xl lg:text-[2.875rem]/[3.5rem] font-normal text-white heading"
              dangerouslySetInnerHTML={{ __html: heading }}
            />

            {link && (
              <div className="">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-orange-primary text-white font-bold border border-orange-primary hover:bg-transparent px-8 py-3 rounded-md text-lg active:scale-90 duration-300  "
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>

          <div className="w-full relative aspect-[4/2.5] z-0">
            <Image src={img} alt="banner" fill className="object-contain" />
          </div>
        </div>
      </Container>
      {showModal && (
        <PopupForm setShowModal={setShowModal} showModal={showModal} />
      )}
    </Section>
  );
};

export default Banner;
