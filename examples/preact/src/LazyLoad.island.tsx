import { useEffect, useState } from "preact/hooks";

type Props = {
  strategy: "idle" | "visible";
};

export const options = {
  loading: "visible" as const,
};

export default function LazyLoad({ strategy }: Props) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div class="box">
      <p>
        This island uses the <code>{strategy}</code> loading strategy.
      </p>
      <p>Status: {hydrated ? "Hydrated ✅" : "Not hydrated ⏳"}</p>
    </div>
  );
}
