import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://ai-startup-index-korea.chung-es.chatgpt.site'),
  title: 'AI Startup Index — 한국 AI 스타트업 데이터룸',
  description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸',
  openGraph: {
    title: 'AI Startup Index — 한국 AI 스타트업 데이터룸',
    description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸',
    url: '/',
    siteName: 'AI Startup Index',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Startup Index' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Startup Index — 한국 AI 스타트업 데이터룸',
    description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸',
    images: ['/og.png'],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body className={`${geist.variable} antialiased`}>{children}</body></html>; }
