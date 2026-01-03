import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface OnlineService {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  gradient: string;
  features: string[];
  isExternal: boolean;
}

@Component({
  selector: 'app-online-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './online-services.component.html'
})
export class OnlineServicesComponent {
  services: OnlineService[] = [
    {
      id: 'appointment',
      title: 'Đặt lịch hẹn khám bệnh',
      description: 'Đặt lịch khám nhanh chóng, thuận tiện. Chọn bác sĩ, chuyên khoa và thời gian phù hợp với bạn.',
      icon: 'bi-calendar-check',
      route: '/dat-lich-kham',
      color: 'primary',
      gradient: 'linear-gradient(135deg, #2FA4A9 0%, #23878B 100%)',
      features: ['Chọn bác sĩ theo chuyên khoa', 'Xem lịch trống real-time', 'Nhận xác nhận qua SMS/Email'],
      isExternal: false
    },
    {
      id: 'qa',
      title: 'Hỏi đáp cùng chuyên gia',
      description: 'Tư vấn sức khỏe trực tuyến với đội ngũ bác sĩ chuyên môn cao. Giải đáp thắc mắc nhanh chóng.',
      icon: 'bi-chat-heart',
      route: '/online-services/hoi-dap',
      color: 'secondary',
      gradient: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
      features: ['Tư vấn miễn phí', 'Bảo mật thông tin', 'Phản hồi trong 24h'],
      isExternal: false
    },
    {
      id: 'results',
      title: 'Tra cứu kết quả xét nghiệm',
      description: 'Xem kết quả xét nghiệm online mọi lúc mọi nơi. Lưu trữ lịch sử an toàn và tiện lợi.',
      icon: 'bi-file-earmark-medical',
      route: '/patient/tien-ich/tra-cuu-ket-qua',
      color: 'success',
      gradient: 'linear-gradient(135deg, #5CBF90 0%, #48A97B 100%)',
      features: ['Tra cứu 24/7', 'Tải PDF kết quả', 'Lịch sử xét nghiệm'],
      isExternal: false
    }
  ];

  stats = [
    { value: '50,000+', label: 'Lượt đặt lịch', icon: 'bi-calendar-check' },
    { value: '10,000+', label: 'Câu hỏi đã trả lời', icon: 'bi-chat-dots' },
    { value: '100,000+', label: 'Kết quả tra cứu', icon: 'bi-file-earmark-text' },
    { value: '99.9%', label: 'Uptime', icon: 'bi-shield-check' }
  ];
}

