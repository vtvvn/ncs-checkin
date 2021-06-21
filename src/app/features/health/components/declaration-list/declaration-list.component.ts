import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth';
import { sortBy } from 'src/app/shared/util';
import { HealthDeclaration } from '../../models';
import { ConfigurationService, DeclarationService } from '../../services';

@Component({
  selector: 'app-declaration-list',
  templateUrl: './declaration-list.component.html',
  styleUrls: ['./declaration-list.component.scss'],
})
export class DeclarationListComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  decs: HealthDeclaration[];
  config;
  fullname: string;
  constructor(
    private decService: DeclarationService,
    private configService: ConfigurationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    this.fullname = this.auth.getFullName();
    this.getConfig();
    this.getDecs(userId);
  }
  getDecs(userId) {
    this.subscription$ =  this.decService.getDecsByUserId(userId).subscribe((c) => {
      this.decs = c;
      sortBy(this.decs, { prop: 'decDatetime', desc: true });
    });
  }
  getConfig() {
    this.configService
      .getDeclarationConfig()
      .subscribe((cfg) => (this.config = cfg));
  }
  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
