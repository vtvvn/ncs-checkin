import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor() {}
  getCheckInConfig(): Observable<any> {
    const config = {
      id: { label: 'ID: ' },
      tokenId: { label: 'Mã token ' },
      partyCode: { label: 'Mã NV ' },
      partyName: { label: 'Tên NV ' },
      message: { label: 'Mô tả ' },
      status: { label: 'Trạng thái ' },
      checkInTime: { label: 'Thời gian ' },
      declarationId: { label: 'Tờ khai ' }
    };
    return of(config);
  }
}
