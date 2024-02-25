import React from 'react'
import styles from './DeleteModal.module.css'
import axios from 'axios'
import { DELETETODO } from '../apis/EndPoints'
import { useDispatch } from 'react-redux';
import { setUpdate } from '../redux/slices/ToDosSlices'
import toast from 'react-hot-toast';

export default function DeleteModal({ deleteById, close }) {
    const dispatch = useDispatch()
    const deleteToDO = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}${DELETETODO}${deleteById}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': localStorage.getItem("proManage_token")
                },
            });
            console.log(response.data);
            dispatch(setUpdate())
            toast.success("todo deleted successfully!")
            close()
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    return (
        <div className={styles.deleteContainer}>
            <div className={styles.deleteContent}>
                <div className={styles.deleteInnerContent}>
                    <div>
                        <p className={styles.deleteHeader}>Are you sure you want to Delete?</p>
                        <div className={styles.deleteModalBtns}>
                            <button onClick={deleteToDO} className={styles.deleteBtn}>Yes, Delete</button>
                            <button onClick={() => close()} className={styles.cancleBtn}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
