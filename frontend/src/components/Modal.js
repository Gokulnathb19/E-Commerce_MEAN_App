import React, { useRef, useEffect } from 'react';
import './css/Modal.css';


export default function Modal(props) {
    const modalRef = useRef(null);
    useEffect(() => {
        window.onclick = function(event) {
            if (event.target == modalRef.current) {
                props.closeHandler();
            }
        }
    }, [])
  return (
    <div ref={modalRef} class="modal">
        <div class="modal-content">
            <span class="close" onClick={props.closeHandler}>&times;</span>
            {props.children}
        </div>
    </div>
  );
}
