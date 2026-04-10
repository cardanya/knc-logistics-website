import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.supplyChainSpecialist);

export default function SupplyChainSpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
