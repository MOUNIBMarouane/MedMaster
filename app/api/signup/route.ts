import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prenom, email, telephone, ville, universite, annee, besoin } = body;

    // Validate required fields
    if (!prenom || !email || !telephone || !ville || !universite || !annee || !besoin) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Cette adresse email est déjà inscrite." },
        { status: 409 }
      );
    }

    // Insert into Supabase
    const { error } = await supabase.from("waitlist").insert({
      prenom: prenom.trim(),
      email: email.toLowerCase().trim(),
      telephone: telephone.replace(/\s/g, '').trim(),
      ville,
      universite,
      annee,
      besoin,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'inscription. Réessaie dans un instant." },
        { status: 500 }
      );
    }

    // Get updated count
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    return NextResponse.json(
      { success: true, count: count ?? 0 },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup API error:", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
