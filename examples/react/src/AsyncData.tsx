import { useLoaderData } from "react-router-dom";

export function AsyncData() {
  const data = useLoaderData() as string;
  console.log("Data from loader", data);
  return <span>{data}</span>;
}
