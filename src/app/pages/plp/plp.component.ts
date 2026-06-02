import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-plp',
  imports: [RouterLink, ProductCardComponent],
  template: `
    <div class="wrap">
      <nav class="crumb">
        <a routerLink="/">Trang chủ</a><span class="sep">/</span>
        <a routerLink="/danh-muc">Nữ</a><span class="sep">/</span>
        <span class="current">Trang phục</span>
      </nav>

      <div class="plp-head">
        <h1>Trang phục Nữ</h1>
        <p>Bộ sưu tập Xuân Hè 2026 — những thiết kế cơ bản, dễ phối, hợp mọi dịp.</p>
      </div>

      <div class="plp">
        <aside class="filters" [class.is-open]="filtersOpen()">
          <div class="filters__group">
            <h4>Danh mục</h4>
            @for (c of categories; track c.label) {
              <label class="filter-opt">
                <input type="checkbox" [checked]="isActive(c.label)" (change)="toggle(c.label)"> {{ c.label }} <span class="count">{{ c.count }}</span>
              </label>
            }
          </div>
          <div class="filters__group">
            <h4>Màu sắc</h4>
            <div class="color-swatches">
              @for (col of colors; track col.label) {
                <button [style.background]="col.color" [attr.aria-label]="col.label"
                        [class.is-active]="isActive(col.label)" (click)="toggle(col.label)"></button>
              }
            </div>
          </div>
          <div class="filters__group">
            <h4>Kích cỡ</h4>
            <div class="size-pills">
              @for (s of sizes; track s) {
                <button [class.is-active]="isActive('Size ' + s)" (click)="toggle('Size ' + s)">{{ s }}</button>
              }
            </div>
          </div>
          <div class="filters__group">
            <h4>Giá</h4>
            @for (p of prices; track p) {
              <label class="filter-opt"><input type="checkbox" [checked]="isActive(p)" (change)="toggle(p)"> {{ p }}</label>
            }
          </div>
        </aside>

        <div class="plp-results">
          <div class="plp-toolbar">
            <button class="filters-toggle" (click)="filtersOpen.set(true)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg> Bộ lọc
            </button>
            <span class="count-label">147 sản phẩm</span>
            <div class="plp-sort">
              <label for="sort" style="font-size:13px;color:var(--color-muted);font-weight:400;">Sắp xếp</label>
              <select id="sort" (change)="onSort($event)">
                <option value="featured">Nổi bật</option>
                <option value="new">Mới nhất</option>
                <option value="low">Giá: Thấp → Cao</option>
                <option value="high">Giá: Cao → Thấp</option>
              </select>
            </div>
          </div>

          <div class="active-filters">
            @for (f of active(); track f) {
              <span class="chip">{{ f }} <button aria-label="Bỏ" (click)="remove(f)">×</button></span>
            }
            @if (active().length) {
              <span class="chip" style="cursor:pointer" (click)="clearAll()">Xoá tất cả</span>
            }
          </div>

          <div class="grid">
            @for (p of visible(); track $index) {
              <app-product-card [product]="p" [index]="$index"></app-product-card>
            }
          </div>

          <div class="load-more">
            @if (canLoadMore()) {
              <button class="btn btn--ghost" (click)="loadMore()">Xem thêm</button>
            }
          </div>
        </div>
      </div>
    </div>

    <div class="scrim" [class.is-open]="filtersOpen()" (click)="filtersOpen.set(false)"></div>
  `,
})
export class PlpComponent {
  private products = inject(ProductService);

  readonly categories = [
    { label: 'Áo', count: 42 }, { label: 'Đầm', count: 28 }, { label: 'Quần', count: 35 },
    { label: 'Chân váy', count: 19 }, { label: 'Áo khoác', count: 23 },
  ];
  readonly colors = [
    { label: 'Đen', color: '#1a1a1a' }, { label: 'Trắng', color: '#ffffff' },
    { label: 'Xanh navy', color: '#2a3b5e' }, { label: 'Đỏ', color: '#c8102e' },
    { label: 'Xanh rêu', color: '#3d5240' }, { label: 'Be', color: '#d9c7a3' }, { label: 'Hồng', color: '#b5255a' },
  ];
  readonly sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  readonly prices = ['Dưới 300K', '300K – 600K', '600K – 1 triệu', 'Trên 1 triệu'];

  private readonly pool = this.products.plpPool();
  private readonly pageSize = 12;

  readonly sortMode = signal<'featured' | 'new' | 'low' | 'high'>('featured');
  readonly shown = signal(this.pageSize);
  readonly active = signal<string[]>([]);
  readonly filtersOpen = signal(false);

  readonly sorted = computed<Product[]>(() => {
    const list = [...this.pool];
    switch (this.sortMode()) {
      case 'low': return list.sort((a, b) => a.price - b.price);
      case 'high': return list.sort((a, b) => b.price - a.price);
      case 'new': return list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
      default: return list;
    }
  });
  readonly visible = computed(() => this.sorted().slice(0, this.shown()));
  readonly canLoadMore = computed(() => this.shown() < this.sorted().length);

  onSort(e: Event): void {
    this.sortMode.set((e.target as HTMLSelectElement).value as 'featured' | 'new' | 'low' | 'high');
    this.shown.set(this.pageSize);
  }

  loadMore(): void {
    this.shown.update((n) => n + this.pageSize);
  }

  isActive(label: string): boolean {
    return this.active().includes(label);
  }

  toggle(label: string): void {
    this.active.update((list) =>
      list.includes(label) ? list.filter((x) => x !== label) : [...list, label],
    );
  }

  remove(label: string): void {
    this.active.update((list) => list.filter((x) => x !== label));
  }

  clearAll(): void {
    this.active.set([]);
  }
}
