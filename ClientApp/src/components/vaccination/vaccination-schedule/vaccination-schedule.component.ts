import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface VaccineSchedule {
  vaccine: string;
  doses: string;
  timing: string;
  required: boolean;
  notes?: string;
}

interface AgeGroup {
  id: string;
  label: string;
  icon: string;
  color: string;
  schedule: VaccineSchedule[];
}

@Component({
  selector: 'app-vaccination-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vaccination-schedule.component.html'
})
export class VaccinationScheduleComponent {
  activeTab = signal<string>('infant');

  ageGroups: AgeGroup[] = [
    {
      id: 'infant',
      label: 'Trẻ sơ sinh (0-12 tháng)',
      icon: 'bi-emoji-heart-eyes',
      color: '#EC4899',
      schedule: [
        { vaccine: 'BCG (Lao)', doses: '1 mũi', timing: 'Trong 24 giờ sau sinh', required: true },
        { vaccine: 'Viêm gan B (liều sơ sinh)', doses: '1 mũi', timing: 'Trong 24 giờ sau sinh', required: true },
        { vaccine: 'DPT-VGB-Hib (5 trong 1)', doses: '3 mũi', timing: '2, 3, 4 tháng tuổi', required: true },
        { vaccine: 'Bại liệt (OPV/IPV)', doses: '3 mũi', timing: '2, 3, 4 tháng tuổi', required: true },
        { vaccine: 'Rotavirus', doses: '2-3 mũi', timing: '2, 4 (6) tháng tuổi', required: false, notes: 'Khuyến nghị' },
        { vaccine: 'Phế cầu (PCV)', doses: '3 mũi', timing: '2, 4, 6 tháng tuổi', required: false, notes: 'Khuyến nghị' },
        { vaccine: 'Cúm', doses: '2 mũi', timing: 'Từ 6 tháng tuổi', required: false, notes: 'Hàng năm' },
        { vaccine: 'Sởi', doses: '1 mũi', timing: '9 tháng tuổi', required: true }
      ]
    },
    {
      id: 'toddler',
      label: 'Trẻ nhỏ (1-5 tuổi)',
      icon: 'bi-emoji-smile',
      color: '#F59E0B',
      schedule: [
        { vaccine: 'Sởi-Rubella (MR)', doses: '1 mũi', timing: '18 tháng tuổi', required: true },
        { vaccine: 'DPT (nhắc lại)', doses: '1 mũi', timing: '18 tháng tuổi', required: true },
        { vaccine: 'Viêm não Nhật Bản', doses: '3 mũi', timing: '1-5 tuổi', required: true },
        { vaccine: 'MMR (Sởi-Quai bị-Rubella)', doses: '2 mũi', timing: '12-15 tháng, 4-6 tuổi', required: false, notes: 'Thay thế MR' },
        { vaccine: 'Thủy đậu', doses: '2 mũi', timing: '12 tháng, 4-6 tuổi', required: false, notes: 'Khuyến nghị' },
        { vaccine: 'Viêm gan A', doses: '2 mũi', timing: '12 tháng, 18 tháng', required: false, notes: 'Khuyến nghị' },
        { vaccine: 'Cúm', doses: '1 mũi/năm', timing: 'Hàng năm', required: false }
      ]
    },
    {
      id: 'child',
      label: 'Trẻ em (6-11 tuổi)',
      icon: 'bi-person-raised-hand',
      color: '#10B981',
      schedule: [
        { vaccine: 'Td (Bạch hầu-Uốn ván)', doses: '1 mũi', timing: '7 tuổi', required: true },
        { vaccine: 'HPV (nữ)', doses: '2 mũi', timing: '9-14 tuổi', required: false, notes: 'Khuyến nghị mạnh' },
        { vaccine: 'Cúm', doses: '1 mũi/năm', timing: 'Hàng năm', required: false },
        { vaccine: 'COVID-19', doses: '2-3 mũi', timing: 'Theo hướng dẫn', required: false }
      ]
    },
    {
      id: 'teen',
      label: 'Thanh thiếu niên (12-17 tuổi)',
      icon: 'bi-person',
      color: '#6366F1',
      schedule: [
        { vaccine: 'HPV', doses: '3 mũi', timing: '0, 2, 6 tháng', required: false, notes: 'Nữ 9-26, Nam 9-21 tuổi' },
        { vaccine: 'Tdap (Bạch hầu-Uốn ván-Ho gà)', doses: '1 mũi', timing: '11-12 tuổi', required: false },
        { vaccine: 'Viêm màng não', doses: '2 mũi', timing: '11-12 tuổi, 16 tuổi', required: false },
        { vaccine: 'Cúm', doses: '1 mũi/năm', timing: 'Hàng năm', required: false },
        { vaccine: 'COVID-19', doses: 'Theo lịch', timing: 'Theo hướng dẫn', required: false }
      ]
    },
    {
      id: 'adult',
      label: 'Người lớn (18-49 tuổi)',
      icon: 'bi-person-check',
      color: '#2FA4A9',
      schedule: [
        { vaccine: 'Cúm', doses: '1 mũi/năm', timing: 'Hàng năm', required: false, notes: 'Khuyến nghị' },
        { vaccine: 'Td/Tdap', doses: '1 mũi', timing: 'Mỗi 10 năm', required: false },
        { vaccine: 'HPV', doses: '3 mũi', timing: 'Chưa tiêm trước đó', required: false, notes: 'Nữ đến 26, Nam đến 21' },
        { vaccine: 'Viêm gan B', doses: '3 mũi', timing: 'Nếu chưa tiêm', required: false },
        { vaccine: 'Sởi-Quai bị-Rubella', doses: '1-2 mũi', timing: 'Nếu chưa miễn dịch', required: false },
        { vaccine: 'COVID-19', doses: 'Theo lịch', timing: 'Theo hướng dẫn', required: false }
      ]
    },
    {
      id: 'senior',
      label: 'Người cao tuổi (50+ tuổi)',
      icon: 'bi-person-heart',
      color: '#8B5CF6',
      schedule: [
        { vaccine: 'Cúm', doses: '1 mũi/năm', timing: 'Hàng năm', required: false, notes: 'Rất khuyến nghị' },
        { vaccine: 'Phế cầu (PPSV23/PCV13)', doses: '1-2 mũi', timing: '65 tuổi trở lên', required: false, notes: 'Rất khuyến nghị' },
        { vaccine: 'Zona (Herpes Zoster)', doses: '2 mũi', timing: '50 tuổi trở lên', required: false },
        { vaccine: 'Td/Tdap', doses: '1 mũi', timing: 'Mỗi 10 năm', required: false },
        { vaccine: 'COVID-19', doses: 'Theo lịch', timing: 'Theo hướng dẫn', required: false, notes: 'Rất khuyến nghị' }
      ]
    }
  ];

  get currentGroup(): AgeGroup | undefined {
    return this.ageGroups.find(g => g.id === this.activeTab());
  }

  setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }
}

