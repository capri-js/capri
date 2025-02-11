import { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-2 py-0.5 rounded-sm font-semibold cursor-pointer"
    />
  );
}
