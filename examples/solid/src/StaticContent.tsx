type Props = {
  children?: any;
};

export default function StaticContent({ children }: Props) {
  console.log("Rendering StaticContent. This should only happen during build.");
  return <div class="box">{children}</div>;
}
