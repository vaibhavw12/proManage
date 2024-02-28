import React, { useState, useEffect } from 'react'
import styles from './CardSectionComponent.module.css'
import collapseAllIcon from '../assets/icons/codicon_collapse-all.svg'
import addToDos from '../assets/icons/addToDos.svg'
import CreateToDoModal from '../modals/CreateToDoModal'
import EachToDo from './EachToDo'
import { useDispatch, useSelector } from 'react-redux';
import { setCollapse } from '../redux/slices/ToDosSlices'

export default function CardSectionComponent(props) {

    const dispatch = useDispatch()
    const update = useSelector((state) => state.todo_type.update)
    const [modal, setModal] = useState(false)
    const createToDo = () => {
        setModal(true)
    }
    useEffect(()=>{
    },[update])
    return (
        <div className={styles.CardSectionComponent}>
            <div>
                <div className={styles.HeaderOuter}>
                    <div className={styles.Header}>
                        <span>{props.name}</span>
                        <div className={styles.HeaderToDo}>
                            {
                                props.name === "To do" && <img className={styles.hover} onClick={createToDo} src={addToDos} alt='addToDos-icon'></img>
                            }
                            <img className={styles.hover} onClick={()=>dispatch(setCollapse())}  src={collapseAllIcon} alt='collapse-icon'></img>
                        </div>
                    </div>
                </div>
                <div className={styles.CardSectionComponentBody}>
                    <div className={styles.fullToDo}>
                        {props.todos.map((todo, index) => (
                            <EachToDo key={index} todo={todo} />
                        ))}
                    </div>
                </div>
            </div>
            {
                modal && <CreateToDoModal close={() => setModal(false)} />
            }
        </div>
    )
}
