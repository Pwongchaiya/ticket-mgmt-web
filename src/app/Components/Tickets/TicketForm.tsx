"use client"

import React, { useState, useCallback, useMemo } from 'react';
import TicketService from '@/app/Services/Tickets/TicketService';
import { v4 as uuidv4 } from 'uuid';
import { TicketStatus } from '@/app/Models/Tickets/TicketStatus';
import { TicketPriority } from '@/app/Models/Tickets/TicketPriority';
import { RecurrencePattern } from '@/app/Models/Tickets/RecurrencePattern';
import { UUID } from 'crypto';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Box, Typography, Alert, SelectChangeEvent } from '@mui/material';

interface Ticket {
    id: `${string}-${string}-${string}-${string}-${string}`,
    title: string,
    description: string,
    status: TicketStatus,
    priority: TicketPriority,
    createdDate: Date,
    updatedDate: Date,
    isRecurring: boolean,
    isNotificationEnabled: boolean,
    dueDate?: Date,
    assignedToUserId?: UUID,
    createdByUserId?: UUID,
    recurrencePattern?: RecurrencePattern,
}

const initialFormData = {
    title: '',
    description: '',
    status: TicketStatus.New,
    priority: TicketPriority.Low,
    createdDate: new Date(),
    updatedDate: new Date(),
    isRecurring: false,
    isNotificationEnabled: false,
    dueDate: null,
    assignedToUserId: null,
    createdByUserId: null,
    recurrencePattern: null,
};

const TicketForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [state, setState] = useState<{ error: string | null, success: string | null, tickets: Ticket[] }>({ error: null, success: null, tickets: [] });

    const handleAddTicket = useCallback((ticket: Ticket) => {
        setState(prevState => ({
            ...prevState,
            tickets: [...prevState.tickets, ticket]
        }));
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        const type = (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).type;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const ticketData: Ticket = { 
                ...formData, 
                id: uuidv4() as `${string}-${string}-${string}-${string}-${string}`,
                dueDate: formData.dueDate || undefined,
                assignedToUserId: formData.assignedToUserId || undefined,
                createdByUserId: formData.createdByUserId || undefined,
                recurrencePattern: formData.recurrencePattern || undefined,
            };
            await TicketService.createTicket(ticketData);
            handleAddTicket(ticketData);
            setFormData(initialFormData);
            setState(prevState => ({ ...prevState, error: null, success: 'Ticket created successfully!' }));
        } catch (error) {
            setState(prevState => ({ ...prevState, error: 'Failed to create ticket. Please try again.', success: null }));
        }
    }, [handleAddTicket, formData]);

    const handleCancel = useCallback(() => {
        setFormData(initialFormData);
    }, []);

    const renderField = useCallback((label: string, name: string, type: string = 'text', required: boolean = false, options?: Record<string, string>) => {
        return (
            <Box mb={2}>
                {type === 'textarea' ? (
                    <TextField
                        label={label}
                        name={name}
                        value={formData[name as keyof typeof formData] as string}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        required={required}
                    />
                ) : type === 'select' && options ? (
                    <FormControl fullWidth required={required}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            label={label}
                            name={name}
                            value={formData[name as keyof typeof formData] as string}
                            onChange={handleChange}
                        >
                            {Object.entries(options).map(([key, value]) => (
                                <MenuItem key={key} value={value}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <TextField
                        label={label}
                        name={name}
                        type={type}
                        value={formData[name as keyof typeof formData] as string}
                        onChange={handleChange}
                        fullWidth
                        required={required}
                    />
                )}
            </Box>
        );
    }, [formData, handleChange]);

    const renderCheckboxField = useCallback((label: string, name: string) => (
        <FormControlLabel
            control={
                <Checkbox
                    name={name}
                    checked={formData[name as keyof typeof formData] as boolean}
                    onChange={handleChange}
                />
            }
            label={label}
        />
    ), [formData, handleChange]);

    const priorityOptions = useMemo(() => 
        Object.fromEntries(Object.entries(TicketPriority).filter(([key]) => isNaN(Number(key))).map(([key, value]) => [key, String(value)])), 
    []);

    return (
        <Box bgcolor="white" p={4} borderRadius={2} boxShadow={3} mx="auto" maxWidth={600}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Create a New Ticket
            </Typography>
            {state.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
            {state.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}
            <form onSubmit={handleSubmit}>
                {renderField('Title', 'title', 'text', true)}
                {renderField('Description', 'description', 'textarea', true)}
                {renderField('Priority', 'priority', 'select', true, priorityOptions)}
                {renderCheckboxField('Is Recurring', 'isRecurring')}
                {renderCheckboxField('Enable Notifications', 'isNotificationEnabled')}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        Create
                    </Button>
                    <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default TicketForm;
