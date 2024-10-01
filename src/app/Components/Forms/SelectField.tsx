import React from 'react';
import { TicketStatus } from '@/app/Models/Tickets/TicketStatus';
import { TicketPriority } from '@/app/Models/Tickets/TicketPriority';

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Record<string, string>;
    defaultValue?: string;
}

const getStatusOrPriority = (num: number, label: string): string => {
    switch (label) {
        case 'Status':
            return TicketStatus[num];
        case 'Priority':
            return TicketPriority[num];
        default:
            return '';
    }
};

const SelectField: React.FC<SelectFieldProps> = React.memo(({
    label,
    name,
    value,
    onChange,
    options,
    defaultValue = ''
}) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
            {Object.entries(options)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                    <option key={key} value={value}>{getStatusOrPriority(Number(value), label)}</option>
                ))}
        </select>
    </div>
));

export default SelectField;
