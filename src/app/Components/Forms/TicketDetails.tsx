import { Ticket } from "@/app/Models/Tickets/Ticket";
import { TicketPriority } from "@/app/Models/Tickets/TicketPriority";
import { TicketStatus } from "@/app/Models/Tickets/TicketStatus";

const TicketDetails: React.FC<{
    ticket: Ticket;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ ticket, onEdit, onDelete }) => (
    <div>
        <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
        <p className="mb-1"><strong>Description:</strong> {ticket.description}</p>
        <p className="mb-1"><strong>Status:</strong> {TicketStatus[ticket.status]}</p>
        <p className="mb-1"><strong>Priority:</strong> {TicketPriority[ticket.priority]}</p>
        <p className="mb-1"><strong>Created Date:</strong> {ticket.createdDate.toLocaleString()}</p>
        <p className="mb-1"><strong>Updated Date:</strong> {ticket.updatedDate.toLocaleString()}</p>
        <p className="mb-1"><strong>Is Recurring:</strong> {ticket.isRecurring ? 'Yes' : 'No'}</p>
        <p className="mb-1"><strong>Notification Enabled:</strong> {ticket.isNotificationEnabled ? 'Yes' : 'No'}</p>
        {ticket.completedAt && <p className="mb-1"><strong>Completed At:</strong> {ticket.completedAt.toLocaleString()}</p>}
        {ticket.dueDate && <p className="mb-1"><strong>Due Date:</strong> {ticket.dueDate.toLocaleString()}</p>}
        {ticket.assignedToUserId && <p className="mb-1"><strong>Assigned To User ID:</strong> {ticket.assignedToUserId}</p>}
        {ticket.createdByUserId && <p className="mb-1"><strong>Created By User ID:</strong> {ticket.createdByUserId}</p>}
        {ticket.recurrencePattern && <p className="mb-1"><strong>Recurrence Pattern:</strong> {ticket.recurrencePattern}</p>}
        {ticket.reminderDate && <p className="mb-1"><strong>Reminder Date:</strong> {ticket.reminderDate.toLocaleString()}</p>}
        {ticket.estimatedTimeToCompleteInHours !== undefined && <p className="mb-1"><strong>Estimated Time To Complete (Hours):</strong> {ticket.estimatedTimeToCompleteInHours}</p>}
        {ticket.actualTimeToCompleteInHours !== undefined && <p className="mb-1"><strong>Actual Time To Complete (Hours):</strong> {ticket.actualTimeToCompleteInHours}</p>}
        <div className="mt-4 flex space-x-4">
            <button onClick={onEdit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Edit
            </button>
            <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Delete
            </button>
        </div>
    </div>
);

export default TicketDetails;