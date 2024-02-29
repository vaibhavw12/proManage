import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import appIcon from '../assets/icons/codesandbox.svg';
import boardIcon from '../assets/icons/board.svg';
import analyticsIcon from '../assets/icons/analytics.svg';
import settingsIcon from '../assets/icons/settings.svg';
import logoutIcon from '../assets/icons/Logout.svg';
import BoardComponent from '../components/BoardComponent';
import AnalyticsComponent from '../components/AnalyticsComponent';
import SettingsComponent from '../components/SettingsComponent';
import { useDispatch, useSelector } from 'react-redux'; 
import { setBoard, setAnalytics, setSettings } from '../redux/slices/activeTab'
import Logout from '../modals/Logout';

export default function HomePage() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const board = useSelector((state)=>state.tabs.board)
  const analytics = useSelector((state)=>state.tabs.analytics)
  const settings = useSelector((state)=>state.tabs.settings)
  const [logoutModal ,setLogoutModal] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('proManage_name') || !localStorage.getItem('proManage_token')) {
      navigate('/register');
    }
  }, [navigate]);

  const handleComponentChange = (tab) => {
    if(tab === 'board'){
      dispatch(setBoard(true))
    }if(tab === 'analytics'){
      dispatch(setAnalytics(true))
    }if(tab === 'settings'){
      dispatch(setSettings(true))
    }
  };

  const logout = ()=>{
    setLogoutModal(true)
  }

  return (
    <div className={styles.HomePage}>
      <div className={styles.leftSection}>
        <div>
          <div className={styles.leftSectionUpper}>
            <div className={styles.appHeader}>
              <img src={appIcon} alt='board-icon'></img>
              <span className={styles.appName}>Pro Manage</span>
            </div>
            <div style={ board ? {background:'rgba(67, 145, 237, 0.1)'} : {}} className={styles.componentHover} onClick={() => handleComponentChange('board')}>
              <img src={boardIcon} alt='board-icon'></img>
              <span>Board</span>
            </div>
            <div style={ analytics ? {background:'rgba(67, 145, 237, 0.1)'} : {}} className={styles.componentHover} onClick={() => handleComponentChange('analytics')}>
              <img src={analyticsIcon} alt='analytics-icon'></img>
              <span>Analytics</span>
            </div>
            <div style={ settings ? {background:'rgba(67, 145, 237, 0.1)'} : {}} className={styles.componentHover} onClick={() => handleComponentChange('settings')}>
              <img src={settingsIcon} alt='settings-icon'></img>
              <span>Settings</span>
            </div>
          </div>
          <div className={styles.leftSectionLower}>
            <div className={styles.componentHover} onClick={() => handleComponentChange('logout')}>
              <img src={logoutIcon} alt='logout-icon'></img>
              <span onClick={logout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        {board && <BoardComponent />}
        {analytics && <AnalyticsComponent />}
        {settings && <SettingsComponent />}
      </div>
      {
        logoutModal && <Logout close={()=>setLogoutModal(false)} />
      }
    </div>
  );
}
