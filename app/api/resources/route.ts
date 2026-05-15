import { NextRequest, NextResponse } from "next/server";
import { getResources } from "@/lib/data";
import { getRegion } from "@/lib/regions";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || undefined;
  const data = region ? getResources(region) : [];
  const meta = region ? getRegion(region) : null;
  return NextResponse.json({ resources: data, region: meta });
}
