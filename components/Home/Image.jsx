"use client";
import React from "react";
import { motion } from "motion/react";
import Junaid from "../../public/JunaidHassan.jpeg";
import Image from "next/image";
function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0, duration: 0.5 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 text-center  lg:block "
    >
      <Image
        src={Junaid}
        alt="Image"
        className=" object-contain max-h-[300px] md:max-h-[300px] lg:max-h-[500px] w-auto mx-auto rounded-bl-[100px] rounded-tr-[100px] md:rounded-2xl lg:rounded-2xl"
        priority
      />
    </motion.div>
  );
}

export default HeroImage;
