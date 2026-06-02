import { Component } from '@angular/core';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';

interface Store {
  city: string;
  name: string;
  addr: string;
  hours: string;
}

@Component({
  selector: 'app-stores',
  imports: [ImageSlotComponent],
  template: `
    <section class="page-hero">
      <span class="eyebrow">Về chúng tôi</span>
      <h1>Hệ thống cửa hàng</h1>
      <p>Ghé thăm Maison tại các cửa hàng trên toàn quốc để trải nghiệm sản phẩm trực tiếp.</p>
    </section>

    <div class="wrap">
      <div class="store-map" style="padding:32px 0 0;"><image-slot placeholder="Ảnh bản đồ"></image-slot></div>

      <div class="store-grid">
        @for (s of stores; track s.name) {
          <div class="store-card">
            <div class="sc-city">{{ s.city }}</div>
            <h3>{{ s.name }}</h3>
            <p>{{ s.addr }}</p>
            <div class="sc-hours">{{ s.hours }}</div>
            <a href="#" class="sc-dir">Chỉ đường →</a>
          </div>
        }
      </div>
    </div>
  `,
})
export class StoresComponent {
  readonly stores: Store[] = [
    { city: 'TP. Hồ Chí Minh', name: 'Maison Đồng Khởi', addr: '72 Đồng Khởi, P. Bến Nghé, Quận 1', hours: '9:00 – 22:00 · Hằng ngày' },
    { city: 'TP. Hồ Chí Minh', name: 'Maison Crescent Mall', addr: 'L2-09, Crescent Mall, Quận 7', hours: '9:30 – 22:00 · Hằng ngày' },
    { city: 'Hà Nội', name: 'Maison Tràng Tiền', addr: '24 Hai Bà Trưng, Q. Hoàn Kiếm', hours: '9:00 – 21:30 · Hằng ngày' },
    { city: 'Hà Nội', name: 'Maison Vincom Bà Triệu', addr: 'T3, Vincom Center, 191 Bà Triệu', hours: '9:30 – 22:00 · Hằng ngày' },
    { city: 'Đà Nẵng', name: 'Maison Vincom Đà Nẵng', addr: 'T2, 910A Ngô Quyền, Q. Sơn Trà', hours: '9:30 – 22:00 · Hằng ngày' },
    { city: 'Cần Thơ', name: 'Maison Sense City', addr: 'L1, Sense City, 1 Đại lộ Hòa Bình', hours: '9:00 – 21:30 · Hằng ngày' },
  ];
}
