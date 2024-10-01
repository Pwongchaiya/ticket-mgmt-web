import React, { useState, useCallback, memo } from 'react';
import TicketForm from '../Tickets/TicketForm';
import './Modal.css';

const Modal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }, [closeModal]);

    return (
        <div>
            <button onClick={openModal} aria-haspopup="dialog" aria-expanded={isOpen}>
                Open Ticket Form
            </button>
            {isOpen && (
                <div className="modal-overlay" onClick={handleOutsideClick} role="dialog" aria-modal="true">
                    <div className="modal-content centered">
                        <MemoizedTicketForm />
                    </div>
                </div>
            )}
        </div>
    );
};

const MemoizedTicketForm = memo(TicketForm);

export default Modal;