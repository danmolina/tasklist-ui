import React, { useState, useEffect } from 'react';
import { InfoCircleFill, Check2Circle } from 'react-bootstrap-icons';
import TaskView from './TaskView';

const TaskListing = ({ rows }) => {
    const [openModal, setOpenModal] = useState(false);
    const [detail, setDetail] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Set the tasks
        setTasks(rows);
    }, [rows]);

    const viewTask = (detail) => {
        // Set the openModal flag to true
        // to show the modal view
        setOpenModal(true);
        // Set the selected task detail
        setDetail(detail);
    };

    const updateModalState = (status) => {
        setOpenModal(status);
    };

    const markAsComplete = (uuid) => {
        // Set the request options
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            }
        };

        // Send the PUT request
        fetch('http://localhost:9000/api/tasks/' + uuid, options)
            .then(res => res.json())
            .then((response) => {
                if (response === 'Ok') {
                    // Close the modal
                    setOpenModal(false);
                    // Update the listing based on uuid
                    updateTasksList(uuid);
                }
            });
    };

    const updateTasksList = (uuid) => {
        rows.map((row) => {
            if (row.uuid === uuid) {
                row.status = 'COMPLETE';
            }
        });

        setTasks([]);
    };

    return (
        <>
            {/* begin::Task Listing */}
            <div className="tasks-list-wrapper">
                {/* begin::Task View Modal Component */}
                <TaskView
                    markAsComplete={ markAsComplete }
                    modalState={ updateModalState }
                    show={ openModal }
                    detail={ detail } />
                {/* end::Task View Modal Component */}
                {/* begin::Task Items */}
                <ul>
                    {
                        rows.map((row, key) => {
                            return (
                                <li key={ key } onClick={() => viewTask(row)}>
                                    <div className={
                                        `list-wrapper ${ (row.status === 'COMPLETE')
                                        ? 'task-item-done' : '' }`
                                    }>
                                        <div className="d-flex justify-content-between align-items-center">
                                            {/* begin::Left Details */}
                                            <div className="task-detail">
                                                <div className="task-uuid">UUID: { row.uuid.toUpperCase() }</div>
                                                <div className="task-title">{ row.title }</div>
                                            </div>
                                            {/* end::Left Details */}
                                            {/* begin::Right Actions */}
                                            <div className="task-actions">
                                                {
                                                    (row.status === 'COMPLETE')
                                                        ? <Check2Circle color="green" size={25} />
                                                        : <InfoCircleFill color="#3699FF" size={25}/>
                                                }
                                            </div>
                                            {/* end::Right Actions */}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* end::Task Items */}
            </div>
            {/* begin::Task Listing */}
        </>
    );
};

export default TaskListing;