import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.apply);

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
