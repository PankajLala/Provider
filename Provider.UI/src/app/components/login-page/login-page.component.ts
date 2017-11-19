import { Component, SimpleChange, OnInit, OnChanges } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Router} from '@angular/router';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [UserService]
})
export class LoginPageComponent implements OnInit {
  errors: string;
  submitted: boolean = false;
  isRequesting: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isLoggedIn()) {
      localStorage.removeItem('access_token');
    }
  }

  ngOnInit() {
  }

  login(username, password) {
    this.submitted = true;
    this.isRequesting = true;
    this.userService.login(username, password)
        .finally(() => this.isRequesting = false)
        .subscribe(
        result => {
          if (result) {
              this.router.navigate(['/provider']);
            }else {
            this.errors = 'User Name or Password Incorrect. Please try Again';
          }
        },
        error => this.errors = 'Something is not qutie right. Please try Later');
  }
}
