import React from 'react'
import Popup from 'reactjs-popup'

import '../styles/modal.scss'

const Modal = ({ TriggerComponent, children, onOpen }) => (
    <Popup
        trigger={TriggerComponent}
        modal
        lockScroll
        onOpen={onOpen}
    >
        {close => (
            <div className="popup-modal">
                <button className="close" onClick={close}>
                    <i className="bi bi-x"></i>
                </button>
                <div className="content">
                    {children}
                </div>
            </div>
        )}
    </Popup>
)

export default Modal;