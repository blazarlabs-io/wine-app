import { NextRequest } from "next/server";
import { WinePage } from "@/components";
import { getWineByRef, getWineryGeneralInfoByWineRef } from "@/utils/firestore";
import { EuLabelInterface } from "@/typings/winery";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref") as string;
  const label = await getWineByRef(ref);
  const info = await getWineryGeneralInfoByWineRef(ref);
  return Response.json({
    generalInfo: info,
    euLabel: label,
  });
}
