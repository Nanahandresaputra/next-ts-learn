"use client";

import Image from "next/image";
import banner from "../../public/assets/banner.svg";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { correctAnswer, inCorrectAnswer, quizApi, resetQuestion, setCurrentPage } from "@/store/siderSlice";
import { Button, ConfigProvider, Form, Select } from "antd";
import selectCategory from "@/dummy/categorySelect";
import difficultySelect from "@/dummy/difficultySelect";
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/components/loading/loading";
import { openNotification } from "@/helpers/notification";
import { useEffect } from "react";

export default function Home() {
  const { isLoadingQuestion, isErrorQuestion, question } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const onFinishData = (values: any) => {
    dispatch(quizApi({ category: values.category, difficulty: values.difficulty }))
      .then(() => {
        if (isErrorQuestion) {
          openNotification("Network Error", "Please Check Your Internet Connection", "top");
        } else {
        router.push(`/question/1`);
        }
      })
      .catch(() => openNotification("Network Error", "Please Check Your Internet Connection", "top"));
  };

  useEffect(() => {
    dispatch(resetQuestion());
    dispatch(correctAnswer(0));
    dispatch(inCorrectAnswer(0));
    dispatch(setCurrentPage(0));
  }, [])

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "rgb(20 83 45)",
            colorPrimaryHover: "rgb(22 101 52)",
            colorPrimaryActive: "rgb(21 128 61)",
          },
          Select: {
            optionSelectedBg: "rgb(132, 204, 22)",
            algorithm: true,
            optionActiveBg: "rgba(106, 218, 135, 0.04)",
            optionSelectedColor: "rgba(255, 255, 255, 0.88)",
            selectorBg: "rgb(236, 252, 203)",
            colorBgElevated: "rgb(236, 252, 203)",
            colorPrimary: "rgb(82, 196, 26)",
            colorPrimaryHover: "rgb(82, 196, 26)",
            colorText: "rgb(0, 0, 0)",
            colorBorder: "rgb(82, 196, 26)",
          },
        },
      }}
    >
      <LoadingPage isLoadingQuestion={isLoadingQuestion}>
        <section className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:gap-x-5 md:gap-y-8 md:items-center lg:gap-y-0 w-10/12 md:w-11/12 lg:w-10/12 mt-[10vh] lg:mt-0 lg:h-screen">
            <Image src={banner} alt="banner-logo" className="w-10/12 hidden md:block" />

            <div className="space-y-[3vh]">
              <h1 className="flex flex-wrap items-end font-bold text-xl md:text-2xl lg:text-3xl">
                Hi <span className="animate-waving-hand">👋</span>, <span className="text-green-900 mx-4">Welcome</span> to FUN Quiz
              </h1>
              <Image src={banner} alt="banner-logo" className="h-[20vh] object-contain block md:hidden" />

              <p className="font-medium text-base md:text-xl text-justify">{`Play quizzes for fun and increase your knowledge, get the highest score and set your own record. let's play quizzes to learn in a fun way.`}</p>

              <div className="space-y-5 md:hidden lg:block lg:col-span-1">
                <p className="font-medium text-base md:text-xl">Choose the category and level of difficulty according to your wishes.</p>
                <Form layout="vertical" className="lg:grid lg:grid-cols-2 items-center lg:gap-x-7" initialValues={{ category: 9, difficulty: "easy" }} onFinish={onFinishData}>
                  <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Category</p>} name="category">
                    <Select options={selectCategory} size="large" />
                  </Form.Item>
                  <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Difficulty</p>} name="difficulty">
                    <Select options={difficultySelect} size="large" />
                  </Form.Item>
                  <Form.Item className="lg:col-span-2">
                    <Button type="primary" size="large" className="w-full bg-green-900 font-semibold lg:py-5 lg:text-xl flex justify-center items-center" htmlType="submit">
                      Start
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>

            <div className="space-y-5 hidden md:block md:col-span-2 lg:hidden">
              <p className="font-medium text-base md:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Form layout="vertical" className="grid grid-cols-2 items-center gap-x-7" initialValues={{ category: 9, difficulty: "easy" }} onFinish={onFinishData}>
                <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Category</p>} name="category">
                  <Select options={selectCategory} size="large" />
                </Form.Item>
                <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Difficulty</p>} name="difficulty">
                  <Select options={difficultySelect} size="large" />
                </Form.Item>
                <Button type="primary" size="large" className="col-span-2 bg-green-900 text-xl font-semibold py-5 flex justify-center items-center" htmlType="submit">
                  Start
                </Button>
              </Form>
            </div>
          </div>
        </section>
      </LoadingPage>
    </ConfigProvider>
  );
}
