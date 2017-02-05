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

  email: string;
  pass: string;

  errorMsg: string;

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
    if (this.email && this.pass) {
      let cred: EmailPasswordCredentials = {
        email: this.email,
        password: this.pass
      };

      this.af.auth.createUser(cred)
        .then(console.log)
        .catch((e) => this.error(e));

    }

  }

  error(e: Error) {
    this.errorMsg = e.message;
  }

  passwordLogin() {

    if (this.email && this.pass) {
      let cred: EmailPasswordCredentials = {
        email: this.email,
        password: this.pass
      };
      this.af.auth.login(cred, {
        method: AuthMethods.Password,
        provider: AuthProviders.Password
      })
      .then(console.log)
      .catch((e) => this.error(e));

    }

  }

}
