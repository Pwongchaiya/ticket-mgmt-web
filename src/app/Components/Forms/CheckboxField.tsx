import React from 'react';

interface CheckboxFieldProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = React.memo(({ label, name, checked, onChange }) => (
    <div className="flex items-center space-x-3">
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150 ease-in-out"
        />
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
    </div>
));

export default CheckboxField;