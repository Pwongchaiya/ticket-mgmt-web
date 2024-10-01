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
        dueDate: null,
        assignedToUserId: null,
        createdByUserId: null,
        recurrencePattern: null,
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
            const ticketData: Ticket = { 
                ...formData, 
                id: uuidv4() as `${string}-${string}-${string}-${string}-${string}`,
                dueDate: formData.dueDate || undefined,
                assignedToUserId: formData.assignedToUserId || undefined,
                createdByUserId: formData.createdByUserId || undefined,
                recurrencePattern: formData.recurrencePattern || undefined,
            };
            await TicketService.createTicket(ticketData);
            onSubmit(ticketData);
            setFormData(initialFormData);
            setError(null);
        } catch (error) {
            setError('Failed to create ticket. Please try again.');
        }
    }, [onSubmit, formData, initialFormData]);

    const renderInputField = useCallback((label: string, name: string, type: string = 'text', required: boolean = false) => (
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            />
        </div>
    ), [formData, handleChange]);

    const renderTextAreaField = useCallback((label: string, name: string, required: boolean = false) => (
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            />
        </div>
    ), [formData, handleChange]);

    const renderSelectField = useCallback((label: string, name: string, options: Record<string, string>, required: boolean = false) => (
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            >
                {Object.entries(options).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                ))}
            </select>
        </div>
    ), [formData, handleChange]);

    const renderCheckboxField = useCallback((label: string, name: string) => (
        <div className="mb-4 flex items-center">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={formData[name as keyof typeof formData] as boolean}
                onChange={handleChange}
                className="mr-2"
            />
            <label className="text-gray-700" htmlFor={name}>{label}</label>
        </div>
    ), [formData, handleChange]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Ticket</h2>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                {renderInputField('Title', 'title', 'text', true)}
                {renderTextAreaField('Description', 'description', true)}
                {renderSelectField('Priority', 'priority', Object.fromEntries(Object.entries(TicketPriority).filter(([key]) => isNaN(Number(key))).map(([key, value]) => [key, String(value)])), true)}
                {renderCheckboxField('Is Recurring', 'isRecurring')}
                {renderCheckboxField('Enable Notifications', 'isNotificationEnabled')}
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketForm;
