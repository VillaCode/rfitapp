import { Injectable } from "@angular/core";
import { ApiService } from "./APIservice";
import { servicioUsuario } from "./Usuario.servicioUsuario";
import { Usuario } from "./Usuario";

@Injectable()
export class AuthService {
   private user: Usuario;
  /* ---------------------------------------------------------------------------------------------------------------- */

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
   }

  /* ---------------------------------------------------------------------------------------------------------------- */

  /**
   * Request an authentication access.
   *
   * @param email the email of the user
   * @param password the password of the user
   *
   */
  async login(email: string, password: string) {
    return this.apiService.loginPost(email, password); 
  }

  /**
   * Logout a user from the authentication process.
   *
   * 
   */
  async logout() {
    await this.userService.deleteOnStorage()
    document.location.href = 'index.html';
  }


  /**
   * Check whether a user is already logged in.
   *
   * 
   */
  isLoggedIn() {
    if (this.user.reto_actual) {
      return true;
    } else {
      return false;
    }
  }

  /* ---------------------------------------------------------------------------------------------------------------- */
}