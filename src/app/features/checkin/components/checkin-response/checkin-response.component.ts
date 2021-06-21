import { Component, Input, OnInit } from '@angular/core';
import { CheckIn } from '../../models';
import { CheckInService, ConfigurationService } from '../../services';

@Component({
  selector: 'app-checkin-response',
  templateUrl: './checkin-response.component.html',
  styleUrls: ['./checkin-response.component.scss'],
})
export class CheckinResponseComponent implements OnInit {
  @Input() checkIns: CheckIn[];
  @Input() config;
  constructor(
  ) {}

  ngOnInit(): void {
  }

}
