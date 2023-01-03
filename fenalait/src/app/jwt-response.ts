export class JwtResponse {
    accessToken(accessToken: any) {
      throw new Error('Method not implemented.');
    }
    tokenAccess!: string;
    tokenRefresh!:string;
    email!:string;
    token!: string;
}
