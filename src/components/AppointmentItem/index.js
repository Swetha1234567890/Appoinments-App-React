// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickToggle = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-item-container">
      <div className="header-container">
        <p className="name">{title}</p>
        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={onClickToggle}
        >
          <img src={starredImgUrl} className="stars" alt="star" />
        </button>
      </div>
      <p className="apt-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
