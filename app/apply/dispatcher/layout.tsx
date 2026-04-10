import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.dispatcher);

export default function DispatcherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
