import { ComponentProps } from "preact";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      class="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-2 py-0.5 rounded-sm font-semibold cursor-pointer"
    />
  );
}
