import { useEffect, useState } from "preact/hooks";

type Props = {
  strategy: "idle" | "visible";
};

// Example options combining media query with loading strategies
export const options = {
  media: "(max-width: 1000px)",
  loading: "visible" as const,
};

export default function CombinedStrategies({ strategy }: Props) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div class="box">
      <p>
        This island combines <code>{strategy}</code> loading with a media query.
      </p>
      <p>It only hydrates on screens smaller than 1000px.</p>
      <p>Status: {hydrated ? "Hydrated ✅" : "Not hydrated ⏳"}</p>
    </div>
  );
}
