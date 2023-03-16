import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getMainStatistics(id: number): Promise<{
        name: string;
        value: number;
    }[]>;
}
