"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { correctAnswer, inCorrectAnswer, resetQuestion, setCurrentPage } from "@/store/siderSlice";
import { Button, ConfigProvider, Modal } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface QuestionData {
  value: string | number;
  isCorrect: boolean;
}

export default function Question() {
  const { question, correct, inCorrect, currentPage } = useAppSelector<any>((state) => state.post);
  const router = useRouter();

  console.log(question);

  const pathName = usePathname();
  const getIndex: number = parseInt(`${pathName}`.charAt(`${pathName}`.length - 1));
  let inCorrectAnsw = question?.[getIndex]?.incorrect_answers;
  const correctAnsw = question?.[getIndex]?.correct_answer;

  const dispatch = useAppDispatch();

  const shuffle = (array: []): QuestionData[] => {
    return array?.sort(() => Math.random() - 0.5).map((data) => ({ value: data, isCorrect: data === correctAnsw ? true : false }));
  };

  const getAnswer = (data: string | number) => {
    data === correctAnsw ? dispatch(correctAnswer(parseInt(correct) + 1)) : dispatch(inCorrectAnswer(parseInt(inCorrect) + 1));
    router.push(getIndex === 0 ? "/result" : `/question/${getIndex === 0 ? 10 : getIndex + 1}`);
    dispatch(setCurrentPage(getIndex + 1));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(correctAnswer(0));
    dispatch(inCorrectAnswer(0));
    dispatch(setCurrentPage(0));

    setIsModalOpen(false);
    router.push("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push(getIndex === 0 ? "/result" : `/question/${getIndex === 0 ? 10 : getIndex + 1}`);
  };

  useEffect(() => {
    if (getIndex < currentPage && getIndex != 0) {
      showModal();
    }
    if (!question || question.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "rgb(234 88 12)",
            colorPrimaryHover: "rgb(249 115 22)",
            colorPrimaryActive: "rgb(251 146 60)",
          },
        },
      }}
    >
      <section className="flex justify-center">
        <Modal
          title="Are you sure? "
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" className="bg-orange-600" onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Leaving the page will clear the history and return to the main page</p>
        </Modal>
        <div className="flex relative justify-center w-10/12 md:w-11/12 lg:w-10/12 mt-[14vh] h-[80vh] rounded-lg bg-green-900">
          <div className="absolute -top-7 h-[6vh] w-4/12 rounded-lg bg-orange-600 flex justify-center items-center border-2 border-black">
            <h1 className="text-xl md:text-3xl font-semibold text-white">Question {getIndex === 0 ? 10 : getIndex}</h1>
          </div>

          <div className="w-10/12 mt-[10vh] md:mt-[15vh] space-y-16 md:space-y-28">
            <p className="text-white md:text-center text-xl md:text-3xl font-medium" dangerouslySetInnerHTML={{ __html: question?.[getIndex]?.question }}></p>
            <div className="grid md:grid-cols-2 gap-5">
              {shuffle(inCorrectAnsw?.concat(correctAnsw))?.map((data, index) => (
                <Button type="primary" size="large" className="text-wrap bg-orange-600 text-base md:text-2xl font-medium py-[4vh] flex items-center justify-center border-2 border-black" key={index} onClick={() => getAnswer(data.value)}>
                  <span dangerouslySetInnerHTML={{ __html: data.value }}></span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
