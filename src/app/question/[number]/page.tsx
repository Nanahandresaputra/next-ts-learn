'use client'

import { useRouter, useSearchParams } from "next/navigation"

export default function Question() {
      const searchParams = useSearchParams()
 
    const search = searchParams.get('data')
    
    console.log(search)
    return (
        <h1>question pages</h1>
    )
}