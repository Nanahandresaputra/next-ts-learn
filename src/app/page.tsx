"use client";

import Image from "next/image";
import banner from '../../public/assets/banner.svg'
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { quizApi } from "@/store/siderSlice";
import { Button, ConfigProvider, Form, Select } from "antd";
import selectCategory from "@/dummy/categorySelect";
import difficultySelect from "@/dummy/difficultySelect";
import { useRouter } from "next/router";



export default function Home() {
  const {question, isLoadingQuestion} = useAppSelector( state => state.post)
  const dispatch = useAppDispatch();
  
  const router = useRouter()

  const onFinishData = (values:any) => {
    // dispatch(quizApi({ category: values.category, difficulty: values.difficulty })).then((res) => router.push(`/question/1`)).catch(err => console.log(err))
    router.push({pathname:'/question/1'})
  }


console.log(question.length > 0 && !isLoadingQuestion ? question : 'Loading...');

  return (
    <ConfigProvider theme={{
      "components": {
        "Button": {
          "colorPrimary": 'rgb(20 83 45)',
          "colorPrimaryHover": 'rgb(22 101 52)',
          "colorPrimaryActive": 'rgb(21 128 61)'
        },
        "Select": {
          "optionSelectedBg": "rgb(132, 204, 22)",
          "algorithm": true,
          "optionActiveBg": "rgba(106, 218, 135, 0.04)",
          "optionSelectedColor": "rgba(255, 255, 255, 0.88)",
          "selectorBg": "rgb(236, 252, 203)",
          "colorBgElevated": "rgb(236, 252, 203)",
          "colorPrimary": "rgb(82, 196, 26)",
          "colorPrimaryHover": "rgb(82, 196, 26)",
          "colorText": "rgb(0, 0, 0)",
          "colorBorder": "rgb(82, 196, 26)"
        }
      }
    }}>
      <section className="flex justify-center">
        <div className="grid md:grid-cols-2 lg:gap-x-5 md:gap-y-8 md:items-center lg:gap-y-0 w-10/12 md:w-11/12 lg:w-10/12 mt-[10vh] lg:mt-0 lg:h-screen">
          <Image src={banner} alt="banner-logo" className="w-10/12 hidden md:block" />

          <div className="space-y-[3vh]">
            <h1 className="flex flex-wrap items-end font-bold text-xl md:text-2xl lg:text-3xl">
              Hi <span className="animate-waving-hand">👋</span>, <span className="text-green-900 mx-4">Welcome</span> to FUN Quiz
            </h1>
            <p className="font-medium text-base md:text-xl text-justify">
              Lovmax ipsum dolor sit amet, consectetur adipiscing elit. In nunc risus, fringilla vel consectetur et, pharetra eget nisi. Cras magna augue, lacinia vel tellus     vitae, dapibus dapibus turpis.
            </p>

            <div className="space-y-5 md:hidden lg:block lg:col-span-1">
              <p className="font-medium text-base md:text-xl">Lovmax ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Form layout="vertical" className="lg:grid lg:grid-cols-2 items-center lg:gap-x-7"  initialValues={{ category:9, difficulty:'easy' }} onFinish={onFinishData}>
                <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Category</p>} name='category'>
                  <Select
                    options={selectCategory}
                    size="large"
                    />
                </Form.Item>
                <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Difficulty</p>} name='difficulty'>
                  <Select
                    options={difficultySelect}
                    size="large"
                    />
                </Form.Item>
                <Form.Item className="lg:col-span-2">
                  <Button type="primary" size='large' className="w-full bg-green-900" htmlType="submit">Start</Button>
                </Form.Item>
              </Form>
            </div>
          </div>

           <div className="space-y-5 hidden md:block md:col-span-2 lg:hidden">
              <p className="font-medium text-base md:text-xl">Lovmax ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Form layout="vertical" className="grid grid-cols-2 items-center gap-x-7" initialValues={{ category:9, difficulty:'easy' }} onFinish={onFinishData}>
                <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Category</p>} name='category'>
                  <Select
                    options={selectCategory}
                    size="large"
                    />
                </Form.Item>
                <Form.Item className="w-full" label={<p className="font-medium text-base md:text-lg">Difficulty</p>} name='difficulty'>
                  <Select
                    options={difficultySelect}
                    size="large"
                    />
                </Form.Item>
                <Button type="primary" size='large' className="col-span-2 bg-green-900" htmlType="submit">Start</Button>
              </Form>
            </div>

        </div>
        {/* <Button type='primary' className="bg-blue-500" onClick={() => dispatch(quizApi({ category: 21, difficulty: 'easy' })).catch(err => console.log(err))}>Pencet</Button> */}
      </section>
    </ConfigProvider>
  );
}
