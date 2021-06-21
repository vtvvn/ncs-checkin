import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor() {}
  getIdCardConfig(): Observable<any> {
    const config = {
      id: { label: 'Mã thẻ ' },
      issuer: { label: 'Phát hành bởi: ' },
      issueFor: { label: 'Tên thẻ ' },
      issueDate: { label: 'Ngày phát hành ' },
      fromDate: { label: 'Hiệu lực từ ' },
      toDate: { label: 'Hiệu lực đến ' },
      description: { label: 'Mô tả ' },
      summit: { label: 'Gửi tờ khai', cssClass: 'btn bg-primary' },
      goBack: { label: 'Trở về', cssClass: 'btn bg-primary' },
    };
    return of(config);
  }
}
