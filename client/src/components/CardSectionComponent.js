import React, { useState } from 'react'
import styles from './CardSectionComponent.module.css'
import collapseAllIcon from '../assets/icons/codicon_collapse-all.svg'
import addToDos from '../assets/icons/addToDos.svg'
import CreateToDoModal from '../modals/CreateToDoModal'

export default function CardSectionComponent(props) {

    const [modal, setModal] = useState(false)
    const createToDo = ()=>{
        setModal(true)
    }
    return (
        <div className={styles.CardSectionComponent}>
            <div>
                <div className={styles.HeaderOuter}>
                    <div className={styles.Header}>
                        <span>{props.name}</span>
                        <div className={styles.HeaderToDo}>
                            {
                                props.name === "To do" && <img onClick={createToDo} src={addToDos} alt='addToDos-icon'></img>
                            }
                            <img src={collapseAllIcon} alt='collapse-icon'></img>
                        </div>
                    </div>
                </div>
                <div className={styles.CardSectionComponentBody}>
                    <div>
                    
                    </div>
                </div>
            </div>
            {
                modal && <CreateToDoModal close={()=>setModal(false)} />
            }
        </div>
    )
}
