import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { VndPipe } from '../../pipes/vnd.pipe';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';

const FREE_SHIP = 499000;
const DISCOUNT_RATE = 0.1;

@Component({
  selector: 'app-cart',
  imports: [RouterLink, VndPipe, ImageSlotComponent],
  template: `
    <div class="wrap">
      <nav class="crumb">
        <a routerLink="/">Trang chủ</a><span class="sep">/</span>
        <span class="current">Giỏ hàng</span>
      </nav>

      <div class="page-head">
        <h1>Giỏ hàng</h1>
        <p>{{ subhead() }}</p>
      </div>

      <div class="cart-layout">
        <div class="cart-list">
          @if (cart.items().length) {
            @for (it of cart.items(); track $index) {
              <div class="cart-row">
                <image-slot placeholder=" "></image-slot>
                <div>
                  <div class="ci-name">{{ it.name }}</div>
                  <div class="ci-meta">{{ it.meta }}</div>
                  <div class="qty">
                    <button (click)="cart.updateQty($index, -1)">−</button>
                    <span>{{ it.qty }}</span>
                    <button (click)="cart.updateQty($index, 1)">+</button>
                  </div>
                  <button class="ci-remove" (click)="cart.remove($index)">Xoá</button>
                </div>
                <div class="ci-right">
                  <div class="ci-price">{{ it.price * it.qty | vnd }}</div>
                  <div class="ci-meta">{{ it.price | vnd }} / cái</div>
                </div>
              </div>
            }
          } @else {
            <div class="cart-empty">
              <p>Giỏ hàng của bạn đang trống.</p>
              <a routerLink="/danh-muc" class="btn">Tiếp tục mua sắm</a>
            </div>
          }
        </div>

        <aside class="summary">
          <h3>Tóm tắt đơn hàng</h3>
          <div class="summary__row"><span>Tạm tính</span><span>{{ subtotal() | vnd }}</span></div>
          <div class="summary__row"><span>Giảm giá thành viên</span><span style="color:var(--color-sale)">−{{ discount() | vnd }}</span></div>
          <div class="summary__row"><span>Phí giao hàng</span><span>{{ ship() === 0 ? 'Miễn phí' : (ship() | vnd) }}</span></div>
          <div class="voucher">
            <input type="text" placeholder="Mã giảm giá" aria-label="Mã giảm giá">
            <button type="button">Áp dụng</button>
          </div>
          <div class="summary__row total"><span>Tổng cộng</span><span>{{ total() | vnd }}</span></div>
          <a routerLink="/thanh-toan" class="btn"
             [style.pointerEvents]="cart.items().length ? 'auto' : 'none'"
             [style.opacity]="cart.items().length ? '1' : '.4'">Tiến hành thanh toán</a>
          <div class="summary__note">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M20 6 9 17l-5-5"/></svg>
            <span>Miễn phí đổi trả trong 30 ngày. Thanh toán được mã hoá an toàn.</span>
          </div>
        </aside>
      </div>
    </div>
  `,
})
export class CartComponent {
  cart = inject(CartService);

  readonly subtotal = computed(() => this.cart.subtotal());
  readonly discount = computed(() => Math.round(this.subtotal() * DISCOUNT_RATE));
  readonly ship = computed(() => (this.subtotal() >= FREE_SHIP || this.subtotal() === 0 ? 0 : 30000));
  readonly total = computed(() => this.subtotal() - this.discount() + this.ship());
  readonly subhead = computed(() =>
    this.cart.count() ? `${this.cart.count()} sản phẩm trong giỏ.` : 'Giỏ hàng đang trống.',
  );
}
