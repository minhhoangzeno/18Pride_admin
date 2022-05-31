import { Dropdown } from '@themesberg/react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { apiUrl, token } from '../../enviroment';

export default ({ show, handleClose, user, search }) => {
    let { addToast } = useToasts();
    const [role, setRole] = useState(user?.role);
    let changeRole = () => {
        axios({
            method: 'POST',
            url: `${apiUrl}/user/role/${user._id}`,
            data: {
                role
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            handleClose();
            search();
            addToast('Edit Role Success', { appearance: 'success', autoDismiss: 1000 })
        }).catch(error => {
            if (error.response) {
                addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
            } else {
                addToast("Error", { appearance: 'error', autoDismiss: 2000 });
            }
        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi Role User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {role}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setRole('User')} >User</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRole('Admin')} >Admin</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={changeRole}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}