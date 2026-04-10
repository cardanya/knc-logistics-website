import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.driveForUs);

export default function DriveForUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
