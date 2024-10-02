import React, { useCallback, useMemo } from 'react';
import { TicketStatus } from '@/app/Models/Tickets/TicketStatus';
import { TicketPriority } from '@/app/Models/Tickets/TicketPriority';
import { CircularProgress } from '@mui/material';

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Record<string, string>;
    defaultValue?: string;
    error?: string;
    isLoading?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = React.memo(({
    label,
    name,
    value,
    onChange,
    options,
    error,
    isLoading = false
}) => {
    const getStatusOrPriority = useCallback((num: number, label: string): string => {
        const map = label === 'Status' ? TicketStatus : TicketPriority;
        return map[num] || '';
    }, []);

    const renderedOptions = useMemo(() => (
        Object.entries(options)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => (
                <option key={key} value={value}>{getStatusOrPriority(Number(value), label)}</option>
            ))
    ), [options, label, getStatusOrPriority]);

    function classNames(baseClass: string, conditionalClasses: { [key: string]: boolean | undefined }): string {
        return [
            baseClass,
            ...Object.entries(conditionalClasses)
                .filter(([_, condition]) => condition)
                .map(([className]) => className)
        ].join(' ');
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            {isLoading ? (
                <CircularProgress size={24} />
            ) : (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={classNames(
                        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                        { 'border-red-500': !!error }
                    )}
                    aria-label={label}
                >
                    {renderedOptions}
                </select>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
});

export default SelectField;
// Removed the custom useCallback function definition

