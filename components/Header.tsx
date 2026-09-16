import { getSettings } from "@/lib/siteContent";
import HeaderClient from "@/components/HeaderClient";

export default async function Header() {
  const settings = await getSettings();
  return <HeaderClient portalUrl={settings.portal_url} />;
}
