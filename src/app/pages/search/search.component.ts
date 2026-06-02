import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-search',
  imports: [RouterLink, ProductCardComponent],
  template: `
    <div class="wrap">
      <div class="search-hero">
        <h1>Bạn đang tìm gì?</h1>
        <div class="search-box">
          <input type="text" [value]="query()" (input)="onInput($event)" (keydown.enter)="run()"
                 placeholder="Tìm áo, đầm, quần, phụ kiện…" autocomplete="off">
          <button type="button" (click)="run()" aria-label="Tìm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
          </button>
        </div>
        <div class="search-chips">
          <span class="chip-label">Phổ biến:</span>
          @for (c of chips; track c) {
            <button (click)="pick(c)">{{ c }}</button>
          }
        </div>
      </div>

      <div style="padding-bottom:80px;">
        @if (!hasQuery()) {
          <div class="search-empty"><p>Nhập từ khoá để bắt đầu tìm kiếm, hoặc chọn một gợi ý phía trên.</p></div>
        } @else if (results().length === 0) {
          <div class="search-empty">
            <p>Không tìm thấy kết quả cho “<strong>{{ query() }}</strong>”.</p>
            <p style="margin-top:8px">Thử từ khoá khác, hoặc <a routerLink="/danh-muc" style="border-bottom:1px solid var(--color-border)">xem tất cả sản phẩm</a>.</p>
          </div>
        } @else {
          <div class="search-meta">{{ results().length }} kết quả cho “{{ query() }}”</div>
          <div class="grid">
            @for (p of results(); track $index) {
              <app-product-card [product]="p" [index]="$index"></app-product-card>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class SearchComponent {
  private products = inject(ProductService);
  readonly chips = ['Áo thun', 'Đầm', 'Blazer', 'Quần jeans', 'Túi'];

  readonly query = signal('');
  readonly hasQuery = signal(false);
  readonly results = signal<Product[]>([]);

  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.query.set(v);
    if (v.length >= 2 || v.length === 0) this.run();
  }

  pick(term: string): void {
    this.query.set(term);
    this.run();
  }

  run(): void {
    const q = this.query().trim();
    this.hasQuery.set(!!q);
    this.results.set(q ? this.products.search(q) : []);
  }
}
