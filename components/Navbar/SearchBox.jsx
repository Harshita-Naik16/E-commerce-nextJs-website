import { useState, useRef, useEffect  } from "react"
import styles from "./navbar.module.css"
import { AiOutlineSearch } from "react-icons/ai"
import { IoIosClose } from 'react-icons/io'
import useDebounce from "@/lib/hooks/useDebounce"
import { searchFilter } from "@/data/productsData"
import Link from "next/link"

export default function SearchBox() {
    const [value, setValue] = useState("")
    const [searchList, setSearchList] = useState([])
    const debouncedValue = useDebounce(value, 500)
    const searchContainerRef = useRef(null)


    useEffect(() => {
        const data = searchFilter(debouncedValue)
        setSearchList(data)
    }, [debouncedValue])

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(!searchContainerRef.current.contains(e.target)) {
                setValue("")
            }
        }
        
        document.addEventListener("click", handleOutsideClick)

        return () => document.removeEventListener("click", handleOutsideClick)
    }, [])


    return (
        <>
            <div className={styles.nav_search} ref={searchContainerRef}>
                <input
                    type='text'
                    placeholder='SEARCH...'
                    className={styles.nav__search__input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {value.length > 0 && <button className={styles.clear__search} onClick={() => setValue("")}><IoIosClose /></button>}

                <span className={styles.nav__search_icon}><AiOutlineSearch /></span>

                <ul className={`${styles.nav_search__list} ${searchList && searchList.length > 0 ? styles.show : ""}`}>
                    {
                        searchList?.map(item => (
                            <li key={item.id}>
                                <Link href={`/product/${item.id}`} className={styles.nav_search__list_item} onClick={() => setValue("")}>
                                    <div className={styles.nav__list__img}><img src={item.image} /></div>
                                    <h5>{item.title}</h5>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
