"use client";

import { useState, FormEvent, ChangeEvent } from "react";

import { GRAPHIC_URL } from "@/data/upi";

const Form: React.FC = () => {
  const [upiId, setUpiId] = useState("");

  const changeUpiId = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value = "" },
    } = e;

    setUpiId(value);
  };

  const submitUpi = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitUpi} className="relative flex flex-col">
      <input data-role="autocomplete-suggestion" type="text" />

      <input
        data-role="input-box"
        className="w-full border border-transparent bg-transparent px-2.5 py-5 text-black outline-none hover:border-b-[#2980b9] focus:border-b-[#2980b9]"
        type="text"
        pattern=".+@.+"
        placeholder="Enter your UPI id"
        autoCapitalize="off"
        autoComplete="off"
        spellCheck="false"
        onChange={changeUpiId}
        value={upiId}
      />

      <button
        className="mt-5 w-full rounded-[10px] bg-[#2ecc71] p-[15px] font-bold text-white hover:bg-[#27ae60]"
        type="submit"
      >
        Pay Now
      </button>
    </form>
  );
};

const AutoComplete = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="relative flex h-[500px] w-[380px] flex-col items-center justify-center rounded-[10px] border-2 border-[#2ecc71] p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={GRAPHIC_URL} alt="Graphic Logo" className="max-w-[70%]" />
        <Form />
      </div>
    </div>
  );
};

export default AutoComplete;
