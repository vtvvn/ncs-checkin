import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth';

/* Authentication starts with a Login page, which can be hosted either in our domain or in a third-party domain. 
In an enterprise scenario, the login page is often hosted on a separate server, 
which is part of a company-wide Single Sign-On solution.

On the public Internet, the login page might also be:

1. hosted by a third-party Authentication provider such as Auth0
2. available directly in our single page application using a login screen route or a modal

A separately hosted login page is an improvement security-wise because this way the password is 
never directly handled by our application code in the first place.

The separately hosted login page can have minimal Javascript or even none at all, 
and it could be styled to make it look and feel as part of the whole application.
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null;
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    // this.store.dispatch(AuthActions.login(this.loginForm.value));
    this.subscription$ = this.authService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        }, 
        error: (error) => {
          // this.alertService.error(error);
          this.loading = false;
          throw error;
        },
      });
  }
  
  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
