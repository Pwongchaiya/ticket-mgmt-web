import { RecurrencePattern } from '@/app/Models/Tickets/RecurrencePattern';
import TicketService from '@/app/Services/Tickets/TicketService';
import { AxiosResponse } from 'axios';
import { UUID } from 'crypto';
import React, { useEffect, useState, useCallback, useRef, RefObject } from 'react';
import TicketDetails from '../Forms/TicketDetails';
import EditForm from '../Forms/EditForm';
import { TicketPriority } from '@/app/Models/Tickets/TicketPriority';
import { TicketStatus } from '@/app/Models/Tickets/TicketStatus';
import { CircularProgress, Container, Typography, Alert, List, ListItem } from '@mui/material';
import Spinner from '../Shared/Spinner';

interface Ticket {
    id: UUID;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdDate: Date;
    updatedDate: Date;
    isRecurring: boolean;
    isNotificationEnabled: boolean;
    completedAt?: Date;
    dueDate?: Date;
    assignedToUserId?: UUID;
    createdByUserId?: UUID;
    recurrencePattern?: RecurrencePattern;
    reminderDate?: Date;
    estimatedTimeToCompleteInHours?: number;
    actualTimeToCompleteInHours?: number;
}

interface TicketListProps {
    onTicketsFetched?: (tickets: Ticket[]) => void;
}

const TicketList: React.FC<TicketListProps> = ({ onTicketsFetched }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
    const ticketRef = useRef<HTMLLIElement | null>(null);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await TicketService.getAllTickets() as AxiosResponse<Ticket[]>;
            setTickets(response.data);
            onTicketsFetched?.(response.data);
        } catch (err) {
            console.error('Error fetching tickets:', err);
            setError('Failed to fetch tickets. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [onTicketsFetched]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleDelete = useCallback(async (id: UUID) => {
        try {
            await TicketService.deleteTicket(id);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
        } catch (err) {
            console.error('Error deleting ticket:', err);
            setError('Failed to delete ticket. Please try again later.');
        }
    }, []);

    const handleEdit = useCallback((ticket: Ticket, ref: RefObject<HTMLLIElement>) => {
        setEditingTicket(ticket);
        ticketRef.current = ref.current;
    }, []);

    const handleSave = useCallback(async (updatedTicket: Ticket) => {
        try {
            const updatedTicketWithDate = {
                ...updatedTicket,
                updatedDate: new Date(),
            };
            await TicketService.updateTicket(updatedTicketWithDate);
            setTickets(prevTickets => prevTickets.map(ticket => ticket.id === updatedTicketWithDate.id ? updatedTicketWithDate : ticket));
            setEditingTicket(null);
        } catch (err) {
            console.error('Error updating ticket:', err);
            setError('Failed to update ticket. Please try again later.');
        }
    }, []);

    const handleCancel = useCallback(() => {
        setEditingTicket(null);
        ticketRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error" style={{ textAlign: 'center', color: 'red', padding: '16px' }}>
                {error}
            </Alert>
        );
    }

    return (
        <Container sx={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography 
                variant="h4" 
                sx={{
                    marginBottom: '24px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    color: '#3f51b5',
                }}
            >
                Ticket List
            </Typography>
            {editingTicket ? (
                <EditForm
                    ticket={editingTicket}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <List sx={{ marginTop: '16px' }}>
                    {tickets.map((ticket: Ticket) => (
                        <ListItem key={ticket.id}>
                            <TicketDetails
                                ticket={ticket}
                                onEdit={(ticket, ref) => handleEdit(ticket, ref)}
                                onDelete={() => handleDelete(ticket.id)}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default TicketList;
