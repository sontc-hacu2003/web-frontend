import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-pdp',
  imports: [RouterLink, ImageSlotComponent, ProductCardComponent, CarouselComponent],
  template: `
    <div class="wrap">
      <nav class="crumb">
        <a routerLink="/">Trang chủ</a><span class="sep">/</span>
        <a routerLink="/danh-muc">Nữ</a><span class="sep">/</span>
        <a routerLink="/danh-muc">Áo khoác</a><span class="sep">/</span>
        <span class="current">Blazer dáng lửng</span>
      </nav>

      <div class="pdp">
        <div class="gallery">
          <div class="gallery__thumbs">
            @for (t of [0,1,2,3]; track t) {
              <div class="thumb" [class.is-active]="thumb() === t" (click)="thumb.set(t)"><image-slot placeholder=" "></image-slot></div>
            }
          </div>
          <div class="gallery__main"><image-slot placeholder="Ảnh sản phẩm chính"></image-slot></div>
        </div>

        <div class="pdp-info">
          <div class="brand-line">Maison</div>
          <h1>Áo khoác blazer dáng lửng</h1>

          <div class="pdp-rating">
            <span class="stars">★★★★★</span>
            <span>4.8 · 126 đánh giá</span>
          </div>

          <div class="pdp-price">
            <span class="now is-sale">1.290.000₫</span>
            <span class="was">1.590.000₫</span>
            <span class="save">−19%</span>
          </div>
          <p class="pdp-tax">Đã bao gồm VAT. Phí giao hàng tính khi thanh toán.</p>

          <div class="opt-block">
            <div class="opt-head"><h4>Màu sắc</h4><span class="opt-val">{{ color() }}</span></div>
            <div class="pdp-colors">
              @for (c of colorOpts; track c.name) {
                <button [class.is-active]="color() === c.name" [style.background]="c.hex" [attr.aria-label]="c.name" (click)="color.set(c.name)"></button>
              }
            </div>
          </div>

          <div class="opt-block">
            <div class="opt-head"><h4>Kích cỡ</h4><a routerLink="/huong-dan-size">Hướng dẫn chọn size</a></div>
            <div class="pdp-sizes">
              @for (s of sizeOpts; track s.label) {
                <button [class.is-active]="size() === s.label" [class.is-out]="s.out"
                        (click)="selectSize(s)">{{ s.label }}</button>
              }
            </div>
          </div>

          <div class="pdp-actions">
            <button class="btn" (click)="addToCart()">Thêm vào giỏ</button>
            <button class="icon-square" [class.is-active]="wished()" (click)="wished.set(!wished())" aria-label="Yêu thích">
              <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>
            </button>
          </div>

          <div class="pdp-perks">
            <div class="perk"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M3 7h13v10H3zM16 10h4l1 3v4h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg> Miễn phí giao hàng cho đơn từ 499K</div>
            <div class="perk"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M3 12a9 9 0 1 0 9-9"/><polyline points="3 4 3 12 11 12"/></svg> Đổi trả miễn phí trong 30 ngày</div>
            <div class="perk"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/></svg> Bảo hành đường may 12 tháng</div>
          </div>

          <div class="accordion">
            @for (item of accordion; track item.title; let i = $index) {
              <div class="acc-item" [class.is-open]="open()[i]">
                <button class="acc-head" (click)="toggle(i)">{{ item.title }} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                <div class="acc-body" #body [style.maxHeight]="open()[i] ? body.scrollHeight + 'px' : '0'">
                  <div class="acc-body-inner" [innerHTML]="item.html"></div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="wrap">
        <div class="section__head">
          <div><div class="eyebrow">Gợi ý cho bạn</div><h2 class="section__title">Có thể bạn cũng thích</h2></div>
          <a routerLink="/danh-muc" class="section__link">Xem tất cả</a>
        </div>
        <app-carousel>
          @for (p of related; track $index) {
            <app-product-card [product]="p" [index]="$index"></app-product-card>
          }
        </app-carousel>
      </div>
    </section>
  `,
})
export class PdpComponent {
  private products = inject(ProductService);
  private cart = inject(CartService);

  readonly colorOpts = [
    { name: 'Đen', hex: '#1a1a1a' },
    { name: 'Be', hex: '#d9c7a3' },
    { name: 'Xanh navy', hex: '#2a3b5e' },
  ];
  readonly sizeOpts = [
    { label: 'XS', out: false }, { label: 'S', out: false }, { label: 'M', out: false },
    { label: 'L', out: false }, { label: 'XL', out: true },
  ];
  readonly accordion = [
    { title: 'Mô tả sản phẩm', html: 'Blazer dáng lửng phom relaxed, cổ ve xếch thanh lịch, có thể mặc đi làm hay dạo phố. Lớp lót mỏng nhẹ, thoáng khí, giữ form tốt sau nhiều lần giặt.' },
    { title: 'Chất liệu & bảo quản', html: '<ul><li>68% Polyester, 29% Viscose, 3% Elastane</li><li>Giặt máy ở 30°C, mặt trái</li><li>Không dùng chất tẩy, ủi nhiệt độ thấp</li></ul>' },
    { title: 'Giao hàng & đổi trả', html: 'Giao hàng tiêu chuẩn 2–4 ngày. Miễn phí cho đơn từ 499K. Đổi trả trong 30 ngày nếu sản phẩm còn nguyên tem mác.' },
  ];

  readonly thumb = signal(0);
  readonly color = signal('Đen');
  readonly size = signal('M');
  readonly wished = signal(false);
  readonly open = signal<boolean[]>([true, false, false]);

  readonly related = this.products.related();

  toggle(i: number): void {
    this.open.update((arr) => arr.map((v, idx) => (idx === i ? !v : v)));
  }

  selectSize(s: { label: string; out: boolean }): void {
    if (!s.out) this.size.set(s.label);
  }

  addToCart(): void {
    this.cart.add({ name: 'Áo khoác blazer dáng lửng', meta: `${this.color()} · ${this.size()}`, price: 1290000 });
  }
}
