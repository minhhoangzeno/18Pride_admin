import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { roleUserThunk } from '../../redux/userSlice';

export default ({ show, handleClose, user,search }) => {
    let dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();
    let { addToast } = useToasts();
    let changeRole = async (form) => {
        let response = await dispatch(roleUserThunk({
            id: user._id,
            role: form.role
        }));
        if (response) {
            addToast("Success", { appearance: 'success', autoDismiss: 1000 });
            search()
            handleClose()
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi Role User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Controller
                        control={control}
                        name="role"
                        render={({
                            field: { onChange, onBlur, value }
                        }) => (
                            <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                                <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            </InputGroup>
                        )}
                        rules={{
                            required: true
                        }}
                        defaultValue={user?.roles}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(changeRole)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}