"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/animations/animations";
import Image from "next/image";

import aiBotImage from "@/assets/ai.png";

const Hedear = () => {
  return (
    <AnimatePresence>
      <motion.section className="" {...slideAnimation("left")}>
        <motion.header {...slideAnimation("down")}>
          <Image
            src={aiBotImage}
            alt="logo"
            width={50}
            height={50}
            className="  object-contain"
          />
        </motion.header>

        <motion.div {...headContainerAnimation}>
          <motion.div {...headTextAnimation}>
            <h1 className="font-bold text-4xl">
              PI <br className="hidden" /> POO POO
            </h1>
          </motion.div>

          <motion.div
            {...headContainerAnimation}
            className="flex flex-col gap-5"
          >
            <p className="max-w-md font-normal text-gray-700 text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
              eaque omnis in, accusamus ex, id porro error cum nostrum repellat
              necessitatibus vitae praesentium quam autem aspernatur, fugiat
              suscipit delectus a.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Hedear;
