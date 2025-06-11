import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Minecraft Server | Bwhite.Dev',
    description: 'Family Focused Minecraft Server',
    openGraph: {
        title: 'Minecraft Server | Bwhite.Dev',
        description: 'Join our family focused Minecraft server for a fun and safe experience!',
        url: 'https://mc.bwhite.dev',
        siteName: 'Bwhite.Dev',
        locale: 'en_US',
        type: 'website'
    }
};

export default function MinecraftLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
