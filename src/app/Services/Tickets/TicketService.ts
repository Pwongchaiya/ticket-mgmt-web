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
            baseURL: 'https://localhost:7213/api/Ticket', // Replace with your actual API URL
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                
            },
        });
    }

    public async createTicket(ticket: Ticket): Promise<AxiosResponse<Ticket>> {
        try {
            const response = await this.axiosInstance.post<Ticket>('/', ticket);
            return response;
        } catch (error) {
            this.handleError(error);
            return Promise.reject(error);
        }
    }

    public async getAllTickets(): Promise<AxiosResponse<Ticket[]> | undefined> {
        try {
            const response = await this.axiosInstance.get<Ticket[]>('/');
            return response;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    public async getTicketById(id: UUID): Promise<AxiosResponse<Ticket> | undefined> {
        try {
            const response = await this.axiosInstance.get<Ticket>(`/${id}`);
            return response;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    public async updateTicket(ticket: Ticket): Promise<AxiosResponse<Ticket>> {
        try {
            const statusIndex = Object.keys(TicketStatus)
                .indexOf(
                    ticket.status.toString());

            const priorityIndex = Object.keys(TicketPriority)
                .indexOf(
                    ticket.priority.toString());

            const updatedTicket = {
                ...ticket,
                status: statusIndex,
                priority: priorityIndex
            }
            
            const response = await this.axiosInstance.put<Ticket>('/', updatedTicket);
            
            return response;
        } catch (error) {
            this.handleError(error);
            return Promise.reject(error);
        }
    }

    public async deleteTicket(id: UUID): Promise<AxiosResponse<Ticket> | undefined> {
        try {
            const response = await this.axiosInstance.delete<Ticket>(`/${id}`);
            return response;
        } catch (error) {
            this.handleError(error);
            return undefined;
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