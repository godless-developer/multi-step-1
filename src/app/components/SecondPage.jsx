"use client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const savedValue = JSON.parse(localStorage.getItem("secondPage"));
    setFormValues((prev) => ({ ...prev, ...savedValue }));
  }, []);

  const handleClick = () => {
    let errorHave = false;
    const { email, phone, password, confirm } = formValues;

    const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const patternNumber = /^\+?\d{8}$/;

    if (!email.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Мэйл хаягаа оруулна уу",
      }));
      errorHave = true;
    } else if (!patternEmail.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Зөв мэйл хаяг оруулна уу",
      }));
      errorHave = true;
    }

    if (!phone.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Утасны дугаараа оруулна уу",
      }));
      errorHave = true;
    } else if (!patternNumber.test(phone)) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Зөв утасны дугаар оруулна уу",
      }));
      errorHave = true;
    }

    if (!password.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Нууц үгээ оруулна уу",
      }));
      errorHave = true;
    } else if (password.length <= 5) {
      setFormErrors((prev) => ({
        ...prev,
        password: "6 оронтой тоо оруулна уу",
      }));
      errorHave = true;
    }
    if (!confirm.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        confirm: "Нууц үгээ давтаж оруулна уу",
      }));
      errorHave = true;
    } else if (password !== confirm) {
      setFormErrors((prev) => ({
        ...prev,
        confirm: "Таны оруулсан нууц үг таарахгүй байна.",
      }));
      errorHave = true;
    }
    if (!errorHave) {
      localStorage.setItem("secondPage", JSON.stringify(formValues));
      setCurrentStep(click + 1);
    }
  };
  const backClick = () => {
    setCurrentStep(click - 1);
  };

  return (
    <>
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
              value={formValues.email}
            />
            <Input
              label="Phone number "
              type="tel"
              name="phone"
              placeholder="Your phone number"
              handleChange={handleChange}
              error={formErrors.phone}
              value={formValues.phone}
            />
            <Input
              label="Password "
              type="password"
              name="password"
              placeholder="Your password"
              handleChange={handleChange}
              error={formErrors.password}
              value={formValues.password}
            />
            <Input
              label="Confirm password "
              type="password"
              name="confirm"
              placeholder="Confirm password"
              handleChange={handleChange}
              error={formErrors.confirm}
              value={formValues.confirm}
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
            borderR="rounded-xl"
          />
          <Button
            ButName="Continue 2/3"
            handleClick={handleClick}
            width="w-[70%]"
            bg="bg-black"
            text="text-white"
            borderR="rounded-xl"
          />
        </div>
      </div>
    </>
  );
};
