import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaTimes, FaBars, FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaPen } from 'react-icons/fa';
import { CircularProgress, Container, Typography, Alert, List, ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import GenericModal from '../Modal/GenericModal';

const Header: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const menuItems = useMemo(() => [
        { name: 'Home', icon: <FaHome /> },
        { name: 'About', icon: <FaInfoCircle /> },
        { name: 'Services', icon: <FaServicestack /> },
        { name: 'Contact', icon: <FaEnvelope /> }
    ], []);

    if (!isClient) return null;

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <a href="/" className="text-white font-bold text-xl">Ticket Management</a>
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none" aria-label="Toggle mobile menu">
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <nav className="hidden md:flex space-x-4">
                    <button onClick={openModal} className="text-white hover:text-blue-200 transition-colors duration-300 flex items-center" aria-label="Create Ticket">
                        <FaPen />
                        <span className="ml-2">Create Ticket</span>
                    </button>
                </nav>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="container mx-auto flex flex-col items-start p-4 space-y-2">
                        {menuItems.map((item) => (
                            <a key={item.name} href={`#${item.name.toLowerCase()}`} className="flex items-center text-gray-800 hover:text-blue-500 transition-colors duration-300" onClick={closeMobileMenu}>
                                {item.icon}
                                <span className="ml-2">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
            <GenericModal initiallyOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
};

export default Header;
