import { styled } from "classname-variants/preact";

export const Button = styled("button", {
  base: "inline-flex items-center rounded-sm font-semibold cursor-pointer",
  variants: {
    color: {
      primary: "bg-green-600 hover:bg-green-500 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    },
    size: {
      sm: "px-2 py-0.5 text-sm",
      md: "px-3 py-1",
      lg: "px-4 py-2 text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
