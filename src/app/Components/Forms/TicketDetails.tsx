/** @jsxImportSource @emotion/react */
import React, { forwardRef, useRef } from 'react';
import { Ticket } from "@/app/Models/Tickets/Ticket";
import { TicketPriority } from "@/app/Models/Tickets/TicketPriority";
import { TicketStatus } from "@/app/Models/Tickets/TicketStatus";
import styled from '@emotion/styled';
import { darken } from '@mui/material';

const Container = styled.div`
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    margin: 0 auto;
    max-width: 64rem;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
`;

const Title = styled.h2`
    font-size: 1.875rem;
    font-weight: bold;
    color: #1f2937;
`;

const ActionButton = styled.button<{ color: string }>`
    padding: 0.5rem 1rem;
    background-color: ${({ color }) => color};
    color: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: medium;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${({ color }) => darken(color, 0.1)};
    }
`;

const Section = styled.div`
    background-color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    flex-grow: 1;
`;

const SectionHeader = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1f2937;
`;

const TicketDetails = forwardRef<HTMLDivElement, {
    ticket: Ticket;
    onEdit: (ticket: Ticket, ref: React.RefObject<HTMLLIElement>) => void;
    onDelete: () => void;
}>(({ ticket, onEdit, onDelete }, ref) => {
    const liRef = useRef<HTMLLIElement>(null);

    return (
        <Container ref={ref}>
            <Header title={ticket.title} onEdit={() => onEdit(ticket, liRef)} onDelete={onDelete} />
            <div css={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', color: '#4b5563', marginTop: '1rem' }}>
                <DescriptionSection description={ticket.description} />
                <div css={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }, gap: '1.5rem' }}>
                    <DetailsSection ticket={ticket} />
                    <DatesSection ticket={ticket} />
                    <UserInfoSection ticket={ticket} />
                    <AdditionalInfoSection ticket={ticket} />
                </div>
            </div>
        </Container>
    );
});

const Header: React.FC<{ title: string; onEdit: () => void; onDelete: () => void }> = ({ title, onEdit, onDelete }) => (
    <HeaderContainer>
        <Title>{title}</Title>
        <div css={{ display: 'flex', gap: '1rem' }}>
            <ActionButton onClick={onEdit} color="#3b82f6">
                <svg css={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Edit
            </ActionButton>
            <ActionButton onClick={onDelete} color="#ef4444">
                <svg css={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Delete
            </ActionButton>
        </div>
    </HeaderContainer>
);

const DescriptionSection: React.FC<{ description: string }> = ({ description }) => (
    <Section>
        <SectionHeader>Description</SectionHeader>
        <p css={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{description}</p>
    </Section>
);

const DetailsSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <Section>
        <SectionHeader>Details</SectionHeader>
        <p><strong>Status:</strong> {TicketStatus[ticket.status]}</p>
        <p><strong>Priority:</strong> {TicketPriority[ticket.priority]}</p>
    </Section>
);

const DatesSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <Section>
        <SectionHeader>Dates</SectionHeader>
        {ticket.dueDate && <p><strong>Due Date:</strong> {ticket.dueDate.toLocaleString()}</p>}
        {ticket.completedAt && <p><strong>Completed At:</strong> {ticket.completedAt.toLocaleString()}</p>}
        {ticket.reminderDate && <p><strong>Reminder Date:</strong> {ticket.reminderDate.toLocaleString()}</p>}
    </Section>
);

const UserInfoSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <Section>
        <SectionHeader>User Information</SectionHeader>
        {ticket.assignedToUserId && <p><strong>Assigned To:</strong> {ticket.assignedToUserId}</p>}
        {ticket.createdByUserId && <p><strong>Created By:</strong> {ticket.createdByUserId}</p>}
    </Section>
);

const AdditionalInfoSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <Section>
        <SectionHeader>Additional Info</SectionHeader>
        {ticket.isRecurring && <p><strong>Is Recurring:</strong> Yes</p>}
        {ticket.isNotificationEnabled && <p><strong>Notification Enabled:</strong> Yes</p>}
        {ticket.recurrencePattern && <p><strong>Recurrence Pattern:</strong> {ticket.recurrencePattern}</p>}
        {ticket.estimatedTimeToCompleteInHours !== undefined && <p><strong>Estimated Time To Complete (Hours):</strong> {ticket.estimatedTimeToCompleteInHours}</p>}
        {ticket.actualTimeToCompleteInHours !== undefined && <p><strong>Actual Time To Complete (Hours):</strong> {ticket.actualTimeToCompleteInHours}</p>}
    </Section>
);

export default TicketDetails;