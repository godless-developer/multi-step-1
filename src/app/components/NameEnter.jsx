"use client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const savedValue = JSON.parse(localStorage.getItem("firstPage"));
    setFormValues((prev) => ({ ...prev, ...savedValue }));
  }, []);

  const handleClick = () => {
    let errorHave = false;
    const { firstName, lastName, userName } = formValues;
    if (!firstName.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        firstName: "Нэрээ оруулна уу",
      }));
      errorHave = true;
    }

    if (!lastName.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        lastName: "Овгоо оруулна уу.",
      }));
      errorHave = true;
    }

    if (!userName.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        userName: "Хэрэглэгчийн нэрээ оруулна уу",
      }));
      errorHave = true;
    }

    if (!errorHave) {
      setCurrentStep(click + 1);
    }

    if (!errorHave) {
      localStorage.setItem("firstPage", JSON.stringify(formValues));
      localStorage.setItem("currentPage", 1);
      setCurrentStep(click + 1);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
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
              value={formValues.firstName}
              handleKeyDown={handleKeyDown}
            />
            <Input
              label="Last name "
              placeholder="Your last name"
              type="text"
              error={formErrors.lastName}
              handleChange={handleChange}
              name="lastName"
              value={formValues.lastName}
              handleKeyDown={handleKeyDown}
            />
            <Input
              label="Username "
              placeholder="Your username"
              type="text"
              error={formErrors.userName}
              handleChange={handleChange}
              name="userName"
              value={formValues.userName}
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <Button
          ButName="Continue 1/3"
          handleClick={handleClick}
          bg="bg-black"
          text="text-white"
          width="w-[100%]"
          borderR="rounded-xl"
        />
      </div>
    </>
  );
};
