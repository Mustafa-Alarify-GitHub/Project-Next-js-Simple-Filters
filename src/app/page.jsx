"use client";
import { useEffect, useState } from "react";
import Card from "./_ِcomponents/Card";
import Pagention from "./_ِcomponents/Pagention";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import ListCheckBox from "./_ِcomponents/ListCheckBox";

export default function Home() {
  const [refrach, setRefrach] = useState(true);
  const [isOpenFelter, setIsOpenFelter] = useState(false);
  const [modeSort, setModeSort] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagention, setPagention] = useState(1);
  const [countData, setCountData] = useState(12);

  // Variable List Check Box
  const [Bonus, setBonus] = useState("");
  const [industry, setIndustry] = useState("All");
  const [Location, setLocation] = useState("All");

  //Variable Data Api
  const [dataJobs, setDataJobs] = useState([]);
  const [dataIndustry, setDataIndustry] = useState([]);
  const [dataLocation, setDataLocation] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = async (text_Search) => {
    const respones = await fetch(
      `http://localhost:3000/Api/Companies?textSearch=${text_Search}&pageNumber=${pageNumber}&countData=${countData}&industry=${industry}&location=${Location}`
    );
    const bodyjson = await respones.json();
    setDataJobs(bodyjson.data);
    setPagention(Math.ceil(bodyjson.countAllData));
    setDataIndustry(bodyjson.industry);
    setDataLocation(bodyjson.location);
  };

  useEffect(() => {
   

    fetchData("All");
  }, [refrach, pageNumber, countData, industry, Location]);

  // Event Search
  const onSubmit = (data) => {
    fetchData(data.searchText);
    setIsOpenFelter(false)
  };

  return (
    <div className="w-screen h-screen flex justify-center gap-5 ">
      {/* Falter */}
      <div className={!isOpenFelter?
      "absolute left-[-100%] z-10 transition-all bg-white lg:static pos div-filter w-1/5 h-full mt-16 pt-5 overflow-y-scroll"
        :"absolute left-[0] z-10 transition-all bg-white lg:static pos div-filter lg:w-4/5 h-full mt-16 pt-5 overflow-y-scroll"
        }>
        {/* search */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center gap-1"
        >
          <button
            className="border-2 p-3 rounded-xl border-backgroundWhite"
            type="submit"
          >
            <FaSearch />
          </button>

          <input
            {...register("searchText")}
            placeholder="Search"
            className="border-2 p-3 rounded-xl border-backgroundWhite"
          />
        </form>

        <ListCheckBox
          subtitle={"Bonus"}
          data={[
            {
              title: "All",
              count: 40,
            },
            {
              title: "With Bonus",
              count: 20,
            },
            {
              title: "Without Bonus",
              count: 20,
            },
          ]}
          setValue={setBonus}
          value={Bonus}
        />
        <ListCheckBox
          subtitle={"Industry"}
          data={dataIndustry}
          setValue={setIndustry}
          value={industry}
        />
        <ListCheckBox
          subtitle={"Location"}
          data={dataLocation}
          setValue={setLocation}
          value={Location}
        />
      </div>

      {/* div Main */}
      
      <div className="lg:w-3/4 w-full  flex flex-col">
        {/* Nav */}
        <div className=" w-full h-[68px] border-b-2 border-gray-300 flex justify-between lg:justify-start flex-row-reverse p-3 px-9 ">
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
          <button className="block lg:hidden text-4xl font-bold" onClick={()=>setIsOpenFelter(!isOpenFelter)}>=</button>
        </div>

        {/* Content Cards */}
        <div
          className={
            modeSort == 1
              ? "grid md:grid-cols-2 lg:grid-cols-3  grid-cols-1 overflow-x-hidden overflow-y-scroll"
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
