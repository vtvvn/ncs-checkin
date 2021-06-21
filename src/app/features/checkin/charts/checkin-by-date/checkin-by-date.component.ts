import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { CheckIn } from 'src/app/features/checkin/models';
import { CheckInService } from 'src/app/features/checkin/services';
const maxResults: number = 6;
const maxDays: number = 60;
@Component({
  selector: 'app-checkin-by-date',
  templateUrl: './checkin-by-date.component.html',
  styleUrls: ['./checkin-by-date.component.scss'],
})
export class CheckinByDateComponent implements OnInit {
  checkins: CheckIn[];
  chartOptions: EChartsOption;
  map1: Map<string, number> = new Map<string, number>();
  map2: Map<string, number> = new Map<string, number>();
  map3: Map<string, number> = new Map<string, number>();
  pageTitle: string = 'Upcoming Deal Closures';
  pageSubtitle: string = 'Next ' + maxDays + ' Days';
  constructor(private dataService: CheckInService) {}

  ngOnInit(): void {
    this.loadCheckins();
  }
  loadCheckins() {
    this.dataService.getCheckIns().subscribe((ck) => {
      this.handleCheckInsResponse(ck);
    });
  }
  private handleCheckInsResponse(checkins: CheckIn[]) {
    checkins.forEach((ck) => {
      this.addDealValue(ck);
    });
    this.setOptions();
  }
  private addDealValue(checkin: CheckIn) {
    let date: string = new Date(checkin.checkinTime).toLocaleDateString();
    let value: number = 1;
    if (this.map1.get(date)) {
      let currentVal: number = this.map1.get(date);
      let newVal: number = currentVal + value;

      this.map1.set(date, newVal);
    } else {
      this.map1.set(date, value);
    }
  }

  setOptions() {
    this.chartOptions = {
      title: {},
      grid: {
        //prevents cutoff of y-axis labels
        left: '15%',
      },
      legend: {},
      tooltip: {},
      xAxis: {
        type: 'category',
        data: Array.from(this.map1.keys()),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: Array.from(this.map1.values()),
          type: 'line',
        },
        {
          data: Array.from(this.map1.values()),
          type: 'bar',
        },
      ],
    };
  }
}
