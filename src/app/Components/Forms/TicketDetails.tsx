import { Ticket } from "@/app/Models/Tickets/Ticket";
import { TicketPriority } from "@/app/Models/Tickets/TicketPriority";
import { TicketStatus } from "@/app/Models/Tickets/TicketStatus";

const TicketDetails: React.FC<{
    ticket: Ticket;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ ticket, onEdit, onDelete }) => (
    <div className="relative p-6 bg-white rounded-lg mx-auto max-w-4xl flex flex-col h-full">
        <Header title={ticket.title} onEdit={onEdit} onDelete={onDelete} />
        <div className="flex-grow grid grid-cols-1 gap-6 text-gray-700 mt-4">
            <DescriptionSection description={ticket.description} />
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailsSection ticket={ticket} />
                <DatesSection ticket={ticket} />
                <UserInfoSection ticket={ticket} />
                <AdditionalInfoSection ticket={ticket} />
            </div>
        </div>
    </div>
);

const Header: React.FC<{ title: string; onEdit: () => void; onDelete: () => void }> = ({ title, onEdit, onDelete }) => (
    <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <div className="flex space-x-4">
            <ActionButton onClick={onEdit} label="Edit" color="blue" iconPath="M15.232 5.232l3.536 3.536M9 11l3.536 3.536m-2.036-2.036L5.232 15.232a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828l6.364-6.364a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828z" />
            <ActionButton onClick={onDelete} label="Delete" color="red" iconPath="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
        </div>
    </div>
);

const ActionButton: React.FC<{ onClick: () => void; label: string; color: string; iconPath: string }> = ({ onClick, label, color, iconPath }) => (
    <button 
        onClick={onClick} 
        className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 flex items-center text-sm font-medium transition duration-300`}
        aria-label={label}
    >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
        </svg>
        {label}
    </button>
);

const DescriptionSection: React.FC<{ description: string }> = ({ description }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex-grow">
        <SectionHeader title="Description" />
        <p className="break-words whitespace-pre-wrap">{description}</p>
    </div>
);

const DetailsSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex-grow">
        <SectionHeader title="Details" />
        <p><strong>Status:</strong> {TicketStatus[ticket.status]}</p>
        <p><strong>Priority:</strong> {TicketPriority[ticket.priority]}</p>
    </div>
);

const DatesSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex-grow">
        <SectionHeader title="Dates" />
        {ticket.dueDate && <p><strong>Due Date:</strong> {ticket.dueDate.toLocaleString()}</p>}
        {ticket.completedAt && <p><strong>Completed At:</strong> {ticket.completedAt.toLocaleString()}</p>}
        {ticket.reminderDate && <p><strong>Reminder Date:</strong> {ticket.reminderDate.toLocaleString()}</p>}
    </div>
);

const UserInfoSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex-grow">
        <SectionHeader title="User Information" />
        {ticket.assignedToUserId && <p><strong>Assigned To:</strong> {ticket.assignedToUserId}</p>}
        {ticket.createdByUserId && <p><strong>Created By:</strong> {ticket.createdByUserId}</p>}
    </div>
);

const AdditionalInfoSection: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex-grow">
        <SectionHeader title="Additional Info" />
        {ticket.isRecurring && <p><strong>Is Recurring:</strong> Yes</p>}
        {ticket.isNotificationEnabled && <p><strong>Notification Enabled:</strong> Yes</p>}
        {ticket.recurrencePattern && <p><strong>Recurrence Pattern:</strong> {ticket.recurrencePattern}</p>}
        {ticket.estimatedTimeToCompleteInHours !== undefined && <p><strong>Estimated Time To Complete (Hours):</strong> {ticket.estimatedTimeToCompleteInHours}</p>}
        {ticket.actualTimeToCompleteInHours !== undefined && <p><strong>Actual Time To Complete (Hours):</strong> {ticket.actualTimeToCompleteInHours}</p>}
    </div>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
);

export default TicketDetails;