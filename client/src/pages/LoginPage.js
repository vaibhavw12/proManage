import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import Icon_1 from '../assets/icons/Group.svg';
import emailIcon from '../assets/icons/emailIcon.svg'
import lockIcon from '../assets/icons/lockIcon.svg'
import hiddenActiveIcon from '../assets/icons/hiddenActiveIcon.svg'
import hiddenInactiveIcon from '../assets/images/hiddenInactiveIcon.png'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../apis/EndPoints'
import toast from 'react-hot-toast';
import axios from 'axios'

export default function LoginPage() {
  const [passwordView, setPasswordView] = useState(false);
  const navigate = useNavigate()

  const managePasswordView = () => {
    setPasswordView((prevState) => !prevState);
  };

  const goToRegister = () => {
    navigate('/register')
  }

  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setLoginState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}${LOGIN}`, loginState)
        .then((res) => {
          console.log(res.data)
          if (res.data.status === "SUCCESS") {
            localStorage.setItem("proManage_name", res.data.name)
            localStorage.setItem("proManage_token", res.data.token)
            localStorage.setItem("proManage_id", res.data.id)
            setLoginState({
              email: '',
              password: '',
            });
            toast.success("you have logged in successfully!")
            navigate('/')
          } else {
            toast.error(res.data.message)
          }
        })
    } catch (error) {
      toast.error('some thing went wrong, please try again.')
      console.log(error);
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
          <span>Login</span>
          <form className={styles.registerForm} onSubmit={handleLoginSubmit}>
            <label className={styles.inputLabel}>
              <div>
                <img src={emailIcon} alt='name-icon'></img>
                <input
                  placeholder='Email'
                  type="email"
                  value={loginState.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </label>
            <label className={styles.inputLabel}>
              <div>
                <img src={lockIcon} alt='name-icon'></img>
                <input
                  placeholder='Password'
                  type={passwordView ? 'text' : 'password'}
                  value={loginState.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <img className={styles.passIcon} onClick={() => managePasswordView('password')} src={passwordView ? hiddenActiveIcon : hiddenInactiveIcon} alt='toggle-password-icon'></img>
              </div>
            </label>
            <button className={styles.btnReg} type="submit">Login</button>
            <div>Have no account yet?</div>
            <button onClick={goToRegister} className={styles.btnLog}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

