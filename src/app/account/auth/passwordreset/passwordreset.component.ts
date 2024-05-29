import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-passwordreset",
  templateUrl: "./passwordreset.component.html",
  styleUrls: ["./passwordreset.component.scss"],
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {
  resetForm: FormGroup;
  submitted: any = false;
  error: any = "";
  success: any = "";
  loading: any = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    this.authenticationService.resetPassword(this.f.email.value).subscribe(
      (data: any) => {
        console.log("====================================");
        console.log(data);
        this.toastr.success(`${data.message}`);
        this.submitted = false;
        this.resetForm.reset();
        console.log("====================================");
        this.success = data;
      },
      (err) => {
       // this.toastr.error(` ${err}`);
        this.submitted = false;
      }
    );
  }
}
