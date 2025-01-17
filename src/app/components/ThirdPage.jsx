// import { useEffect, useState } from "react";
// import { Button } from "./Button";
// import { Input } from "./Input";
// import { JoinUs } from "./JoinUs";

// export const ThirdPage = ({ click, setCurrentStep }) => {
//   const [formValues, setFormValues] = useState({ date: "" });
//   const [formErrors, setFormErrors] = useState({ date: "" });
//   const [imageUrl, setImageUrl] = useState([]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormErrors((prev) => ({ ...prev, [name]: "" }));
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     const savedValue = JSON.parse(localStorage.getItem("thirdPage"));
//     setFormValues((prev) => ({ ...prev, ...savedValue }));
//   });

//   const handleClick = () => {
//     let errorHave = false;
//     const { date } = formValues;
//     if (!date.trim()) {
//       setFormErrors((prev) => ({
//         ...prev,
//         date: "Please enter your date !",
//       }));
//       errorHave = true;
//     } else {
//       const dates = date.split("-");

//       const birth = Number(dates[0]);
//       const birthMonth = Number(dates[1]);
//       const day = Number(dates[2]);

//       const age = new Date().getFullYear() - birth;
//       const month = new Date().getMonth() + 1 - birthMonth;
//       const date = new Date().getDate() - day;

//       if (
//         age < 18 ||
//         (age === 18 && (month < 0 || (month === 0 && date < 0)))
//       ) {
//         setFormErrors((prev) => ({
//           ...prev,
//           date: "Must be over 18 years old.",
//         }));
//         errorHave = true;
//       }
//     }
//     if (!imageUrl) {
//       setImageUrl((prev) => ({
//         ...prev,
//         imageUrl: "Image cannot be blank",
//       }));
//       errorHave = true;
//     }
//     if (!errorHave) {
//       localStorage.setItem("thirdPage", JSON.stringify(formValues));
//       setCurrentStep(click + 1);
//     }
//     if (!errorHave) {
//       setCurrentStep(click + 1);
//     }
//   };
//   const backClick = () => {
//     setCurrentStep(click - 1);
//   };

//   const onFileUpload = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setImageUrl(imageUrl);
//   };
//   return (
//     <div className="w-[480px] p-[32px] bg-[#fff] rounded-2xl font-sans flex flex-col justify-between ">
//       <div className="flex flex-col gap-6">
//         <JoinUs />
//         <Input
//           type="date"
//           value={formValues.date}
//           label="Date of birth"
//           handleChange={handleChange}
//           name="date"
//           error={formErrors.date}
//         />
//       </div>
//       <div className="p-3 h-[350px] flex flex-col  ">
//         <label htmlFor="file-input" className="text-[14px] font-semibold ml-2">
//           <input
//             type="file"
//             id="file-input"
//             onClick={onFileUpload}
//             // value={imageUrl.imageUrl}
//           />
//           {!imageUrl && <span>Add image</span>}
//         </label>
//       </div>
//       <div className="flex gap-3">
//         <Button
//           ButName="Back"
//           handleClick={backClick}
//           width="w-[30%]"
//           bg="bg-[#ffffff]"
//           text="text-black"
//           border="border-black"
//           borderS="border-[0.5px]"
//         />
//         <Button
//           ButName="Continue 3/3"
//           handleClick={handleClick}
//           width="w-[70%]"
//           bg="bg-black"
//           text="text-white"
//         />
//       </div>
//     </div>
//   );
// };
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

  return (
    <div className="w-[480px] p-[32px] bg-[#fff] rounded-2xl font-sans flex flex-col justify-between">
      <div className="flex flex-col gap-6">
        <JoinUs />
        <Input
          type="date"
          value={formValues.date}
          label="Date of birth"
          handleChange={handleChange}
          name="date"
          error={formErrors.date}
        />
      </div>

      <div className="p-3 h-[350px] flex flex-col">
        <label htmlFor="file-input" className="text-[14px] font-semibold ml-2">
          <input type="file" id="file-input" onChange={onFileUpload} />
          {!imageUrl ? (
            <span>Add image</span>
          ) : (
            <img src={imageUrl} alt="Uploaded" className="mt-2" />
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
