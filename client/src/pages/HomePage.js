import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {

  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("proManage_name".length < 1) || (localStorage.getItem("proManage_token".length < 1))){
      navigate('/register')
    }
  },[navigate])
  return (
    <div className={styles.HomePage}>
      
    </div>
  )
}
