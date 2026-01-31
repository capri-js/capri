import { useFetch } from "./use-fetch.js";

type Data = {
  descriptions: Array<{
    language: string;
    description: string;
  }>;
};

type Props = {
  name: string;
};
export function Digimon({ name }: Props) {
  const { descriptions } = useFetch<Data>(
    `https://digi-api.com/api/v1/digimon/${name}`,
  );

  const en = descriptions.find((description) =>
    description.language.startsWith("en"),
  );

  return <div>{en?.description}</div>;
}
