import React, { useState, useRef, useEffect } from 'react';
import styles from './CreateToDoModal.module.css';
import highP from '../assets/icons/high.svg';
import modP from '../assets/icons/mod.svg';
import lowP from '../assets/icons/low.svg';
import addOpt from '../assets/icons/addOpt.svg';
import deleteIcon from '../assets/icons/Delete.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setUpdate } from '../redux/slices/ToDosSlices'
import { CREATETODO, UPDATETODO } from '../apis/EndPoints'

export default function CreateToDoModal({ close, UpdateToDo }) {
    // console.log(UpdateToDo)

    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [options, setOptions] = useState([]);
    const [date, setDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        if (UpdateToDo) {
            setTitle(UpdateToDo.title);
            setPriority(UpdateToDo.priority);
            setOptions(UpdateToDo.checkList);
            const originalDate = new Date(UpdateToDo.dueDate);
            originalDate.setFullYear(2024);
            setDate(UpdateToDo.dueDate ? originalDate : null);
            handlePriorityClick(UpdateToDo.priority)
        }
    }, [UpdateToDo]);

    const onChange = (newDate) => {
        setDate(newDate);
        setShowCalendar(false);
    };

    const handleDeleteOption = (index) => {
        console.log('Before Delete:', options);
        const updatedOptions = options.filter((option, i) => i !== index);
        setOptions(updatedOptions);
        console.log('After Delete:', updatedOptions);
    };

    const handleAddOption = () => {
        const newOption = {
            id: options.length,
            isChecked: false,
            description: '',
        };
        setOptions([...options, newOption]);
    };


    const handleCheckboxChange = (index) => {
        // const updatedOptions = [...options];
        // updatedOptions[index].isChecked = !updatedOptions[index].isChecked;
        // setOptions(updatedOptions);
        const updatedOptions = options.map(option => ({ ...option }));
        updatedOptions[index].isChecked = !updatedOptions[index].isChecked;
        setOptions(updatedOptions);
    };

    const handleInputChange = (index, value) => {
        // const updatedOptions = [...options];
        // updatedOptions[index].description = value;
        // setOptions(updatedOptions);
        const updatedOptions = options.map(option => ({ ...option }));
        updatedOptions[index].description = value;
        setOptions(updatedOptions);
    };

    // const handleDeleteOption = (index) => {
    //     console.log(index)
    //     const updatedOptions = options.filter((option, i) => i !== index);
    //     setOptions(updatedOptions);
    //     console.log(options)
    // };

    const handlePriorityClick = (selectedPriority) => {
        switch (selectedPriority) {
            case 'HIGH':
                setPriority('HIGH PRIORITY');
                break;
            case 'MODERATE':
                setPriority('MODERATE PRIORITY');
                break;
            case 'LOW':
                setPriority('LOW PRIORITY');
                break;
            case 'HIGH PRIORITY':
                setPriority('HIGH PRIORITY');
                break;
            case 'MODERATE PRIORITY':
                setPriority('MODERATE PRIORITY');
                break;
            case 'LOW PRIORITY':
                setPriority('LOW PRIORITY');
                break;
            default:
                setPriority('');
                break;
        }
    };

    const formatDate = (date) => {
        const options = { month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleSave = async () => {
        if (!title) {
            toast.error("Please fill in the title");
            return;
        }
        if (!priority) {
            toast.error("Please select a priority");
            return;
        }
        const hasAtLeastOneInputFilled = options.some(opt => opt.description.trim() !== '');
        if (!hasAtLeastOneInputFilled) {
            toast.error("Please fill in at least one checklist item");
            return;
        }
        const hasEmptyChecklistItem = options.some(opt => opt.description.trim() === '');
        if (hasEmptyChecklistItem) {
            toast.error("Checklist items cannot be empty");
            return;
        }
        const formattedDate = date ? formatDate(date) : null;
        const todoObj = {
            title,
            priority,
            checkList: options.map(opt => ({ description: opt.description, isChecked: opt.isChecked })),
            dueDate: formattedDate,
            inSection: 'ToDo',  // by defualt its in todo
            createdBy: localStorage.getItem("proManage_id")
        };
        try {
            await axios.post(
                `${process.env.REACT_APP_BASE_URL}${CREATETODO}`,
                todoObj, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': localStorage.getItem("proManage_token"),
                }
            }
            );
            dispatch(setUpdate())
            toast.success('to do created successfully.');
            close()
        } catch (error) {
            toast.error('something went wrong, please try again.');
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        const formattedDate = date ? formatDate(date) : null;
        if (!title) {
            toast.error("Please fill in the title");
            return;
        }
        const hasAtLeastOneInputFilled = options.some(opt => opt.description.trim() !== '');
        if (!hasAtLeastOneInputFilled) {
            toast.error("Please fill in at least one checklist item");
            return;
        }
        const hasEmptyChecklistItem = options.some(opt => opt.description.trim() === '');
        if (hasEmptyChecklistItem) {
            toast.error("Checklist items cannot be empty");
            return;
        }
        const updatetodoObj = {
            title,
            priority,
            checkList: options.map(opt => ({ description: opt.description, isChecked: opt.isChecked })),
            dueDate: formattedDate,
        };
        console.log(updatetodoObj)
        try {
            await axios.patch(
                `${process.env.REACT_APP_BASE_URL}${UPDATETODO}${UpdateToDo._id}`,
                updatetodoObj,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': localStorage.getItem("proManage_token"),
                    },
                }
            );
            dispatch(setUpdate())
            toast.success('Todo updated successfully.');
            close();
        } catch (error) {
            toast.error('Something went wrong, please try again.');
            console.error(error);
        }
    }

    const formatReqDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalInnerContent}>
                    <div>
                        <div className={styles.textBox}>
                            <div>
                                <span className={styles.field}>Title</span><span className={styles.req}>*</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Enter Task Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className={styles.priorityBox}>
                            <div className={styles.priorityBox_0}>
                                <span className={styles.field}>Select Priority</span>
                                <span className={styles.req}>*</span>
                            </div>
                            <div
                                className={`${styles.eachPrority} ${priority === 'HIGH PRIORITY' ? styles.selected : ''}`}
                                onClick={() => handlePriorityClick('HIGH')}
                            >
                                <img src={highP} alt='high-p' />
                                <span>HIGH PRIORITY</span>
                            </div>
                            <div
                                className={`${styles.eachPrority} ${priority === 'MODERATE PRIORITY' ? styles.selected : ''}`}
                                onClick={() => handlePriorityClick('MODERATE')}
                            >
                                <img src={modP} alt='mod-p' />
                                <span>MODERATE PRIORITY</span>
                            </div>
                            <div
                                className={`${styles.eachPrority} ${priority === 'LOW PRIORITY' ? styles.selected : ''}`}
                                onClick={() => handlePriorityClick('LOW')}
                            >
                                <img src={lowP} alt='low-p' />
                                <span>LOW PRIORITY</span>
                            </div>
                        </div>
                        <div className={styles.checklist}>
                            <div className={styles.checklist_0}>
                                <span className={styles.field}>Checklist ({options.filter(opt => opt.isChecked).length}/{options.length})</span>
                                <span className={styles.req}>*</span>
                            </div>
                            <div className={styles.optContainer}>
                                {options.map((option, index) => (
                                    <div key={index} className={styles.eachOption}>
                                        <input
                                            type="checkbox"
                                            checked={option.isChecked}
                                            onChange={() => handleCheckboxChange(index)}
                                            className={styles.checkbox}
                                        />
                                        <input
                                            type="text"
                                            value={option.description}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className={styles.textOptBox}
                                            placeholder='Add a task'
                                        />
                                        <img
                                            src={deleteIcon}
                                            alt='delete-icon'
                                            onClick={() => handleDeleteOption(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.addOpt} onClick={handleAddOption}>
                                <img src={addOpt} alt='add-opt-icon' />
                                <span>Add New</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.date}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCalendar(!showCalendar);
                                }}
                                className={showCalendar ? `${styles.active}` : ''}
                            >
                                {date ? formatReqDate(date) : 'Select Due Date'}
                            </button>
                            {showCalendar && (
                                <div ref={calendarRef} className={`${styles.calendar} ${styles.reactCalendar}`}>
                                    <Calendar
                                        onChange={onChange}
                                        value={date}
                                        minDate={new Date()}
                                    />
                                    <div className={styles.calendarButtons}>
                                        <span onClick={() => { setDate(null); setShowCalendar(false); }}>Clear</span>
                                        <span onClick={() => { setDate(new Date()); setShowCalendar(false); }}>Today</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.btns}>
                            <button onClick={() => close()} className={styles.btnCancel}>Cancel</button>
                            {
                                !UpdateToDo ?
                                    <button onClick={handleSave} className={styles.btnSave}>Save</button>
                                    :
                                    <button onClick={handleUpdate} className={styles.btnSave}>Update</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
