import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NewsArticle } from '../news-component/news.component';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-detail.component.html'
})
export class NewsDetailComponent implements OnInit {
  article = signal<NewsArticle | null>(null);
  relatedArticles = signal<NewsArticle[]>([]);
  loading = signal<boolean>(true);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const slug = params['slug'];
      this.loadArticle(slug);
    });
  }

  loadArticle(slug: string): void {
    this.loading.set(true);
    
    // In a real app, you would fetch from API
    // For now, we'll generate mock data
    const allArticles = this.generateMockArticles();
    const found = allArticles.find(a => a.slug === slug);
    
    if (found) {
      // Add full content if not present
      if (!found.content) {
        found.content = this.generateFullContent(found);
      }
      this.article.set(found);
      
      // Load related articles (same category, excluding current)
      const related = allArticles
        .filter(a => a.categorySlug === found.categorySlug && a.id !== found.id)
        .slice(0, 6);
      this.relatedArticles.set(related);
    } else {
      // Article not found, redirect to news listing
      this.router.navigate(['/news']);
    }
    
    this.loading.set(false);
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnZalo(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://zalo.me/share?url=${url}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.article()?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Đã sao chép link!');
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  trackById(index: number, item: NewsArticle): string | number {
    return item.id;
  }

  private generateMockArticles(): NewsArticle[] {
    // This should match the articles from NewsComponent
    // For simplicity, we'll generate a few key articles
    const baseArticles: Omit<NewsArticle, 'id' | 'slug'>[] = [
      {
        title: 'Ưu đãi khám sức khỏe tổng quát giảm 30% trong tháng 12',
        excerpt: 'Bệnh viện triển khai chương trình ưu đãi đặc biệt cho gói khám sức khỏe tổng quát với nhiều xét nghiệm và chẩn đoán hình ảnh hiện đại.',
        date: '2025-12-01',
        category: 'Tin nổi bật',
        categorySlug: 'tin-noi-bat',
        tags: ['Ưu đãi', 'Khuyến mãi', 'Khám sức khỏe'],
        image: 'assets/imgs/devs.png',
        author: 'Phòng KHTH & Dịch vụ',
        views: 1250
      },
      {
        title: 'Hội nghị khoa học kỹ thuật lần thứ 15 - 2025',
        excerpt: 'Hội nghị khoa học kỹ thuật với sự tham gia của các chuyên gia hàng đầu trong và ngoài nước, trình bày các nghiên cứu mới nhất.',
        date: '2025-11-28',
        category: 'Tin hoạt động bệnh viện',
        categorySlug: 'tin-hoat-dong',
        tags: ['Hội nghị', 'Khoa học', 'Nghiên cứu'],
        image: 'assets/imgs/devs.png',
        author: 'Phòng Quản lý chất lượng',
        views: 890
      },
      {
        title: 'Bộ Y tế ban hành phác đồ điều trị mới cho bệnh tim mạch',
        excerpt: 'Cập nhật phác đồ điều trị mới nhất theo khuyến nghị của Hiệp hội Tim mạch thế giới, áp dụng từ tháng 1/2026.',
        date: '2025-11-25',
        category: 'Tin trong ngành',
        categorySlug: 'tin-trong-nganh',
        tags: ['Phác đồ', 'Tim mạch', 'Chính sách'],
        image: 'assets/imgs/devs.png',
        author: 'Ban biên tập',
        views: 650
      },
      {
        title: 'Phương pháp điều trị ung thư bằng liệu pháp miễn dịch: Case study',
        excerpt: 'Bác sĩ Nguyễn Văn A trình bày case study về ca điều trị thành công ung thư phổi giai đoạn muộn bằng liệu pháp miễn dịch.',
        date: '2025-11-20',
        category: 'Bài viết chuyên môn',
        categorySlug: 'bai-viet-chuyen-mon',
        tags: ['Ung thư', 'Miễn dịch', 'Case study'],
        image: 'assets/imgs/devs.png',
        author: 'BS. Nguyễn Văn A',
        views: 420
      },
      {
        title: 'Triển khai kỹ thuật phẫu thuật robot cho phẫu thuật nội soi',
        excerpt: 'Bệnh viện chính thức đưa vào sử dụng hệ thống robot phẫu thuật da Vinci, mở ra kỷ nguyên mới trong phẫu thuật nội soi.',
        date: '2025-11-10',
        category: 'Kỹ thuật mới triển khai',
        categorySlug: 'ky-thuat-moi',
        tags: ['Robot', 'Phẫu thuật', 'Công nghệ'],
        image: 'assets/imgs/devs.png',
        author: 'Khoa Ngoại',
        views: 950
      }
    ];

    return baseArticles.map((article, index) => ({
      ...article,
      id: `news-${index + 1}`,
      slug: this.generateSlug(article.title)
    }));
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private generateFullContent(article: NewsArticle): string {
    // Generate mock full content based on article type
    const templates: Record<string, string> = {
      'tin-noi-bat': `
        <p>Bệnh viện Trường Đại học Võ Trường Toản (VTTUH) trân trọng thông báo chương trình ưu đãi đặc biệt dành cho tất cả khách hàng trong tháng 12/2025.</p>
        
        <h3>Nội dung chương trình</h3>
        <p>Giảm 30% cho tất cả các gói khám sức khỏe tổng quát, bao gồm:</p>
        <ul>
          <li>Gói khám cơ bản: Xét nghiệm máu, nước tiểu, chẩn đoán hình ảnh</li>
          <li>Gói khám nâng cao: Thêm siêu âm, điện tim, đo mật độ xương</li>
          <li>Gói khám VIP: Đầy đủ các xét nghiệm và tư vấn với bác sĩ chuyên khoa</li>
        </ul>
        
        <h3>Thời gian áp dụng</h3>
        <p>Chương trình áp dụng từ ngày 1/12/2025 đến hết ngày 31/12/2025.</p>
        
        <h3>Cách đăng ký</h3>
        <p>Quý khách có thể đăng ký qua:</p>
        <ul>
          <li>Hotline: 1900 xxxx</li>
          <li>Website: www.vtth.vn</li>
          <li>Trực tiếp tại quầy tiếp đón bệnh viện</li>
        </ul>
      `,
      'tin-hoat-dong': `
        <p>Hội nghị khoa học kỹ thuật lần thứ 15 năm 2025 của Bệnh viện VTTUH sẽ được tổ chức vào ngày 15/12/2025 tại Hội trường lớn của bệnh viện.</p>
        
        <h3>Nội dung hội nghị</h3>
        <p>Hội nghị sẽ tập trung vào các chủ đề:</p>
        <ul>
          <li>Ứng dụng công nghệ AI trong chẩn đoán và điều trị</li>
          <li>Phương pháp điều trị mới cho các bệnh mãn tính</li>
          <li>Quản lý chất lượng dịch vụ y tế</li>
          <li>Nghiên cứu khoa học và ứng dụng thực tiễn</li>
        </ul>
        
        <h3>Diễn giả</h3>
        <p>Hội nghị vinh dự đón tiếp các chuyên gia hàng đầu trong và ngoài nước, bao gồm:</p>
        <ul>
          <li>GS.TS. Nguyễn Văn A - Chuyên gia về Tim mạch</li>
          <li>PGS.TS. Trần Thị B - Chuyên gia về Nhi khoa</li>
          <li>TS. Lê Văn C - Chuyên gia về Y học hạt nhân</li>
        </ul>
        
        <h3>Đăng ký tham dự</h3>
        <p>Để đăng ký tham dự hội nghị, vui lòng liên hệ Phòng Quản lý chất lượng trước ngày 10/12/2025.</p>
      `,
      'ky-thuat-moi': `
        <p>Bệnh viện VTTUH tự hào thông báo đã chính thức đưa vào sử dụng hệ thống robot phẫu thuật da Vinci - một bước tiến quan trọng trong lĩnh vực phẫu thuật nội soi.</p>
        
        <h3>Về hệ thống da Vinci</h3>
        <p>Hệ thống robot phẫu thuật da Vinci là công nghệ tiên tiến nhất hiện nay, cho phép bác sĩ thực hiện các ca phẫu thuật phức tạp với độ chính xác cao và xâm lấn tối thiểu.</p>
        
        <h3>Ưu điểm</h3>
        <ul>
          <li>Độ chính xác cao hơn so với phẫu thuật truyền thống</li>
          <li>Vết mổ nhỏ, ít đau đớn cho bệnh nhân</li>
          <li>Thời gian hồi phục nhanh hơn</li>
          <li>Giảm nguy cơ biến chứng</li>
        </ul>
        
        <h3>Ứng dụng</h3>
        <p>Hệ thống có thể được sử dụng cho nhiều loại phẫu thuật khác nhau, bao gồm:</p>
        <ul>
          <li>Phẫu thuật tiết niệu</li>
          <li>Phẫu thuật phụ khoa</li>
          <li>Phẫu thuật tiêu hóa</li>
          <li>Phẫu thuật tim mạch</li>
        </ul>
        
        <h3>Đội ngũ chuyên gia</h3>
        <p>Đội ngũ bác sĩ của chúng tôi đã được đào tạo chuyên sâu về vận hành hệ thống robot này, đảm bảo an toàn và hiệu quả tối đa cho bệnh nhân.</p>
      `
    };

    return templates[article.categorySlug] || `
      <p>${article.excerpt}</p>
      <p>Nội dung chi tiết của bài viết sẽ được cập nhật sớm nhất. Vui lòng quay lại sau để đọc đầy đủ nội dung.</p>
      <p>Bệnh viện VTTUH cam kết cung cấp thông tin chính xác và hữu ích cho cộng đồng. Mọi thắc mắc xin vui lòng liên hệ qua hotline hoặc email.</p>
    `;
  }
}

