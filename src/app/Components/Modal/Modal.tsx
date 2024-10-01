import React, { useState, useCallback, useEffect, useMemo } from 'react';
import TicketForm from '../Tickets/TicketForm';
import './Modal.css';

interface ModalProps {
    initiallyOpen?: boolean;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ initiallyOpen = false, onClose }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }, [closeModal]);

    useEffect(() => {
        setIsOpen(initiallyOpen);
    }, [initiallyOpen]);

    const MemoizedTicketForm = useMemo(() => <TicketForm />, []);

    return (
        <div className="modal-container">
            {isOpen && (
                <div className="modal-overlay" onClick={handleOutsideClick} role="dialog" aria-modal="true">
                    <div className="modal-content centered">
                        {MemoizedTicketForm}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
