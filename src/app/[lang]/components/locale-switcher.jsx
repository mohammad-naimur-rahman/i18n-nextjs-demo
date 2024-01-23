'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = locale => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='pt-10'>
      <ul className='flex items-center gap-5'>
        {i18n.locales.map(locale => {
          return (
            <li key={locale}>
              <Link href={redirectedPathName(locale)}>
                <button
                  type='button'
                  className='rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  {locale.toLocaleUpperCase()}
                </button>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
