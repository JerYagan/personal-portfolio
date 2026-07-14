import { ReactNode } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiNodedotjs,
  SiTailwindcss,
  SiSupabase,
  SiVite,
  SiFigma,
  SiGit,
  SiStorybook,
  SiAstro,
  SiShopify,
  SiRedis,
  SiCloudflare,
  SiGraphql,
  SiVercel,
} from 'react-icons/si';

const iconMap: Record<string, ReactNode> = {
  react: <SiReact className="text-[#61DAFB]" />,
  'next.js': <SiNextdotjs className="text-white bg-black rounded-full" />,
  nextjs: <SiNextdotjs className="text-white bg-black rounded-full" />,
  typescript: <SiTypescript className="text-[#3178C6]" />,
  postgresql: <SiPostgresql className="text-[#4169E1]" />,
  postgres: <SiPostgresql className="text-[#4169E1]" />,
  'node.js': <SiNodedotjs className="text-[#339933]" />,
  nodejs: <SiNodedotjs className="text-[#339933]" />,
  tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
  tailwindcss: <SiTailwindcss className="text-[#06B6D4]" />,
  supabase: <SiSupabase className="text-[#3ECF8E]" />,
  vite: <SiVite className="text-[#646CFF]" />,
  figma: <SiFigma className="text-[#F24E1E]" />,
  git: <SiGit className="text-[#F05032]" />,
  storybook: <SiStorybook className="text-[#FF4785]" />,
  astro: <SiAstro className="text-[#FF5D01]" />,
  shopify: <SiShopify className="text-[#96BF48]" />,
  redis: <SiRedis className="text-[#DC382D]" />,
  cloudflare: <SiCloudflare className="text-[#F38020]" />,
  graphql: <SiGraphql className="text-[#E10098]" />,
  vercel: <SiVercel className="text-white" />,
};

export function getTechIcon(name: string): ReactNode | null {
  const normalized = name.toLowerCase().trim();
  return iconMap[normalized] || null;
}
