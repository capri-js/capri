type Props = {
  children?: any;
};

export default function StaticContent({ children }: Props) {
  return <div class="box">{children}</div>;
}
