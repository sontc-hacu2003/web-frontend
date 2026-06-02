import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminDataService, STATUS_LABELS } from '../services/admin-data.service';
import { VndPipe } from '../../pipes/vnd.pipe';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, VndPipe],
  template: `
    <div class="a-content">
      <div class="a-kpis">
        @for (k of data.kpis; track k.label) {
          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">{{ k.label }}</span>
              <span class="kpi__icon">
                @switch (k.icon) {
                  @case ('revenue') { <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> }
                  @case ('orders') { <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/></svg> }
                  @case ('customers') { <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg> }
                  @default { <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-5"/></svg> }
                }
              </span>
            </div>
            <div class="kpi__value">{{ k.value }}</div>
            <div class="kpi__delta" [class.up]="k.dir === 'up'" [class.down]="k.dir === 'down'">
              {{ k.dir === 'up' ? '▲' : '▼' }} {{ k.delta }} <span>{{ k.note }}</span>
            </div>
          </div>
        }
      </div>

      <div class="a-cols-2">
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Doanh thu 30 ngày</span><a class="a-card__link" routerLink="/admin">Xem báo cáo</a></div>
          <div class="a-card__body"><div class="a-chart"><span class="a-chart__label">[ Biểu đồ doanh thu ]<br>điền sau</span></div></div>
        </div>
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Sản phẩm bán chạy</span></div>
          <div class="a-card__body" style="padding-top:8px">
            @for (p of data.topProducts; track p.name; let i = $index) {
              <div class="a-rank">
                <span class="a-rank__no">{{ i + 1 }}</span>
                <span class="a-thumb"></span>
                <div style="flex:1"><div class="t-strong">{{ p.name }}</div><div class="t-sub">{{ p.sold }} đã bán</div></div>
                <span class="t-strong">{{ p.revenue }}</span>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="a-card">
        <div class="a-card__head"><span class="a-card__title">Đơn hàng gần đây</span><a class="a-card__link" routerLink="/admin/don-hang">Xem tất cả</a></div>
        <div class="a-table-wrap">
          <table class="a-table">
            <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày</th><th>Sản phẩm</th><th>Trạng thái</th><th style="text-align:right">Tổng</th></tr></thead>
            <tbody>
              @for (o of data.recentOrders(); track o.id) {
                <tr>
                  <td><a class="a-cell-id" [routerLink]="['/admin/don-hang', o.id]">#{{ o.id }}</a></td>
                  <td class="t-strong">{{ o.customer }}</td>
                  <td class="t-sub">{{ o.date }}</td>
                  <td>{{ o.items }} món</td>
                  <td><span class="a-pill is-{{ o.status }}">{{ label(o.status) }}</span></td>
                  <td style="text-align:right" class="t-strong">{{ o.total | vnd }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {
  data = inject(AdminDataService);
  label(s: keyof typeof STATUS_LABELS): string { return STATUS_LABELS[s]; }
}
