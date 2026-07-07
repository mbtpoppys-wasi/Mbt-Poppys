// Hand-picked positive Google reviews, quoted verbatim (including original
// wording) with the reviewer's name and Google-shown credential, at the
// owner's explicit request. Update this list directly when new reviews
// come in — there is no admin UI for this, it's a short curated set.
export interface CustomerReview {
  name: string;
  credential: string;
  text: string;
}

export const REVIEWS: CustomerReview[] = [
  {
    name: "Piet Speelman",
    credential: "1 review",
    text: "Very good service I m happy to fill up here anytime",
  },
  {
    name: "joey de beer",
    credential: "1 review · 2 photos",
    text: "Friendly, quick and always helpful. Best service ever.",
  },
  {
    name: "Naeem Mohammed",
    credential: "1 review",
    text: "Very Swift and friendly Service... I will always support these guys at MBT Ventersdorp!",
  },
  {
    name: "Shuaib Mangera",
    credential: "Local Guide · 54 reviews · 7 photos",
    text: "Petrol attendants are super friendly and helpful",
  },
  {
    name: "Magda De Beer",
    credential: "Local Guide · 30 reviews · 5 photos",
    text: "I really enjoyed being served in my language. Prices are market related.",
  },
  {
    name: "Mandie Roux",
    credential: "Local Guide · 17 reviews · 19 photos",
    text: "Never refill any place else. Awesome service always",
  },
  {
    name: "Banti Mbonise",
    credential: "Local Guide · 123 reviews · 3 photos",
    text: "I can't pass MBT garage🤩",
  },
  {
    name: "Dirk Koekemoer",
    credential: "Local Guide · 162 reviews · 209 photos",
    text: "Good service",
  },
];
