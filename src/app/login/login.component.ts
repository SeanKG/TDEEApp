import { AuthMethods, AuthProviders, EmailPasswordCredentials } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @Output() onLogin = new EventEmitter();

  constructor(private af: AngularFire) { }

  ngOnInit() {
  }

  googleLogin() {
    this.af.auth.login({
      method: AuthMethods.Popup,
      provider: AuthProviders.Google
    }).then((r) => {
      console.log(r);
    });
  }

  signUp() {
    let cred: EmailPasswordCredentials = {
      email: prompt('email?'),
      password: prompt('password?')
    };

    this.af.auth.createUser(cred)
      .then(console.log)
      .catch(console.log);

  }

  passwordLogin() {
    let cred: EmailPasswordCredentials = {
      email: 'seankgraves@gmail.com',
      password: 'ototnaes1'
    };
    this.af.auth.login(cred, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    }).then((r) => {
      console.log(r);
    }).catch(console.log);
  }

}
