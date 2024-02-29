import React, { useState, useEffect } from 'react'
import styles from './EachToDo.module.css'
import highP from '../assets/icons/high.svg';
import modP from '../assets/icons/mod.svg';
import lowP from '../assets/icons/low.svg';
import more from '../assets/icons/more.svg'
import arrowDown from '../assets/icons/Arrow - Down 3.svg'
import axios from 'axios'
import { UPDATECHECKLIST, UPDATESECTION } from '../apis/EndPoints'
import { useSelector, useDispatch } from 'react-redux';
import { setUpdate } from '../redux/slices/ToDosSlices'
import DeleteModal from '../modals/DeleteModal';
import toast from 'react-hot-toast';
import CreateToDoModal from '../modals/CreateToDoModal';

export default function EachToDo({ todo }) {

    // bug checklist is not getting updated on real time eveything else is getting
    const dispatch = useDispatch()
    const collapseAll = useSelector((state) => state.todo_type.collapse)
    const update = useSelector((state) => state.todo_type.update)
    useEffect(() => {
        setShowChecklist(false)
        // console.log(todo.checkList)
    }, [collapseAll, update])
    const { inSection, dueDate, checkList } = todo;
    const [showChecklist, setShowChecklist] = useState(false);
    const [checkListLocal, setCheckListLocal] = useState(checkList);
    const handleToggleChecklist = () => {
        setShowChecklist(!showChecklist);
    };
    const priorityImages = {
        'HIGH PRIORITY': highP,
        'MODERATE PRIORITY': modP,
        'LOW PRIORITY': lowP
    };
    const handleSectionClick = async (clickedSection) => {
        try {
            await axios.patch(
                `${process.env.REACT_APP_BASE_URL}${UPDATESECTION}${todo._id}`,
                { inSection: clickedSection },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': localStorage.getItem("proManage_token")
                    }
                }
            );
            dispatch(setUpdate())
            toast.success(`Todo moved to section: ${clickedSection}`);
        } catch (error) {
            console.error('Error updating todo section:', error);
        }
    };
    const renderSections = () => {
        const sectionNames = {
            'Backlog': 'BACKLOG',
            'ToDo': 'TO-DO',
            'Inprogress': 'PROGRESS',
            'Done': 'DONE'
        };
        const otherSections = Object.keys(sectionNames).filter(section => section !== inSection);
        return otherSections.map((section) => (
            <span key={section} className={styles.sectionButton} onClick={() => handleSectionClick(section)}>
                {sectionNames[section]}
            </span>
        ));
    };
    const [isDue, setIsDue] = useState(false);
    const [background, setBackground] = useState('');
    const [textColor, setTextColor] = useState('')
    useEffect(() => {
        const checkIsDue = () => {
            if (dueDate) {
                const currentDate = new Date();
                const dueDateParts = dueDate.split(' ');
                const month = dueDateParts[0];
                const day = parseInt(dueDateParts[1]);
                const dueDateObject = new Date(currentDate.getFullYear(), monthIndex(month), day);
                setIsDue(dueDateObject < currentDate);
            } else {
                setIsDue(false);
            }
        };

        const monthIndex = (month) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.indexOf(month);
        };

        const updateBackground = () => {
            if (inSection === 'Done') {
                setBackground('rgba(99, 192, 91, 1)');
                setTextColor('rgba(255, 255, 255, 1)')
            } else if (isDue) {
                setBackground('rgba(207, 54, 54, 1)');
                setTextColor('rgba(255, 255, 255, 1)')
            } else {
                setBackground('');
                setTextColor('')
            }
        };

        checkIsDue();
        updateBackground();
    }, [dueDate, inSection, isDue]);

    const handleCheckboxChange = async (index) => {
        setCheckListLocal(prevChecklist => {
            const updatedChecklist = [...prevChecklist];
            updatedChecklist[index] = { ...updatedChecklist[index], isChecked: !updatedChecklist[index].isChecked };
            (async () => {
                try {
                    await axios.patch(
                        `${process.env.REACT_APP_BASE_URL}${UPDATECHECKLIST}${todo._id}`,
                        { checkList: updatedChecklist },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'jwttoken': localStorage.getItem("proManage_token")
                            }
                        }
                    );
                } catch (error) {
                    console.error('Error updating checklist:', error);
                }
            })();
            return updatedChecklist;
        });
    };
    const [showOptions, setShowOptions] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateToDo, setUpdateToDO] = useState(false)
    const options = ['Edit', 'Share', 'Delete'];
    const handleOptionClick = async (option) => {
        setShowOptions(false);
        if (option === 'Delete') {
            setDeleteModal(true)
        } else if (option === 'Share') {
            try {
                const linkToCopy = `${process.env.REACT_APP_CLIENT_URL}/shared-todo/${todo._id}`
                await navigator.clipboard.writeText(linkToCopy);
                toast.success('Link copied successfully');
            } catch (error) {
                console.error('Unable to copy to clipboard', error);
            }
        } else {
            setUpdateToDO(true)
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.EachToDo}>
                <div className={styles.header}>
                    <div className={styles.prorityBox}><img src={priorityImages[todo.priority]} alt='card-priority'></img><p className={styles.prioritytext}>{todo.priority}</p></div>
                    <div className={styles.moreContainer}>
                        <img className={styles.filter} onClick={() => setShowOptions(!showOptions)} src={more} alt='more-icon'></img>
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
                <div className={styles.title}>
                    <span>{todo.title}</span>
                </div>
                <div className={styles.checklist}>
                    <span>Checklist({checkListLocal.filter(item => item.isChecked).length}/{checkListLocal.length})</span>
                    <img className={styles.hover} src={arrowDown} alt='arrow-icon' onClick={handleToggleChecklist} />
                </div>
                <div style={{ opacity: showChecklist ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }} className={styles.checklistContent}>
                    {showChecklist && checkListLocal && checkListLocal.map((item, index) => (
                        <div className={styles.opt} key={index}>
                            <input
                                type="checkbox"
                                checked={item.isChecked}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <span>{item.description}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.sections}>
                    <div className={styles.sec_1}>
                        {dueDate && <p style={{ background: background, color: textColor }} className={styles.dueDate}>{dueDate}</p>}
                    </div>
                    <div className={styles.sec_2}>
                        {renderSections()}
                    </div>
                </div>
            </div>
            {
                deleteModal && <DeleteModal close={() => setDeleteModal(false)} deleteById={todo._id} />
            }
            {
                updateToDo && <CreateToDoModal UpdateToDo={todo} close={() => setUpdateToDO(false)} />
            }
        </div>
    )
}
