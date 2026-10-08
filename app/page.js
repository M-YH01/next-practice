import Counter from "../components/Counter";

export default function Home() {
  return (
    <section>
      <h1>홈</h1>
      <p>숫자 증가 버튼으로 state를 연습합니다.</p>
      <Counter />
    </section>
  );
}
