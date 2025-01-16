import { Input } from "./Input";

export const FormContainer = ({ label, placeholder }) => {
  return (
    <div className="mt-[22px] flex flex-col gap-2">
      <Input label="First name *" placeholder="Your first name" />
      <Input label="Last name *" placeholder="Your last name" />
      <Input label="Username *" placeholder="Your username" />
    </div>
  );
};
