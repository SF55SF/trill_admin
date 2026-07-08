import { getCollection, type CollectionEntry } from 'astro:content';

export type OfficeEntry = CollectionEntry<'offices'>;

export async function getPublishedOffices() {
  const offices = await getCollection('offices', ({ data }) => data.published !== false);

  return offices.sort((a, b) => a.data.order - b.data.order);
}

export function getOfficeUrl(office: OfficeEntry) {
  return `/${office.data.pageSlug}/`;
}
