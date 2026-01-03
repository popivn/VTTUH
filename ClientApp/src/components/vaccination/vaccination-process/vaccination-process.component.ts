import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
}

@Component({
  selector: 'app-vaccination-process',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vaccination-process.component.html'
})
export class VaccinationProcessComponent {
  processSteps: ProcessStep[] = [
    {
      step: 1,
      title: 'Đăng ký tiêm chủng',
      description: 'Đăng ký trực tuyến hoặc tại quầy tiếp nhận',
      details: [
        'Đăng ký online trên website hoặc gọi hotline',
        'Hoặc đến trực tiếp quầy tiếp nhận tại bệnh viện',
        'Mang theo CMND/CCCD và sổ tiêm chủng (nếu có)',
        'Điền đầy đủ thông tin cá nhân và lịch sử tiêm'
      ],
      icon: 'bi-pencil-square',
      color: '#8B5CF6'
    },
    {
      step: 2,
      title: 'Khám sàng lọc',
      description: 'Bác sĩ khám và đánh giá tình trạng sức khỏe',
      details: [
        'Đo nhiệt độ, huyết áp, nhịp tim',
        'Khai báo bệnh lý nền và tiền sử dị ứng',
        'Bác sĩ tư vấn loại vaccine phù hợp',
        'Ký cam kết đồng ý tiêm chủng'
      ],
      icon: 'bi-clipboard2-pulse',
      color: '#6366F1'
    },
    {
      step: 3,
      title: 'Thanh toán',
      description: 'Thanh toán chi phí tiêm chủng (nếu có)',
      details: [
        'Vaccine miễn phí: Không cần thanh toán',
        'Vaccine dịch vụ: Thanh toán tại quầy thu ngân',
        'Chấp nhận tiền mặt, thẻ, chuyển khoản',
        'Nhận hóa đơn và phiếu tiêm chủng'
      ],
      icon: 'bi-credit-card',
      color: '#2FA4A9'
    },
    {
      step: 4,
      title: 'Tiêm vaccine',
      description: 'Tiêm chủng bởi điều dưỡng chuyên nghiệp',
      details: [
        'Kiểm tra lại thông tin và loại vaccine',
        'Điều dưỡng tiêm đúng kỹ thuật',
        'Dán băng và hướng dẫn chăm sóc vết tiêm',
        'Ghi nhận thông tin vào sổ tiêm chủng'
      ],
      icon: 'bi-droplet-fill',
      color: '#10B981'
    },
    {
      step: 5,
      title: 'Theo dõi sau tiêm',
      description: 'Nghỉ ngơi và theo dõi 30 phút tại bệnh viện',
      details: [
        'Ngồi nghỉ tại phòng theo dõi',
        'Nhân viên y tế giám sát liên tục',
        'Thông báo ngay nếu có triệu chứng bất thường',
        'Nhận hướng dẫn theo dõi tại nhà'
      ],
      icon: 'bi-clock-history',
      color: '#F59E0B'
    },
    {
      step: 6,
      title: 'Theo dõi tại nhà',
      description: 'Tự theo dõi sức khỏe 24-48 giờ sau tiêm',
      details: [
        'Theo dõi vị trí tiêm: sưng, đau, đỏ',
        'Đo nhiệt độ định kỳ',
        'Uống nhiều nước, nghỉ ngơi đầy đủ',
        'Liên hệ bệnh viện nếu có phản ứng bất thường'
      ],
      icon: 'bi-house-heart',
      color: '#EF4444'
    }
  ];

  tips = [
    { icon: 'bi-check-circle', title: 'Trước khi tiêm', text: 'Ăn uống đầy đủ, ngủ đủ giấc, không uống rượu bia' },
    { icon: 'bi-exclamation-triangle', title: 'Chống chỉ định', text: 'Sốt cao, dị ứng nặng vaccine, đang mắc bệnh cấp tính' },
    { icon: 'bi-telephone', title: 'Liên hệ ngay nếu', text: 'Sốt > 39°C, khó thở, phát ban toàn thân, co giật' }
  ];
}

