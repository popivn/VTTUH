import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './staff-index.component.html'
})
export class StaffIndexComponent {
  quickLinks = [
    {
      title: 'Thông tin nội bộ',
      description: 'Thông tin và quy định nội bộ dành cho cán bộ y tế',
      route: '/staff/thong-tin-noi-bo',
      icon: 'bi-building',
      color: 'primary'
    },
    {
      title: 'Đào tạo liên tục',
      description: 'Chương trình đào tạo liên tục theo nhu cầu xã hội',
      route: '/staff/dao-tao-lien-tuc',
      icon: 'bi-book',
      color: 'success'
    },
    {
      title: 'Tuyển sinh/Chiêu sinh',
      description: 'Thông báo tuyển sinh và chiêu sinh các chương trình đào tạo',
      route: '/staff/thong-bao-tuyen-sinh',
      icon: 'bi-megaphone',
      color: 'info'
    },
    {
      title: 'Hội nghị, hội thảo',
      description: 'Thông tin các hội nghị và hội thảo chuyên môn',
      route: '/staff/hoi-nghi-hoi-thao',
      icon: 'bi-people',
      color: 'warning'
    },
    {
      title: 'Hợp tác bệnh viện',
      description: 'Thông tin hợp tác với các bệnh viện đối tác',
      route: '/staff/hop-tac-benh-vien',
      icon: 'bi-handshake',
      color: 'danger'
    },
    {
      title: 'Nghiên cứu khoa học',
      description: 'Các đề tài và dự án nghiên cứu khoa học',
      route: '/staff/nghien-cuu-khoa-hoc',
      icon: 'bi-flask',
      color: 'secondary'
    }
  ];
}

