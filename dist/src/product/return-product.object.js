"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReturnObjectFullSet = exports.productReturnObject = void 0;
const return_category_object_1 = require("./../category/return-category.object");
const return_review_object_1 = require("./../review/return-review.object");
exports.productReturnObject = {
    image: true,
    description: true,
    id: true,
    name: true,
    price: true,
    createdAt: true,
    slug: true,
    category: { select: return_category_object_1.returnCategoryObject },
    reviews: {
        select: return_review_object_1.returnReviewObject
    }
};
exports.productReturnObjectFullSet = Object.assign(Object.assign({}, exports.productReturnObject), { reviews: {
        select: return_review_object_1.returnReviewObject
    }, category: { select: return_category_object_1.returnCategoryObject } });
//# sourceMappingURL=return-product.object.js.map