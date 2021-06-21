import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { Party } from 'src/app/features/party/models';
import { PartyService } from 'src/app/features/party/services';
import { HealthDeclaration } from '../../models';
import { ConfigurationService, DeclarationService } from '../../services';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss'],
})
export class DeclarationComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  form: FormGroup;
  party: Party;
  isValidate: boolean;
  submitted = false;
  errMsg: string;
  config;
  dec;
  tabId = 'EMP';
  movingOn = [
    { id: '01', description: 'Xe tuyến 01' },
    { id: '02', description: 'Xe tuyến 02' },
    { id: '03', description: 'Xe tuyến 03' },
    { id: '04', description: 'Xe tuyến 04' },
    { id: '05', description: 'Xe tuyến 05' },
    { id: '06', description: 'Xe tuyến 06' },
    { id: '07', description: 'Xe tuyến 07' },
    { id: '08', description: 'Hà Nội bus 09' },
    { id: '09', description: 'Hà Nội bus 86' },
    { id: '10', description: 'Hà Nội bus 109' },
    { id: '11', description: 'Xe cá nhân' },
    { id: '12', description: 'Khác' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private decService: DeclarationService,
    private configService: ConfigurationService,
    private partyService: PartyService
  ) {}

  ngOnInit(): void {
    this.configService
      .getDeclarationConfig()
      .subscribe((conf) => (this.config = conf));

    if (localStorage.getItem('CHECKIN_DEC')) {
      this.dec = JSON.parse(localStorage.getItem('CHECKIN_DEC'));
      if (this.tabId === 'EMP') {
        this.dec.partyName = null;
      }
    } else {
      this.dec = {
        info01: 0,
        info02: 0,
        info03: 0,
        info04: 0,
        info05: 0,
      };
    }
    this.buildForm(this.dec);
  }
  private buildForm(data: any): void {
    this.form = this.fb.group(
      {
        partyCode: [data.partyCode],
        partyName: [data.partyName, Validators.required],
        mobile: [data.mobile],
        email: [data.email],
        idCode: [data.idCode],
        birthYear: [data.birthYear, [Validators.pattern('[0-9]{4}$')]],
        sex: [data.sex],
        address: [data.address],
        info01: [data.info01],
        info02: [data.info02],
        info03: [data.info03],
        info04: [data.info04],
        info05: [data.info05],
        info11: [data.info11],
        info12: [data.info12],
        info13: [data.info13],
        info14: [data.info14],
        info15: [data.info15],
        movingOn: [data.info06, Validators.required]
      },
      { validators: this.validateExtra }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  get info01() {
    return this.form.get('info01') as FormControl;
  }
  get info02() {
    return this.form.get('info02') as FormControl;
  }
  get info03() {
    return this.form.get('info03') as FormControl;
  }
  get info04() {
    return this.form.get('info04') as FormControl;
  }
  get info05() {
    return this.form.get('info05') as FormControl;
  }
  get info06() {
    return this.form.get('info06') as FormControl;
  }
  get info11() {
    return this.form.get('info11') as FormControl;
  }
  get info12() {
    return this.form.get('info12') as FormControl;
  }
  get info13() {
    return this.form.get('info13') as FormControl;
  }
  get info14() {
    return this.form.get('info14') as FormControl;
  }
  get info15() {
    return this.form.get('info15') as FormControl;
  }
  /** A hero's name can't match the hero's alter ego */
  validateExtra: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const invalid =
      (control.get('info01').value === 1 &&
        control.get('info11').value === null) ||
      (control.get('info02').value === 1 &&
        control.get('info12').value === null) ||
      (control.get('info03').value === 1 &&
        control.get('info13').value === null) ||
      (control.get('info04').value === 1 &&
        control.get('info14').value === null) ||
      (control.get('info05').value === 1 &&
        control.get('info15').value === null);
    return invalid ? { required: true } : null;
  };
  onSelect(data: TabDirective): void {
    this.tabId = data.id;
  }
  getEmployee() {
    if (this.form.get('partyCode').value) {
      const code = this.form.get('partyCode').value.toUpperCase();
      this.subscription$ = this.partyService
        .searchPartyByCode(code)
        .subscribe((p) => {
          this.party = p[0];
          if (!this.party) {
          } else {
            this.form.get('partyName').setValue(this.party.name);
          }
        });
    }
  }
  sendDeclaration() {
    this.submitted = true;
    const dec: HealthDeclaration = this.form.value;
    dec.decDatetime = new Date();
    if (this.tabId === 'EMP') {
      this.form.get('partyCode').setValidators([Validators.required]);
      this.form.get('mobile').setValidators([]);
      this.form.get('email').setValidators([]);
    } else {
      this.form.get('partyCode').setValidators([]);
      this.form
        .get('mobile')
        .setValidators([Validators.required, Validators.pattern('[0-9]{10}$')]);
      this.form
        .get('email')
        .setValidators([Validators.required, Validators.email]);
    }
    this.form.get('partyCode').updateValueAndValidity();
    this.form.get('mobile').updateValueAndValidity();
    this.form.get('email').updateValueAndValidity();
    this.getEmployee();

    console.log(this.form);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    // Save for next declaration
    localStorage.setItem('CHECKIN_DEC', JSON.stringify(dec));
    if (this.party) {
      dec.partyId = this.party.partyId;
    }
    this.subscription$ = this.decService
      .addDeclaration(dec)
      .subscribe((dec) => {
        this.router.navigate(['/health/result'], {
          queryParams: { id: dec.healthDeclarationId },
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
