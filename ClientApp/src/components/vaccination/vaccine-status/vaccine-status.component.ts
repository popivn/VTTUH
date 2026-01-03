import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Vaccine {
  id: string;
  name: string;
  manufacturer: string;
  target: string;
  ageGroup: string;
  doses: number;
  price: number;
  status: 'available' | 'limited' | 'out' | 'coming';
  statusText: string;
  quantity: number;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-vaccine-status',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vaccine-status.component.html'
})
export class VaccineStatusComponent {
  selectedCategory = signal<string>('all');
  searchQuery = signal<string>('');

  categories = [
    { id: 'all', label: 'Tất cả', icon: 'bi-grid' },
    { id: 'covid', label: 'COVID-19', icon: 'bi-virus' },
    { id: 'flu', label: 'Cúm', icon: 'bi-thermometer-half' },
    { id: 'children', label: 'Trẻ em', icon: 'bi-emoji-smile' },
    { id: 'adult', label: 'Người lớn', icon: 'bi-person' },
    { id: 'travel', label: 'Du lịch', icon: 'bi-airplane' }
  ];

  vaccines: Vaccine[] = [
    {
      id: '1', name: 'Pfizer-BioNTech COVID-19', manufacturer: 'Pfizer', target: 'COVID-19',
      ageGroup: '12 tuổi trở lên', doses: 2, price: 0, status: 'available', statusText: 'Còn hàng',
      quantity: 500, icon: 'bi-virus', category: 'covid'
    },
    {
      id: '2', name: 'Moderna COVID-19', manufacturer: 'Moderna', target: 'COVID-19',
      ageGroup: '18 tuổi trở lên', doses: 2, price: 0, status: 'available', statusText: 'Còn hàng',
      quantity: 300, icon: 'bi-virus', category: 'covid'
    },
    {
      id: '3', name: 'Vaxigrip Tetra', manufacturer: 'Sanofi Pasteur', target: 'Cúm mùa',
      ageGroup: '6 tháng trở lên', doses: 1, price: 350000, status: 'available', statusText: 'Còn hàng',
      quantity: 200, icon: 'bi-thermometer-half', category: 'flu'
    },
    {
      id: '4', name: 'Influvac Tetra', manufacturer: 'Abbott', target: 'Cúm mùa',
      ageGroup: '3 tuổi trở lên', doses: 1, price: 380000, status: 'limited', statusText: 'Sắp hết',
      quantity: 50, icon: 'bi-thermometer-half', category: 'flu'
    },
    {
      id: '5', name: 'Engerix-B', manufacturer: 'GSK', target: 'Viêm gan B',
      ageGroup: 'Trẻ sơ sinh & Người lớn', doses: 3, price: 250000, status: 'available', statusText: 'Còn hàng',
      quantity: 400, icon: 'bi-heart-pulse', category: 'adult'
    },
    {
      id: '6', name: 'Gardasil 9', manufacturer: 'Merck', target: 'HPV',
      ageGroup: 'Nữ 9-26 tuổi', doses: 3, price: 1800000, status: 'available', statusText: 'Còn hàng',
      quantity: 150, icon: 'bi-gender-female', category: 'adult'
    },
    {
      id: '7', name: 'MMR II', manufacturer: 'Merck', target: 'Sởi-Quai bị-Rubella',
      ageGroup: '12 tháng trở lên', doses: 2, price: 180000, status: 'available', statusText: 'Còn hàng',
      quantity: 300, icon: 'bi-emoji-smile', category: 'children'
    },
    {
      id: '8', name: 'Pentaxim', manufacturer: 'Sanofi Pasteur', target: '5 trong 1',
      ageGroup: '2 tháng - 2 tuổi', doses: 4, price: 795000, status: 'limited', statusText: 'Sắp hết',
      quantity: 80, icon: 'bi-shield-check', category: 'children'
    },
    {
      id: '9', name: 'Prevenar 13', manufacturer: 'Pfizer', target: 'Phế cầu',
      ageGroup: '6 tuần - 5 tuổi', doses: 4, price: 1100000, status: 'out', statusText: 'Hết hàng',
      quantity: 0, icon: 'bi-lungs', category: 'children'
    },
    {
      id: '10', name: 'Typhim Vi', manufacturer: 'Sanofi Pasteur', target: 'Thương hàn',
      ageGroup: '2 tuổi trở lên', doses: 1, price: 350000, status: 'available', statusText: 'Còn hàng',
      quantity: 100, icon: 'bi-airplane', category: 'travel'
    },
    {
      id: '11', name: 'Havrix', manufacturer: 'GSK', target: 'Viêm gan A',
      ageGroup: '1 tuổi trở lên', doses: 2, price: 550000, status: 'coming', statusText: 'Đang nhập',
      quantity: 0, icon: 'bi-airplane', category: 'travel'
    },
    {
      id: '12', name: 'Rotarix', manufacturer: 'GSK', target: 'Rotavirus',
      ageGroup: '6 tuần - 6 tháng', doses: 2, price: 750000, status: 'available', statusText: 'Còn hàng',
      quantity: 120, icon: 'bi-emoji-smile', category: 'children'
    }
  ];

  get filteredVaccines(): Vaccine[] {
    return this.vaccines.filter(v => {
      const matchCategory = this.selectedCategory() === 'all' || v.category === this.selectedCategory();
      const matchSearch = this.searchQuery() === '' || 
        v.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        v.target.toLowerCase().includes(this.searchQuery().toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'bg-success';
      case 'limited': return 'bg-warning text-dark';
      case 'out': return 'bg-danger';
      case 'coming': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  formatPrice(price: number): string {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}

