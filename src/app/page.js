"use client";
import { NameEnter } from "./components/NameEnter";
import { SecondPage } from "./components/SecondPage";
import { useEffect, useState } from "react";
import { ThirdPage } from "./components/ThirdPage";
import { FourthPage } from "./components/FourthPage";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [NameEnter, SecondPage, ThirdPage, FourthPage][currentStep];

  useEffect(() => {
    const savedPages = localStorage.getItem("currentPage");
    setCurrentStep(Number(savedPages));
  }, []);
  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          className="bg-[#f4f4f4] w-[100vw] h-[100vh] flex items-center justify-center"
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FormSteps
            currentStep={currentStep}
            click={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
