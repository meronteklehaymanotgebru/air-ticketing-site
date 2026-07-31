import { NextResponse } from "next/server";

export interface GoogleReview {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  publishTime: string;
  relativeTime: string;
  comment: string;
}

export interface ReviewsApiResponse {
  overallRating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

export async function GET() {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID?.trim();
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY?.trim();

  // 1. Check for missing environment variables
  if (!PLACE_ID || !API_KEY) {
    return NextResponse.json(
      {
        error: "Configuration Missing",
        details: "Ensure GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY are set in .env.local",
      },
      { status: 400 }
    );
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

    // 2. Fetch using strict Google Places API (New) FieldMasks
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        // CRITICAL FIX: Explicitly request sub-fields required for reviews
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews.authorAttribution,reviews.rating,reviews.publishTime,reviews.relativePublishTimeDescription,reviews.originalText,reviews.text",
      },
      // Revalidate cache every 24 hours to prevent quota consumption
      next: { revalidate: 86400 },
    });

    const data = await response.json();

    // 3. Handle non-200 responses from Google API directly
    if (!response.ok) {
      console.error("Google Places API Error Response:", data);
      return NextResponse.json(
        {
          error: `Google API Error (${response.status})`,
          details: data.error?.message || JSON.stringify(data),
          code: data.error?.code,
        },
        { status: response.status }
      );
    }

    // 4. Format successful review response
    const formattedReviews: GoogleReview[] = (data.reviews || []).map((rev: any) => ({
      authorName: rev.authorAttribution?.displayName || "Anonymous",
      authorPhoto: rev.authorAttribution?.photoUri || "",
      rating: rev.rating || 5,
      publishTime: rev.publishTime || new Date().toISOString(),
      relativeTime: rev.relativePublishTimeDescription || "",
      comment: rev.originalText?.text || rev.text?.text || "No review text provided.",
    }));

    const result: ReviewsApiResponse = {
      overallRating: data.rating || 0,
      totalReviews: data.userRatingCount || formattedReviews.length,
      reviews: formattedReviews,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Server execution error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message },
      { status: 500 }
    );
  }
}