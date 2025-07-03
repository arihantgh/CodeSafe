import React from 'react'
import { Link } from 'react-router'

function Home() {
    return (
        <>
            <div className='max-w-5xl mx-auto flex justify-between my-5'>
                <h1 className='text-3xl font-bold my-2'>🔒 CodeSafe</h1>
                <Link to='/notes' className='bg-white text-black rounded-xl text-center px-5 py-3 text-xl font-semibold'>Get Started ▶</Link>
            </div>

            <section>
                <div className="py-10 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">⚡Powerful notes right in your browser⚡</h1>
                    <p className="text-base font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48 dark:text-gray-400">Take quick notes on the go
                         save code snippets, jot down your thoughts..everything in your browser. 
                    </p>
                    <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48 dark:text-gray-400">All notes are saved locally. No login required!</p>
                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link to='/notes' className='bg-blue-700 text-white rounded-xl text-center px-5 py-3 text-xl font-semibold'>Experience✔</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home