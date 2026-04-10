import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.logisticsSalesRepresentative);

export default function LogisticsSalesRepresentativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
