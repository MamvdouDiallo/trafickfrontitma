import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { confirmPasswordValidator } from "src/app/shared/pipes/confirm-password.validator";

@Component({
  selector: "app-login2",
  templateUrl: "./login2.component.html",
  styleUrls: ["./login2.component.scss"],
})
/**
 * Login-2 component
 */
export class Login2Component implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public toastr: ToastrService,
    public store: Store
  ) {
    this.loginForm = this.formBuilder.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{5,}/
            ),
          ],
        ],
        password_confirm: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{5,}/
            ),
          ],
        ],
      },
      {
        validators: confirmPasswordValidator,
      }
    );
    this.route.queryParams.subscribe((params) => {
      this.token = params["token"]; // Suppose que le paramètre s'appelle 'token'
    });
  }
  loginForm: FormGroup;
  submitted: any = false;
  error: any = "";
  returnUrl: string;
  fieldTextType!: boolean;
  fieldTextType1!: boolean;
  password_does_not_match!: boolean;
  token: string;
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
  }

  // swiper config
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  };

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.submitted = true;
    const password = this.f["password"].value;
    console.log("====================================");
    console.log(this.token);
    console.log("====================================");
    return this.authenticationService
      .changePassword(password, this.token)
      .subscribe(
        (data) => {
          this.toastr.success(`${data.message}`);
          this.submitted = false;
          console.log(data);
          this.loginForm.reset();
        },
        (err) => {
          this.toastr.error(`${err.message}`);
          this.submitted = false;
          console.log(err);
        }
      );
    // Login Api
    // this.store.dispatch(login({ email: email, password: password }));
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!control || !matchingControl) {
        return null;
      }

      if (
        matchingControl.errors &&
        !matchingControl.errors["confirmedValidator"]
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
