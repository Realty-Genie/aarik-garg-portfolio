import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL || '';


// GET WISHES
export async function GET() {

  try {
    if (!GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "GOOGLE_SCRIPT_URL is not configured"
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getWishes`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      if (text.includes("You need access") || text.includes("sign in") || text.includes("Authorization")) {
        return NextResponse.json(
          {
            success: false,
            message: "Google Apps Script requires permission adjustments. Please make sure the deployment 'Who has access' is set to 'Anyone'."
          },
          { status: 403 }
        );
      }
      console.error("Google Apps Script returned non-JSON response:", text.slice(0, 500));
      throw new Error(`Response is not JSON. Script Output: ${text.slice(0, 150)}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("GET /api/greets failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch wishes due to a server error"
      },
      { status: 500 }
    );
  }
}


// ADD WISH
export async function POST(req: Request) {

  try {
    if (!GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "GOOGLE_SCRIPT_URL is not configured"
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Validation
    if (!body.name || !body.wish) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields"
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "addWish",
          name: body.name,
          wish: body.wish,
          cardColor: body.cardColor || "",
          textColor: body.textColor || ""
        })
      }
    );

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      if (text.includes("You need access") || text.includes("sign in") || text.includes("Authorization")) {
        return NextResponse.json(
          {
            success: false,
            message: "Google Apps Script requires permission adjustments. Please make sure the deployment 'Who has access' is set to 'Anyone'."
          },
          { status: 403 }
        );
      }
      console.error("Google Apps Script returned non-JSON response:", text.slice(0, 500));
      throw new Error(`Response is not JSON. Script Output: ${text.slice(0, 150)}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("POST /api/greets failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add wish due to a server error"
      },
      { status: 500 }
    );
  }
}