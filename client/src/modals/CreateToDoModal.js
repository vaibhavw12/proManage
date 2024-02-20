import React, { useState } from 'react'
import styles from './CreateToDoModal.module.css'
import highP from '../assets/icons/high.svg'
import modP from '../assets/icons/mod.svg'
import lowP from '../assets/icons/low.svg'
import addOpt from '../assets/icons/addOpt.svg'
import deleteIcon from '../assets/icons/Delete.svg'

export default function CreateToDoModal({close}) {
    const [options, setOptions] = useState([]);

    const handleAddOption = () => {
        const newOption = {
            id: options.length,
            isChecked: false,
            inputValue: '',
        };
        setOptions([...options, newOption]);
    };

    const handleCheckboxChange = (index) => {
        const updatedOptions = [...options];
        updatedOptions[index].isChecked = !updatedOptions[index].isChecked;
        setOptions(updatedOptions);
    };

    const handleInputChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].inputValue = value;
        setOptions(updatedOptions);
    };

    const handleDeleteOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
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
                            <input type='text' placeholder='Enter Task Title'></input>
                        </div>
                        <div className={styles.priorityBox}>
                            <div className={styles.priorityBox_0}><span className={styles.field}>Select Priority</span><span className={styles.req}>*</span></div>
                            <div className={styles.eachPrority}><img src={highP} alt='high-p'></img><span>HIGH PRIORITY</span></div>
                            <div className={styles.eachPrority}><img src={modP} alt='mod-p'></img><span>MODERATE PRIORITY</span></div>
                            <div className={styles.eachPrority}><img src={lowP} alt='low-p'></img><span>LOW PRIORITY</span></div>
                        </div>
                        <div className={styles.checklist}>
                            <div className={styles.checklist_0}>
                                <span className={styles.field}>Checklist ({options.filter(opt => opt.isChecked).length}/{options.length})</span>
                                <span className={styles.req}>*</span>
                            </div>
                            <div className={styles.optContainer}>
                                {options.map((option, index) => (
                                    <div className={styles.eachOption} key={option.id}>
                                        <input
                                            type="checkbox"
                                            checked={option.isChecked}
                                            onChange={() => handleCheckboxChange(index)}
                                            className={styles.checkbox}
                                        />
                                        <input
                                            type="text"
                                            value={option.inputValue}
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
                            <button>Select Due Date</button>
                        </div>
                        <div className={styles.btns}>
                            <button onClick={()=>close()} className={styles.btnCancel}>Cancel</button>
                            <button className={styles.btnSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
