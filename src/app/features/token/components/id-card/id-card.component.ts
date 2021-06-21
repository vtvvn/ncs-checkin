import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdCard } from '../../models';
import { ConfigurationService, IdCardService } from '../../services';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss'],
})
export class IdCardComponent implements OnInit {
  idCard: IdCard;
  config;
  constructor(
    private idCardService: IdCardService,
    private configService: ConfigurationService
  ) {}
  ngOnInit(): void {
    this.getIdCard();
    this.getConfig();
  }
  getIdCard() {
    this.idCard = JSON.parse(localStorage.getItem('CHECKIN_ID_CARD'));
  }
  getConfig(): void {
    this.configService
      .getIdCardConfig()
      .subscribe((cfg) => (this.config = cfg));
  }
}
