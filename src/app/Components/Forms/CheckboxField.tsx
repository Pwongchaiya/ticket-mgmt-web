import React from 'react';
import { makeStyles } from '@mui/styles';

interface CheckboxFieldProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem', // equivalent to space-x-3
    },
    checkbox: {
        height: '1.25rem', // equivalent to h-5
        width: '1.25rem', // equivalent to w-5
        color: '#4f46e5', // equivalent to text-indigo-600
        borderColor: '#d1d5db', // equivalent to border-gray-300
        borderRadius: '0.375rem', // equivalent to rounded
        transition: 'all 0.15s ease-in-out', // equivalent to transition duration-150 ease-in-out
        '&:focus': {
            outline: '2px solid #4f46e5', // equivalent to focus:ring-indigo-500
        },
        '&:hover': {
            borderColor: '#4f46e5', // equivalent to hover:border-indigo-500
        },
        '&:checked': {
            backgroundColor: '#4f46e5', // equivalent to checked:bg-indigo-600
            borderColor: '#4f46e5', // equivalent to checked:border-indigo-600
        },
    },
    label: {
        fontSize: '0.875rem', // equivalent to text-sm
        fontWeight: 500, // equivalent to font-medium
        color: '#4b5563', // equivalent to text-gray-700
    },
});

const CheckboxField: React.FC<CheckboxFieldProps> = React.memo(({ label, name, checked, onChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                className={classes.checkbox}
                aria-checked={checked}
            />
            <label htmlFor={name} className={classes.label}>
                {label}
            </label>
        </div>
    );
});

export default CheckboxField;