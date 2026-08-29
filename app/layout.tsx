import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://euisuk-chung.github.io/top100_kr_startup';
const socialImageUrl = `${siteBaseUrl.replace(/\/$/, '')}/og.png`;
export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: 'AI Startup Index — 한국 AI 스타트업 데이터룸',
  description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸',
  openGraph: {
    title: 'AI Startup Index — 한국 AI 스타트업 데이터룸',
    description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸',
    url: siteBaseUrl,
    siteName: 'AI Startup Index',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: 'AI Startup Index' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Startup Index — 한국 AI 스타트업 데이터룸',
    description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸',
    images: [socialImageUrl],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body className={`${geist.variable} antialiased`}>{children}</body></html>; }
