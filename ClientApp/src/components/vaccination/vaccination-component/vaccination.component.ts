import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface VaccineCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  gradient: string;
  features: string[];
}

interface VaccineType {
  name: string;
  target: string;
  status: 'available' | 'limited' | 'coming';
  statusText: string;
  icon: string;
}

@Component({
  selector: 'app-vaccination',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vaccination.component.html'
})
export class VaccinationComponent {
  services: VaccineCard[] = [
    {
      id: 'status',
      title: 'Tình hình Vaccin',
      description: 'Xem tình trạng vaccine hiện có, số lượng và giá cả. Cập nhật thường xuyên từ kho dược.',
      icon: 'bi-capsule',
      route: '/vaccination/tinh-hinh-vaccin',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      features: ['Cập nhật real-time', 'Xem giá vaccine', 'Đặt trước khi hết']
    },
    {
      id: 'process',
      title: 'Quy trình tiêm chủng',
      description: 'Hướng dẫn chi tiết các bước tiêm chủng tại bệnh viện. Chuẩn bị gì trước khi tiêm.',
      icon: 'bi-list-check',
      route: '/vaccination/quy-trinh',
      gradient: 'linear-gradient(135deg, #2FA4A9 0%, #23878B 100%)',
      features: ['6 bước đơn giản', 'Theo dõi sau tiêm', 'Lưu ý quan trọng']
    },
    {
      id: 'schedule',
      title: 'Lịch tiêm chủng',
      description: 'Lịch tiêm chủng theo độ tuổi. Vaccine bắt buộc và khuyến nghị cho mọi lứa tuổi.',
      icon: 'bi-calendar-heart',
      route: '/vaccination/lich-tiem',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      features: ['Theo độ tuổi', 'Vaccine bắt buộc', 'Tải PDF lịch tiêm']
    }
  ];

  stats = [
    { value: '500,000+', label: 'Mũi tiêm đã thực hiện', icon: 'bi-droplet-fill' },
    { value: '200,000+', label: 'Người đã tiêm', icon: 'bi-people-fill' },
    { value: '99.9%', label: 'Tỷ lệ an toàn', icon: 'bi-shield-check' },
    { value: '50+', label: 'Loại vaccine', icon: 'bi-capsule' }
  ];

  popularVaccines: VaccineType[] = [
    { name: 'Vaccine COVID-19', target: 'Người lớn & Trẻ em', status: 'available', statusText: 'Còn hàng', icon: 'bi-virus' },
    { name: 'Vaccine Cúm mùa', target: 'Mọi lứa tuổi', status: 'available', statusText: 'Còn hàng', icon: 'bi-thermometer-half' },
    { name: 'Vaccine Viêm gan B', target: 'Trẻ sơ sinh & Người lớn', status: 'limited', statusText: 'Sắp hết', icon: 'bi-heart-pulse' },
    { name: 'Vaccine HPV', target: 'Nữ 9-26 tuổi', status: 'available', statusText: 'Còn hàng', icon: 'bi-gender-female' },
    { name: 'Vaccine Sởi-Quai bị-Rubella', target: 'Trẻ em', status: 'available', statusText: 'Còn hàng', icon: 'bi-emoji-smile' },
    { name: 'Vaccine Phế cầu', target: 'Trẻ em & Người cao tuổi', status: 'coming', statusText: 'Đang nhập', icon: 'bi-lungs' }
  ];

  processSteps = [
    { step: 1, title: 'Đăng ký', description: 'Đăng ký online hoặc tại quầy', icon: 'bi-pencil-square' },
    { step: 2, title: 'Khám sàng lọc', description: 'Bác sĩ khám và tư vấn', icon: 'bi-clipboard2-pulse' },
    { step: 3, title: 'Tiêm vaccine', description: 'Tiêm bởi điều dưỡng chuyên nghiệp', icon: 'bi-droplet' },
    { step: 4, title: 'Theo dõi', description: 'Nghỉ ngơi 30 phút tại viện', icon: 'bi-clock-history' }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'bg-success';
      case 'limited': return 'bg-warning text-dark';
      case 'coming': return 'bg-info';
      default: return 'bg-secondary';
    }
  }
}

