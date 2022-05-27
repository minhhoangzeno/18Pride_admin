import { faMailBulk, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@themesberg/react-bootstrap';
import React, { useState } from 'react';
import FeedbackAdd from './FeedbackAdd';
export default () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
            <FeedbackAdd show={show} handleClose={handleClose} />
            <h1>Phản hồi</h1>
            Bạn muốn đóng góp ý kiến cho chúng tôi. Mọi thông tin sẽ đều được bảo mật.
            <div>
                <ul style={{ listStyle: 'none' }} >
                    <li><FontAwesomeIcon icon={faPhoneAlt} /> 0972335594</li>
                    <li><FontAwesomeIcon icon={faMailBulk} /> taekwondoneu@gmail.com</li>
                </ul>
                <Button variant="secondary" onClick={() => {setShow(true)}}>
                    Đóng góp
                </Button>
            </div>
        </>
    )
}