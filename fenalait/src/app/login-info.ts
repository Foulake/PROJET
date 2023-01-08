export class AuthLoginInfo {
    email!: string;
    password!:string;
    constructor(email:string, password:string, roles:any){
        this.email=email;
        this.password=password;

    }
}
