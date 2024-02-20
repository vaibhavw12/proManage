import React from 'react'
import styles from './CreateToDoModal.module.css'
import highP from '../assets/icons/high.svg'
import modP from '../assets/icons/mod.svg'
import lowP from '../assets/icons/low.svg'

export default function CreateToDoModal() {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalInnerContent}>
                    <div className={styles.textBox}>
                        <div>
                            <span className={styles.field}>Title</span><span className={styles.req}>*</span>
                        </div>
                        <input type='text' placeholder='Enter Task Title'></input>
                    </div>
                    <div className={styles.priorityBox}>
                        <div className={styles.priorityBox_0}><span className={styles.field}>Select Priority</span><span className={styles.req}>*</span></div>
                        <div className={styles.eachPrority}><img src={highP} alt='high-p'></img><span>HIGH PRIORITY</span></div>
                        <div className={styles.eachPrority}><img src={modP} alt='mod-p'></img><span>MODERATE PRIORITY</span></div>
                        <div className={styles.eachPrority}><img src={lowP} alt='low-p'></img><span>LOW PRIORITY</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
