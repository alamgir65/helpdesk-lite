import { IsIn, IsOptional } from 'class-validator';

export type TicketStatus = 'open' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export class FilterTicketsQueryDto {
  @IsOptional()
  @IsIn(['open', 'closed'])
  status?: TicketStatus;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: TicketPriority;
}