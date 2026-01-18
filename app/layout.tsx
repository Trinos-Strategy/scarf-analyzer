import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCARF 위협 분석기',
  description: '조정인이 갈등 상황에서 SCARF 영역의 위협을 신속하게 식별하고 대응 전략을 선택하도록 돕는 도구입니다.',
  keywords: ['SCARF', '위협 분석', '갈등 조정', '신경과학', '조정인'],
  authors: [{ name: 'SCARF Analyzer' }],
  openGraph: {
    title: 'SCARF 위협 분석기',
    description: '조정인이 갈등 상황에서 SCARF 영역의 위협을 신속하게 식별하고 대응 전략을 선택하도록 돕는 도구입니다.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
