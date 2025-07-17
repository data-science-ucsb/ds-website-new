import Image from "next/image";

const AlternatingSection = () => {
  const rows = [
    {
      title: "Who are we?",
      text: "We are a vibrant community dedicated to inspiring and guiding passionate students in the world of data science, technology, and innovation. Our mission is to empower Gauchos to explore, learn, and excel in their journey toward impactful careers.",
      imageSrc: "/images/alumniconnect25.jpeg",
      imageAlt: "Image 1",
      reverse: false,
      caption: "Alumni Connnect 2025"
    },
    {
      title: "What do we do?",
      text: "We provide students with the resources, mentorship, and opportunities to excel in data science and technology careers. From hands-on workshops, industry events, career fairs, to datathons, we aim to foster growth, collaboration, and innovation.",
      imageSrc: "/images/pres1.jpg",
      imageAlt: "Image 2",
      reverse: true,
      caption: "Project Showcase 2025"
    },
  ];

  return (
    <div className="container mx-auto my-8 space-y-12">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 ${
            row.reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="w-full lg:w-1/2 px-4">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg group h-0 pb-[60%]">
              <Image
                src={row.imageSrc}
                alt={row.imageAlt}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg"></div>

              <figcaption className="absolute inset-x-0 bottom-0 text-white text-center text-sm font-medium p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {row.caption}
              </figcaption>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4 text-center lg:text-left">
            <div className="group">
              <h2 className="text-xl font-bold text-gray-900">{row.title}</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto lg:mx-0 mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></div>
            </div>
            <p className="text-gray-500 mt-2">{row.text}</p>

            {row.title === "Who are we?" && (
              <button
                onClick={() => window.location.href = "/about"}
                className="mt-4 relative overflow-hidden font-medium text-gray-700 py-2 px-4 rounded-full border border-blue-300 hover:text-white transition-all duration-300 group"
              >
                <span className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10">Meet the team</span>
              </button>
            )}

            {row.title === "What do we do?" && (
              <button
                onClick={() => document.querySelector("#four-cards-section")?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })}
                className="mt-4 relative overflow-hidden font-medium text-gray-700 py-2 px-4 rounded-full border border-blue-300 hover:text-white transition-all duration-300 group"
              >
                <span className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10">Learn More</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternatingSection;
