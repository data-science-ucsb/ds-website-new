import Image from "next/image";
import HomepageEventsSection from "@/components/HomepageEventsSection";
import SponsorsSection from "@/components/SponsorsSection";
import events from "@/data/homepage-events";

export default function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Welcome to Data Science UCSB!
          </h1>
          <p className="text-lg leading-7 text-gray-500 mt-2">
            We prepare students for successful careers in data science +
            analytics
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-4 lg:mt-0">
          <Image
            src="/images/homepg.png"
            alt="Homepage Image"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="text-center space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
          Our Mission
        </h1>
        <p className="text-base md:text-lg lg:text-xl leading-7 text-gray-500 max-w-2xl mx-auto">
          We provide Gauchos with the resources and community to learn, share,
          and create in the realm of data science. Our vision is to be the
          platform through which companies and faculty researchers seek the best
          data science talent UCSB has to offer, as well as one that empowers
          students looking to earn this distinction.
        </p>
      </div>
      <div className="container mx-auto my-8">
        {events.map((event, index) => (
          <HomepageEventsSection
            key={index}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
      <SponsorsSection />
    </>
  );
}
