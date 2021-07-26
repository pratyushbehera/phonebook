import React from 'react';
import reactDom from 'react-dom';
import Modal from './Modal';

const ModalContainer = (props) => {
    return reactDom.createPortal(<Modal {...props} />, document.getElementById("modal"));
}

export default ModalContainer
