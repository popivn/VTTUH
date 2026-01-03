import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';

export interface StaffMenuItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  children?: StaffMenuItem[];
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  activeSubmenu = signal<string | null>(null);
  
  menuItems: StaffMenuItem[] = [
    {
      id: 'internal-info',
      label: 'Thông tin nội bộ',
      route: '/staff/thong-tin-noi-bo',
      icon: 'bi-building'
    },
    {
      id: 'training',
      label: 'Đào tạo liên tục theo nhu cầu xã hội',
      route: '/staff/dao-tao-lien-tuc',
      icon: 'bi-book'
    },
    {
      id: 'enrollment',
      label: 'Thông báo tuyển sinh/Chiêu sinh',
      route: '/staff/thong-bao-tuyen-sinh',
      icon: 'bi-megaphone'
    },
    {
      id: 'admission',
      label: 'Thông báo trúng tuyển',
      route: '/staff/thong-bao-trung-tuyen',
      icon: 'bi-check-circle'
    },
    {
      id: 'certificate',
      label: 'Quyết định cấp chứng chỉ, chứng nhận',
      route: '/staff/quyet-dinh-cap-chung-chi',
      icon: 'bi-award'
    },
    {
      id: 'conference',
      label: 'Hội nghị, hội thảo',
      route: '/staff/hoi-nghi-hoi-thao',
      icon: 'bi-people'
    },
    {
      id: 'cooperation',
      label: 'Hợp tác các bệnh viện',
      route: '/staff/hop-tac-benh-vien',
      icon: 'bi-handshake'
    },
    {
      id: 'research',
      label: 'Nghiên cứu khoa học',
      route: '/staff/nghien-cuu-khoa-hoc',
      icon: 'bi-flask'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set active submenu based on current route
    this.route.url.subscribe(() => {
      const currentRoute = this.router.url;
      for (const menu of this.menuItems) {
        if (currentRoute.startsWith(menu.route)) {
          this.activeSubmenu.set(menu.id);
          break;
        }
      }
    });
  }

  toggleSubmenu(menuId: string): void {
    const currentActive = this.activeSubmenu();
    if (currentActive === menuId) {
      this.activeSubmenu.set(null);
    } else {
      this.activeSubmenu.set(menuId);
    }
  }

  isSubmenuOpen(menuId: string): boolean {
    return this.activeSubmenu() === menuId;
  }
}

