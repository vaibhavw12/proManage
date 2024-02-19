import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'
import appIcon from '../assets/icons/codesandbox.svg'
import boardIcon from '../assets/icons/board.svg'
import analyticsIcon from '../assets/icons/analytics.svg'
import settingsIcon from '../assets/icons/settings.svg'
import logoutIcon from '../assets/icons/Logout.svg'
import filterIcon from '../assets/icons/filter.svg'

export default function HomePage() {

  const navigate = useNavigate()
  const today = new Date();
  const formattedDate = `${today.getDate()}${['th', 'st', 'nd', 'rd'][(today.getDate() % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][today.getDate()] || 'th'} ${today.toLocaleString('default', { month: 'short' })}, ${today.getFullYear()}`;
  useEffect(() => {
    if (localStorage.getItem("proManage_name".length < 1) || (localStorage.getItem("proManage_token".length < 1))) {
      navigate('/register')
    }
  }, [navigate])
  const [selectedOption, setSelectedOption] = useState('This Week');
  const [showOptions, setShowOptions] = useState(false);
  const options = ['Today', 'This Week', 'This Month'];
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };
  return (
    <div className={styles.HomePage}>
      <div className={styles.leftSection}>
        <div>
          <div className={styles.leftSectionUpper}>
            <div className={styles.appHeader}>
              <img src={appIcon} alt='board-icon'></img>
              <span className={styles.appName}>Pro Manage</span>
            </div>
            <div>
              <img src={boardIcon} alt='board-icon'></img>
              <span>Board</span>
            </div>
            <div>
              <img src={analyticsIcon} alt='analytics-icon'></img>
              <span>Analytics</span>
            </div>
            <div>
              <img src={settingsIcon} alt='settings-icon'></img>
              <span>Settings</span>
            </div>
          </div>
          <div className={styles.leftSectionLower}>
            <div>
              <img src={logoutIcon} alt='logout-icon'></img>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div>
          <div className={styles.rightSectionHeader}>
            <div>
              <p className={styles.userName}>Welcome! {localStorage.getItem("proManage_name")}</p>
              <span className={styles.activeTab}>Board</span>
            </div>
            <div className={styles.rightSectionHeader_right}>
              <p className={styles.date}>{formattedDate}</p>
              <div>
                <p className={styles.filter} onClick={() => setShowOptions(!showOptions)}>
                  {selectedOption} <img src={filterIcon} alt='filter-icon' />
                </p>
                {showOptions && (
                  <div className={styles.optionsAll}>
                    {options.map((option) => (
                      <div key={option} onClick={() => handleOptionClick(option)}>
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
