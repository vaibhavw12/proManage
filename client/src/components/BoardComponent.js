import React, { useEffect, useState } from 'react'
import styles from '../pages/HomePage.module.css'
import filterIcon from '../assets/icons/filter.svg'
import CardSectionComponent from './CardSectionComponent';
import axios from 'axios'
import { GETTODO } from '../apis/EndPoints'
import { useDispatch, useSelector } from 'react-redux';
import { setBacklog, setToDo, setProgress, setDone } from '../redux/slices/ToDosSlices'

export default function BoardComponent() {

    const dispatch = useDispatch()
    const update = useSelector((state) => state.todo_type.update)
    const backlogTodos = useSelector((state) => state.todo_type.backlog)
    const todoTodos = useSelector((state) => state.todo_type.todo)
    const inProgressTodos = useSelector((state) => state.todo_type.progress)
    const doneTodos = useSelector((state) => state.todo_type.done)
    const today = new Date();
    const formattedDate = `${today.getDate()}${['th', 'st', 'nd', 'rd'][(today.getDate() % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][today.getDate()] || 'th'} ${today.toLocaleString('default', { month: 'short' })}, ${today.getFullYear()}`;
    const [selectedOption, setSelectedOption] = useState('This Week');
    const [showOptions, setShowOptions] = useState(false);
    const options = ['Today', 'This Week', 'This Month'];
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
    };
    const getTodosBySection = async (section, option) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${GETTODO}/${section}/todos`, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': localStorage.getItem("proManage_token"),
                },
                params: {
                    userId: localStorage.getItem("proManage_id"),
                    option
                }
            });
            return response.data.todos;
        } catch (error) {
            console.error(`Error fetching ${section} todos:`, error);
            return [];
        }
    };
    const getAllToDos = async () => {
        const backlogTodos = await getTodosBySection('Backlog', selectedOption);
        const todoTodos = await getTodosBySection('ToDo', selectedOption);
        const inProgressTodos = await getTodosBySection('Inprogress', selectedOption);
        const doneTodos = await getTodosBySection('Done', selectedOption);
        dispatch(setBacklog(backlogTodos))
        dispatch(setToDo(todoTodos))
        dispatch(setProgress(inProgressTodos))
        dispatch(setDone(doneTodos))
    }

    useEffect(() => {
        getAllToDos()
    }, [selectedOption, update])

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
                        <CardSectionComponent name={"Backlog"} todos={backlogTodos} />
                        <CardSectionComponent name={"To do"} todos={todoTodos} />
                        <CardSectionComponent name={"In Progress"} todos={inProgressTodos} />
                        <CardSectionComponent name={"Done"} todos={doneTodos} />
                    </div>
                </div>
            </div>
        </div>
    )
}
