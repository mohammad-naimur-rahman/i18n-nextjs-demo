'use client'

import { API_URL } from '@/configs'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function RFQ({ dictionary }) {
  const { lang } = useParams()
  const [allRfqs, setallRfqs] = useState([])

  const fetchRfqs = useCallback(async () => {
    const response = await fetch(`${API_URL}/rfq`, {
      headers: {
        'Accept-Language': lang,
      },
    })
    const data = await response.json()
    setallRfqs(data?.data)
  }, [lang])

  useEffect(() => {
    fetchRfqs()
  }, [lang, fetchRfqs])

  const [mode, setmode] = useState('en')

  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')

  const [arabicTitle, setarabicTitle] = useState('')
  const [arabicDescription, setarabicDescription] = useState('')

  const [attachment, setattachment] = useState('')
  const [attachments, setattachments] = useState([])

  const handleSubmit = async e => {
    e.preventDefault()
    const allData = {
      title: {
        en: title,
        ar: arabicTitle,
      },
      description: {
        en: description,
        ar: arabicDescription,
      },
      attachments,
    }

    const response = await fetch(`${API_URL}/rfq`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(allData),
    })

    const data = await response.json()

    if (data.status === 'success') {
      fetchRfqs()
    }
  }

  return (
    <div className='max-w-3xl'>
      <form onSubmit={handleSubmit} className='p-8 rounded-2xl my-5 shadow-md'>
        <h1 className='text-2xl pb-4'>{dictionary}</h1>

        <div className='flex items-center gap-3 py-3'>
          <button type='button' className='bg-cyan-600 text-white px-3 py-1 rounded-md' onClick={() => setmode('en')}>
            Enlish
          </button>
          <button type='button' className='bg-cyan-600 text-white px-3 py-1 rounded-md' onClick={() => setmode('ar')}>
            Arabic
          </button>
        </div>

        {mode === 'en' ? (
          <div className='space-y-3'>
            <input
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={e => settitle(e.target.value)}
            />
            <input
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type='text'
              name='description'
              placeholder='Description'
              value={description}
              onChange={e => setdescription(e.target.value)}
            />
          </div>
        ) : (
          <div className='space-y-3'>
            <input
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type='text'
              name='title'
              placeholder='Arabic Title'
              value={arabicTitle}
              onChange={e => setarabicTitle(e.target.value)}
            />
            <input
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type='text'
              name='description'
              placeholder='Arabic Description'
              value={arabicDescription}
              onChange={e => setarabicDescription(e.target.value)}
            />
          </div>
        )}

        <div className='p-3 shadow-md my-3 rounded-lg'>
          <div className='space-y-2'>
            <input
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='attachments'
              placeholder='attachment url'
              value={attachment}
              onChange={e => setattachment(e.target.value)}
            />
            <button
              type='button'
              className='bg-cyan-600 text-white px-3 py-1 rounded-md'
              onClick={() => {
                setattachments([...attachments, attachment])
                setattachment('')
              }}>
              Add attachment
            </button>
          </div>

          <ul className='my-3'>
            {attachments?.map(attachment => (
              <li key={attachment}>{attachment}</li>
            ))}
          </ul>
        </div>

        <button type='submit' className='bg-green-600 text-white px-3 py-1 rounded-md'>
          Submit
        </button>
      </form>
      <div className='flex gap-5'>
        {allRfqs?.map(rfq => (
          <div key={rfq?._id} className='p-5 shadow-md rounded-md'>
            <p className='text-lg font-serif'>{rfq?.title}</p>
            <p>{rfq?.description}</p>

            <p className='pt-3 font-medium'>Attachments</p>
            <ul>
              {rfq?.attachments?.map(attachment => (
                <li key={attachment}>{attachment}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
