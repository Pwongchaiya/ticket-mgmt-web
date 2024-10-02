import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginBottom: theme.spacing(4),
    },
    label: {
        display: 'block',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.primary,
    },
    textArea: {
        marginTop: theme.spacing(1),
        width: '100%',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.grey[300],
        boxShadow: theme.shadows[1],
        '&:focus': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
        },
    },
    errorText: {
        marginTop: theme.spacing(2),
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.error.main,
    },
    errorBorder: {
        borderColor: theme.palette.error.main,
    },
}));

interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, value, onChange, placeholder, error }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <label htmlFor={name} className={classes.label}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${classes.textArea} ${error ? classes.errorBorder : ''}`}
            />
            {error && <p className={classes.errorText}>{error}</p>}
        </div>
    );
};

export default React.memo(TextAreaField);