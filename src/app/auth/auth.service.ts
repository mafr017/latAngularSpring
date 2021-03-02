import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Users } from './users';

@Injectable()
export class AuthService {
  loggedIn = false;
  hasilLogin!: number;
  users = new Users();
  
  constructor(private router: Router, private httpClient: HttpClient) { }
  
  login(usrn: string, pasw: string) {
    // this.loggedIn = (usrn == "ABC" && password == "123");
    // this.loggedIn = true;
    // console.log(this.loggedIn);
    // if (this.loggedIn) {
      // this.router.navigate(["/listproduct"]);
    // }

    this.users.username = usrn;
    this.users.password = pasw;
    // users.hasil = 0;

    // this.httpClient.post(environment.baseUrl + 'cekloginjson', users).pipe(map( data => data )).subscribe((data : any) => {
    //   this.hasilLogin = data.hasil;
    //   console.log("ini " + this.hasilLogin);
    //   if (this.hasilLogin == 1) {
    //     this.loggedIn = true;
    //   } else {
    //     this.loggedIn = false;
    //   }
    //   this.router.navigate(["/listproduct"]);
    // });


    this.httpClient.post(environment.baseUrl + 'cekloginjson1', this.users).pipe(map( data => data ))
    .subscribe((data : any) => {
      console.log("ini " + data.user.isLogin);
      // this.loggedIn = data.status;
      this.loggedIn = data.user.isLogin;
      this.router.navigate(["/listproduct"]);
    });
  }

  logout() {
    //set islogin false jika logout
    console.log("username " + this.users.username + " password " + this.users.password);
    this.httpClient.post(environment.baseUrl + 'logoutjson', this.users).subscribe();
    this.users = new Users();
    this.loggedIn = false;
    this.router.navigate(["/"]);
  }

  isAuthenticated() {
    //di cek username apakah islogin true

    // this.httpClient.post(environment.baseUrl + 'cekislogin', this.users).pipe(map( data => data ))
    // .subscribe(( data : any ) => {
    //   console.log("islogin " + data.islogin);
    // });

    // const promise = new Promise(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(this.loggedIn)
    //     }, 1000);
    //   }
    // );

    const promise = new Promise(
      (resolve, reject) => { resolve(this.loggedIn) }
    );
    return promise;
  }

}
