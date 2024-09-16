// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repo
  return (
    <li className="each-repo-item">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-image"
        />
        <p> {starsCount} stars</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-image"
        />
        <p> {forksCount} forks</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-image"
        />
        <p> {issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
