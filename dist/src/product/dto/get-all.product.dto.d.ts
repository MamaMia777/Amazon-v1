import { PaginationDto } from './../../pagination/pagination.dto';
export declare enum EnumProductSort {
    HIGH_PRICE = "high-price",
    LOW_PRICE = "low-price",
    NEWEST = "newest",
    OLDEST = "oldest"
}
export declare class GetAllProductsDto extends PaginationDto {
    sort?: EnumProductSort;
    searchTerm?: string;
}
