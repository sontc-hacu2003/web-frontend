import { Component, inject } from '@angular/core';
import { AdminDataService, Tier } from '../services/admin-data.service';
import { VndPipe } from '../../pipes/vnd.pipe';

@Component({
  selector: 'app-admin-customers',
  imports: [VndPipe],
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div><h1>Khách hàng</h1><p>{{ data.customers.length }} khách hàng đã đăng ký.</p></div>
        <div class="a-page-actions"><button class="a-btn a-btn--ghost">Xuất danh sách</button></div>
      </div>

      <div class="a-card">
        <div class="a-table-wrap">
          <table class="a-table">
            <thead><tr><th>Khách hàng</th><th>Mã</th><th>Điện thoại</th><th>Đơn hàng</th><th>Chi tiêu</th><th>Hạng</th><th>Tham gia</th></tr></thead>
            <tbody>
              @for (c of data.customers; track c.id) {
                <tr>
                  <td><div class="a-cell-prod"><span class="a-avatar">{{ initials(c.name) }}</span><div><div class="t-strong">{{ c.name }}</div><div class="t-sub">{{ c.email }}</div></div></div></td>
                  <td class="a-cell-id">{{ c.id }}</td>
                  <td class="t-sub">{{ c.phone }}</td>
                  <td>{{ c.orders }}</td>
                  <td class="t-strong">{{ c.spent | vnd }}</td>
                  <td><span class="a-pill {{ tierClass(c.tier) }}">{{ c.tier }}</span></td>
                  <td class="t-sub">{{ c.joined }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AdminCustomersComponent {
  data = inject(AdminDataService);
  initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return (parts[parts.length - 1][0] + (parts[0][0] ?? '')).toUpperCase();
  }
  tierClass(t: Tier): string {
    return t === 'Platinum' ? 'is-shipping' : t === 'Gold' ? 'is-pending' : 'is-muted';
  }
}
