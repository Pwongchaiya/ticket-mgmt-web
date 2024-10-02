import React, { memo } from 'react';
import { Tooltip } from '@mui/material';

interface DateFieldProps {
    label: string;
    name: string;
    value?: Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const DateField: React.FC<DateFieldProps> = ({ label, name, value, onChange, error }) => {
    const formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';

    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type="date"
                    id={name}
                    name={name}
                    value={formattedValue}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out ${error ? 'border-red-500' : ''}`}
                    aria-label={label}
                    aria-describedby={error ? `${name}-error` : undefined}
                    aria-invalid={!!error}
                />
                {error && (
                    <Tooltip title={error} placement="right">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 3a1 1 0 100-2 1 1 0 000 2zm-1-8a1 1 0 012 0v4a1 1 0 01-2 0V5z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </Tooltip>
                )}
            </div>
            {error && (
                <p id={`${name}-error`} className="mt-2 text-sm text-red-600" aria-live="assertive">
                    {error}
                </p>
            )}
        </div>
    );
};

export default memo(DateField);
