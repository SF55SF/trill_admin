import { getCollection, type CollectionEntry } from "astro:content";

export type OfficeEntry = CollectionEntry<"offices">;

const clean = (value: unknown) => String(value ?? "").trim();

export function isOfficePublic(data: OfficeEntry["data"]) {
  return (
    data.published !== false &&
    Number.isFinite(data.area) &&
    data.area > 0 &&
    clean(data.pageSlug).length >= 3 &&
    clean(data.title).length >= 8 &&
    clean(data.detailTitle).length >= 8 &&
    clean(data.seoTitle).length >= 20 &&
    clean(data.description).length >= 50 &&
    clean(data.intro).length >= 50 &&
    clean(data.mainImage).startsWith("/images/") &&
    clean(data.planImage).startsWith("/images/")
  );
}

export async function getPublishedOffices() {
  const offices = await getCollection("offices");

  return offices
    .filter(({ data }) => isOfficePublic(data))
    .sort((a, b) => { const af = Number.parseFloat(String(a.data.floor).replace(",", ".")); const bf = Number.parseFloat(String(b.data.floor).replace(",", ".")); const floorDiff = (Number.isFinite(af) ? af : Number.MAX_SAFE_INTEGER) - (Number.isFinite(bf) ? bf : Number.MAX_SAFE_INTEGER); return floorDiff || a.data.area - b.data.area; });
}

export function getOfficeUrl(office: OfficeEntry) {
  return `/${office.data.pageSlug}/`;
}
