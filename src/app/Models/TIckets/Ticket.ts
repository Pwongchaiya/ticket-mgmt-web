import { UUID } from "crypto";
import { TicketStatus } from "./TicketStatus";
import { TicketPriority } from "./TicketPriority";
import { RecurrencePattern } from "./RecurrencePattern";

export class Ticket {
    constructor(
        public id: UUID,
        public title: string,
        public description: string,
        public status: TicketStatus,
        public priority: TicketPriority,
        public createdDate: Date,
        public updatedDate: Date,
        public isRecurring: boolean,
        public isNotificationEnabled: boolean,
        public completedAt?: Date,
        public dueDate?: Date,
        public assignedToUserId?: UUID,
        public createdByUserId?: UUID,
        public recurrencePattern?: RecurrencePattern,
        public reminderDate?: Date,
        public estimatedTimeToCompleteInHours?: number,
        public actualTimeToCompleteInHours?: number
    ) {}
}
