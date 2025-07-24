"use client";
import Image from "next/image";
import Container from "./Container";
import Section from "./Section";
import Link from "next/link";
import { GrowthCardProps } from "../types";
import { useState } from "react";
import PopupForm from "@/components/PopupForm";

const GrowthCard: React.FC<GrowthCardProps> = ({
  img,
  title,
  description,
  link,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Section>
      <Container>
        <div className="max-w-7xl mx-auto relative w-full md:aspect-[4/1.7] aspect-square">
          <Image
            src={img}
            alt="growth-card"
            fill
            className="object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#000000]/30">
            <div className="flex flex-col items-center gap-6 justify-center h-full text-white">
              <h2 className="lg:text-[2.8rem]/[3.5rem] text-2xl text-center font-bold text-white">
                {title}
              </h2>
              <p className="text-white lg:text-2xl text-lg max-w-4xl lg:px-10 text-center">
                {description}
              </p>
              {link && (
                <div className="">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-orange-primary text-white font-bold border border-orange-primary hover:bg-transparent px-8 py-3 rounded-md text-lg active:scale-90 duration-300  "
                  >
                    Enquire Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      {showModal && (
        <PopupForm setShowModal={setShowModal} showModal={showModal} />
      )}
    </Section>
  );
};

export default GrowthCard;
