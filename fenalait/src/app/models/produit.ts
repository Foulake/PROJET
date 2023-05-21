import { Category } from "./category";
import { Magasin } from "./magasin";

export class Produit{
    id?: any;
    nomPrdt?: string;
    qte?: number;
    dateExp?: Date;
    code?: string;
    price?: number;
    categoryId?: number;
    magasinId?: number;
    categoryNom?: string;
    magasinNom?: string;
    
}