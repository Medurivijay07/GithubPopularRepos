// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {Language, isActiveLanguage, changeActiveLanguage} = props

  const {id, language} = Language

  const onClickingLanguage = () => {
    changeActiveLanguage(id)
  }

  const activeLanguageStyle = isActiveLanguage ? 'active-btn' : 'normal-btn'
  return (
    <li>
      <button
        type="button"
        className={activeLanguageStyle}
        onClick={onClickingLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
