import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { VndPipe } from '../../pipes/vnd.pipe';
import { ImageSlotComponent } from '../image-slot/image-slot.component';

/** Slide-in cart drawer + scrim (ported from scripts/chrome.js overlaysHTML + cart logic). */
@Component({
  selector: 'app-cart-drawer',
  imports: [RouterLink, VndPipe, ImageSlotComponent],
  template: `
    <div class="scrim" [class.is-open]="ui.cartOpen()" (click)="ui.closeCart()"></div>
    <aside class="drawer" [class.is-open]="ui.cartOpen()">
      <div class="drawer__head"><h3>Giỏ hàng</h3>
        <button class="icon-btn" (click)="ui.closeCart()" aria-label="Đóng">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>
      </div>
      <div class="drawer__body">
        @if (cart.items().length) {
          @for (it of cart.items(); track $index) {
            <div class="drawer__item">
              <image-slot placeholder=" "></image-slot>
              <div>
                <div class="drawer__item-name">{{ it.name }}</div>
                <div class="drawer__item-meta">{{ it.meta }}</div>
                <div class="qty">
                  <button (click)="cart.updateQty($index, -1)">−</button>
                  <span>{{ it.qty }}</span>
                  <button (click)="cart.updateQty($index, 1)">+</button>
                </div>
              </div>
              <div class="drawer__item-price">{{ it.price * it.qty | vnd }}</div>
            </div>
          }
        } @else {
          <p style="padding:48px 0;text-align:center;color:var(--color-muted)">Giỏ hàng đang trống</p>
        }
      </div>
      <div class="drawer__foot">
        <div class="drawer__total"><span>Tạm tính</span><span>{{ cart.subtotal() | vnd }}</span></div>
        <a routerLink="/thanh-toan" class="btn" (click)="ui.closeCart()">Thanh toán</a>
        <a routerLink="/gio-hang" class="btn btn--ghost" style="margin-top:10px;" (click)="ui.closeCart()">Xem giỏ hàng</a>
      </div>
    </aside>
  `,
})
export class CartDrawerComponent {
  cart = inject(CartService);
  ui = inject(UiService);
}
