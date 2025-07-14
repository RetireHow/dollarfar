import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Is the eBook really free?",
    answer: "Yes! The eBook is completely free for the first 1,000 downloads. After that, it will be available for purchase.",
  },
  {
    question: "Is there a digital version available?",
    answer: "Yes, the book is available in both PDF and ePub formats.",
  },
  {
    question: "Can I return the book if I don’t like it?",
    answer: "Absolutely. We offer a 14-day return policy for all purchases.",
  },
];

export default function BookFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-28 md:px-0 px-5">
      <h2 className="text-2xl font-bold text-center mb-6">Common Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-xl">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center p-4 font-medium text-left"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
