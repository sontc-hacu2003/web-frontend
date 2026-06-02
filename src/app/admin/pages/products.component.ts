import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminDataService, ProductStatus, PRODUCT_STATUS_LABELS } from '../services/admin-data.service';
import { VndPipe } from '../../pipes/vnd.pipe';

@Component({
  selector: 'app-admin-products',
  imports: [RouterLink, VndPipe],
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div><h1>Sản phẩm</h1><p>{{ data.products.length }} sản phẩm trong cửa hàng.</p></div>
        <div class="a-page-actions">
          <a class="a-btn" routerLink="/admin/san-pham/moi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Thêm sản phẩm</a>
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
            <thead><tr><th>Sản phẩm</th><th>Mã</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Đã bán</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
              @for (p of visible(); track p.id) {
                <tr>
                  <td><div class="a-cell-prod"><span class="a-thumb"></span><span class="t-strong">{{ p.name }}</span></div></td>
                  <td class="a-cell-id">{{ p.id }}</td>
                  <td class="t-sub">{{ p.cat }}</td>
                  <td class="t-strong">{{ p.price | vnd }}</td>
                  <td [style.color]="p.stock === 0 ? 'var(--a-sale)' : ''">{{ p.stock }}</td>
                  <td class="t-sub">{{ p.sold }}</td>
                  <td><span class="a-pill {{ pillClass(p.status) }}">{{ statusLabel(p.status) }}</span></td>
                  <td style="text-align:right"><a class="a-btn a-btn--ghost a-btn--sm" [routerLink]="['/admin/san-pham', p.id]">Sửa</a></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="a-pagination">
          <span class="a-pagination__info">Hiển thị {{ visible().length }} trong {{ data.products.length }} sản phẩm</span>
          <div class="a-pager"><button disabled>‹</button><button class="is-active">1</button><button disabled>›</button></div>
        </div>
      </div>
    </div>
  `,
})
export class AdminProductsComponent {
  data = inject(AdminDataService);
  readonly status = signal<ProductStatus | 'all'>('all');

  readonly filters: { label: string; value: ProductStatus | 'all' }[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đang bán', value: 'active' },
    { label: 'Nháp', value: 'draft' },
    { label: 'Hết hàng', value: 'out' },
  ];

  readonly visible = computed(() => {
    const s = this.status();
    return s === 'all' ? this.data.products : this.data.products.filter((p) => p.status === s);
  });

  statusLabel(s: ProductStatus): string { return PRODUCT_STATUS_LABELS[s]; }
  pillClass(s: ProductStatus): string {
    return s === 'active' ? 'is-active' : s === 'out' ? 'is-cancelled' : 'is-muted';
  }
}
