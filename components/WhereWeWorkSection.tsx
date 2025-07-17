import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";


const companies = [
  { name: "Google", src: "/images/google.png"},
  { name: "Amazon", src: "/images/amazon.png"},
  { name: "Meta", src: "/images/meta.png"},
  { name: "Apple", src: "/images/apple.png"},
  { name: "Netflix", src: "/images/netflix1.png"},
  { name: "Tesla", src: "/images/tesla.png"},
  { name: "NVIDIA", src: "/images/nvidia.png"},
];

const WhereWeWorkSection: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: false,
    draggable: false,
    swipe: false,
  };

  return (
    <div className="relative w-screen left-1/2 transform -translate-x-1/2 overflow-hidden py-16">
      <div className="container mx-auto px-6 group">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Where We Work
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></div>
      </div>

      <Slider {...settings} className="w-full mt-6"> 
        {companies.map((company, idx) => (
          <div key={idx} className="px-4 flex items-center justify-center">
            <Link href="/alumni" target="_blank">
              <div className="relative h-24 w-36">
                <Image
                  src={company.src}
                  alt={company.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WhereWeWorkSection;
