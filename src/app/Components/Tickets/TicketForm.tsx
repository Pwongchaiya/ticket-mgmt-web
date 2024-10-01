"use client"
import React, { useState, useCallback, useMemo } from 'react';
import TicketService from '@/app/Services/Tickets/TicketService';
import { v4 as uuidv4 } from 'uuid';
import { TicketStatus } from '@/app/Models/TIckets/TicketStatus';
import { TicketPriority } from '@/app/Models/TIckets/TicketPriority';
import { RecurrencePattern } from '@/app/Models/TIckets/RecurrencePattern';
import { UUID } from 'crypto';

interface TicketFormProps {
    onSubmit: (ticket: Ticket) => void;
}

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

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit }) => {
    const initialFormData = useMemo(() => ({
        title: '',
        description: '',
        status: TicketStatus.New,
        priority: TicketPriority.Low,
        createdDate: new Date(),
        updatedDate: new Date(),
        isRecurring: false,
        isNotificationEnabled: false,
        completedAt: null,
        dueDate: null,
        assignedToUserId: null,
        createdByUserId: null,
        recurrencePattern: null,
        reminderDate: null,
        estimatedTimeToCompleteInHours: null,
        actualTimeToCompleteInHours: null
    }), []);

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const ticketData = { ...formData, id: uuidv4()};
            await TicketService.createTicket(ticketData);
            onSubmit(ticketData);
            setFormData(initialFormData);
            setError(null);
        } catch (error) {
            setError('Failed to create ticket. Please try again.');
        }
    }, [onSubmit, formData, initialFormData]);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Create a New Ticket</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        {Object.entries(TicketPriority).map(([key, value]) => (
                            <option key={key} value={value.toString()}>{value}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="isRecurring">Is Recurring</label>
                    <input
                        type="checkbox"
                        id="isRecurring"
                        name="isRecurring"
                        checked={formData.isRecurring}
                        onChange={handleChange}
                        className="mr-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="isNotificationEnabled">Enable Notifications</label>
                    <input
                        type="checkbox"
                        id="isNotificationEnabled"
                        name="isNotificationEnabled"
                        checked={formData.isNotificationEnabled}
                        onChange={handleChange}
                        className="mr-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create
                </button>
            </form>
        </div>
    );
};

export default TicketForm;