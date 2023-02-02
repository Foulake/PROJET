import { Category } from "./category";
import { Magasin } from "./magasin";

export class Produit{
    id?: any;
    nomPrdt?: string;
    qte?: DoubleRange;
    dateExp?: Date;
    code?: string;
    price?: string;
    categoryNom?: string;
    magasinNom?: string;
    
}