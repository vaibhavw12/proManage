import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SHAREDTODO } from '../apis/EndPoints'
import styles from './PublicToDo.module.css'
import appIcon from '../assets/icons/codesandbox.svg';
import highP from '../assets/icons/high.svg';
import modP from '../assets/icons/mod.svg';
import lowP from '../assets/icons/low.svg';

export default function PublicToDo() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${SHAREDTODO}${id}`);
                console.log(response.data)
                setTodo(response.data.todo)
            } catch (error) {
                console.error('Error fetching public link:', error);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div className={styles.PublicToDo}>
            <div className={styles.header}>
                <img src={appIcon} alt='app-icon'></img>
                <p>Pro Manage</p>
            </div>
            {
                todo && <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <div className={styles.priority}>
                                {todo.priority === 'HIGH PRIORITY' && <img src={highP} alt='high-priority' />}
                                {todo.priority === 'MODERATE PRIORITY' && <img src={modP} alt='moderate-priority' />}
                                {todo.priority === 'LOW PRIORITY' && <img src={lowP} alt='low-priority' />}
                                <p>{todo.priority}</p>
                            </div>

                            <div className={styles.title}>
                                <span>{todo.title}</span>
                            </div>
                            <div className={styles.checklist}>
                                <p>Checklist ({todo.checkList.filter(item => item.isChecked).length}/{todo.checkList.length})</p>
                                <div>
                                    {todo.checkList.map((opt, index) => (
                                        <div key={index} className={styles.each}>
                                            <input className={styles.checkBox} type='checkbox' checked={opt.isChecked} readOnly />
                                            <input className={styles.inputBox} type='text' value={opt.description} readOnly />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {todo.dueDate !== null && (
                                <div className={styles.dueDate}>
                                    <p>Due Date</p>
                                    <button>{todo.dueDate}th</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
