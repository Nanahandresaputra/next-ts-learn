"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";

export default function Question() {
  const { question } = useAppSelector((state) => state.post);

  console.log(process.env.NEXT_PUBLIC_SECRET_KEY);
  return <h1>question pages</h1>;
}
