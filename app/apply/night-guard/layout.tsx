import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";

export const metadata = generateServiceMetadata(pageMetadata.nightGuard);

export default function NightGuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
