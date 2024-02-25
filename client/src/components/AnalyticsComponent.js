import React, { useState, useEffect } from 'react'
import styles from './AnalyticsComponent.module.css'
import dotIcon from '../assets/icons/Ellipse 3.svg'
import axios from 'axios';
import { ANALYTICS } from '../apis/EndPoints'

export default function AnalyticsComponent() {
  const [backlogCount, setBacklogCount] = useState(0);
  const [toDoCount, setToDoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [moderatePriorityCount, setModeratePriorityCount] = useState(0);
  const [lowPriorityCount, setLowPriorityCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    const fetchUserTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${ANALYTICS}${localStorage.getItem("proManage_id")}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'jwttoken': localStorage.getItem("proManage_token"),
            },
          }
        );
        const data = response.data.todos;
        updateSectionCounts(data);
        updatePriorityCounts(data);
        updateDueDateCounts(data);
      } catch (error) {
        console.error('Error fetching user todos:', error);
      }
    };

    const updateSectionCounts = (todos) => {
      const counts = {
        Backlog: 0,
        ToDo: 0,
        Inprogress: 0,
        Done: 0,
      };
      todos.forEach((todo) => {
        const section = todo.inSection || 'No Section';
        counts[section] += 1;
      });
      setBacklogCount(counts.Backlog);
      setToDoCount(counts.ToDo);
      setInProgressCount(counts.Inprogress);
      setDoneCount(counts.Done);
    };
    const updatePriorityCounts = (todos) => {
      const counts = {
        'HIGH PRIORITY': 0,
        'MODERATE PRIORITY': 0,
        'LOW PRIORITY': 0,
      };
      todos.forEach((todo) => {
        const priority = todo.priority || 'No Priority';
        counts[priority] += 1;
      });
      setHighPriorityCount(counts['HIGH PRIORITY']);
      setModeratePriorityCount(counts['MODERATE PRIORITY']);
      setLowPriorityCount(counts['LOW PRIORITY']);
    };
    const updateDueDateCounts = (todos) => {
      let overdueCount = 0;   
      setOverdueCount(overdueCount);
    };
    fetchUserTodos();
  }, []);

  return (
    <div className={styles.AnalyticsComponent}>
      <div className={styles.header}>
        <p>Analytics</p>
      </div>
      <div className={styles.cards}>
        <div className={styles.cardLeft}>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>Backlog Tasks</p>
            </div>
            <p className={styles.eachRight}>{backlogCount}</p>
          </div>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>To-do Tasks</p>
            </div>
            <p className={styles.eachRight}>{toDoCount}</p>
          </div>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>In-Progress Tasks</p>
            </div>
            <p className={styles.eachRight}>{inProgressCount}</p>
          </div>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>Completed Tasks</p>
            </div>
            <p className={styles.eachRight}>{doneCount}</p>
          </div>
        </div>

        <div className={styles.cardRight}>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>Low Priority</p>
            </div>
            <p className={styles.eachRight}>{lowPriorityCount}</p>
          </div>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>Moderate Priority</p>
            </div>
            <p className={styles.eachRight}>{moderatePriorityCount}</p>
          </div>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>High Priority</p>
            </div>
            <p className={styles.eachRight}>{highPriorityCount}</p>
          </div>
          <div className={styles.each}>
            <div className={styles.eachLeft}>
              <img src={dotIcon} alt='dot-icon'></img>
              <p>Due Date Tasks</p>
            </div>
            <p className={styles.eachRight}>{overdueCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
