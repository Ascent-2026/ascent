import { TVFrame } from "@/components/tv/TVFrame";

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TVFrame>{children}</TVFrame>;
}
