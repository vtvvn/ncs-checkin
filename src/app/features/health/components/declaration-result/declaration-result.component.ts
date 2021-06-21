import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigurationService, DeclarationService } from '../../services';
import { HealthDeclaration } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-declaration-result',
  templateUrl: './declaration-result.component.html',
  styleUrls: ['./declaration-result.component.scss'],
})
export class DeclarationResultComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  declaration: HealthDeclaration;
  decId: string;
  config;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private decService: DeclarationService,
    private configService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.getDeclaration();
    this.configService
      .getDeclarationConfig()
      .subscribe((conf) => (this.config = conf));
  }
  getDeclaration() {
    this.decId = this.route.snapshot.queryParamMap.get('id');
    this.subscription$ = this.decService.getDeclaration(this.decId).subscribe((dec) => {
      this.declaration = dec;
      this.declaration.content = this.declaration.content
        ? this.declaration.content
        : 'Mọi thứ có vẻ ổn';
    });
  }
  goBack(): void {
    this.location.back();
  }
  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
