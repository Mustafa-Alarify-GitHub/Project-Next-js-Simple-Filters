"use client";
import { useEffect, useState } from "react";
import Card from "./_ِcomponents/Card";
import Pagention from "./_ِcomponents/Pagention";
export default function Home() {
  const [refrach, setRefrach] = useState(true);
  const [modeSort, setModeSort] = useState(1);
  const [dataJobs, setDataJobs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagention, setPagention] = useState(1);
  const [countData, setCountData] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      const respones = await fetch(
        `http://localhost:3000/Api/Companies?pageNumber=${pageNumber}&countData=${countData}`
      );
      const bodyjson = await respones.json();
      setDataJobs(bodyjson.data);
      setPagention(Math.ceil(bodyjson.countAllData));
    };

    fetchData();
  }, [refrach, pageNumber, countData]);

  return (
    <div className="w-screen h-screen flex justify-center gap-5">
      {/* search */}
      <div className="w-1/5 h-full bg-backgroundWhite"></div>

      {/* div Main */}
      <div className="w-3/4 flex flex-col">
        {/* Nav */}
        <div className="w-full h-[68px] border-b-2 border-gray-300 flex justify-start flex-row-reverse p-3 px-9 ">
          {/* icon Grid */}
          <svg
            onClick={() => setModeSort(1)}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
            className=" mx-3 cursor-pointer border-2 border-backgroundWhite hover:fill-white hover:bg-blueActiv transition"
          >
            <rect
              width="16"
              height="16"
              rx="2"
              fill={modeSort == 1 ? "#4285f4" : "#fff"}
            />
            <rect
              x="4"
              y="4"
              width="3"
              height="3"
              rx="1"
              fill={modeSort != 1 ? "#4285f4" : "#fff"}
            />
            <rect
              x="9"
              y="4"
              width="3"
              height="3"
              rx="1"
              fill={modeSort != 1 ? "#4285f4" : "#fff"}
            />
            <rect
              x="4"
              y="9"
              width="3"
              height="3"
              rx="1"
              fill={modeSort != 1 ? "#4285f4" : "#fff"}
            />
            <rect
              x="9"
              y="9"
              width="3"
              height="3"
              rx="1"
              fill={modeSort != 1 ? "#4285f4" : "#fff"}
            />
          </svg>
          {/* Icon List */}
          <svg
            onClick={() => setModeSort(2)}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill={modeSort == 2 ? "#fff" : "#b4c0e0"}
            className={
              modeSort == 2
                ? " border-2 rounded-md bg-blueActiv cursor-pointer hover:fill-white hover:bg-blueActiv transition"
                : " border-2 rounded-md cursor-pointer hover:fill-white hover:bg-blueActiv transition"
            }
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
          {/* Drop Box Show 3 6 9 12 */}
          <select
            onChange={(e) => {
              setCountData(parseInt(e.target.value));
              setPageNumber(pageNumber > pagention ? pagention : pageNumber);
              setRefrach(!refrach);
            }}
            className="w-auto h-10 px-4 border-2 rounded-lg mx-4"
          >
            <option value="12"> show : 12</option>
            <option value="9"> show : 9</option>
            <option value="6"> show : 6</option>
            <option value="3"> show : 3</option>
          </select>
        </div>

        {/* Content Cards */}
        <div
          className={
            modeSort == 1
              ? "grid grid-cols-3 overflow-x-hidden overflow-y-scroll"
              : "grid grid-cols-1 overflow-x-hidden overflow-y-scroll"
          }
        >
          {dataJobs.length > 0 ? (
            dataJobs.map((e, index) => {
              return (
                <Card
                  key={index}
                  image={""}
                  title={e.name}
                  rate={e.rate}
                  countRate={e.countRate}
                  location={e.location}
                  countJobs={e.countJob}
                  type={modeSort}
                />
              );
            })
          ) : (
            <h1> No Data Now !</h1>
          )}
          <Pagention number={pagention} setValue={setPageNumber} />
        </div>
      </div>
    </div>
  );
}
