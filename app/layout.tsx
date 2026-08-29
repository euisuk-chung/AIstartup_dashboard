import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
export const metadata: Metadata = { title: 'AI Startup Index — 한국 AI 스타트업 데이터룸', description: '국내 비상장 AI 기업의 서비스, 투자액, 매출액을 비교하는 데이터룸' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body className={`${geist.variable} antialiased`}>{children}</body></html>; }
