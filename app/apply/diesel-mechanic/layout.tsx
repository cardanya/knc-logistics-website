import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.dieselMechanic);

export default function DieselMechanicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
