import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next 연습",
  description: "Next.js 메모 앱 연습",
};

// 모든 화면에 공통으로 보이는 틀. 각 page.js 내용이 children 자리에 들어간다.
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav>
          <Link href="/">홈</Link>
          <Link href="/notes">메모</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
