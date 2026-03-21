import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 30; // ISR: revalidate every 30 seconds

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Count query error:", error);
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    return NextResponse.json(
      { count: count ?? 0 },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("Count API error:", err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
