"use client";

import {
  useState,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";

import { GRAPHIC_URL, NOOP, BANK_UPI_HANDLES } from "@/data/upi";

const Form: React.FC = () => {
  const [upiId, setUpiId] = useState("");
  const [prediction, setPrediction] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);

  const changeUpiId = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value = "" },
    } = e;

    setUpiId(value);

    if (!value.includes("@")) {
      setPredictions([]);
      return setPrediction(value);
    }

    // GET Virtual private address(VPA) and Bankname -> VPA@bankName
    const [currentVPA, currentBankName] = value.split("@");
    if (!currentVPA) return;

    const bankNameRegex = new RegExp(`${currentBankName}`);

    const bankNames = BANK_UPI_HANDLES.filter((bankName) =>
      bankNameRegex.test(bankName),
    );
    setPredictions(bankNames);

    const bankName = bankNames.length ? bankNames[0] : "";
    setPrediction(`${currentVPA}@${bankName}`);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    // Depricated Code
    // const { which = -1, keyCode = -1, code = "" } = e;
    // if (which === 39 && keyCode === 39 && code === "ArrowRight")
    //   setUpiId(prediction);

    const { code = "" } = e;
    if (code === "ArrowRight") {
      setUpiId(prediction);
      setPredictions([]);
    }
  };

  const selectBankNameFromSuggestionBox = (e: MouseEvent) => {
    const {
      currentTarget: { textContent = "" },
    } = e;

    const currentVPA = upiId.split("@")[0];
    setPrediction(`${currentVPA}@${textContent}`);

    setPredictions([]);
  };

  const submitUpi = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitUpi} className="relative flex flex-col">
      <div className="relative">
        <input
          data-role="autocomplete-suggestion"
          className="absolute left-0 top-0 -z-10 w-full px-2.5 py-5 opacity-50 outline-none"
          type="text"
          value={prediction}
          onChange={NOOP}
        />

        <input
          data-role="input-box"
          className="z-10 w-full border-b border-b-[#a7a7a762] bg-transparent px-2.5 py-5 outline-none hover:border-b-[#2980b9] focus:border-b-[#2980b9]"
          type="text"
          pattern=".+@.+"
          placeholder="Enter your UPI id"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          onChange={changeUpiId}
          value={upiId}
          onKeyDown={onKeyDown}
        />
      </div>

      <button
        className="mt-5 w-full rounded-[10px] bg-[#2ecc71] p-[15px] font-bold text-white hover:bg-[#27ae60]"
        type="submit"
      >
        Pay Now
      </button>

      {predictions.length > 0 && (
        <ul className="hidden-scrollbar absolute left-5 top-20 h-auto max-h-[200px] w-[calc(100%-40px)] overflow-y-auto overflow-x-hidden border border-[var(#ebebeb)] bg-white">
          {predictions.map((prediction) => (
            <li
              tabIndex={0}
              onClick={selectBankNameFromSuggestionBox}
              role="button"
              key={prediction}
              className="border-b border-[#ebebeb] py-2.5 text-center hover:bg-[#ebebeb]"
            >
              {prediction}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

const AutoComplete = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex h-[500px] w-[380px] flex-col items-center justify-center rounded-[10px] border-2 border-[#2ecc71] p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={GRAPHIC_URL} alt="Graphic Logo" className="max-w-[70%]" />
        <Form />
      </div>
    </div>
  );
};

export default AutoComplete;
