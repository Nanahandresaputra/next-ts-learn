"use client";

import Image from "next/image";
import result from "../../../public/assets/result.png";
import { Button, ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { correctAnswer, inCorrectAnswer, resetQuestion, setCurrentPage } from "@/store/siderSlice";
import { useEffect } from "react";

export default function Result() {
  const { correct, inCorrect } = useAppSelector<any>((state) => state.post);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNewQuiz = () => {
    dispatch(resetQuestion());
    dispatch(correctAnswer(0));
    dispatch(inCorrectAnswer(0));
    dispatch(setCurrentPage(0));
    router.push("/");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "rgb(20 83 45)",
            colorPrimaryHover: "rgb(22 101 52)",
            colorPrimaryActive: "rgb(21 128 61)",
          },
        },
      }}
    >
      <section className="flex justify-center">
        <div className="flex flex-col space-y-7 md:space-y-5 items-center w-10/12 md:w-11/12 lg:w-10/12 mt-[14vh] h-[80vh] rounded-lg bg-green-900 bg-opacity-50">
          <Image src={result} alt="result" className="h-[15vh] md:h-[23vh] mt-[5vh] object-contain" />
          <div className="grid grid-cols-2 gap-7">
            <p className="text-xl md:text-3xl font-semibold col-span-2">Quiz Completed Successfully</p>
            <p className="col-span-2 bg-orange-600 border-2 border-black py-[1vh] md:py-[2vh] text-white font-semibold text-2xl md:text-4xl rounded-lg shadow-lg text-center">Score {correct}</p>
            <p className="bg-lime-500 py-[0.7vh] md:py-[1vh] md:text-xl text-white border-2 border-black rounded-lg text-center">Correct {correct}</p>
            <p className="bg-red-500 py-[0.7vh] md:py-[1vh] md:text-xl text-white border-2 border-black rounded-lg text-center">Incorrect {inCorrect}</p>
            <Button type="primary" size="large" className="col-span-2 bg-green-900 text-lg  md:text-2xl justify-center py-6 font-semibold md:py-8 flex items-center" onClick={handleNewQuiz}>
              New Quiz
            </Button>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
