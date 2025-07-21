import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Is the eBook really free?",
    answer:
      "Yes! The eBook is completely free for the first 1,000 downloads. After that, it will be available for purchase.",
  },
  {
    question: "How will I receive the eBook?",
    answer:
      "Once you claim your copy, you’ll get an instant download link and a copy will be sent to your email. Please check your junk mail as well, sometimes it may go there and wait for you to download.",
  },
  {
    question: "Can I purchase a physical copy later?",
    answer:
      "Yes, the physical (printed) version will be available for purchase through amazon.",
  },
  {
    question: "Is this book useful if I only plan to retire in Canada?",
    answer:
      "Absolutely. The book offers in-depth guidance on Canadian retirement benefits.",
  },
  {
    question: "Who is the author?",
    answer:
      "Rao Movva, a Fellow of the Canadian Securities Institute, brings extensive experience from three major financial institutions. He specializes in translating complex retirement planning concepts from both Canada and the U.S. into clear, accessible language.",
  },
  {
    question: "What should I do if I face issues while downloading the eBook?",
    answer:
      "If you encounter any problems with your download, please reach out to our support team at support@dollarfar.com or use the contact form on our website. We're here to help!",
  },
];

export default function BookFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="md:px-0 px-5 md:mb-28 mb-16">
      <h2 className="text-2xl font-bold text-center mb-6">Common Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-xl">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center p-4 font-bold text-left md:text-[1.1rem]"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700 dark:text-gray-300 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
