import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminDataService, AdminOrder, OrderStatus, STATUS_LABELS } from '../services/admin-data.service';
import { VndPipe } from '../../pipes/vnd.pipe';

@Component({
  selector: 'app-admin-order-detail',
  imports: [RouterLink, VndPipe],
  template: `
    @if (order(); as o) {
      <div class="a-content">
        <div class="a-page-head">
          <div>
            <a class="a-card__link" routerLink="/admin/don-hang">← Quay lại đơn hàng</a>
            <h1 style="margin-top:6px">Đơn #{{ o.id }} <span class="a-pill is-{{ o.status }}" style="vertical-align:middle;margin-left:8px">{{ label(o.status) }}</span></h1>
            <p>Đặt ngày {{ o.date }} · {{ o.items }} sản phẩm · {{ o.shipMethod }}</p>
          </div>
          <div class="a-page-actions">
            <button class="a-btn a-btn--ghost">In hoá đơn</button>
            <button class="a-btn">Cập nhật trạng thái</button>
          </div>
        </div>

        <div class="a-cols-2">
          <div style="display:flex;flex-direction:column;gap:18px">
            <div class="a-card">
              <div class="a-card__head"><span class="a-card__title">Sản phẩm</span></div>
              <div class="a-table-wrap">
                <table class="a-table">
                  <thead><tr><th>Sản phẩm</th><th>Phân loại</th><th>SL</th><th style="text-align:right">Thành tiền</th></tr></thead>
                  <tbody>
                    @for (l of o.lines; track l.name) {
                      <tr>
                        <td><div class="a-cell-prod"><span class="a-thumb"></span><span class="t-strong">{{ l.name }}</span></div></td>
                        <td class="t-sub">{{ l.meta }}</td>
                        <td>{{ l.qty }}</td>
                        <td style="text-align:right" class="t-strong">{{ l.price * l.qty | vnd }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <div class="a-card__body" style="border-top:1px solid var(--a-border-soft)">
                <div class="a-data-list">
                  <div class="a-data-row"><span class="k">Tạm tính</span><span class="v">{{ o.subtotal | vnd }}</span></div>
                  <div class="a-data-row"><span class="k">Giảm giá thành viên</span><span class="v" style="color:var(--a-sale)">−{{ o.discount | vnd }}</span></div>
                  <div class="a-data-row"><span class="k">Phí giao hàng</span><span class="v">{{ o.shipFee === 0 ? 'Miễn phí' : (o.shipFee | vnd) }}</span></div>
                  <div class="a-data-row" style="border-top:1px solid var(--a-border-soft);padding-top:12px"><span class="k" style="font-weight:600;color:var(--a-heading)">Tổng cộng</span><span class="v" style="font-size:17px">{{ o.total | vnd }}</span></div>
                </div>
              </div>
            </div>

            <div class="a-card">
              <div class="a-card__head"><span class="a-card__title">Tiến trình đơn hàng</span></div>
              <div class="a-card__body">
                <div class="a-timeline">
                  @for (s of steps(o.status); track s.title) {
                    <div class="a-tl" [class.done]="s.state === 'done'" [class.current]="s.state === 'current'">
                      <span class="a-tl__dot"></span>
                      <div><div class="a-tl__title">{{ s.title }}</div><div class="a-tl__time">{{ s.time }}</div></div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:18px">
            <div class="a-card">
              <div class="a-card__head"><span class="a-card__title">Khách hàng</span></div>
              <div class="a-card__body">
                <div class="a-cell-prod" style="margin-bottom:16px"><span class="a-avatar">{{ initials(o.customer) }}</span><div><div class="t-strong">{{ o.customer }}</div><div class="t-sub">Khách hàng</div></div></div>
                <div class="a-data-list">
                  <div class="a-data-row"><span class="k">Email</span><span class="v">{{ o.email }}</span></div>
                  <div class="a-data-row"><span class="k">Điện thoại</span><span class="v">{{ o.phone }}</span></div>
                </div>
              </div>
            </div>
            <div class="a-card">
              <div class="a-card__head"><span class="a-card__title">Giao hàng & thanh toán</span></div>
              <div class="a-card__body">
                <div class="a-data-list">
                  <div class="a-data-row"><span class="k">Địa chỉ</span><span class="v" style="text-align:right;max-width:60%">{{ o.address }}</span></div>
                  <div class="a-data-row"><span class="k">Phương thức giao</span><span class="v">{{ o.shipMethod }}</span></div>
                  <div class="a-data-row"><span class="k">Thanh toán</span><span class="v">{{ o.payment }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="a-content"><div class="a-card"><div class="a-card__body">Không tìm thấy đơn hàng. <a class="a-card__link" routerLink="/admin/don-hang">Về danh sách</a></div></div></div>
    }
  `,
})
export class AdminOrderDetailComponent {
  private route = inject(ActivatedRoute);
  data = inject(AdminDataService);
  readonly order = signal<AdminOrder | undefined>(undefined);

  constructor() {
    this.route.paramMap.subscribe((p) => this.order.set(this.data.findOrder(p.get('id') ?? '')));
  }

  label(s: OrderStatus): string { return STATUS_LABELS[s]; }
  initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return (parts[parts.length - 1][0] + (parts[0][0] ?? '')).toUpperCase();
  }

  steps(status: OrderStatus): { title: string; time: string; state: 'done' | 'current' | '' }[] {
    if (status === 'cancelled') {
      return [
        { title: 'Đã đặt hàng', time: 'Hoàn tất', state: 'done' },
        { title: 'Đã huỷ đơn', time: 'Đơn hàng đã bị huỷ', state: 'current' },
      ];
    }
    const order: OrderStatus[] = ['processing', 'paid', 'shipping', 'delivered'];
    const idx = order.indexOf(status);
    const titles = [
      { t: 'Đã đặt hàng', time: 'Đã tiếp nhận' },
      { t: 'Đã xác nhận & thanh toán', time: 'Đã xử lý' },
      { t: 'Đang giao đến bạn', time: 'Đơn vị vận chuyển' },
      { t: 'Giao thành công', time: 'Hoàn tất' },
    ];
    return titles.map((s, i) => ({
      title: s.t,
      time: i <= idx ? s.time : '—',
      state: i < idx ? 'done' : i === idx ? 'current' : '',
    }));
  }
}
