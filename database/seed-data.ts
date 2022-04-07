import bcrypt from 'bcryptjs';


interface SeedProduct {
    description : string;
    images      : string[];
    inStock     : number;
    price       : number;
    slug        : string;
    tags        : string[];
    menu        : 'Arepas'|'Pizza'|'Hog dog'|'Hambuerguesas'|'Bebidas'|'Combos'|'Adicionales';
    title       : string;
    createdAt?  : string;
    updatedAt?  : string;
}

interface SeedUser {
    name  : string;
    email : string;
    pass  : string;
    role  : 'admin'|'client';
}

interface SeedData {
    users: SeedUser[],
    products: SeedProduct[]
}



export const initialData: SeedData = {
    users: [
        {
            name: 'Luis Angel',
            email: 'Luis@hotmail.com',
            pass: bcrypt.hashSync('12345678'),
            role: 'admin'
        },
        {
            name: 'Brayan',
            email: 'Brayan@hotmail.com',
            pass: bcrypt.hashSync('12345678'),
            role: 'client'
        },
    ],
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029031/gfvapztlc6vpqcyo6fzr.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029028/xbvzqpipmkds9t1u9pn8.jpg',
            ],
            inStock: 10,
            price: 5000,
            menu: 'Arepas',
            slug: "mens_chill_crew_neck_sweatshi4444",
            tags: ['arepa','rellena','pollo'],
            title: "Arepa rellena de pollo",
        },
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029045/ihwwps0cfz0fs6jbzfqp.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029045/ihwwps0cfz0fs6jbzfqp.jpg',
            ],
            inStock: 10,
            price: 5000,
            menu: 'Pizza',
            slug: "mens_chill_crew_neck_sweat",
            tags: ['pizza','rellena','pollo'],
            title: "Pizza de queso",
        },
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029030/c0ncgqqodeuuof16nl5r.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029030/c0ncgqqodeuuof16nl5r.jpg',
            ],
            inStock: 10,
            price: 3000,
            menu: 'Hog dog',
            slug: "mens_chill_crew_neck_sweatshirt23",
            tags: ['salchicha'],
            title: "Perrod con todo",
        },
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029048/aiojzvwhm1mg9m7lkw86.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029034/xylftgajckzt3oal2suq.jpg',
            ],
            inStock: 10,
            price: 7000,
            menu: 'Hambuerguesas',
            slug: "mens_chill_crew_neck_sweatshirt76",
            tags: ['rellena'],
            title: "Hamburguesa doble carne",
        },
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649028960/dytysyq8jdmzfhowodg2.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649028960/dytysyq8jdmzfhowodg2.jpg',
            ],
            inStock: 10,
            price: 2000,
            menu: 'Bebidas',
            slug: "mens_chill_crew_neck_sweatshirt098",
            tags: ['refresco'],
            title: "CocaCola",
        },
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029007/ru6pepokovfsftmdrq6i.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649028934/uednkwjl0hql5md78hfw.jpg',
            ],
            inStock: 10,
            price: 10000,
            menu: 'Combos',
            slug: "mens_chill_crew_neck_sweatshirtffr54",
            tags: ['hamburguesa','combo'],
            title: "Combo de hamburguesa, refresco y papas",
        },
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029037/ufccnqrd9ckxzvd5nzpg.jpg',
                'https://res.cloudinary.com/dtqdqs5gb/image/upload/v1649029037/ufccnqrd9ckxzvd5nzpg.jpg',
            ],
            inStock: 10,
            price: 10000,
            menu: 'Adicionales',
            slug: "mens_chill_crew_neck_sweatshirtffr54asa",
            tags: ['hamburguesa','combo'],
            title: "Papas con salsa",
        },
    ]
}