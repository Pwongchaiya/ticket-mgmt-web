import React, { useMemo } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import DateTimeField from './DateTimeFields';
import { UUID } from 'crypto';
import Button from '../Shared/Buttons';
import { TicketStatus } from '@/app/Models/Tickets/TicketStatus';
import { TicketPriority } from '@/app/Models/Tickets/TicketPriority';
import { RecurrencePattern } from '@/app/Models/Tickets/RecurrencePattern';
import { Ticket } from '@/app/Models/Tickets/Ticket';

interface TicketFormProps {
    formTicket: Ticket;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleDateChange: (date: Date | null, name: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    onCancel: () => void;
    className?: string;
}

interface FieldProps {
    component: React.FC<any>;
    label: string;
    name: string;
    value?: any;
    checked?: boolean;
    options?: any[] | typeof TicketStatus | typeof TicketPriority;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Field: React.FC<FieldProps> = ({ component: Component, ...props }) => <Component {...props} />;

const formatDate = (date?: Date) => date ? new Date(date).toISOString() : '';

const TicketForm: React.FC<TicketFormProps> = ({ formTicket, handleChange, handleDateChange, handleSubmit, onCancel }) => {
    const fields = useMemo(() => [
        { component: InputField, label: "Title", name: "title", value: formTicket.title },
        { component: TextAreaField, label: "Description", name: "description", value: formTicket.description },
        { component: SelectField, label: "Status", name: "status", value: formTicket.status, options: TicketStatus },
        { component: SelectField, label: "Priority", name: "priority", value: formTicket.priority, options: TicketPriority },
        { component: CheckboxField, label: "Is Recurring", name: "isRecurring", checked: formTicket.isRecurring },
        { component: CheckboxField, label: "Notification Enabled", name: "isNotificationEnabled", checked: formTicket.isNotificationEnabled },
        { component: DateTimeField, label: "Completed At", name: "completedAt", value: formatDate(formTicket.completedAt), onChange: (e: any) => handleDateChange(new Date(e.target.value), 'completedAt') },
        { component: DateTimeField, label: "Due Date", name: "dueDate", value: formatDate(formTicket.dueDate), onChange: (e: any) => handleDateChange(new Date(e.target.value), 'dueDate') },
        { component: InputField, label: "Assigned To User ID", name: "assignedToUserId", value: formTicket.assignedToUserId || '' },
        { component: InputField, label: "Created By User ID", name: "createdByUserId", value: formTicket.createdByUserId || '' },
        { component: InputField, label: "Recurrence Pattern", name: "recurrencePattern", value: formTicket.recurrencePattern || '' },
        { component: DateTimeField, label: "Reminder Date", name: "reminderDate", value: formatDate(formTicket.reminderDate), onChange: (e: any) => handleDateChange(new Date(e.target.value), 'reminderDate') },
        { component: InputField, label: "Estimated Time To Complete (Hours)", name: "estimatedTimeToCompleteInHours", type: "number", value: formTicket.estimatedTimeToCompleteInHours?.toString() || '' },
        { component: InputField, label: "Actual Time To Complete (Hours)", name: "actualTimeToCompleteInHours", type: "number", value: formTicket.actualTimeToCompleteInHours?.toString() || '' }
    ], [formTicket, handleDateChange, handleChange]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
                {fields.map((field, index) => (
                    <Field
                        key={index}
                        component={field.component}
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        checked={field.checked}
                        options={field.options}
                        type={field.type}
                        onChange={field.onChange || handleChange}
                    />
                ))}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <Button type="submit" label="Save" className="bg-green-500 hover:bg-green-600" />
                <Button type="button" label="Cancel" className="bg-red-500 hover:bg-red-600" onClick={onCancel} />
            </div>
        </form>
    );
};

export default TicketForm;
