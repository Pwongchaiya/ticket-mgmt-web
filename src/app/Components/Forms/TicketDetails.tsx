import { Ticket } from "@/app/Models/Tickets/Ticket";
import { TicketPriority } from "@/app/Models/Tickets/TicketPriority";
import { TicketStatus } from "@/app/Models/Tickets/TicketStatus";

const TicketDetails: React.FC<{
    ticket: Ticket;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ ticket, onEdit, onDelete }) => (
    <div>
        <h2 className="text-2xl font-semibold mb-4">{ticket.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Status:</strong> {TicketStatus[ticket.status]}</p>
            <p><strong>Priority:</strong> {TicketPriority[ticket.priority]}</p>
            <p><strong>Created Date:</strong> {ticket.createdDate.toLocaleString()}</p>
            <p><strong>Updated Date:</strong> {ticket.updatedDate.toLocaleString()}</p>
            <p><strong>Is Recurring:</strong> {ticket.isRecurring ? 'Yes' : 'No'}</p>
            <p><strong>Notification Enabled:</strong> {ticket.isNotificationEnabled ? 'Yes' : 'No'}</p>
            {ticket.completedAt && <p><strong>Completed At:</strong> {ticket.completedAt.toLocaleString()}</p>}
            {ticket.dueDate && <p><strong>Due Date:</strong> {ticket.dueDate.toLocaleString()}</p>}
            {ticket.assignedToUserId && <p><strong>Assigned To User ID:</strong> {ticket.assignedToUserId}</p>}
            {ticket.createdByUserId && <p><strong>Created By User ID:</strong> {ticket.createdByUserId}</p>}
            {ticket.recurrencePattern && <p><strong>Recurrence Pattern:</strong> {ticket.recurrencePattern}</p>}
            {ticket.reminderDate && <p><strong>Reminder Date:</strong> {ticket.reminderDate.toLocaleString()}</p>}
            {ticket.estimatedTimeToCompleteInHours !== undefined && <p><strong>Estimated Time To Complete (Hours):</strong> {ticket.estimatedTimeToCompleteInHours}</p>}
            {ticket.actualTimeToCompleteInHours !== undefined && <p><strong>Actual Time To Complete (Hours):</strong> {ticket.actualTimeToCompleteInHours}</p>}
        </div>
        <div className="mt-6 flex space-x-4">
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