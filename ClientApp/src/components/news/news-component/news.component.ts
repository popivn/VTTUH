import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface NewsArticle {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  categorySlug: string;
  tags?: string[];
  image: string;
  author?: string;
  views?: number;
  slug: string;
}

export type NewsCategory = 
  | 'all'
  | 'tin-noi-bat'
  | 'tin-hoat-dong'
  | 'tin-trong-nganh'
  | 'bai-viet-chuyen-mon'
  | 'thong-bao-moi-thau'
  | 'y-hoc-thuong-thuc'
  | 'ky-thuat-moi';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  // State
  allArticles = signal<NewsArticle[]>([]);
  filteredArticles = signal<NewsArticle[]>([]);
  featuredArticles = signal<NewsArticle[]>([]);
  popularArticles = signal<NewsArticle[]>([]);
  upcomingEvents = signal<any[]>([]);
  
  selectedCategory = signal<NewsCategory>('all');
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = 9;
  totalPages = computed(() => Math.ceil(this.filteredArticles().length / this.pageSize));
  
  // UI State
  loading = signal<boolean>(false);
  newsletterEmail = signal<string>('');

  // Categories
  categories = [
    { slug: 'all', label: 'Tất cả', icon: 'bi-grid' },
    { slug: 'tin-noi-bat', label: 'Tin nổi bật', icon: 'bi-star-fill' },
    { slug: 'tin-hoat-dong', label: 'Tin hoạt động bệnh viện', icon: 'bi-building' },
    { slug: 'tin-trong-nganh', label: 'Tin trong ngành', icon: 'bi-newspaper' },
    { slug: 'bai-viet-chuyen-mon', label: 'Bài viết chuyên môn', icon: 'bi-journal-text' },
    { slug: 'thong-bao-moi-thau', label: 'Thông báo & Mời thầu', icon: 'bi-megaphone' },
    { slug: 'y-hoc-thuong-thuc', label: 'Y học thường thức', icon: 'bi-heart-pulse' },
    { slug: 'ky-thuat-moi', label: 'Kỹ thuật mới triển khai', icon: 'bi-cpu' }
  ];

  // Paginated articles
  paginatedArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredArticles().slice(start, end);
  });

  currentCategoryLabel = computed(() => {
    const category = this.categories.find(c => c.slug === this.selectedCategory());
    return category?.label || '';
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check for category in route
    this.route.queryParams.subscribe((params: any) => {
      const category = params['category'] as NewsCategory;
      if (category && this.categories.find(c => c.slug === category)) {
        this.selectedCategory.set(category);
      }
    });

    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    
    // Load all articles (mock data for now)
    const all = this.generateMockArticles();
    this.allArticles.set(all);
    
    // Set featured (first 5)
    this.featuredArticles.set(all.slice(0, 5));
    
    // Set popular (by views, top 5)
    this.popularArticles.set([...all].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5));
    
    // Set upcoming events
    this.upcomingEvents.set(this.generateMockEvents());
    
    this.applyFilters();
    this.loading.set(false);
  }

  onCategoryChange(category: string | NewsCategory): void {
    const validCategory = category as NewsCategory;
    this.selectedCategory.set(validCategory);
    this.currentPage.set(1);
    this.applyFilters();
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: validCategory === 'all' ? null : validCategory },
      queryParamsHandling: 'merge'
    });
  }

  // Helper method to handle category click from template
  handleCategoryClick(slug: string): void {
    this.onCategoryChange(slug);
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allArticles()];
    
    // Filter by category
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(article => article.categorySlug === this.selectedCategory());
    }
    
    // Filter by search query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }
    
    this.filteredArticles.set(filtered);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubscribeNewsletter(): void {
    const email = this.newsletterEmail().trim();
    if (email && this.isValidEmail(email)) {
      // TODO: Call API to subscribe
      alert(`Đã đăng ký nhận tin qua email: ${email}`);
      this.newsletterEmail.set('');
    } else {
      alert('Vui lòng nhập email hợp lệ');
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  truncate(text: string, max: number = 120): string {
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max).trim().replace(/\s+\S*$/, '') + '...';
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

  // Mock data generators
  private generateMockArticles(): NewsArticle[] {
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
        title: 'Thông báo nghỉ lễ Quốc khánh 2/9',
        excerpt: 'Bệnh viện thông báo lịch nghỉ lễ và lịch khám bệnh trong dịp Quốc khánh 2/9. Các khoa cấp cứu vẫn hoạt động 24/7.',
        date: '2025-11-18',
        category: 'Thông báo & Mời thầu',
        categorySlug: 'thong-bao-moi-thau',
        tags: ['Thông báo', 'Lịch nghỉ'],
        image: 'assets/imgs/devs.png',
        author: 'Văn phòng Bệnh viện',
        views: 1100
      },
      {
        title: 'Dinh dưỡng cho trẻ em trong mùa lạnh',
        excerpt: 'Chuyên gia dinh dưỡng hướng dẫn chế độ ăn uống phù hợp để tăng cường sức đề kháng cho trẻ em trong mùa lạnh.',
        date: '2025-11-15',
        category: 'Y học thường thức',
        categorySlug: 'y-hoc-thuong-thuc',
        tags: ['Dinh dưỡng', 'Trẻ em', 'Sức khỏe'],
        image: 'assets/imgs/devs.png',
        author: 'ThS. Trần Thị B',
        views: 780
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
      },
      {
        title: 'Chương trình khám sức khỏe miễn phí cho người cao tuổi',
        excerpt: 'Nhân ngày Người cao tuổi Việt Nam, bệnh viện tổ chức chương trình khám sức khỏe miễn phí cho người từ 60 tuổi trở lên.',
        date: '2025-11-05',
        category: 'Tin nổi bật',
        categorySlug: 'tin-noi-bat',
        tags: ['Miễn phí', 'Người cao tuổi', 'Cộng đồng'],
        image: 'assets/imgs/devs.png',
        author: 'Phòng KHTH & Dịch vụ',
        views: 1350
      },
      {
        title: 'Hoạt động hiến máu nhân đạo tháng 11/2025',
        excerpt: 'Bệnh viện phối hợp với Hội Chữ thập đỏ tổ chức đợt hiến máu nhân đạo, kêu gọi cán bộ nhân viên và người dân tham gia.',
        date: '2025-11-01',
        category: 'Tin hoạt động bệnh viện',
        categorySlug: 'tin-hoat-dong',
        tags: ['Hiến máu', 'Nhân đạo', 'Cộng đồng'],
        image: 'assets/imgs/devs.png',
        author: 'Phòng Điều dưỡng',
        views: 560
      },
      {
        title: 'Hướng dẫn phòng ngừa bệnh sốt xuất huyết',
        excerpt: 'Trong bối cảnh sốt xuất huyết đang có xu hướng gia tăng, bệnh viện cung cấp hướng dẫn chi tiết về phòng ngừa và nhận biết sớm.',
        date: '2025-10-28',
        category: 'Y học thường thức',
        categorySlug: 'y-hoc-thuong-thuc',
        tags: ['Sốt xuất huyết', 'Phòng ngừa', 'Sức khỏe'],
        image: 'assets/imgs/devs.png',
        author: 'Khoa Nhi',
        views: 720
      },
      {
        title: 'Mời thầu mua sắm thiết bị y tế năm 2026',
        excerpt: 'Bệnh viện thông báo mời thầu mua sắm các thiết bị y tế phục vụ hoạt động khám chữa bệnh năm 2026.',
        date: '2025-10-25',
        category: 'Thông báo & Mời thầu',
        categorySlug: 'thong-bao-moi-thau',
        tags: ['Mời thầu', 'Thiết bị'],
        image: 'assets/imgs/devs.png',
        author: 'Phòng Vật tư',
        views: 380
      },
      {
        title: 'Nghiên cứu mới về điều trị đái tháo đường type 2',
        excerpt: 'Nghiên cứu của nhóm bác sĩ bệnh viện về hiệu quả của phác đồ điều trị mới cho bệnh nhân đái tháo đường type 2.',
        date: '2025-10-20',
        category: 'Bài viết chuyên môn',
        categorySlug: 'bai-viet-chuyen-mon',
        tags: ['Đái tháo đường', 'Nghiên cứu'],
        image: 'assets/imgs/devs.png',
        author: 'BS. Lê Văn C',
        views: 450
      },
      {
        title: 'Cập nhật quy định về bảo hiểm y tế năm 2026',
        excerpt: 'Thông tin về các thay đổi trong quy định bảo hiểm y tế có hiệu lực từ năm 2026, ảnh hưởng đến quyền lợi người bệnh.',
        date: '2025-10-15',
        category: 'Tin trong ngành',
        categorySlug: 'tin-trong-nganh',
        tags: ['Bảo hiểm y tế', 'Chính sách'],
        image: 'assets/imgs/devs.png',
        author: 'Ban biên tập',
        views: 920
      },
      {
        title: 'Ứng dụng AI trong chẩn đoán hình ảnh X-quang',
        excerpt: 'Bệnh viện triển khai hệ thống AI hỗ trợ bác sĩ chẩn đoán hình ảnh X-quang, tăng độ chính xác và giảm thời gian chờ đợi.',
        date: '2025-10-10',
        category: 'Kỹ thuật mới triển khai',
        categorySlug: 'ky-thuat-moi',
        tags: ['AI', 'Chẩn đoán', 'Công nghệ'],
        image: 'assets/imgs/devs.png',
        author: 'Khoa CĐHA',
        views: 680
      },
      {
        title: 'Góc mẹ và bé: Chăm sóc trẻ sơ sinh đúng cách',
        excerpt: 'Chuyên gia nhi khoa chia sẻ những lưu ý quan trọng khi chăm sóc trẻ sơ sinh, từ dinh dưỡng đến vệ sinh và giấc ngủ.',
        date: '2025-10-05',
        category: 'Y học thường thức',
        categorySlug: 'y-hoc-thuong-thuc',
        tags: ['Trẻ sơ sinh', 'Mẹ và bé'],
        image: 'assets/imgs/devs.png',
        author: 'BS. Phạm Thị D',
        views: 1100
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

  private generateMockEvents(): any[] {
    return [
      {
        title: 'Hội thảo về bệnh tim mạch',
        date: '2025-12-15',
        time: '08:00',
        location: 'Hội trường lớn'
      },
      {
        title: 'Khám sức khỏe miễn phí cộng đồng',
        date: '2025-12-20',
        time: '07:00',
        location: 'Sân bệnh viện'
      },
      {
        title: 'Ngày hội hiến máu',
        date: '2025-12-25',
        time: '08:00',
        location: 'Tầng 1'
      }
    ];
  }
}

