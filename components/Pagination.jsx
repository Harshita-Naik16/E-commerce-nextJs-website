
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

export default function Pagination({ totalPages, setCurrentPage, currentPage }) {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const handlePrev = () => {
        console.log("clicked")
        setCurrentPage(prev => prev - 1)
    }

    const handleNext = () => {
        setCurrentPage(prev => prev + 1)
    }

    return (
        <div className='pagination'>
            <button onClick={handlePrev} disabled={currentPage === 1 ? true : false}><AiOutlineLeft size={16}/></button>
            <div className="page_btn_container">
                {
                    pages.map((page, index) => (
                        <button key={index} onClick={() => setCurrentPage(page)} className={`page_btn ${currentPage === page ? "active" : ""}`}>{page}</button>
                    ))
                }
            </div>
            <button onClick={handleNext} disabled={currentPage === totalPages ? true : false}><AiOutlineRight size={16} /></button>
        </div>
    )
}
