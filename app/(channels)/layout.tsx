import { TVFrame } from "@/components/tv/TVFrame";

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 flex flex-col">{children}</div>;
  // return <TVFrame>{children}</TVFrame>;
}
