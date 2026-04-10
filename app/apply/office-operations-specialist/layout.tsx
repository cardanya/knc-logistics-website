import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.officeOperationsSpecialist);

export default function OfficeOperationsSpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
