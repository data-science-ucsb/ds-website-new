import React from "react";
import faqs from "@/app/data/faqs";

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h1>
      <section>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
            <hr className="my-8" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default FAQPage;
