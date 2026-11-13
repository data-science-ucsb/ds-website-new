import Image from "next/image";
import sponsors from "@/app/data/sponsors";

const SponsorsSection = () => {
  return (
    <section className="py-24">
      <h2 className="text-center font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-ink-muted">
        We are sponsored by:
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex aspect-[5/3] items-center justify-center rounded-2xl border border-paper-line bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Image
              src={sponsor.imageUrl}
              alt={`${sponsor.name} logo`}
              width={200}
              height={120}
              className="max-h-full w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsorsSection;
