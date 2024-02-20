import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'
import appIcon from '../assets/icons/codesandbox.svg'
import boardIcon from '../assets/icons/board.svg'
import analyticsIcon from '../assets/icons/analytics.svg'
import settingsIcon from '../assets/icons/settings.svg'
import logoutIcon from '../assets/icons/Logout.svg'
import BoardComponent from '../components/BoardComponent'

export default function HomePage() {

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("proManage_name".length < 1) || (localStorage.getItem("proManage_token".length < 1))) {
      navigate('/register')
    }
  }, [navigate])
  
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
        <BoardComponent />
      </div>
    </div>
  )
}
