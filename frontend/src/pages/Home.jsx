import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import Spinner from '../components/Spinner.jsx'
import BooksTable from '../components/BooksTable'
import BooksCard from '../components/BooksCard'
import axios from 'axios'

const Home = () => {
    const [books, setBooks] = useState([
    ])
    const [loading, setLoading] = useState(true)
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        axios
          .get('http://localhost:5173/api/books')
          .then((response) => {
            console.log(response)
            setBooks(response.data.data)
            setLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
          })
      }, [])

    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button 
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            { loading ? (
                <Spinner />
            ) : showType == 'table' ? (
                <BooksTable books={books} />
            ) : (
                <BooksCard books={books} />
            )}
        </div>
    )
}

export default Home