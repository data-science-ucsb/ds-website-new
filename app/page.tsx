import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <main className="flex h-screen flex-col justify-between font-sans">
        <Header />
      </main>
    </section>
  );
}
