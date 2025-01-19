import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { JoinUs } from "./JoinUs";

export const ThirdPage = ({ click, setCurrentStep }) => {
  const [formValues, setFormValues] = useState({ date: "" });
  const [formErrors, setFormErrors] = useState({ date: "", image: "" });
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Retrieve form values and image URL from localStorage
    const savedValue = JSON.parse(localStorage.getItem("thirdPage"));
    const savedImageUrl = localStorage.getItem("imageUrl");

    if (savedValue) {
      setFormValues((prev) => ({ ...prev, ...savedValue }));
    }
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }
  }, []);

  const handleClick = () => {
    let errorHave = false;
    const { date } = formValues;

    // Date of birth validation
    if (!date.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        date: "Please enter your date!",
      }));
      errorHave = true;
    } else {
      const [birthYear, birthMonth, birthDay] = date.split("-").map(Number);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthYear;
      const monthDiff = currentDate.getMonth() + 1 - birthMonth;
      const dayDiff = currentDate.getDate() - birthDay;

      if (
        age < 18 ||
        (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
      ) {
        setFormErrors((prev) => ({
          ...prev,
          date: "You must be over 18 years old.",
        }));
        errorHave = true;
      }
    }

    // Image validation
    if (!imageUrl) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Image cannot be blank!",
      }));
      errorHave = true;
    }

    if (!errorHave) {
      // Save form data and image URL to localStorage
      localStorage.setItem("thirdPage", JSON.stringify(formValues));
      localStorage.setItem("imageUrl", imageUrl);
      setCurrentStep(click + 1);
    }
  };

  const backClick = () => {
    setCurrentStep(click - 1);
  };

  const onFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file.",
        }));
        setImageUrl(null); // Reset the image URL
      } else {
        const uploadedImageUrl = URL.createObjectURL(file);
        setImageUrl(uploadedImageUrl);
        setFormErrors((prev) => ({ ...prev, image: "" })); // Clear image error
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="w-[480px] p-[32px] bg-[#fff] rounded-xl font-sans flex flex-col justify-between">
      <div className="flex flex-col gap-6">
        <JoinUs />
        <Input
          type="date"
          value={formValues.date}
          label="Date of birth "
          handleChange={handleChange}
          name="date"
          error={formErrors.date}
          handleKeyDown={handleKeyDown}
        />
      </div>
      <div className="mt-1 flex gap-1">
        {" "}
        <label
          htmlFor="file-input"
          className="text-[14px] font-semibold ml-2 flex flex-col"
        >
          Profile image
        </label>
        <span className="text-red-700">*</span>
      </div>
      <div className=" h-[250px] flex flex-col  mt-1 mb-5">
        <label
          htmlFor="file-input"
          className="bg-gray-100 rounded-xl w-full h-[180px] flex flex-col justify-center items-center cursor-pointer border-[1px] border-gray"
        >
          <input
            hidden
            type="file"
            id="file-input"
            onChange={onFileUpload}
            handleKeyDown={handleKeyDown}
          />
          {!imageUrl ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="w-7 h-7 bg-white rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.5 2.5V9.5H2.5V2.5H9.5ZM9.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V9.5C1.5 10.05 1.95 10.5 2.5 10.5H9.5C10.05 10.5 10.5 10.05 10.5 9.5V2.5C10.5 1.95 10.05 1.5 9.5 1.5ZM7.07 5.93L5.57 7.865L4.5 6.57L3 8.5H9L7.07 5.93Z"
                    fill="#202124"
                  />
                </svg>
              </div>
              <span>Browse or Drop Image</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Uploaded"
              className=" rounded-xl w-full h-[180px]"
            />
          )}
        </label>

        {formErrors.image && (
          <span className="text-red-500 text-sm">{formErrors.image}</span>
        )}
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
          ButName="Continue 3/3"
          handleClick={handleClick}
          width="w-[70%]"
          bg="bg-black"
          text="text-white"
          borderR="rounded-xl"
        />
      </div>
    </div>
  );
};
