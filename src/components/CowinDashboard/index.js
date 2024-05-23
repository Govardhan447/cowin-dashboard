import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const urlConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysvaccinationList: '',
    vaccinationByageList: '',
    vaccinationByGenderList: '',
    urlStatus: urlConstant.initial,
  }

  componentDidMount() {
    this.getVaccinationList()
  }

  getVaccinationList = async () => {
    this.setState({urlStatus: urlConstant.inProgress})

    const options = {
      method: 'GET',
    }

    const response = await fetch(
      'https://apis.ccbp.in/covid-vaccination-data',
      options,
    )
    const data = await response.json()

    console.log(data)

    if (response.ok === true) {
      this.setState({
        last7DaysvaccinationList: data.last_7_days_vaccination,
        vaccinationByageList: data.vaccination_by_age,
        vaccinationByGenderList: data.vaccination_by_gender,
        urlStatus: urlConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({urlStatus: urlConstant.failure})
    }
  }

  getTopHeading = () => (
    <div className="logo-heading-container">
      <div className="logo-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
        />
        <h1 className="heading">Co-WIN</h1>
      </div>
      <h1 className="heading">Co-WIN Vaccination in india</h1>
    </div>
  )

  render() {
    const {
      last7DaysvaccinationList,
      vaccinationByageList,
      vaccinationByGenderList,
    } = this.state
    const {urlStatus} = this.state
    console.log(urlStatus)
    switch (urlStatus) {
      case urlConstant.success:
        return (
          <div className="bg-container">
            {this.getTopHeading()}
            <div className="vaccination-container">
              <h1 className="paragraph">Vaccination Coverage</h1>
              <VaccinationCoverage
                vaccinationCoverageDetails={last7DaysvaccinationList}
              />
            </div>
            <div className="vaccination-container">
              <h1 className="paragraph">Vaccination by gender</h1>
              <VaccinationByGender
                vaccinationByGenderDetails={vaccinationByGenderList}
              />
            </div>
            <div className="vaccination-container">
              <h1 className="paragraph">Vaccination by Age</h1>
              <VaccinationByAge vaccinationAgeDetails={vaccinationByageList} />
            </div>
          </div>
        )

      case urlConstant.failure:
        return (
          <div className="bg-container">
            {this.getTopHeading()}
            <div>
              <img
                className="failure-img"
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
              />
              <p className="error">Something went wrong</p>
            </div>
          </div>
        )

      case urlConstant.inProgress:
        return (
          <div className="bg-container">
            {this.getTopHeading()}
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
            </div>
          </div>
        )
      default:
        return null
    }
  }
}
export default CowinDashboard
