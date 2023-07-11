"use client";
import { useEffect, useState } from "react";


export default function useDebounce(value, delay) {
    const [debounceValue, setDeabounceValue] = useState("")

    useEffect(() => {
        
        const handler = setTimeout(() => {
            setDeabounceValue(value)
        }, delay)
        
        return () => clearTimeout(handler)
    }, [value])

    return debounceValue
}
