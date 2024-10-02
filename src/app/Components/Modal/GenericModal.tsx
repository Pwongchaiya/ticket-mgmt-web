import React, { useState, useCallback, useEffect, useMemo } from 'react';
import TicketForm from '../Tickets/TicketForm';
import { Dialog } from '@mui/material';

interface ModalProps {
    initiallyOpen?: boolean;
    onClose?: () => void;
}

const GenericModal: React.FC<ModalProps> = ({ initiallyOpen = false, onClose }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, [closeModal]);

    useEffect(() => {
        setIsOpen(initiallyOpen);
    }, [initiallyOpen]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    const MemoizedTicketForm = useMemo(() => (
        <TicketForm 
            isOpen={isOpen} 
            handleOpen={() => setIsOpen(true)} 
            handleClose={closeModal} 
        />
    ), [isOpen, closeModal]);

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            {MemoizedTicketForm}
        </Dialog>
    );
};

export default GenericModal;
