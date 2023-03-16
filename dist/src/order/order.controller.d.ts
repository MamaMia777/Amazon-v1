import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(userId: number): Promise<import(".prisma/client").Order[]>;
}
