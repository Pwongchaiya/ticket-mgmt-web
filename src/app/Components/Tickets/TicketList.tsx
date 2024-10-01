import { RecurrencePattern } from '@/app/Models/TIckets/RecurrencePattern';
import { TicketPriority } from '@/app/Models/TIckets/TicketPriority';
import { TicketStatus } from '@/app/Models/TIckets/TicketStatus';
import TicketService from '@/app/Services/Tickets/TicketService';
import { AxiosResponse } from 'axios';
import { UUID } from 'crypto';
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TicketDetails from '../Forms/TicketDetails';
import EditForm from '../Forms/EditForm';

interface Ticket {
    id: UUID,
    title: string,
    description: string,
    status: TicketStatus,
    priority: TicketPriority,
    createdDate: Date,
    updatedDate: Date,
    isRecurring: boolean,
    isNotificationEnabled: boolean,
    completedAt?: Date,
    dueDate?: Date,
    assignedToUserId?: UUID,
    createdByUserId?: UUID,
    recurrencePattern?: RecurrencePattern,
    reminderDate?: Date,
    estimatedTimeToCompleteInHours?: number,
    actualTimeToCompleteInHours?: number
}

interface TicketListProps {
    onTicketsFetched?: (tickets: Ticket[]) => void;
}

const TicketList: React.FC<TicketListProps> = ({ onTicketsFetched }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

    const fetchTickets = useCallback(async () => {
        try {
            const response = await TicketService.getAllTickets() as AxiosResponse<Ticket[]>;
            setTickets(response.data);
            onTicketsFetched?.(response.data);
        } catch (err) {
            setError('Failed to fetch tickets. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [onTicketsFetched]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleDelete = async (id: UUID) => {
        try {
            await TicketService.deleteTicket(id);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
        } catch (err) {
            setError('Failed to delete ticket. Please try again later.');
        }
    };

    const handleEdit = (ticket: Ticket) => {
        setEditingTicket(ticket);
    };

    const handleSave = async (updatedTicket: Ticket) => {
        try {
            updatedTicket = {
                ...updatedTicket,
                updatedDate: new Date(),
            }
            await TicketService.updateTicket(updatedTicket);
            setTickets(prevTickets => prevTickets.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket));
            setEditingTicket(null);
        } catch (err) {
            setError('Failed to update ticket. Please try again later.');
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-4">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Ticket List</h1>
            <ul className="space-y-6">
                {tickets.map(ticket => (
                    <li key={ticket.id} className="bg-white p-6 rounded-lg shadow-md">
                        {editingTicket && editingTicket.id === ticket.id ? (
                            <EditForm
                                ticket={editingTicket}
                                onSave={handleSave}
                                onCancel={() => setEditingTicket(null)}
                            />
                        ) : (
                            <TicketDetails
                                ticket={ticket}
                                onEdit={() => handleEdit(ticket)}
                                onDelete={() => handleDelete(ticket.id)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// const TicketForm: React.FC<{
//     ticket: Ticket;
//     onSave: (ticket: Ticket) => void;
//     onCancel: () => void;
// }> = ({ ticket, onSave, onCancel }) => {
//     const [formTicket, setFormTicket] = useState<Ticket>(ticket);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value, type } = e.target;
//         const checked = (e.target as HTMLInputElement).checked;
//         setFormTicket(prevTicket => ({
//             ...prevTicket,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleDateChange = (date: Date, name: string) => {
//         setFormTicket(prevTicket => ({
//             ...prevTicket,
//             [name]: date
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSave(formTicket);
//     };

//     return (
//         <EditForm
//             formTicket={formTicket}
//             handleChange={handleChange}
//             handleDateChange={handleDateChange}
//             handleSubmit={handleSubmit}
//             onCancel={onCancel}
//         />
//     );
// };

export default TicketList;