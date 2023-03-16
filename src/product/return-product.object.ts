import { returnCategoryObject } from './../category/return-category.object';
import { returnReviewObject } from './../review/return-review.object';
import { Prisma } from "@prisma/client";

export const productReturnObject: Prisma.ProductSelect = {
    image: true,
    description: true,
    id: true,
    name: true,
    price: true,
    createdAt: true,
    slug: true,
    category: { select: returnCategoryObject },
    reviews: {
        select: returnReviewObject
    }
}
export const productReturnObjectFullSet: Prisma.ProductSelect = {
    ...productReturnObject,
    reviews: {
        select: returnReviewObject
    },
    category: { select: returnCategoryObject }
}