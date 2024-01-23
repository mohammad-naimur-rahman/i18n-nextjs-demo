import { getDictionary } from '../../get-dictionary'
import RFQ from './components/RFQ'
import Counter from './components/counter'
import LocaleSwitcher from './components/locale-switcher'

export default async function IndexPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <LocaleSwitcher />
      <p>Current locale: {lang === 'en' ? 'English' : 'Arabic'}</p>
      <p>This text is rendered on the server: {dictionary['server-component'].welcome}</p>
      <RFQ dictionary={dictionary['rfq']} />
    </div>
  )
}
