import React from "react";
import workshops from "@/app/data/workshops";

const WorkshopsPage = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-center text-4xl font-bold">Workshops</h1>
      <p className="mb-12 text-center text-gray-600">
        Missed a workshop or want to follow along? Find the materials below.
      </p>
      <section className="space-y-6">
        {workshops.map((workshop) => (
          <a
            key={workshop.href}
            href={workshop.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold">{workshop.title}</h2>
            <p className="text-gray-600">{workshop.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 font-medium text-blue-600">
              Open folder
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>
        ))}
      </section>
    </div>
  );
};

export default WorkshopsPage;
