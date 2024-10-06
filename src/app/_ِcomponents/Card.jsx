import React from "react";
import Image from "next/image";
import img from "../assets/img/Capture.png";
import startY from "../assets/img/start.png";
import locationImg from "../assets/img/location.png";

const Card = ({ image, title, rate, countRate, location, countJobs, type }) => {
  return (
    <div
      className={
        type == 1
          ? "bg-backgroundWhite m-auto h-80 w-80 my-3 rounded-xl flex justify-center flex-col items-center scale-100 lg:scale-90 xl:scale-100"
          : "bg-backgroundWhite m-auto h-36 w-[95%] my-3 shadow-xl rounded-xl flex justify-around flex-row items-center"
      }
    >
      <Image
        src={img}
        alt="ERROR"
        width={type == 1 ? 80 : 100}
        height={type == 1 ? 80 : 100}
      />
      <div className="flex justify-center items-center flex-col lg:hidden ">
      <h1
        className={
          type == 1
            ? "font-bold text-[#66789c] text-xl mt-4 capitalize"
            : "font-bold text-[#66789c] text-2xl lg:text-5xl  capitalize"
        }
      >
        {title}
      </h1>
      <div className="flex my-1">
        {Array.from({ length: rate }, (_, index) => (
          <Image key={index} src={startY} alt="ERROR" width={20} height={5} />
        ))}
        <h1 className="text-sm mx-2 text-[#848e9b]">({countRate})</h1>
      </div>
      <div className="flex my-1">
        <Image src={locationImg} alt="ERROR" width={30} height={30} />
        <h1 className="text-[#66789c]">{location}</h1>
      </div>
      </div>
      <h1
        className={
          type == 1
            ? "font-bold text-[#66789c] text-xl mt-4 capitalize"
            : "font-bold text-[#66789c] hidden lg:block lg:text-5xl capitalize"
        }
      >
        {title}
      </h1>
      <div className=" my-1 hidden lg:flex">
        {Array.from({ length: rate }, (_, index) => (
          <Image key={index} src={startY} alt="ERROR" width={20} height={5} />
        ))}
        <h1 className="text-sm mx-2 text-[#848e9b]">({countRate})</h1>
      </div>
      <div className=" my-1 hidden lg:flex">
        <Image src={locationImg} alt="ERROR" width={30} height={30} />
        <h1 className="text-[#66789c]">{location}</h1>
      </div>
      <button className="py-3 px-1 lg:py-4 lg:px-8 bg-[#d1d5dd] font-bold text-[#424f69] my-3">
        {countJobs} Jobs Open
      </button>
    </div>
  );
};

export default Card;
