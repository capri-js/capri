import { useEffect, useState } from "react";

export const options = {
  loading: "visible",
};

export default function LazyLoad() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="box">
      <p>This island uses the visible loading strategy.</p>
      <p>Status: {hydrated ? "Hydrated ✅" : "Not hydrated ⏳"}</p>
    </div>
  );
}
