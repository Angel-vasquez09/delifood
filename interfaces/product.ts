export interface IProduct{
    _id         : string;
    description : string;
    images      : string[];
    inStock     : number;
    price       : number;
    slug        : string;
    tags        : string[];
    title       : string;
    menu        : 'Arepas'|'Pizza'|'Hog dog'|'Hamburguesas'|'Bebidas'|'Combos'|'Adicionales';

    createdAt?: string;
    updatedAt?: string;
}