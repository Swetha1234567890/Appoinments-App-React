// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApt => {
        if (id === eachApt.id) {
          return {...eachApt, isStarred: !eachApt.isStarred}
        }
        return eachApt
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dateformat = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppointment = {
      id: v4(),
      title,
      date: dateformat,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  getStarredAppointments = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentsList = this.getStarredAppointments()
    return (
      <div className="background">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="container">
            <form className="form" onSubmit={this.onAddAppointment}>
              <div className="sub-container">
                <div className="input-container">
                  <label htmlFor="titleInput" className="title-heading">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="title"
                    placeholder="Title"
                    id="titleInput"
                    value={title}
                    onChange={this.onChangeTitleInput}
                  />
                  <label htmlFor="dateInput" className="date-heading">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="date"
                    placeholder="dd/mm/yyyy"
                    id="dateInput"
                    value={date}
                    onChange={this.onChangeDateInput}
                  />
                  <button className="add-btn" type="submit">
                    Add
                  </button>
                </div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                  className="image"
                  alt="appointments"
                />
              </div>
            </form>
          </div>
          <hr className="line" />
          <div className="appointments-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`star ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filterAppointmentsList.map(eachApt => (
              <AppointmentItem
                key={eachApt.id}
                appointmentDetails={eachApt}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
