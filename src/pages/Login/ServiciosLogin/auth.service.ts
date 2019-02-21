import { Injectable } from "@angular/core";
import { ApiService } from "./APIservice";
import { servicioUsuario } from "./Usuario.servicioUsuario";
import { Usuario } from "./Usuario";

@Injectable()
export class AuthService {
   private user: Usuario;


  constructor(private userService: servicioUsuario, private apiService: ApiService) {
  console.log('constructor AuthService inicializado');
  this.getAuthUser();
}
   getAuthUser() {
     this.userService.getOnStorage().then(
        (user) => {
          this.user = user;
        }
     );
   };



  async login(email: string, password: string) {
    return await this.apiService.loginPost(email, password); 
  }



  async logout() {
    await this.userService.deleteOnStorage()
    return document.location.href = 'index.html';
  }


  isLoggedIn() {
    if (this.user.reto_actual) {
      return true;
    } else {
      return false;
    }
  }

}