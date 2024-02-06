import React from "react";
import SignupForm from "@/components/SignupForm";

const Signup: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center border-l p-5">
      <div className="flex max-w-[430px] flex-1 flex-col items-center gap-y-8">
        <h3 className="font-bold">Create an account for free</h3>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
