import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  categories: parseAsString,
  sort: parseAsString,
  limit: parseAsInteger.withDefault(10),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
