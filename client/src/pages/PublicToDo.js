import React,{ useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SHAREDTODO } from '../apis/EndPoints'

export default function PublicToDo() {
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${SHAREDTODO}${id}`);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching public link:', error);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div>PublicToDo</div>
    )
}
