export class SignupInfo {
    id!:number;
    email!:string;
    nom!:string;
    prenom!:string;
    tel!:string;
    password!:string;
    constructor(id:number, email:string,nom:string,prenom:string,password:string,tel:string){
        this.id=id;
        this.email=email;
        this.nom=nom;
        this.prenom=prenom;
        this.password=password;
        this.tel=tel;
    }
}
