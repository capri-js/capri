import { useEffect, useState } from "react";

export const options = {
  media: "(max-width: 1000px)",
  loading: "visible",
};

export default function VisibleMedia() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="box">
      <p>This island combines visible loading with a media query.</p>
      <p>It only hydrates on screens smaller than 1000px.</p>
      <p>Status: {hydrated ? "Hydrated ✅" : "Not hydrated ⏳"}</p>
    </div>
  );
}
