import { Component, signal } from '@angular/core';

interface Voucher {
  amt: string;
  unit: string;
  title: string;
  cond: string;
  code: string;
  expired?: boolean;
}

@Component({
  selector: 'app-offers',
  template: `
    <section class="page-hero">
      <span class="eyebrow">Tài khoản</span>
      <h1>Ưu đãi của tôi</h1>
      <p>Các mã giảm giá và voucher dành riêng cho bạn. Nhấn để sao chép và áp dụng khi thanh toán.</p>
    </section>

    <div class="wrap">
      <div class="voucher-grid">
        @for (v of vouchers; track v.code) {
          <div class="voucher-card" [class.expired]="v.expired">
            <div class="vc-left"><div class="vc-amt">{{ v.amt }}</div><div class="vc-unit">{{ v.unit }}</div></div>
            <div class="vc-body">
              <div class="vc-title">{{ v.title }}</div>
              <div class="vc-cond">{{ v.cond }}</div>
              <div class="vc-code">
                <strong>{{ v.code }}</strong>
                @if (!v.expired) {
                  <button (click)="copy(v.code)">{{ copied() === v.code ? 'Đã chép ✓' : 'Sao chép' }}</button>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class OffersComponent {
  readonly copied = signal<string | null>(null);

  readonly vouchers: Voucher[] = [
    { amt: '10%', unit: 'Giảm', title: 'Ưu đãi thành viên mới', cond: 'Đơn từ 300K · HSD 30/06/2026', code: 'WELCOME10' },
    { amt: '50K', unit: 'Giảm', title: 'Miễn phí vận chuyển +', cond: 'Đơn từ 500K · HSD 15/06/2026', code: 'FREESHIP50' },
    { amt: '15%', unit: 'Giảm', title: 'Ưu đãi sinh nhật', cond: 'Đơn từ 700K · HSD 31/07/2026', code: 'HABD15' },
    { amt: '20%', unit: 'Giảm', title: 'Sale Xuân (đã hết hạn)', cond: 'Đơn từ 1 triệu · HSD 30/04/2026', code: 'SPRING20', expired: true },
  ];

  copy(code: string): void {
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
    this.copied.set(code);
    setTimeout(() => { if (this.copied() === code) this.copied.set(null); }, 1600);
  }
}
