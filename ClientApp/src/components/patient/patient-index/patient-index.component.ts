import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-index.component.html'
})
export class PatientIndexComponent {
  quickLinks = [
    {
      title: 'Quy trình khám chữa bệnh',
      description: 'Hướng dẫn chi tiết quy trình khám ngoại trú và nội trú',
      route: '/patient/quy-trinh-kham',
      icon: 'bi-clipboard-check',
      color: 'primary'
    },
    {
      title: 'Bảng giá dịch vụ',
      description: 'Xem bảng giá và các gói dịch vụ trọn gói',
      route: '/patient/bang-gia',
      icon: 'bi-cash-stack',
      color: 'success'
    },
    {
      title: 'Thanh toán BHYT',
      description: 'Hướng dẫn thanh toán và chính sách bảo hiểm',
      route: '/patient/thanh-toan',
      icon: 'bi-credit-card',
      color: 'info'
    },
    {
      title: 'Tra cứu kết quả',
      description: 'Tra cứu kết quả xét nghiệm trực tuyến',
      route: '/patient/tien-ich/tra-cuu-ket-qua',
      icon: 'bi-search',
      color: 'warning'
    },
    {
      title: 'Dịch vụ hỗ trợ',
      description: 'Đặt xe cấp cứu, chăm sóc tại nhà, khám online',
      route: '/patient/dich-vu',
      icon: 'bi-heart-pulse',
      color: 'danger'
    },
    {
      title: 'Thông tin thăm bệnh',
      description: 'Quy định và hướng dẫn cho khách thăm bệnh',
      route: '/patient/tham-benh',
      icon: 'bi-people',
      color: 'secondary'
    }
  ];
}

