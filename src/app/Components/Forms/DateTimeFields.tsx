import React from 'react';

interface DateFieldProps {
    label: string;
    name: string;
    value?: Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateField: React.FC<DateFieldProps> = ({ label, name, value, onChange }) => {
    const formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';

    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="date"
                id={name}
                name={name}
                value={formattedValue}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                aria-label={label}
            />
        </div>
    );
};

export default DateField;