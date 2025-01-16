"use client";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { JoinUs } from "./JoinUs";

export const SecondPage = ({ click, setCurrentStep }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    userName: "",
    confirm: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    let errorHave = false;
    const { email, phone, password, confirm } = formValues;

    const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const patternNumber = /^\+?\d{8}$/;

    if (!email.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter your email !",
      }));
      errorHave = true;
    } else if (!patternEmail.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Email buruu bnaa",
      }));
      errorHave = true;
    }

    if (!phone.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Please enter your phone number !",
      }));
      errorHave = true;
    } else if (!patternNumber.test(phone)) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "dugaar buruu bna",
      }));
      errorHave = true;
    }

    if (!password.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Please enter your password !",
      }));
      errorHave = true;
    } else if (password.length <= 5) {
      setFormErrors((prev) => ({
        ...prev,
        password: "hamgiin bagadaa 6 oron bna",
      }));
      errorHave = true;
    }
    if (!confirm.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        confirm: "Please enter your password !",
      }));
      errorHave = true;
    } else if (password !== confirm) {
      setFormErrors((prev) => ({
        ...prev,
        confirm: "password taarahgvi bna",
      }));
      errorHave = true;
    }
  };
  const backClick = () => {
    setCurrentStep(click - 1);
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      if (!errorHave) {
        setCurrentStep(click + 1);
      }
    }
    return false;
  };
  return (
    <div className="w-[480px] h-[655px] p-[32px] bg-[#fff] rounded-2xl font-sans flex flex-col justify-between ">
      <div>
        <JoinUs />
        <div className="mt-[22px] flex flex-col gap-2">
          <Input
            label="Email "
            type="email"
            placeholder="Your email address"
            name="email"
            handleChange={handleChange}
            error={formErrors.email}
          />
          <Input
            label="Phone number "
            type="tel"
            name="phone"
            placeholder="Your phone number"
            handleChange={handleChange}
            error={formErrors.phone}
          />
          <Input
            label="Password "
            type="password"
            name="password"
            placeholder="Your password"
            handleChange={handleChange}
            error={formErrors.password}
          />
          <Input
            label="Confirm password "
            type="password"
            name="confirm"
            placeholder="Confirm password"
            handleChange={handleChange}
            error={formErrors.confirm}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          ButName="Back"
          handleClick={backClick}
          width="w-[30%]"
          bg="bg-[#ffffff]"
          text="text-black"
          border="border-black"
          borderS="border-[0.5px]"
        />
        <Button
          ButName="Continue 2/3"
          handleClick={handleClick}
          width="w-[70%]"
          bg="bg-black"
          text="text-white"
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};