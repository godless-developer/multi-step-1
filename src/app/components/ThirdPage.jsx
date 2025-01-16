import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { JoinUs } from "./JoinUs";

export const ThirdPage = ({ click, setCurrentStep }) => {
  const [formValues, setFormValues] = useState({ date: "" });
  const [formErrors, setFormErrors] = useState({ date: "" });
  const [imageUrl, setImageUrl] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleClick = () => {
    let errorHave = false;
    const { date } = formValues;
    if (!date.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        date: "Please enter your date !",
      }));
      errorHave = true;
    }
    if (!errorHave) {
      setCurrentStep(click + 1);
    }
  };
  const backClick = () => {
    setCurrentStep(click - 1);
  };

  const onFileUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };
  return (
    <div className="w-[480px] p-[32px] bg-[#fff] rounded-2xl font-sans flex flex-col justify-between ">
      <div className="flex flex-col gap-6">
        <JoinUs />
        <Input
          type="date"
          label="Date of birth"
          handleChange={handleChange}
          name="date"
          error={formErrors.date}
        />
      </div>
      <div className="p-3 h-[350px] flex flex-col  ">
        <label htmlFor="file-input" className="text-[14px] font-semibold ml-2">
          <input type="file" id="file-input" onClick={onFileUpload} />
          {!imageUrl && <span>Add image</span>}
        </label>
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
          ButName="Continue 3/3"
          handleClick={handleClick}
          width="w-[70%]"
          bg="bg-black"
          text="text-white"
        />
      </div>
    </div>
  );
};
