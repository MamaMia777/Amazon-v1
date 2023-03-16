"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();
const prisma = new client_1.PrismaClient();
const createProducts = async (quantity) => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
        const productName = faker_1.faker.commerce.productName();
        const categoryName = faker_1.faker.commerce.department();
        const product = await prisma.product.create({
            data: {
                name: productName,
                slug: faker_1.faker.helpers.slugify(productName).toLowerCase(),
                description: faker_1.faker.commerce.productDescription(),
                price: +faker_1.faker.commerce.price(10, 999, 0),
                image: faker_1.faker.image.imageUrl(500, 500),
                category: {
                    create: {
                        name: categoryName,
                        slug: faker_1.faker.helpers.slugify(categoryName).toLowerCase()
                    }
                },
                reviews: {
                    create: [
                        {
                            rating: faker_1.faker.datatype.number({ min: 1, max: 5 }),
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: faker_1.faker.datatype.number({ min: 1, max: 5 }),
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                    ]
                }
            }
        });
        products.push(product);
    }
    console.log(`Created ${products.length} products`);
};
async function main() {
    console.log('Start seeding...');
    await createProducts(20);
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map