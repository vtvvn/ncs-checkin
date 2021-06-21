import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor() {}
  getDeclarationConfig(): Observable<any> {
    const config = {
      id: { label: 'Mã tờ khai ' },
      partyCode: { label: 'Mã NV ' },
      partyName: { label: 'Họ và tên ' },
      mobile: { label: 'Số ĐT ' },
      email: { label: 'Email ' },
      birthYear: { label: 'Năm sinh ' },
      sex: { label: 'Giới tính ' },
      address: {label: 'Địa chỉ liên lạc '},
      decDatetime: { label: 'Ngày khai báo ' },
      content: {label: 'Nội dung khai báo '},
      movingOn: {label: 'Phương tiện di chuyển '},
      info01: {
        label:
          'Trong vòng 14 ngày qua, Anh/Chị có đến tỉnh/thành phố, quốc gia/vùng lãnh thổ nào (Có thể đi qua nhiều nơi)',
        answer1: 'Có',
        answer2: 'Không',
        content: 'Trong vòng 14 ngày qua, đã đi qua: ',
        cssClass: 'font-weight-bold',
      },
      info02: {
        label:
          'Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện ít nhất 1 trong các dấu hiệu: sốt, ho, khó thở, viêm phổi, đau họng, mệt mỏi không?',
        answer1: 'Có',
        answer2: 'Không',
        content: 'Trong vòng 14 ngày qua, đã xuất hiệu dấu hiệu: ',
        cssClass: 'font-weight-bold',
      },
      info03: {
        label:
          'Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với: Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19',
        answer1: 'Có',
        answer2: 'Không',
        content: 'Trong vòng 14 ngày qua, đã tiếp xúc với người bệnh hoặc nghi có mắc bệnh COVID-19: ',
        cssClass: 'font-weight-bold',
      },
      info04: {
        label:
          'Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với: Người từ nước có bệnh COVID-19 ',
        answer1: 'Có',
        answer2: 'Không',
        content: 'Trong vòng 14 ngày qua, đã tiếp xúc với người từ nước có bệnh COVID-19: ',
        cssClass: 'font-weight-bold',
      },
      info05: {
        label:
          'Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với: Người có biểu hiện (Sốt, ho, khó thở , Viêm phổi)',
        answer1: 'Có',
        answer2: 'Không',
        content: 'Trong vòng 14 ngày qua, đã tiếp xúc với người có biểu hiện: ',
        cssClass: 'font-weight-bold',
      },
      info11: {placeholder: 'A/c ghi rõ những nơi đi qua (*)', err: 'Dữ liệu bắt buộc nhập'},
      info12: {placeholder: 'A/c ghi rõ dấu hiệu (*)', err: 'Dữ liệu bắt buộc nhập'},
      info13: {placeholder: 'A/c ghi rõ thông tin (*)', err: 'Dữ liệu bắt buộc nhập'},
      info14: {placeholder: 'A/c ghi rõ thông tin (*)', err: 'Dữ liệu bắt buộc nhập'},
      info15: {placeholder: 'A/c ghi rõ thông tin (*)', err: 'Dữ liệu bắt buộc nhập'},
      summit: { label: 'Gửi tờ khai', cssClass: 'btn bg-primary' },
      goBack: { label: 'Trở về', cssClass: 'btn bg-primary'}
    };
    return of(config);
  }
}
