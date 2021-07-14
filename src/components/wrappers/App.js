import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { Form } from 'react-bootstrap';

import backgroundImg from '../../assets/images/body-background.png';
import TaskListing from '../ui/tasks/TaskListing';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [records, setRecords] = useState([]);
    const [quantity, setQuantity] = useState(3);

    useEffect(() => {
        // Show the loader
        setShowLoader(true);
        // Fetch the tasks from the API
        fetch('http://localhost:9000/api/tasks?quantity=' + quantity)
            .then(res => res.json())
            .then((result) => {
                setTasks(result);
                setShowLoader(false);
            });

        // Create the quantity select
        createRecordsCount();
    }, [quantity]);

    const createRecordsCount = () => {
        let count = [];
        for (let i = 1; i <= 10; i++) {
            count.push(i);
        }

        setRecords(count);
    };

    return (
        <>
            {/* begin::Main Container */}
            <div className="tasks-wrapper" style={{
                backgroundImage: `url(${backgroundImg})`
            }}>
                <div className="tasks-container">
                    {/* begin::Container Title */}
                    <div className="title d-flex align-items-center justify-content-center">
                        <span>Show</span>
                        <Form.Control
                            as="select"
                            onChange={e => setQuantity(e.target.value)}
                            value={ quantity }>
                            {
                                records.map((record, key) => {
                                    return <option
                                        key={ key }
                                        value={ record }>{ record }</option>
                                })
                            }
                        </Form.Control>
                        <span>number of Tasks</span>
                    </div>
                    {/* end::Container Title */}
                    {/* begin::Loader */}
                    <div className="loader">
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={100}
                            width={50}
                            visible={showLoader} />
                    </div>
                    {/* end::Loader */}
                    {/* begin::Task Listing Component */}
                    <TaskListing rows={ tasks } />
                    {/* end::Task Listing Component */}
                </div>
            </div>
            {/* end::Main Container */}
        </>
    );
};

export default App;