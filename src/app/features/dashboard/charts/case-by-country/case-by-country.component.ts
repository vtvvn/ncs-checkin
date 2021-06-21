import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { tap } from 'rxjs/operators';
import { CountryStatus } from '../../models';
import { CovidCaseService } from '../../services/covid-case.service';

@Component({
  selector: 'app-case-by-country',
  templateUrl: './case-by-country.component.html',
  styleUrls: ['./case-by-country.component.scss'],
})
export class CaseByCountryComponent implements OnInit {
  cases: CountryStatus[] = [];
  selectedCountry: string;
  chartOptions: EChartsOption;
  constructor(private appService: CovidCaseService) {}
  countries$ = this.appService.getCountries$.pipe(
    tap((countries) => {
      this.selectedCountry = countries.filter(c => c.ISO2==='VN')[0].Slug;
      this.setOptions([]);
    })
  );


  ngOnInit(): void {
  }
  onChangeCountry() {
    this.appService
      .getCasesByCountry(this.selectedCountry)
      .subscribe((cases) => {
        this.cases = cases;
        this.setOptions(cases);
      });
  }
  setOptions(cases) {
    this.chartOptions = {
      title: {
      },
      legend: {
        data: ['Confirmed', 'Recovered', 'Deaths'],
      },
      tooltip: {},
      xAxis: {
        data: cases.map((c) => new Date(c.Date).toLocaleDateString()),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Confirmed',
          type: 'line',
          data: cases.map((c) => c.Confirmed),
        },
        {
          name: 'Recovered',
          type: 'line',
          data: cases.map((c) => c.Recovered),
        },
        {
          name: 'Deaths',
          type: 'line',
          data: cases.map((c) => c.Deaths),
        },
      ],
    };
  }
}
