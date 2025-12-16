import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-page.component.html'
})
export class PatientPageComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = 'bi-info-circle';
  @Input() content: string = '';
  @Input() showBreadcrumb: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get data from route if available
    const routeData = this.route.snapshot.data;
    if (routeData['title']) {
      this.title = routeData['title'];
    }
    if (routeData['icon']) {
      this.icon = routeData['icon'];
    }
    
    // Generate default content if not provided
    if (!this.content) {
      this.content = this.generateDefaultContent(this.title);
    }
  }

  private generateDefaultContent(title: string): string {
    return `
      <h3>Giới thiệu</h3>
      <p>Trang này cung cấp thông tin chi tiết về ${title.toLowerCase()} tại Bệnh viện Trường Đại học Võ Trường Toản.</p>
      
      <h3>Nội dung chi tiết</h3>
      <p>Nội dung chi tiết sẽ được cập nhật sớm nhất. Vui lòng quay lại sau để xem thông tin đầy đủ.</p>
      
      <div class="alert alert-info mt-4">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Lưu ý:</strong> Mọi thắc mắc xin vui lòng liên hệ qua hotline 1900 xxxx hoặc email info@vtth.vn
      </div>
    `;
  }
}

