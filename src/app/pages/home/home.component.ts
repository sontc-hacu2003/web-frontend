import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { ProductService } from '../../services/product.service';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ImageSlotComponent, ProductCardComponent, CarouselComponent, FormField],
  template: `
    <section class="hero">
      <image-slot placeholder="Ảnh hero (khuyến nghị 2400×1400)"></image-slot>
      <div class="hero__overlay">
        <div class="hero__content">
          <div class="hero__eyebrow">Bộ sưu tập mới</div>
          <h1 class="hero__title">Xuân Hè 2026</h1>
          <div class="hero__actions">
            <a routerLink="/danh-muc" class="btn btn--light">Mua đồ Nữ</a>
            <a routerLink="/danh-muc" class="btn btn--ghost" style="color:#fff;border-color:#fff;">Mua đồ Nam</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap">
        <div class="section__head"><h2 class="section__title">Mua theo danh mục</h2></div>
        <div class="cats">
          <a routerLink="/danh-muc" class="cat"><image-slot placeholder="Nữ"></image-slot><span class="cat__label">Nữ →</span></a>
          <a routerLink="/danh-muc" class="cat"><image-slot placeholder="Nam"></image-slot><span class="cat__label">Nam →</span></a>
          <a routerLink="/danh-muc" class="cat"><image-slot placeholder="Trẻ em"></image-slot><span class="cat__label">Trẻ em →</span></a>
          <a routerLink="/danh-muc" class="cat"><image-slot placeholder="Phụ kiện"></image-slot><span class="cat__label">Phụ kiện →</span></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section__head">
          <div><div class="eyebrow">Vừa cập bến</div><h2 class="section__title">Hàng mới về</h2></div>
          <a routerLink="/danh-muc" class="section__link">Xem tất cả</a>
        </div>
        <app-carousel>
          @for (p of newArrivals; track $index) {
            <app-product-card [product]="p" [index]="$index"></app-product-card>
          }
        </app-carousel>
      </div>
    </section>

    <section class="split">
      <div class="split__media"><image-slot placeholder="Ảnh editorial"></image-slot></div>
      <div class="split__body">
        <div class="eyebrow">Câu chuyện thương hiệu</div>
        <h2 class="split__title">Thiết kế cho cuộc sống thường ngày</h2>
        <p class="split__text">Những món đồ cơ bản được may đo tỉ mỉ, chất liệu bền đẹp và phom dáng tôn người — sẵn sàng cho mọi khoảnh khắc của bạn.</p>
        <div><a routerLink="/danh-muc" class="btn">Khám phá Essentials</a></div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section__head">
          <div><div class="eyebrow">Được yêu thích nhất</div><h2 class="section__title">Bán chạy</h2></div>
          <a routerLink="/danh-muc" class="section__link">Xem tất cả</a>
        </div>
        <div class="grid">
          @for (p of bestsellers; track $index) {
            <app-product-card [product]="p" [index]="$index"></app-product-card>
          }
        </div>
      </div>
    </section>

    <section class="news">
      <div class="wrap">
        <div class="news__inner">
          <h2 class="news__title">Tham gia thành viên</h2>
          <p class="news__sub">Đăng ký nhận tin để được giảm thêm 10% cho đơn đầu tiên và cập nhật BST mới nhất.</p>
          <form class="news__form" (submit)="$event.preventDefault(); subscribe()">
            <input type="email" [formField]="newsletter.email" placeholder="Nhập email của bạn" aria-label="Email">
            <button class="btn btn--light" type="submit">{{ subscribed() ? 'Đã đăng ký ✓' : 'Đăng ký' }}</button>
          </form>
          @if (newsletter.email().touched() && newsletter.email().invalid()) {
            <p class="field-err" style="margin-top:10px">{{ newsletter.email().errors()[0]?.message }}</p>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  private products = inject(ProductService);
  readonly newArrivals = this.products.newArrivals();
  readonly bestsellers = this.products.bestsellers();

  readonly subscribed = signal(false);
  readonly newsletterModel = signal({ email: '' });
  readonly newsletter = form(this.newsletterModel, (path) => {
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
  });

  async subscribe(): Promise<void> {
    await submit(this.newsletter, {
      action: async () => { this.subscribed.set(true); return undefined; },
    });
  }
}
