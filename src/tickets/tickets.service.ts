import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';

@Injectable()
export class TicketsService {
    private readonly tickets: Ticket[] = [
        {
            id: 1,
            subject: 'Issue with login',
            description: 'Unable to login with correct credentials.',
            priority: 'high',
            status: 'open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            subject: 'Feature request',
            description: 'Requesting a new feature for the dashboard.',
            priority: 'medium',
            status: 'open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            subject: 'Bug in report generation',
            description: 'Reports are not generating correctly for the last month.',
            priority: 'high',
            status: 'closed',
            createdAt: new Date().toISOString(),
        }
    ]

    private nextTicketId = 4;

    findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
        let tickets = this.tickets;
        if(status) {
            tickets = tickets.filter(ticket => ticket.status === status);
        }

        if(priority){
            tickets = tickets.filter(ticket => ticket.priority === priority);
        }
        return tickets;
    }

    findOne(id: number){
        const ticket = this.tickets.find(ticket => ticket.id === id);
        if(!ticket){
            throw new NotFoundException(`Ticket with Id ${id} not found`);
        }
        return ticket;
    }

    create(createTicketDto: CreateTicketDto){
        const ticket: Ticket = {
            id: this.nextTicketId++,
            subject: createTicketDto.subject,
            description: createTicketDto.description,
            priority: createTicketDto.priority,
            status: 'open',
            createdAt: new Date().toISOString(),
        };
        this.tickets.push(ticket);
        return ticket;
    }
}
