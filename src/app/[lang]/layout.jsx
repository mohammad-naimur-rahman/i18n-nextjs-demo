import { i18n } from '@/i18n.config'
import '@/styles/globals.css'

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function Root({ children, params }) {
  return (
    <html lang={params.lang}>
      <body className='px-10'>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'i18n within app directory - Vercel Examples',
  description: 'How to do i18n in Next.js 13 within app directory',
}
