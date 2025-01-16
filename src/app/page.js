"use client";
import { NameEnter } from "./components/NameEnter";
import { SecondPage } from "./components/SecondPage";
import { useState } from "react";
import { ThirdPage } from "./components/ThirdPage";
import { FourthPage } from "./components/FourthPage";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [NameEnter, SecondPage, ThirdPage, FourthPage][currentStep];
  return (
    <div className="bg-white-300">
      <FormSteps
        currentStep={currentStep}
        click={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
