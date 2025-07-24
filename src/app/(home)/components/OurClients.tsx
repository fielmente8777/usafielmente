"use client";

import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

// import required modules
import { Autoplay, Grid } from "swiper/modules";
import SectionHeading from "./SectionHeading";
import React from "react";
import { ClientImages } from "@/utils/client";
import Section from "./Section";
import Container from "./Container";

const SectionHeadingDetails = {
  title: "Our ",
  span: "Clients",
};

function OurClients({
  SHeading,
  heading,
}: {
  SHeading?: boolean;
  heading?: string;
}) {
  return (
    <Section className="bg-white">
      <Container>
        <div>
          {SHeading ? (
            <SectionHeading {...SectionHeadingDetails} />
          ) : (
            <h2 className="text-[#14113D] text-center md:text-4xl text-3xl font-bold">
              {heading}
            </h2>
          )}
          <div className="mt-16">
            <div>
              <Swiper
                modules={[Autoplay, Grid]}
                slidesPerView={1}
                grid={{
                  rows: 2,
                  fill: "row",
                }}
                // loop={true}
                speed={900}
                autoplay={{
                  delay: 4000,
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                className="mySwiper"
              >
                {ClientImages.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="p-3 border border-orange-primary "
                  >
                    <Link
                      href={"/"}
                      className="relative w-full lg:aspect-[4/3.4] aspect-[4/4] h-[8rem] rounded-md flex justify-center items-center duration-300 cursor-pointer hover:shadow-lg hover:shadow-white/35 hover:scale-[1.04]"
                      style={{
                        backgroundColor: `${
                          index == 23
                            ? "#22413f"
                            : index == 22
                            ? "#F7F7F7"
                            : index == 9
                            ? "#FF6C26"
                            : index == 16
                            ? "#F7F7F7"
                            : index == 21 || index == 0
                            ? "#1e1e1e"
                            : index == 18
                            ? "#F7F7F7"
                            : index == 20
                            ? "#f7f7f7"
                            : "white"
                        }`,
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={`${item.alt}`}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full rounded-md p-3 "
                        style={{
                          backgroundColor: `${
                            index == 23
                              ? "#22413f"
                              : index == 22
                              ? "#F7F7F7"
                              : index == 9
                              ? "#FF6C26"
                              : index == 16
                              ? "#F7F7F7"
                              : index == 21 || index == 0
                              ? "#1e1e1e"
                              : index == 18
                              ? "#F7F7F7"
                              : index == 20
                              ? "#f7f7f7"
                              : "white"
                          }`,
                        }}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default OurClients;
