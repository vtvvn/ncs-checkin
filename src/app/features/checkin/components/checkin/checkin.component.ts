import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HealthDeclaration } from 'src/app/features/health/models';
import { DeclarationService } from 'src/app/features/health/services';
import { Party } from 'src/app/features/party/models';
import { PartyService } from 'src/app/features/party/services';
import { dateDiffInHour, sortBy } from 'src/app/shared/util';
import { CheckIn } from '../../models';
import { CheckInService, ConfigurationService } from '../../services';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  form: FormGroup;
  checkIns: CheckIn[];
  checkIn: CheckIn;
  party: Party;
  declarations: HealthDeclaration[];
  decLastest: HealthDeclaration;
  config;
  msg: string;
  constructor(
    private configService: ConfigurationService,
    private checkInService: CheckInService,
    private decService: DeclarationService,
    private partyService: PartyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCheckIns();
    this.getConfig();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({ token: [''] });
  }
  getCheckIns() {
    this.subscription$ = this.checkInService.getCheckIns().subscribe((c) => {
      this.checkIns = c;
      sortBy(this.checkIns, { prop: 'checkinTime', desc: true });
    });
  }
  getConfig() {
    this.subscription$ = this.configService
      .getCheckInConfig()
      .subscribe((cfg) => (this.config = cfg));
  }
  onEnter(token) {
    this.onCheckIn(token);
    this.form.get('token').reset();
  }
  onCheckIn(token) {
    // validate token id for create checkin
    this.validateToken(token);
  }
  validateToken(token) {
    const partyCode = token.toUpperCase();
    // Emitting customerIds 1 and 2 with a 25ms delay
    this.subscription$ = this.partyService
      .searchPartyByCode(partyCode)
      .subscribe((party) => {
        this.party = party[0];
        if (!this.party) {
          this.msg = `Token ${partyCode} không hợp lệ`;
          return;
        }
        this.msg = null;
        this.decService
          .getDecsByPartyId(this.party.partyId)
          .subscribe((dec) => {
            this.declarations = dec;
            sortBy(this.declarations, { prop: 'decDatetime', desc: true });
            this.decLastest = this.declarations[0];
            let msg = '';
            let sts = '';
            let decId = '';
            if (!this.decLastest) {
              msg = 'Chưa khai báo y tế (Vui lòng khai báo trước khi check in)';
              sts = 'FAIL';
            } else if (
              dateDiffInHour(
                new Date(this.decLastest.decDatetime),
                new Date()
              ) > 15
            ) {
              decId = this.decLastest.healthDeclarationId;
              msg =
                'Tờ khai đã hết hiệu lực (Vui lòng khai báo mới trước khi check in)';
              sts = 'FAIL';
            } else if (
              this.decLastest.info11 ||
              this.decLastest.info12 ||
              this.decLastest.info13 ||
              this.decLastest.info14 ||
              this.decLastest.info15
            ) {
              decId = this.decLastest.healthDeclarationId;
              msg = [
                this.decLastest.info11,
                this.decLastest.info12,
                this.decLastest.info13,
                this.decLastest.info14,
                this.decLastest.info15,
              ]
                .filter(Boolean)
                .join(', ');
              sts = 'WARN';
            } else {
              decId = this.decLastest.healthDeclarationId;
              sts = 'PASS';
            }
            this.checkIn = {
              id: '',
              tokenId: token,
              partyId: this.party.partyId,
              message: msg,
              status: sts,
              healthDeclarationId: decId,
              checkinTime: new Date(),
              responseTime: new Date(),
            };
            console.log(this.checkIn);
            this.checkInService.addCheckIn(this.checkIn).subscribe((c) => {
              this.checkIns.push(c);
              sortBy(this.checkIns, { prop: 'checkinTime', desc: true });
            });
          });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
