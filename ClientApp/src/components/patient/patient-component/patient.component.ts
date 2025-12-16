import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';

export interface PatientMenuItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  children?: PatientMenuItem[];
}

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {
  activeSubmenu = signal<string | null>(null);
  
  menuItems: PatientMenuItem[] = [
    {
      id: 'process',
      label: 'Quy trình khám chữa bệnh',
      route: '/patient/quy-trinh-kham',
      icon: 'bi-clipboard-check',
      children: [
        { id: 'outpatient', label: 'Quy trình khám ngoại trú', route: '/patient/quy-trinh-kham/ngoai-tru', icon: 'bi-person-walking' },
        { id: 'inpatient', label: 'Quy trình khám nội trú, nhập viện và xuất viện', route: '/patient/quy-trinh-kham/noi-tru', icon: 'bi-hospital' },
        { id: 'inpatient-guide', label: 'Hướng dẫn điều trị nội trú cho bệnh nhân', route: '/patient/quy-trinh-kham/huong-dan-noi-tru', icon: 'bi-journal-text' }
      ]
    },
    {
      id: 'pricing',
      label: 'Bảng giá và gói dịch vụ',
      route: '/patient/bang-gia',
      icon: 'bi-cash-stack',
      children: [
        { id: 'price-list', label: 'Bảng giá dịch vụ bệnh viện', route: '/patient/bang-gia/dich-vu', icon: 'bi-list-ul' },
        { id: 'packages', label: 'Gói dịch vụ trọn gói', route: '/patient/bang-gia/goi-dich-vu', icon: 'bi-box-seam' },
        { id: 'beds', label: 'Giường bệnh nội trú', route: '/patient/bang-gia/giuong-benh', icon: 'bi-bed' }
      ]
    },
    {
      id: 'payment',
      label: 'Thanh toán và chính sách bảo hiểm',
      route: '/patient/thanh-toan',
      icon: 'bi-credit-card',
      children: [
        { id: 'insurance-guide', label: 'Hướng dẫn thanh toán Bảo hiểm Y tế (BHYT)', route: '/patient/thanh-toan/bhyt', icon: 'bi-shield-check' },
        { id: 'policies', label: 'Chế độ chính sách', route: '/patient/thanh-toan/che-do', icon: 'bi-file-earmark-text' }
      ]
    },
    {
      id: 'online',
      label: 'Hướng dẫn tiện ích trực tuyến và tra cứu',
      route: '/patient/tien-ich',
      icon: 'bi-laptop',
      children: [
        { id: 'test-results', label: 'Tra cứu kết quả xét nghiệm trực tuyến', route: '/patient/tien-ich/tra-cuu-ket-qua', icon: 'bi-search' },
        { id: 'feedback-form', label: 'Phiếu khảo sát mức độ hài lòng khách hàng', route: '/patient/tien-ich/khao-sat', icon: 'bi-clipboard-heart' }
      ]
    },
    {
      id: 'visitor',
      label: 'Thông tin thăm bệnh và hỗ trợ',
      route: '/patient/tham-benh',
      icon: 'bi-people',
      children: [
        { id: 'visitor-info', label: 'Thông tin dành cho khách thăm bệnh', route: '/patient/tham-benh/thong-tin', icon: 'bi-info-circle' },
        { id: 'visitor-guide', label: 'Hướng dẫn khách hàng điều trị nội trú', route: '/patient/tham-benh/huong-dan', icon: 'bi-book' }
      ]
    },
    {
      id: 'services',
      label: 'Dịch vụ hỗ trợ y tế',
      route: '/patient/dich-vu',
      icon: 'bi-heart-pulse',
      children: [
        { id: 'ambulance', label: 'Đặt xe cấp cứu, đón/rước bệnh nhân', route: '/patient/dich-vu/xe-cap-cuu', icon: 'bi-truck' },
        { id: 'home-care', label: 'Chăm sóc tại nhà, lấy mẫu xét nghiệm tại nhà', route: '/patient/dich-vu/cham-soc-tai-nha', icon: 'bi-house-heart' },
        { id: 'online-consult', label: 'Khám online với chuyên gia', route: '/patient/dich-vu/kham-online', icon: 'bi-camera-video' }
      ]
    },
    {
      id: 'community',
      label: 'Chia sẻ yêu thương và hỗ trợ cộng đồng',
      route: '/patient/cong-dong',
      icon: 'bi-heart',
      children: [
        { id: 'club', label: 'Câu lạc bộ bệnh nhân, hội chữ thập đỏ', route: '/patient/cong-dong/cau-lac-bo', icon: 'bi-people-fill' },
        { id: 'support-list', label: 'Danh sách bệnh nhân cần hỗ trợ', route: '/patient/cong-dong/danh-sach-ho-tro', icon: 'bi-list-check' }
      ]
    },
    {
      id: 'feedback',
      label: 'Phản hồi và góp ý',
      route: '/patient/phan-hoi',
      icon: 'bi-chat-left-text',
      children: [
        { id: 'mailbox', label: 'Hộp thư bạn đọc', route: '/patient/phan-hoi/hop-thu', icon: 'bi-envelope' }
      ]
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set active submenu based on current route
    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/');
      const activeItem = this.findMenuItemByPath(path);
      if (activeItem?.parentId) {
        this.activeSubmenu.set(activeItem.parentId);
      }
    });
  }

  toggleSubmenu(menuId: string): void {
    if (this.activeSubmenu() === menuId) {
      this.activeSubmenu.set(null);
    } else {
      this.activeSubmenu.set(menuId);
    }
  }

  isSubmenuOpen(menuId: string): boolean {
    return this.activeSubmenu() === menuId;
  }

  private findMenuItemByPath(path: string): { parentId: string } | null {
    for (const menu of this.menuItems) {
      if (menu.children) {
        for (const child of menu.children) {
          if (child.route.includes(path)) {
            return { parentId: menu.id };
          }
        }
      }
    }
    return null;
  }
}

