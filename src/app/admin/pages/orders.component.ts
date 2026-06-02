import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminDataService, OrderStatus, STATUS_LABELS } from '../services/admin-data.service';
import { VndPipe } from '../../pipes/vnd.pipe';

@Component({
  selector: 'app-admin-orders',
  imports: [RouterLink, VndPipe],
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div><h1>Đơn hàng</h1><p>Quản lý và theo dõi tất cả đơn hàng của cửa hàng.</p></div>
        <div class="a-page-actions">
          <button class="a-btn a-btn--ghost"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg> Xuất Excel</button>
        </div>
      </div>

      <div class="a-card">
        <div class="a-card__head">
          <div class="a-filters">
            @for (f of filters; track f.value) {
              <button class="a-chip" [class.is-active]="status() === f.value" (click)="status.set(f.value)">{{ f.label }}</button>
            }
          </div>
        </div>
        <div class="a-table-wrap">
          <table class="a-table">
            <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày</th><th>Thanh toán</th><th>SL</th><th>Trạng thái</th><th style="text-align:right">Tổng</th></tr></thead>
            <tbody>
              @for (o of visible(); track o.id) {
                <tr>
                  <td><a class="a-cell-id" [routerLink]="['/admin/don-hang', o.id]">#{{ o.id }}</a></td>
                  <td><div class="t-strong">{{ o.customer }}</div><div class="t-sub">{{ o.email }}</div></td>
                  <td class="t-sub">{{ o.date }}</td>
                  <td class="t-sub">{{ o.payment }}</td>
                  <td>{{ o.items }}</td>
                  <td><span class="a-pill is-{{ o.status }}">{{ label(o.status) }}</span></td>
                  <td style="text-align:right" class="t-strong">{{ o.total | vnd }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="a-pagination">
          <span class="a-pagination__info">Hiển thị {{ visible().length }} trong {{ data.orders.length }} đơn</span>
          <div class="a-pager"><button disabled>‹</button><button class="is-active">1</button><button disabled>›</button></div>
        </div>
      </div>
    </div>
  `,
})
export class AdminOrdersComponent {
  data = inject(AdminDataService);
  readonly status = signal<OrderStatus | 'all'>('all');

  readonly filters: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đang xử lý', value: 'processing' },
    { label: 'Đã thanh toán', value: 'paid' },
    { label: 'Đang giao', value: 'shipping' },
    { label: 'Đã giao', value: 'delivered' },
    { label: 'Đã huỷ', value: 'cancelled' },
  ];

  readonly visible = computed(() => {
    const s = this.status();
    return s === 'all' ? this.data.orders : this.data.orders.filter((o) => o.status === s);
  });

  label(s: OrderStatus): string { return STATUS_LABELS[s]; }
}
