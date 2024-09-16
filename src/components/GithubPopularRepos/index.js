import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeLanguage: languageFiltersData[0].id,
    reposList: {},
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const {activeLanguage} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(Item => ({
        name: Item.name,
        id: Item.id,
        issuesCount: Item.issues_count,
        forksCount: Item.forks_count,
        starsCount: Item.stars_count,
        avatarUrl: Item.avatar_url,
      }))
      this.setState({
        reposList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveLanguage = id => {
    this.setState({activeLanguage: id}, this.getRepos)
  }

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <>
        {this.renderHeader()}
        <ul className="repos-list">
          {reposList.map(Item => (
            <RepositoryItem key={Item.id} repo={Item} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <>
      {this.renderHeader()}
      <div data-testid="loader" className="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      {this.renderHeader()}
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something Went Wrong</h1>
      </div>
    </>
  )

  renderHeader = () => {
    const {activeLanguage} = this.state
    return (
      <div className="github-app-container">
        <h1 className="popular-title">Popular</h1>
        <ul className="filters-list">
          {languageFiltersData.map(Item => (
            <LanguageFilterItem
              key={Item.id}
              Language={Item}
              isActiveLanguage={activeLanguage === Item.id}
              changeActiveLanguage={this.changeActiveLanguage}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
