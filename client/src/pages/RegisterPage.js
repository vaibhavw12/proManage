import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import Icon_1 from '../assets/icons/Group.svg';
import emailIcon from '../assets/icons/emailIcon.svg'
import lockIcon from '../assets/icons/lockIcon.svg'
import nameIcon from '../assets/icons/nameIcon.svg'
import hiddenActiveIcon from '../assets/icons/hiddenActiveIcon.svg'
import hiddenInactiveIcon from '../assets/images/hiddenInactiveIcon.png'
import { useNavigate } from 'react-router-dom'
import { REGISTER } from '../apis/EndPoints'
import toast from 'react-hot-toast';
import axios from 'axios'

export default function RegisterPage() {
  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const navigate = useNavigate()

  const managePasswordView = (field) => {
    if (field === 'password') {
      setPasswordView((prevState) => !prevState);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordView((prevState) => !prevState);
    }
  };

  const goToLogin = () => {
    navigate('/login')
  }

  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    if (registerState.password === registerState.confirmPassword) {
      try {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}${REGISTER}`, registerState)
          .then((res) => {
            console.log(res.data)
            if (res.data.status === "SUCCESS") {
              setRegisterState({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              });
              toast.success("you have register successfully!")
              navigate('/login')
            } else {
              toast.error('some thing went wrong, please try again.')
            }
          })
      } catch (error) {
        console.log(error);
      }
    }else{
      toast.error("Passwords do not match, Please check and try again.")
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <div className={styles.leftSection}>
        <div className={styles.leftSectionContainer}>
          <img src={Icon_1} alt='icon-1'></img>
          <span className={styles.leftSectionContainer_ele1}>Welcome aboard my friend</span>
          <span className={styles.leftSectionContainer_ele2}>Just a couple of clicks and we start</span>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightSectionContainer}>
          <span>Register</span>
          <form className={styles.registerForm} onSubmit={handleRegisterSubmit}>
            <label className={styles.inputLabel}>
              <div>
                <img src={nameIcon} alt='name-icon'></img>
                <input
                  placeholder='Name'
                  type="text"
                  value={registerState.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
            </label>
            <label className={styles.inputLabel}>
              <div>
                <img src={emailIcon} alt='name-icon'></img>
                <input
                  placeholder='Email'
                  type="email"
                  value={registerState.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </label>
            <label className={styles.inputLabel}>
              <div>
                <img src={lockIcon} alt='name-icon'></img>
                <input
                  placeholder='Password'
                  type={passwordView ? 'text' : 'password'}
                  value={registerState.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <img onClick={() => managePasswordView('password')} src={passwordView ? hiddenActiveIcon : hiddenInactiveIcon} alt='toggle-password-icon'></img>
              </div>
            </label>
            <label className={styles.inputLabel}>
              <div>
                <img src={lockIcon} alt='name-icon'></img>
                <input
                  placeholder='Confirm Password'
                  type={confirmPasswordView ? 'text' : 'password'}
                  value={registerState.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
                <img onClick={() => managePasswordView('confirmPassword')} src={confirmPasswordView ? hiddenActiveIcon : hiddenInactiveIcon} alt='toggle-confirm-password-icon'></img>
              </div>
            </label>
            <button className={styles.btnReg} type="submit">Register</button>
            <div>Have an account ?</div>
            <button onClick={goToLogin} className={styles.btnLog}>Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

