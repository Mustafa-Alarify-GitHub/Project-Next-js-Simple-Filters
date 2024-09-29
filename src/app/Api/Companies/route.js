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
  const pageNumber = req.nextUrl.searchParams.get("pageNumber") || 1;
  const countData = req.nextUrl.searchParams.get("countData") || 12;

  // Data
  const data = StaticData.slice(
    (pageNumber - 1) * countData,
    Number((pageNumber - 1) * countData) + Number(countData)
  );
  
  // count ==> pagetions
  const countAllData = StaticData.length / countData;
  // respones
  return NextResponse.json({
    status: "200",
    countAllData,
    data,
  });
}
