import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  
  constructor(private router: Router) { }

  login(username: string, password: string) {
    this.loggedIn = (username == "ABC" && password == "123");
    console.log(this.loggedIn);
    if (this.loggedIn) {
      this.router.navigate(["/listproduct"]);
    }
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(["/"]);
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn)
        }, 1000);
      }
    );
    return promise;
  }

}
