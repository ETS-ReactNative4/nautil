import { LanguageDetector } from '../../lib/i18n/language-detector.js'

LanguageDetector.getLang = () => {
  return window.navigator.language
}

export { LanguageDetector }
export default LanguageDetector
