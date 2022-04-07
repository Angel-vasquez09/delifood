export interface ICartProduct{
    _id         : string;
    images      : string;
    price       : number;
    slug        : string;
    title       : string;
    menu        : 'Arepas'|'Pizza'|'Hog dog'|'Hamburguesas'|'Bebidas'|'Combos'|'Adicionales';
    quantity    : number;
}