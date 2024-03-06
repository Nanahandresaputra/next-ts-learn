"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { quizApi } from "@/store/siderSlice";
import { Button } from "antd";


export default function Home() {
  const {question, isLoadingQuestion} = useAppSelector( state => state.post)
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(quizApi({ category: 21, difficulty: 'easy' })).catch(err => console.log(err))
  // }, []);

console.log(question.length > 0 && !isLoadingQuestion ? question : 'Loading...');

  return (
    <section>
      <Button type='primary' className="bg-blue-500" onClick={() => dispatch(quizApi({ category: 21, difficulty: 'easy' })).catch(err => console.log(err))}>Pencet</Button>
    </section>
  );
}
