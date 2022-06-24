import { useFetch } from "./useFetch.jsx";

export function AsyncData() {
  const data = useFetch("/data");
  return <span> {data}</span>;
}
