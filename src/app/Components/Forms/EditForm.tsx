import { Ticket } from "@/app/Models/Tickets/Ticket";
import Form from "./Form";
import { useState } from "react";

interface EditFormProps {
    ticket: Ticket;
    onSave: (ticket: Ticket) => void;
    onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ ticket, onSave, onCancel }) => {
    const [formTicket, setFormTicket] = useState<Ticket>(ticket);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormTicket(prevTicket => ({
            ...prevTicket,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date: Date, name: string) => {
        setFormTicket(prevTicket => ({
            ...prevTicket,
            [name]: date
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formTicket);
    };

    return (
        <Form
            formTicket={formTicket}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSubmit={handleSubmit}
            onCancel={onCancel}
        />
    );
};

export default EditForm;