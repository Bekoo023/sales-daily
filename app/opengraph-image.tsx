import { dsCard, dsCardSize, dsCardContentType } from "./_og/card";

export const runtime = "nodejs";
export const size = dsCardSize;
export const contentType = dsCardContentType;
export const alt = "De Salesvloer — dagelijkse sales-intelligence";

export default async function Image() {
  return dsCard({
    title: "Verkopen is geen talent. Het is een systeem.",
    kicker: "Dagelijkse sales-intelligence",
  });
}
