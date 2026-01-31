import { Router } from "../router.jsx";

export default function Page() {
  const url = new URL(window.location.href);
  const slug = url.searchParams.get("slug") ?? "/";
  return <Router path={slug} />;
}
