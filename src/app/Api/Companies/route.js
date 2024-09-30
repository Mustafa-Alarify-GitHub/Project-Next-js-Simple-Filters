import { NextRequest, NextResponse } from "next/server";
import { StaticData } from "../StaticData";

/**
 * @method Get
 * @route ~/Api/Companies
 * @desc  Get All Companies
 * @access public
 */

export async function GET(req) {
  // query
  const propPageNumber = req.nextUrl.searchParams.get("pageNumber") || 1;
  const propCountData = req.nextUrl.searchParams.get("countData") || 12;
  const propIndustry = req.nextUrl.searchParams.get("industry") || "All";
  const propLocation = req.nextUrl.searchParams.get("location") || "All";

  console.log(propLocation);

  // Data
  let allData = StaticData;
  if (propIndustry !== "All") {
    allData = allData.filter((item) => item.industry === propIndustry);
  }
  if (propLocation !== "All") {
    allData = allData.filter((item) => item.location === propLocation);
  }
  // count ==> pagetions
  const countAllData = allData.length / propCountData;

  const data = allData.slice(
    (propPageNumber - 1) * propCountData,
    Number((propPageNumber - 1) * propCountData) + Number(propCountData)
  );

  // get data Filters
  const industry = GetTypeAndCounter("industry");
  const location = GetTypeAndCounter("location");

  // response
  return NextResponse.json({
    status: "200",
    countAllData,
    data,
    industry,
    location,
  });
}

function GetTypeAndCounter(key) {
  // Filters
  const dataFilters = [];
  const result = [];
  let counter = 0;
  // Get Types
  for (let index = 0; index < StaticData.length; index++) {
    const isDefend = dataFilters.find(
      (item) => item === StaticData[index][String(key)]
    );
    if (!isDefend) {
      dataFilters.push(StaticData[index][String(key)]);
    }
  }
  // Get Counts Types
  for (let i = 0; i < dataFilters.length; i++) {
    for (let x = 0; x < StaticData.length; x++) {
      if (dataFilters[i] === StaticData[x][String(key)]) counter++;
    }
    result.push({
      title: dataFilters[i],
      count: counter,
    });
    counter = 0;
  }
  let countAll = 0;
  result.forEach((element) => {
    countAll += element.count;
  });
  result.unshift({
    title: "All",
    count: countAll,
  });
  return result;
}
