import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Tier {
  name: string;
  spend: string;
  perks: string[];
  featured?: boolean;
  cta: string;
  ctaGhost?: boolean;
}

@Component({
  selector: 'app-membership',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <span class="eyebrow">Tài khoản</span>
      <h1>Thành viên Maison</h1>
      <p>Tích điểm cho mỗi đơn hàng, mở khoá ưu đãi độc quyền và quà sinh nhật. Miễn phí tham gia.</p>
    </section>

    <div class="wrap">
      <div class="tiers">
        @for (t of tiers; track t.name) {
          <div class="tier-card" [class.featured]="t.featured">
            <div class="tc-name">{{ t.name }}</div>
            <div class="tc-spend">{{ t.spend }}</div>
            <ul>
              @for (perk of t.perks; track perk) {
                <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> {{ perk }}</li>
              }
            </ul>
            <a routerLink="/dang-nhap" class="btn" [class.btn--ghost]="t.ctaGhost">{{ t.cta }}</a>
          </div>
        }
      </div>
    </div>
  `,
})
export class MembershipComponent {
  readonly tiers: Tier[] = [
    {
      name: 'Silver', spend: 'Từ 0₫', cta: 'Tham gia ngay', ctaGhost: true,
      perks: ['Tích 1 điểm / 1.000₫', 'Giảm 10% đơn đầu tiên', 'Voucher sinh nhật'],
    },
    {
      name: 'Gold', spend: 'Từ 5 triệu / năm', cta: 'Nâng hạng', featured: true,
      perks: ['Tích 1,5 điểm / 1.000₫', 'Miễn phí giao hàng mọi đơn', 'Đổi trả ưu tiên 45 ngày', 'Mua trước BST mới'],
    },
    {
      name: 'Platinum', spend: 'Từ 20 triệu / năm', cta: 'Tìm hiểu', ctaGhost: true,
      perks: ['Tích 2 điểm / 1.000₫', 'Tư vấn phối đồ riêng', 'Quà tặng cao cấp mỗi quý', 'Mời tham dự sự kiện riêng'],
    },
  ];
}
