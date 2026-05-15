import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = "HireforFire/homeless-aid-vercel";

export async function POST(request: NextRequest) {
  // Rate limit: accept POST only
  if (request.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  if (!GITHUB_TOKEN) {
    return new NextResponse("Server not configured for submissions", { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const name = String(body.name || "").trim();
  const category = String(body.category || "").trim();
  const city = String(body.city || "").trim();
  const state = String(body.state || "").trim();

  if (!name || !category || !city || !state) {
    return new NextResponse("Missing required fields: name, category, city, state", { status: 400 });
  }

  const issueBody = [
    `## Submitted Resource`,
    ``,
    `**Name:** ${name}`,
    `**Category:** ${category}`,
    `**Address:** ${body.address || "—"}`,
    `**City:** ${city}`,
    `**State:** ${state}`,
    `**ZIP:** ${body.zip || "—"}`,
    `**Phone:** ${body.phone || "—"}`,
    `**Hours:** ${body.hours || "—"}`,
    `**Description:** ${body.description || "—"}`,
    `**Source:** ${body.source || "—"}`,
    `**Website:** ${body.website || "—"}`,
    ``,
    `---`,
    `*Submitted via the resource submission form.*`,
  ].join("\n");

  const issue = {
    title: `Resource submission: ${name}`,
    body: issueBody,
    labels: ["submission"],
  };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "HomelessAidFinder/1.0",
        },
        body: JSON.stringify(issue),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("GitHub API error:", res.status, err);
      return new NextResponse("Failed to create submission", { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
