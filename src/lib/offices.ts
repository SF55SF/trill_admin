import { getCollection, type CollectionEntry } from "astro:content";

export type OfficeEntry = CollectionEntry<"offices">;

// TRILLIANT_MANUAL_VISIBILITY_ONLY_V2

export function isOfficePublic(data: OfficeEntry["data"]) {
  return data.published !== false;
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
