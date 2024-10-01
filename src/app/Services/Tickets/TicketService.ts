import { RecurrencePattern } from '@/app/Models/Tickets/RecurrencePattern';
import { TicketPriority } from '@/app/Models/Tickets/TicketPriority';
import { TicketStatus } from '@/app/Models/Tickets/TicketStatus';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UUID } from 'crypto';

interface Ticket {
    id: UUID,
    title: string,
    description: string,
    status: TicketStatus,
    priority: TicketPriority,
    createdDate: Date,
    updatedDate: Date,
    isRecurring: boolean,
    isNotificationEnabled: boolean,
    completedAt?: Date,
    dueDate?: Date,
    assignedToUserId?: UUID,
    createdByUserId?: UUID,
    recurrencePattern?: RecurrencePattern,
    reminderDate?: Date,
    estimatedTimeToCompleteInHours?: number,
    actualTimeToCompleteInHours?: number
}

class TicketService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7213/api/Ticket',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    private convertTicketEnums(ticket: Ticket): Ticket {
        const statusIndex = Object.keys(TicketStatus).indexOf(ticket.status.toString());
        const priorityIndex = Object.keys(TicketPriority).indexOf(ticket.priority.toString());

        return {
            ...ticket,
            status: statusIndex,
            priority: priorityIndex
        };
    }

    public async createTicket(ticket: Ticket): Promise<AxiosResponse<Ticket> | undefined> {
        try {
            const createdTicket = this.convertTicketEnums(ticket);
            const response = await this.axiosInstance.post<Ticket>('/', createdTicket);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async getAllTickets(): Promise<AxiosResponse<Ticket[]> | undefined> {
        try {
            const response = await this.axiosInstance.get<Ticket[]>('/');
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async getTicketById(id: UUID): Promise<AxiosResponse<Ticket> | undefined> {
        try {
            const response = await this.axiosInstance.get<Ticket>(`/${id}`);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async updateTicket(ticket: Ticket): Promise<AxiosResponse<Ticket> | undefined> {
        try {
            const updatedTicket = this.convertTicketEnums(ticket);
            const response = await this.axiosInstance.put<Ticket>('/', updatedTicket);
            return response;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    public async deleteTicket(id: UUID): Promise<AxiosResponse<Ticket> | undefined> {
        try {
            const response = await this.axiosInstance.delete<Ticket>(`/${id}`);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): void {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export default new TicketService();
