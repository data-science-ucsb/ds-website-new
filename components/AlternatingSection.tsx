import Image from "next/image";
import PillButton from "./PillButton";

const AlternatingSection = () => {
  const rows = [
    {
      title: "Who are we?",
      text: "We are a vibrant community dedicated to inspiring and guiding passionate students in the world of data science, technology, and innovation. Our mission is to empower Gauchos to explore, learn, and excel in their journey toward impactful careers.",
      imageSrc: "/images/alumniconnect25.jpeg",
      imageAlt: "Alumni Connect 2025",
      reverse: false,
      caption: "Alumni Connnect 2025",
    },
    {
      title: "What do we do?",
      text: "We provide students with the resources, mentorship, and opportunities to excel in data science and technology careers. From hands-on workshops, industry events, career fairs, to datathons, we aim to foster growth, collaboration, and innovation.",
      imageSrc: "/images/pres1.jpg",
      imageAlt: "Project Showcase 2025",
      reverse: true,
      caption: "Project Showcase 2025",
    },
  ];

  return (
    <div className="space-y-24 py-28 lg:space-y-32 lg:py-36">
      {rows.map((row) => (
        <div
          key={row.title}
          className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
            row.reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <figure className="group relative w-full overflow-hidden rounded-[1.75rem] bg-paper-card lg:w-[55%]">
            <div className="relative aspect-[5/3.4]">
              <Image
                src={row.imageSrc}
                alt={row.imageAlt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              {row.caption}
            </figcaption>
          </figure>

          <div className="w-full lg:w-[45%]">
            <h2 className="font-serif text-[clamp(2.25rem,4.4vw,3.5rem)] font-light leading-[1.02] tracking-display">
              {row.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-ink-muted">{row.text}</p>

            <div className="mt-8">
              {row.title === "Who are we?" && (
                <PillButton variant="outline" href="/about">
                  Meet the team
                </PillButton>
              )}
              {row.title === "What do we do?" && (
                <PillButton
                  variant="outline"
                  onClick={() =>
                    document
                      .querySelector("#four-cards-section")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  Learn More
                </PillButton>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternatingSection;
