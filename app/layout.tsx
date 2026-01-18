import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCARF 위협 분석기',
  description: '갈등 상황에서 SCARF 모델을 활용한 신경과학적 위협 요소 분석 도구',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
