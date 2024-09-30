import { useState, useEffect } from "react";

const ListCheckBox = ({ subtitle, data, setValue, value }) => {
  useEffect(() => {
    const CheckAllData = async () => {
      const defaultItem = await data.find((item) => 
        String(item.title).toLowerCase() === "all"
      );
      console.log(`${subtitle} === ${data}`);
      if (defaultItem) {
        setValue(defaultItem.title);
      }
    };
    CheckAllData()
  }, []);

  const handleCheckboxChange = (value) => {
    setValue(value);
    console.log(value);
  };

  return (
    <div className="font-bold text-lg mx-2 my-5">
      <h1 className="font-bold text-lg">{subtitle}</h1>
      {data.map((item, index) => (
        <div key={index} className="flex justify-between mt-4">
          <div className="flex items-center w-[80%]">
            <input
              type="radio"
              id={`${String(item.title)}${String(subtitle)}`}
              name={String(subtitle)}
              className="w-5 h-5 rounded-lg mr-2"
              checked={value === item.title}
              onChange={() => handleCheckboxChange(String(item.title))}
            />
            <label
              htmlFor={`${String(item.title)}${String(subtitle)}`}
              className="text-sm font-medium w-full text-[#7080a2]"
            >
              {item.title}
            </label>
          </div>
          <div className="text-sm font-medium bg-[#e0e6f6] w-6 h-6 text-center text-[#3c65f5]">
            {item.count}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCheckBox;
