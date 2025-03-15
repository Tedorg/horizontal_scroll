import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Extract secret from URL params
    const url = new URL(req.url, `https://${req.headers.get("host")}`);
    const secret = url.searchParams.get("secret");


    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // ✅ Prevent Infinite Loop: Stop if request comes from itself
    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor && forwardedFor.includes("::1")) {
      console.warn("⚠️ Detected self-revalidation. Aborting to prevent infinite loop.");
      return NextResponse.json({ message: "Self-revalidation detected. Skipping." }, { status: 200 });
    }

    // ✅ Fix: Ensure request body is properly parsed
    const textBody = await req.text();

    let body;
    try {
      body = JSON.parse(textBody); // ✅ Parse JSON safely
    } catch (error) {
      console.error("🚨 Error parsing JSON:", error);
      return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }


    // ✅ Extract `contentType` correctly
    const contentType = body?.sys?.contentType?.sys?.id ?? "unknown";
    console.log("📌 Extracted Content Type:", contentType);

    if (contentType === "unknown") {
      console.warn("⚠️ Webhook did not send a valid contentType!");
    }

    // ✅ Ensure paths to revalidate
    const pathsToRevalidate = [];
    if (contentType === "journal") {
      pathsToRevalidate.push("/journal");
    } else if (contentType === "work") {
      pathsToRevalidate.push("/work");
    } else {
      pathsToRevalidate.push("/"); // Default to homepage
    }

    console.log("🔄 Revalidating paths:", pathsToRevalidate);

    const vercelURL = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    for (const path of pathsToRevalidate) {
      console.log(`🔁 Sending revalidate request for: ${path}`);

      // ✅ Fix: Ensure `fetch()` does not trigger itself
      await fetch(`${vercelURL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }), // ✅ Ensure valid JSON is sent
      });
    }

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
  } catch (error) {
    console.error("🚨 Revalidation error:", error);
    return NextResponse.json({ message: "Error revalidating", error }, { status: 500 });
  }
}