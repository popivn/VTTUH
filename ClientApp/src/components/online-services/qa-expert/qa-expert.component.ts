import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Expert {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  responseTime: string;
}

@Component({
  selector: 'app-qa-expert',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './qa-expert.component.html'
})
export class QaExpertComponent {
  activeAccordion = signal<string | null>(null);
  
  // Form data
  questionForm = {
    name: '',
    email: '',
    phone: '',
    category: '',
    question: ''
  };
  
  categories = [
    { value: 'general', label: 'Tư vấn chung' },
    { value: 'internal', label: 'Nội khoa' },
    { value: 'surgery', label: 'Ngoại khoa' },
    { value: 'pediatric', label: 'Nhi khoa' },
    { value: 'obstetrics', label: 'Sản phụ khoa' },
    { value: 'dermatology', label: 'Da liễu' },
    { value: 'other', label: 'Khác' }
  ];
  
  experts: Expert[] = [
    {
      id: '1',
      name: 'BS. CKII. Nguyễn Văn A',
      title: 'Trưởng khoa Nội',
      specialty: 'Nội tổng quát, Tim mạch',
      avatar: 'bi-person-circle',
      responseTime: '< 12h'
    },
    {
      id: '2',
      name: 'TS. BS. Trần Thị B',
      title: 'Phó khoa Nhi',
      specialty: 'Nhi khoa, Sơ sinh',
      avatar: 'bi-person-circle',
      responseTime: '< 24h'
    },
    {
      id: '3',
      name: 'BS. CKI. Lê Văn C',
      title: 'Bác sĩ Ngoại',
      specialty: 'Ngoại tổng quát',
      avatar: 'bi-person-circle',
      responseTime: '< 24h'
    }
  ];
  
  faqs: FAQ[] = [
    {
      id: '1',
      question: 'Làm thế nào để đặt lịch khám bệnh online?',
      answer: 'Bạn có thể đặt lịch khám bệnh online thông qua trang "Đặt lịch hẹn khám bệnh" trên website. Chọn dịch vụ, bác sĩ, ngày giờ phù hợp và điền thông tin cá nhân. Sau khi đặt lịch thành công, bạn sẽ nhận được xác nhận qua SMS và Email.',
      category: 'appointment'
    },
    {
      id: '2',
      question: 'Kết quả xét nghiệm có được bảo mật không?',
      answer: 'Hoàn toàn bảo mật. Hệ thống của chúng tôi sử dụng mã hóa SSL 256-bit và tuân thủ các quy định về bảo vệ dữ liệu y tế. Chỉ bạn mới có thể truy cập kết quả xét nghiệm của mình thông qua mã xác thực.',
      category: 'security'
    },
    {
      id: '3',
      question: 'Thời gian phản hồi câu hỏi là bao lâu?',
      answer: 'Thông thường các câu hỏi sẽ được bác sĩ chuyên môn trả lời trong vòng 24 giờ làm việc. Đối với câu hỏi khẩn cấp, vui lòng liên hệ hotline 1900 xxxx để được hỗ trợ ngay.',
      category: 'qa'
    },
    {
      id: '4',
      question: 'Có thể hủy hoặc đổi lịch khám không?',
      answer: 'Có, bạn có thể hủy hoặc đổi lịch khám trước 24 giờ so với thời gian hẹn. Vui lòng gọi hotline 1900 xxxx hoặc truy cập trang quản lý lịch hẹn để thực hiện.',
      category: 'appointment'
    },
    {
      id: '5',
      question: 'Chi phí tư vấn trực tuyến là bao nhiêu?',
      answer: 'Dịch vụ tư vấn sức khỏe cơ bản qua hệ thống hỏi đáp là hoàn toàn miễn phí. Đối với tư vấn chuyên sâu hoặc video call với bác sĩ, vui lòng xem bảng giá tại trang Dịch vụ.',
      category: 'fee'
    }
  ];
  
  toggleAccordion(id: string): void {
    if (this.activeAccordion() === id) {
      this.activeAccordion.set(null);
    } else {
      this.activeAccordion.set(id);
    }
  }
  
  isAccordionOpen(id: string): boolean {
    return this.activeAccordion() === id;
  }
  
  submitQuestion(): void {
    // TODO: Implement API call
    console.log('Submitting question:', this.questionForm);
    alert('Câu hỏi của bạn đã được gửi! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
    this.questionForm = {
      name: '',
      email: '',
      phone: '',
      category: '',
      question: ''
    };
  }
}

