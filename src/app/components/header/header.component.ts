import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { ImageSlotComponent } from '../image-slot/image-slot.component';

/** Top bar + main header with mega menus (ported from scripts/chrome.js headerHTML). */
@Component({
  selector: 'app-header',
  imports: [RouterLink, ImageSlotComponent],
  template: `
    <div class="topbar"><div class="topbar__track">
      <span>Miễn phí giao hàng cho đơn từ 499K</span><span>Đổi trả trong 30 ngày</span><span>Thành viên giảm thêm 10%</span>
      <span>Miễn phí giao hàng cho đơn từ 499K</span><span>Đổi trả trong 30 ngày</span><span>Thành viên giảm thêm 10%</span>
    </div></div>

    <header class="header"><div class="wrap header__inner">
      <div class="header__left">
        <button class="icon-btn hamburger" (click)="ui.openMenu()" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <nav class="nav">
          <div class="nav__item">
            <a routerLink="/danh-muc" class="nav__link">Nữ</a>
            <div class="mega"><div class="mega__inner">
              <div class="mega__col"><h5>Trang phục</h5><ul><li><a routerLink="/danh-muc">Áo thun</a></li><li><a routerLink="/danh-muc">Áo sơ mi</a></li><li><a routerLink="/danh-muc">Đầm</a></li><li><a routerLink="/danh-muc">Áo khoác</a></li><li><a routerLink="/danh-muc">Quần jeans</a></li><li><a routerLink="/danh-muc">Chân váy</a></li></ul></div>
              <div class="mega__col"><h5>Bộ sưu tập</h5><ul><li><a routerLink="/danh-muc">Hàng mới về</a></li><li><a routerLink="/danh-muc">Essentials</a></li><li><a routerLink="/danh-muc">Đồ công sở</a></li><li><a routerLink="/danh-muc">Dạo phố</a></li><li><a routerLink="/danh-muc">Dự tiệc</a></li></ul></div>
              <div class="mega__col"><h5>Phụ kiện</h5><ul><li><a routerLink="/danh-muc">Túi xách</a></li><li><a routerLink="/danh-muc">Giày</a></li><li><a routerLink="/danh-muc">Trang sức</a></li><li><a routerLink="/danh-muc">Thắt lưng</a></li><li><a routerLink="/danh-muc">Khăn choàng</a></li></ul></div>
              <div class="mega__col"><h5>Ưu đãi</h5><ul><li><a routerLink="/danh-muc" class="is-sale">Sale đến 50%</a></li><li><a routerLink="/danh-muc">Mua 2 tặng 1</a></li><li><a routerLink="/danh-muc">Outlet</a></li></ul></div>
              <div class="mega__promo"><image-slot placeholder="Ảnh mega menu Nữ"></image-slot><div class="mega__promo-cap">BST Xuân Hè →</div></div>
            </div></div>
          </div>
          <div class="nav__item">
            <a routerLink="/danh-muc" class="nav__link">Nam</a>
            <div class="mega"><div class="mega__inner">
              <div class="mega__col"><h5>Trang phục</h5><ul><li><a routerLink="/danh-muc">Áo thun</a></li><li><a routerLink="/danh-muc">Áo sơ mi</a></li><li><a routerLink="/danh-muc">Áo polo</a></li><li><a routerLink="/danh-muc">Áo khoác</a></li><li><a routerLink="/danh-muc">Quần dài</a></li><li><a routerLink="/danh-muc">Quần short</a></li></ul></div>
              <div class="mega__col"><h5>Bộ sưu tập</h5><ul><li><a routerLink="/danh-muc">Hàng mới về</a></li><li><a routerLink="/danh-muc">Smart casual</a></li><li><a routerLink="/danh-muc">Thể thao</a></li><li><a routerLink="/danh-muc">Denim</a></li></ul></div>
              <div class="mega__col"><h5>Phụ kiện</h5><ul><li><a routerLink="/danh-muc">Giày</a></li><li><a routerLink="/danh-muc">Túi</a></li><li><a routerLink="/danh-muc">Mũ nón</a></li><li><a routerLink="/danh-muc">Thắt lưng</a></li><li><a routerLink="/danh-muc">Đồng hồ</a></li></ul></div>
              <div class="mega__col"><h5>Ưu đãi</h5><ul><li><a routerLink="/danh-muc" class="is-sale">Sale đến 50%</a></li><li><a routerLink="/danh-muc">Combo tiết kiệm</a></li><li><a routerLink="/danh-muc">Outlet</a></li></ul></div>
              <div class="mega__promo"><image-slot placeholder="Ảnh mega menu Nam"></image-slot><div class="mega__promo-cap">Essentials nam →</div></div>
            </div></div>
          </div>
          <div class="nav__item">
            <a routerLink="/danh-muc" class="nav__link">Trẻ em</a>
            <div class="mega"><div class="mega__inner">
              <div class="mega__col"><h5>Bé gái</h5><ul><li><a routerLink="/danh-muc">Đầm</a></li><li><a routerLink="/danh-muc">Áo</a></li><li><a routerLink="/danh-muc">Quần</a></li><li><a routerLink="/danh-muc">Bộ đồ</a></li></ul></div>
              <div class="mega__col"><h5>Bé trai</h5><ul><li><a routerLink="/danh-muc">Áo thun</a></li><li><a routerLink="/danh-muc">Quần</a></li><li><a routerLink="/danh-muc">Áo khoác</a></li><li><a routerLink="/danh-muc">Bộ đồ</a></li></ul></div>
              <div class="mega__col"><h5>Sơ sinh</h5><ul><li><a routerLink="/danh-muc">Bodysuit</a></li><li><a routerLink="/danh-muc">Set quà tặng</a></li><li><a routerLink="/danh-muc">Phụ kiện</a></li></ul></div>
              <div class="mega__col"><h5>Theo độ tuổi</h5><ul><li><a routerLink="/danh-muc">0–18 tháng</a></li><li><a routerLink="/danh-muc">2–8 tuổi</a></li><li><a routerLink="/danh-muc">9–14 tuổi</a></li></ul></div>
              <div class="mega__promo"><image-slot placeholder="Ảnh mega menu Trẻ em"></image-slot><div class="mega__promo-cap">Back to school →</div></div>
            </div></div>
          </div>
          <div class="nav__item"><a routerLink="/danh-muc" class="nav__link">Nhà cửa</a></div>
          <div class="nav__item"><a routerLink="/danh-muc" class="nav__link">Bộ sưu tập</a></div>
          <div class="nav__item"><a routerLink="/danh-muc" class="nav__link is-sale">Sale</a></div>
        </nav>
      </div>

      <a routerLink="/" class="brand"><image-slot fit="contain" placeholder="Logo"></image-slot></a>

      <div class="header__right">
        <a routerLink="/tim-kiem" class="icon-btn" aria-label="Tìm kiếm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg></a>
        <a routerLink="/tai-khoan" class="icon-btn desktop-only" aria-label="Tài khoản"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></a>
        <button class="icon-btn" (click)="toggleWish()" aria-label="Yêu thích">
          <svg viewBox="0 0 24 24" fill="none" [style.fill]="wished() ? 'var(--color-sale)' : 'none'" [style.stroke]="wished() ? 'var(--color-sale)' : 'currentColor'" stroke-width="1.6"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>
        </button>
        <button class="icon-btn" (click)="ui.openCart()" aria-label="Giỏ hàng">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
          <span class="cart-count" [style.display]="cart.count() ? 'flex' : 'none'">{{ cart.count() }}</span>
        </button>
      </div>
    </div></header>
  `,
})
export class HeaderComponent {
  cart = inject(CartService);
  ui = inject(UiService);
  readonly wished = signal(false);

  toggleWish(): void {
    this.wished.update((v) => !v);
  }
}
