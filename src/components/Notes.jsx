import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { IdContext } from '../context/IdContext.jsx'

function Notes() {

  const { setId } = useContext(IdContext)

  let notes = JSON.parse(localStorage.getItem('notes'))

  const content = []

  if (notes === null) {
    localStorage.setItem('notes', JSON.stringify([]))
  }
  else {
    for (let i = 0; i < notes.length; i++) {
      content[i] = JSON.parse(localStorage.getItem(notes[i]))
    }
  }

  const handleAddNotes = () => {
    const random = Date.now()
    localStorage.setItem('notes', JSON.stringify([...notes, random]))
    setId(random)
  }

  const handleDelete = (id) => {
    notes=notes.filter(item => item !== id)
    localStorage.setItem('notes',JSON.stringify(notes))
    localStorage.removeItem(id)
    window.location.reload();
  }

  const navigate = useNavigate()

  const handleView = (id) => {
    setId(id)
    navigate("/editor")
  }


  if (notes.length === 0) {
    return (
      <div>
        <div className='max-w-5xl mx-auto flex justify-between my-5'>
          <h1 className='text-3xl font-bold my-2'>🔒 CodeSafe</h1>
          <Link to='/editor'>
            <button onClick={handleAddNotes} className='bg-white text-black rounded-xl text-center px-5 py-3 text-xl font-semibold'>Add Note ➕</button>
          </Link>
        </div>
        <div className='max-w-5xl mx-auto flex justify-center'>
          <h1 className='font-bold text-2xl my-3'>No Notes available.</h1>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <div className='max-w-5xl mx-auto flex justify-between my-5'>
          <h1 className='text-3xl font-bold my-2'>🔒 CodeSafe</h1>
          <Link to='/editor'>
            <button onClick={handleAddNotes} className='bg-white text-black rounded-xl text-center px-5 py-3 text-xl font-semibold'>Add Note ➕</button>
          </Link>
        </div>
        <div className='max-w-5xl mx-auto my-5'>
          <h1 className='text-3xl font-semibold'>📝 Notes</h1>
          <ul className='w-full'>
            {
              content.map((item) =>
              (
                <div key={item.id} className='border border-gray-700 rounded-lg p-4 my-4 flex justify-between'>
                  <li className='text-2xl font-semibold'>▶ {item.title ? item.title : "(please add title)"}</li>
                  <div>
                    <button onClick={() => { handleView(item.id) }}
                      className='px-3 py-2 mx-2 bg-blue-500  rounded-lg'>View 👁</button>
                    <button onClick={() => { handleDelete(item.id) }}
                      className='px-3 py-2 mx-2 bg-red-500 rounded-lg'>Delete 🗑</button>
                  </div>
                </div>
              )
              )}
          </ul>
        </div>
      </div>

    )
  }
}

export default Notes