import { Component, inject } from '@angular/core';
import { AdminDataService, VoucherStatus } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-promotions',
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div><h1>Khuyến mãi</h1><p>Quản lý mã giảm giá và voucher của cửa hàng.</p></div>
        <div class="a-page-actions">
          <button class="a-btn"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Tạo mã mới</button>
        </div>
      </div>

      <div class="a-card">
        <div class="a-table-wrap">
          <table class="a-table">
            <thead><tr><th>Mã</th><th>Mô tả</th><th>Loại</th><th>Giá trị</th><th>Đã dùng</th><th>Hết hạn</th><th>Trạng thái</th></tr></thead>
            <tbody>
              @for (v of data.vouchers; track v.code) {
                <tr>
                  <td class="a-cell-id">{{ v.code }}</td>
                  <td class="t-strong">{{ v.desc }}</td>
                  <td class="t-sub">{{ v.type }}</td>
                  <td class="t-strong">{{ v.value }}</td>
                  <td>
                    <div class="t-strong">{{ v.used }} / {{ v.limit }}</div>
                    <div class="a-progress"><span [style.width.%]="pct(v.used, v.limit)"></span></div>
                  </td>
                  <td class="t-sub">{{ v.expiry }}</td>
                  <td><span class="a-pill {{ v.status === 'active' ? 'is-active' : 'is-expired' }}">{{ statusLabel(v.status) }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .a-progress { margin-top: 6px; width: 120px; height: 5px; border-radius: 999px; background: var(--a-border); overflow: hidden; }
    .a-progress span { display: block; height: 100%; background: var(--admin-accent); border-radius: 999px; }
  `],
})
export class AdminPromotionsComponent {
  data = inject(AdminDataService);
  pct(used: number, limit: number): number { return Math.min(100, Math.round((used / limit) * 100)); }
  statusLabel(s: VoucherStatus): string { return s === 'active' ? 'Đang chạy' : 'Hết hạn'; }
}
