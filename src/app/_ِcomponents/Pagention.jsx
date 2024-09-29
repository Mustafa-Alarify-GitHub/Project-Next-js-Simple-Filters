import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagention = ({ number, setValue }) => {
  return (
    <div className="w-full flex flex-row justify-center gap-3 m-2 col-span-full items-center">
      <button className="w-12 h-12 text-2xl rounded-full flex justify-center items-center bg-backgroundWhite">
        <IoIosArrowBack />
      </button>
      {Array.from({ length: number }, (_, index) => (
        <button
          onClick={() => {
            setValue(index + 1);
          }}
          key={index}
          className="w-8 h-8 text-gray-500 cursor-pointer hover:bg-backgroundWhite transition text-xl rounded-full flex justify-center items-center font-bold "
        >
          {index + 1}
        </button>
      ))}

      <button className="w-12 h-12 text-2xl rounded-full flex justify-center items-center bg-[#1676ff]">
        <IoIosArrowForward color="#fff" />
      </button>
    </div>
  );
};

export default Pagention;
