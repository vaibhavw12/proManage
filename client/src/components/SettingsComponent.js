import React, { useEffect, useState } from 'react';
import stylesMain from './SettingsComponent.module.css';
import styles from '../pages/RegisterPage.module.css';
import lockIcon from '../assets/icons/lockIcon.svg';
import nameIcon from '../assets/icons/nameIcon.svg';
import hiddenActiveIcon from '../assets/icons/hiddenActiveIcon.svg';
import hiddenInactiveIcon from '../assets/images/hiddenInactiveIcon.png';
import { PROFILE, UPDATEPROFILE } from '../apis/EndPoints'
import toast from 'react-hot-toast';
import axios from 'axios';

export default function SettingsComponent() {
  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [profile, setProfile] = useState(null)

  const [updateState, setUpdateState] = useState({
    name: '',
    oldPassword: '',
    newPassword: '',
  });
  useEffect(()=>{
    const fetchProfile = async()=>{
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${PROFILE}${localStorage.getItem("proManage_id")}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'jwttoken': localStorage.getItem("proManage_token")
            }
          }
        );
        setProfile(response.data)
      } catch (error) {
        console.error('Error updating todo section:', error);
      }
    }
    fetchProfile()
  },[])

  const managePasswordView = (field) => {
    if (field === 'oldPassword') {
      setPasswordView((prevState) => !prevState);
    } else if (field === 'newPassword') {
      setConfirmPasswordView((prevState) => !prevState);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdateState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const update = async (e) => {
    e.preventDefault();
    updateState.prevPassword = profile.password
    console.log(updateState);
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}${UPDATEPROFILE}${localStorage.getItem("proManage_id")}`,
        { updateState },
        {
          headers: {
            'Content-Type': 'application/json',
            'jwttoken': localStorage.getItem("proManage_token")
          }
        }
      );
      toast.success('profile updated successfulyy')
    } catch (error) {
      toast.error('something went wrong')
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className={stylesMain.SettingsComponent}>
      <div className={stylesMain.header}>
        <p>Settings</p>
      </div>
      <form className={stylesMain.registerForm} onSubmit={update}>
        <label className={styles.inputLabel}>
          <div>
            <img src={nameIcon} alt='name-icon'></img>
            <input
              placeholder='Name'
              type='text'
              value={updateState.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
        </label>
        <label className={styles.inputLabel}>
          <div>
            <img src={lockIcon} alt='password-icon'></img>
            <input
              placeholder='Old Password'
              type={passwordView ? 'text' : 'password'}
              value={updateState.oldPassword}
              onChange={(e) => handleInputChange('oldPassword', e.target.value)}
            />
            <img
              onClick={() => managePasswordView('oldPassword')}
              src={passwordView ? hiddenActiveIcon : hiddenInactiveIcon}
              alt='toggle-password-icon'
            ></img>
          </div>
        </label>
        <label className={styles.inputLabel}>
          <div>
            <img src={lockIcon} alt='confirm-password-icon'></img>
            <input
              placeholder='New Password'
              type={confirmPasswordView ? 'text' : 'password'}
              value={updateState.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
            />
            <img
              onClick={() => managePasswordView('newPassword')}
              src={confirmPasswordView ? hiddenActiveIcon : hiddenInactiveIcon}
              alt='toggle-confirm-password-icon'
            ></img>
          </div>
        </label>
        <button className={styles.btnReg} type='submit'>
          Update
        </button>
      </form>
    </div>
  );
}
