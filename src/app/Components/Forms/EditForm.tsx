import { Ticket } from "@/app/Models/Tickets/Ticket";
import Form from "./Form";
import { useState } from "react";
import { makeStyles } from '@mui/styles';
import { CircularProgress, Container, Typography, Alert, List, ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface EditFormProps {
    ticket: Ticket;
    onSave: (ticket: Ticket) => void;
    onCancel: () => void;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '8px',
    },
    submit: {
        margin: '24px 0 16px',
    },
});

const EditForm: React.FC<EditFormProps> = ({ ticket, onSave, onCancel }) => {
    const classes = useStyles();
    const [formTicket, setFormTicket] = useState<Ticket>(ticket);
    const [loading, setLoading] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormTicket(prevTicket => ({
            ...prevTicket,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date: Date | null, name: string) => {
        setFormTicket(prevTicket => ({
            ...prevTicket,
            [name]: date
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSave(formTicket);
        setLoading(false);
    };

    const handleCancel = () => {
        setShowCancelDialog(true);
    };

    const confirmCancel = () => {
        setShowCancelDialog(false);
        onCancel();
    };

    const closeCancelDialog = () => {
        setShowCancelDialog(false);
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <Typography component="h1" variant="h5">
                Edit Ticket
            </Typography>
            {loading && <CircularProgress />}
            <Form
                formTicket={formTicket}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleSubmit={handleSubmit}
                onCancel={handleCancel}
                className={classes.form}
            />
            <Dialog
                open={showCancelDialog}
                onClose={closeCancelDialog}
            >
                <DialogTitle>Cancel Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel? All unsaved changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCancelDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={confirmCancel} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EditForm;