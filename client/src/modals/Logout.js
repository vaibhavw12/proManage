import React from 'react'
import styles from './DeleteModal.module.css'
import { useNavigate } from 'react-router-dom'

export default function Logout({ close }) {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("proManage_name")
        localStorage.removeItem("proManage_token")
        localStorage.removeItem("proManage_id")
        navigate('/register')
    }
    return (
        <div className={styles.deleteContainer}>
            <div className={styles.deleteContent}>
                <div className={styles.deleteInnerContent}>
                    <div>
                        <p className={styles.deleteHeader}>Are you sure you want to Logout??</p>
                        <div className={styles.deleteModalBtns}>
                            <button onClick={logout} className={styles.deleteBtn}>Yes, Logout</button>
                            <button onClick={() => close()} className={styles.cancleBtn}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
