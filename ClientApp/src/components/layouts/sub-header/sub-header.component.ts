import { Component, HostListener, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
    selector: 'sub-header',
    templateUrl: './sub-header.component.html',
    styleUrl: './sub-header.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class SubHeaderComponent implements OnInit, OnDestroy {
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    isDropdownOpen = false;
    activeMenuItem: string | null = null;
    isMobile = false;
    private resizeSubscription?: Subscription;

    menuItems = [
        { id: 'home', label: 'Trang chủ', route: '/', name: 'home' },
        { id: 'intro', label: 'Giới thiệu', route: '/about-us', name: 'about-us' },
        { id: 'experts', label: 'Đội ngũ chuyên gia', route: '/experts', name: 'experts' },
        { id: 'appointment', label: 'Đặt lịch khám bệnh', route: '/dat-lich-kham', name: 'appointment' },
        { id: 'news', label: 'Tin tức', route: '/news' }
    ];

    dropdownItems = [
        { 
            id: 'patient', 
            label: 'Dành cho bệnh nhân', 
            route: '/patient', 
            icon: 'bi bi-heart-pulse', // Dùng icon giống @patient.component.html (10)
            hasSubmenu: true,
            submenu: [
                { label: 'Quy trình khám chữa bệnh', route: '/patient/quy-trinh-kham' },
                { label: 'Bảng giá và gói dịch vụ', route: '/patient/bang-gia' },
                { label: 'Thanh toán và BHYT', route: '/patient/thanh-toan' },
                { label: 'Tiện ích trực tuyến', route: '/patient/tien-ich' },
                { label: 'Thông tin thăm bệnh', route: '/patient/tham-benh' },
                { label: 'Dịch vụ hỗ trợ y tế', route: '/patient/dich-vu' },
                { label: 'Hỗ trợ cộng đồng', route: '/patient/cong-dong' },
                { label: 'Phản hồi và góp ý', route: '/patient/phan-hoi' }
            ]
        },
        { 
            id: 'staff', 
            label: 'Dành cho cán bộ y tế', 
            route: '/staff', 
            icon: 'bi-person-badge',
            hasSubmenu: true,
            submenu: [
                { label: 'Thông tin nội bộ', route: '/staff/thong-tin-noi-bo' },
                { label: 'Đào tạo liên tục', route: '/staff/dao-tao-lien-tuc' },
                { label: 'Tuyển sinh/Chiêu sinh', route: '/staff/thong-bao-tuyen-sinh' },
                { label: 'Thông báo trúng tuyển', route: '/staff/thong-bao-trung-tuyen' },
                { label: 'Cấp chứng chỉ, chứng nhận', route: '/staff/quyet-dinh-cap-chung-chi' },
                { label: 'Hội nghị, hội thảo', route: '/staff/hoi-nghi-hoi-thao' },
                { label: 'Hợp tác bệnh viện', route: '/staff/hop-tac-benh-vien' },
                { label: 'Nghiên cứu khoa học', route: '/staff/nghien-cuu-khoa-hoc' }
            ]
        },
        { 
            id: 'online', 
            label: 'Dịch vụ trực tuyến', 
            route: '/online-services', 
            icon: 'bi-globe',
            hasSubmenu: true,
            submenu: [
                { label: 'Đặt lịch hẹn khám bệnh', route: '/dat-lich-kham' },
                { label: 'Hỏi đáp cùng chuyên gia', route: '/online-services/hoi-dap' },
                { label: 'Tra cứu kết quả xét nghiệm', route: '/patient/tien-ich/tra-cuu-ket-qua' }
            ]
        },
        { 
            id: 'vaccination', 
            label: 'Tiêm chủng', 
            route: '/vaccination', 
            icon: 'bi-shield-plus',
            hasSubmenu: true,
            submenu: [
                { label: 'Tình hình Vaccin', route: '/vaccination/tinh-hinh-vaccin' },
                { label: 'Quy trình tiêm chủng', route: '/vaccination/quy-trinh' },
                { label: 'Lịch tiêm chủng', route: '/vaccination/lich-tiem' }
            ]
        },
        { id: 'recruitment', label: 'Tuyển dụng', route: '/recruitment', icon: 'bi-briefcase-fill' },
        { id: 'invoice', label: 'Tra cứu hóa đơn điện tử', route: '/invoice', icon: 'bi-receipt' },
        { id: 'events', label: 'Sự kiện', route: '/events', icon: 'bi-stars' }
    ];
    
    patientSubmenuOpen = false;
    staffSubmenuOpen = false;
    onlineSubmenuOpen = false;
    vaccinationSubmenuOpen = false;
    hoveredItem: string | null = null;
    hoveredDropdownMobileItem: string | null = null;
    hoveredDropdownItem: string | null = null;
    hoveredSubDropdownItem: string | null = null;

    //#region Angular Lifecycle

    ngOnInit(): void {
        this.checkMobile();
        this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => {
                this.checkMobile();
            });

        // Listen to router events to set active menu item
        this.router.events
            .pipe(filter((e: any) => e instanceof NavigationEnd))
            .subscribe(() => {
                let current = this.router.routerState.root;
                while (current.firstChild) {
                    current = current.firstChild;
                }
                const name = current.snapshot.data['name'];
                this.setActiveByRouteName(name);
                this.cdr.detectChanges();
            });

        // On initial render: also set active menu based on current route
        let current = this.router.routerState.root;
        while (current.firstChild) current = current.firstChild;
        const name = current.snapshot.data['name'];
        this.setActiveByRouteName(name);
    }

    setActiveByRouteName(routeName: string): void {
        const matched = this.menuItems.find(item => item.name === routeName);

        if (matched) {
            this.activeMenuItem = matched.id;
        } else {
            if (routeName === '' || routeName == null) {
                const home = this.menuItems[0];
                if (home) this.activeMenuItem = home.id;
            }
        }
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }

    //#endregion

    //#region Dropdown Logic

    closeDropdown(): void {
        this.isDropdownOpen = false;
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.menu-item-dropdown')) {
            this.closeDropdown();
        }
    }

    //#endregion

    //#region Menu & Navigation

    onMenuItemClick(item: { id?: string; route?: string }): void {
        if (item.id) {
            this.activeMenuItem = item.id;
        }
        this.closeDropdown();
        if (item.route) {
            this.router.navigate([item.route]);
        }
        this.cdr.detectChanges();
    }

    isActive(itemId: string): boolean {
        return this.activeMenuItem === itemId;
    }

    //#endregion

    //#region Utilities

    /**
     * Returns classes to be applied to the icon element for menu or dropdown.
     * If not active, add 'vtth-bg-secondary' for background color.
     * @param itemId Id of the menu or dropdown item.
     * @param icon Icon class (bi-*)
     */
    getIconClasses(itemId: string, icon: string): string[] {
        const isActive = this.isActive(itemId);
        const classes = [icon];
        if (!isActive) {
            classes.push('vtth-bg-secondary');
        }
        // You may want to add spacing/size here too if needed
        return classes;
    }

    getMenuIcon(id: string): string {
        const iconMap: { [key: string]: string } = {
            'intro': 'bi-info-circle',
            'experts': 'bi-people-fill',
            'appointment': 'bi-calendar-check',
            'news': 'bi-newspaper'
        };
        return iconMap[id] || 'bi-circle';
    }

    private checkMobile(): void {
        this.isMobile = window.innerWidth < 576;
    }

    //#endregion
}