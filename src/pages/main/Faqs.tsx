import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa6";

export const Faqs = () => {
  const { t } = useTranslation(NAMESPACES.faqs); // Specify the namespace if you're using one

  const faqs = [
    {
      question: t("questions.how_to_buy"),
      answer: t("answers.how_to_buy"),
    },
    {
      question: t("questions.compare_cars"),
      answer: t("answers.compare_cars"),
    },
    {
      question: t("questions.used_cars"),
      answer: t("answers.used_cars"),
    },
    {
      question: t("questions.how_to_rent"),
      answer: t("answers.how_to_rent"),
    },
    {
      question: t("questions.rent_modification"),
      answer: t("answers.rent_modification"),
    },
    {
      question: t("questions.delivery"),
      answer: t("answers.delivery"),
    },
    {
      question: t("questions.car_inspection"),
      answer: t("answers.car_inspection"),
    },
    {
      question: t("questions.upholstery_services"),
      answer: t("answers.upholstery_services"),
    },
    {
      question: t("questions.choose_upholstery"),
      answer: t("answers.choose_upholstery"),
    },
    {
      question: t("questions.working_hours"),
      answer: t("answers.working_hours"),
    },
  ];

  return (
    <section className="sm:mt-20">
      <div className="container mx-auto px-2">
        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4  lg:px-15 md:px-8 px-4">
            <div className="mb-16">
              <h2 className="header flex items-center gap-4 mb-8 font-bold">
                <div className="w-16 h-16 flex items-center justify-center text-5xl bg-[#B71616]">
                  ؟
                </div>
                <span className="text-4xl ">{t("general_faqs_title")}</span>
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    className=" border-[#B71616] !border mb-4 px-16 py-2"
                    value={`item-${index}`}
                    key={index}
                  >
                    <AccordionTrigger className="hover:no-underline cursor-pointer text-2xl items-center [&>svg]:size-8 [&>svg]:text-[#b71616]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xl">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mb-16">
              <h2 className="header flex items-center gap-4 mb-8 font-bold">
                <div className="w-16 h-16 flex items-center justify-center text-4xl border-3 border-white text-[#b71616] ">
                  <FaPlus />
                </div>
                <span
                  className="text-4xl text-[#b71616] "
                  style={{
                    textShadow: `
                      1px 0 0 white,
                      -1px 0 0 white,
                      0 1px 0 white,
                      0 -1px 0 white,
                      1px 1px white,
                      -1px -1px white,
                      1px -1px white,
                      -1px 1px white
                    `,
                  }}
                >
                  {t("send_us_question_title")}
                </span>
              </h2>

              <form className="border border-[#b71616] p-6">
                <h4 className="lg:text-2xl text-lg mb-4">
                  {t("send_us_question_description")}
                </h4>
                {/* Name Information */}
                <div className="grid grid-cols-2 w-full items-center gap-6 mb-4">
                  <div>
                    <Input
                      dir="rtl"
                      className="bg-transparent border-[#b71616]  py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t("form.full_name_placeholder")}
                    />
                  </div>

                  <div>
                    <Input
                      dir="rtl"
                      className="bg-transparent border-[#b71616]  py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("form.email_placeholder")}
                    />
                  </div>
                </div>

                <div className="grid w-full items-center mb-4">
                  <Input
                    dir="rtl"
                    className="bg-transparent border-[#b71616]  py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder={t("form.subject_placeholder")}
                  />
                </div>

                {/* Text Content */}
                <div className="grid  w-full items-center lg:gap-16 gap-2 mb-4">
                  <div>
                    <Textarea
                      dir="rtl"
                      className="bg-transparent border-[#b71616]  py-2 placeholder:font-[400] placeholder:text-neutral-400 rounded min-h-24"
                      id="content"
                      name="content"
                      placeholder={t("form.question_placeholder")}
                    ></Textarea>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="border border-[#B71616] bg-[#B71616] rounded mr-auto  px-16 py-6 text-2xl">
                    {t("form.submit_button")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
