import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TaskView = ({ markAsComplete, modalState, show, detail }) => {
    const closeModal = () => {
        modalState(false);
    }

    if (!show) {
        return false;
    } else {
        return (
            <div className="task-modal">
                <Modal.Dialog>
                    <Modal.Body>
                        <div className="task-uuid">UUID: { detail.uuid.toUpperCase() }</div>
                        <div className="task-title">{ detail.title }</div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={() => markAsComplete(detail.uuid)}
                            disabled={ (detail.status === 'COMPLETE') ? true : false }>
                            Complete Task
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
};

export default TaskView;