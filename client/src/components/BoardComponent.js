import React, { useState } from 'react'
import styles from '../pages/HomePage.module.css'
import filterIcon from '../assets/icons/filter.svg'
import CardSectionComponent from './CardSectionComponent';

export default function BoardComponent() {
    const today = new Date();
    const formattedDate = `${today.getDate()}${['th', 'st', 'nd', 'rd'][(today.getDate() % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][today.getDate()] || 'th'} ${today.toLocaleString('default', { month: 'short' })}, ${today.getFullYear()}`;
    const [selectedOption, setSelectedOption] = useState('This Week');
    const [showOptions, setShowOptions] = useState(false);
    const options = ['Today', 'This Week', 'This Month'];
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
    };
    return (
        <div>
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
            <div className={styles.BoardComponentBody}>
                <div>
                    <div className={styles.containerTypes}>
                        <CardSectionComponent name={"Backlog"} />
                        <CardSectionComponent name={"To do"} />
                        <CardSectionComponent name={"In Progress"} />
                        <CardSectionComponent name={"Done"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
