"use client";
import { useState } from "react";
import { Button } from "./Button";
import { JoinUs } from "./JoinUs";
import { Input } from "./Input";

export const NameEnter = ({ click, setCurrentStep }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    let errorHave = false;
    const { firstName, lastName, userName } = formValues;
    if (!firstName.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        firstName: "Please enter your first name !",
      }));
      errorHave = true;
    }

    if (!lastName.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        lastName: "Please enter your last name !",
      }));
      errorHave = true;
    }

    if (!userName.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        userName: "Please enter your username !",
      }));
      errorHave = true;
    }

    if (!errorHave) {
      setCurrentStep(click + 1);
    }
  };

  return (
    <div className="w-[480px] h-[655px] p-[32px] bg-[#fff] rounded-2xl font-sans flex flex-col justify-between ">
      <div>
        <JoinUs />
        <div className="mt-[22px] flex flex-col gap-2">
          <Input
            label="First name "
            placeholder="Your first name"
            type="text"
            error={formErrors.firstName}
            handleChange={handleChange}
            name="firstName"
          />
          <Input
            label="Last name "
            placeholder="Your last name"
            type="text"
            error={formErrors.lastName}
            handleChange={handleChange}
            name="lastName"
          />
          <Input
            label="Username "
            placeholder="Your username"
            type="text"
            error={formErrors.userName}
            handleChange={handleChange}
            name="userName"
          />
        </div>
      </div>
      <Button
        ButName="Continue 1/3"
        handleClick={handleClick}
        bg="bg-black"
        text="text-white"
        width="w-[100%]"
      />
    </div>
  );
};
