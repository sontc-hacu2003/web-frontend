import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { CartService } from '../../services/cart.service';
import { VndPipe } from '../../pipes/vnd.pipe';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';

const DISCOUNT_RATE = 0.1;

interface CheckoutData {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
  address: string;
  province: string;
  district: string;
  ward: string;
}

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, VndPipe, ImageSlotComponent, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap">
      <nav class="crumb">
        <a routerLink="/">Trang chủ</a><span class="sep">/</span>
        <a routerLink="/gio-hang">Giỏ hàng</a><span class="sep">/</span>
        <span class="current">Thanh toán</span>
      </nav>

      <div class="page-head"><h1>Thanh toán</h1></div>

      <div class="checkout-layout">
        <form class="checkout-form" (submit)="$event.preventDefault(); placeOrder()">
          <section class="co-section">
            <h2><span class="step-num">1</span> Thông tin liên hệ</h2>
            <div class="field">
              <label>Email</label>
              <input type="email" [formField]="coForm.email" placeholder="ban@email.com">
              @if (coForm.email().touched() && coForm.email().invalid()) {
                <p class="field-err">{{ coForm.email().errors()[0]?.message }}</p>
              }
            </div>
            <div class="field">
              <label>Số điện thoại</label>
              <input type="tel" [formField]="coForm.phone" placeholder="09xx xxx xxx">
              @if (coForm.phone().touched() && coForm.phone().invalid()) {
                <p class="field-err">{{ coForm.phone().errors()[0]?.message }}</p>
              }
            </div>
          </section>

          <section class="co-section">
            <h2><span class="step-num">2</span> Địa chỉ giao hàng</h2>
            <div class="field-row">
              <div class="field">
                <label>Họ</label>
                <input type="text" [formField]="coForm.lastName" placeholder="Nguyễn">
                @if (coForm.lastName().touched() && coForm.lastName().invalid()) {
                  <p class="field-err">{{ coForm.lastName().errors()[0]?.message }}</p>
                }
              </div>
              <div class="field">
                <label>Tên</label>
                <input type="text" [formField]="coForm.firstName" placeholder="An">
                @if (coForm.firstName().touched() && coForm.firstName().invalid()) {
                  <p class="field-err">{{ coForm.firstName().errors()[0]?.message }}</p>
                }
              </div>
            </div>
            <div class="field">
              <label>Địa chỉ</label>
              <input type="text" [formField]="coForm.address" placeholder="Số nhà, tên đường">
              @if (coForm.address().touched() && coForm.address().invalid()) {
                <p class="field-err">{{ coForm.address().errors()[0]?.message }}</p>
              }
            </div>
            <div class="field-row-3">
              <div class="field"><label>Tỉnh / Thành</label>
                <select [formField]="coForm.province"><option>TP. Hồ Chí Minh</option><option>Hà Nội</option><option>Đà Nẵng</option><option>Cần Thơ</option></select>
              </div>
              <div class="field">
                <label>Quận / Huyện</label>
                <input type="text" [formField]="coForm.district" placeholder="Quận 1">
                @if (coForm.district().touched() && coForm.district().invalid()) {
                  <p class="field-err">{{ coForm.district().errors()[0]?.message }}</p>
                }
              </div>
              <div class="field">
                <label>Phường / Xã</label>
                <input type="text" [formField]="coForm.ward" placeholder="Bến Nghé">
                @if (coForm.ward().touched() && coForm.ward().invalid()) {
                  <p class="field-err">{{ coForm.ward().errors()[0]?.message }}</p>
                }
              </div>
            </div>
          </section>

          <section class="co-section">
            <h2><span class="step-num">3</span> Phương thức giao hàng</h2>
            <div>
              @for (opt of shipOpts; track opt.value; let i = $index) {
                <label class="ship-opt" [class.is-active]="shipIndex() === i" (click)="shipIndex.set(i)">
                  <input type="radio" name="ship" [checked]="shipIndex() === i">
                  <div class="so-main"><div class="so-title">{{ opt.title }}</div><div class="so-sub">{{ opt.sub }}</div></div>
                  <div class="so-price">{{ opt.value === 0 ? 'Miễn phí' : (opt.value | vnd) }}</div>
                </label>
              }
            </div>
          </section>

          <section class="co-section">
            <h2><span class="step-num">4</span> Phương thức thanh toán</h2>
            <div class="pay-methods">
              @for (pay of payOpts; track pay.title; let i = $index) {
                <label class="ship-opt" [class.is-active]="payIndex() === i" (click)="payIndex.set(i)">
                  <input type="radio" name="pay" [checked]="payIndex() === i">
                  <div class="so-main"><div class="so-title">{{ pay.title }}</div><div class="so-sub">{{ pay.sub }}</div></div>
                </label>
              }
            </div>
          </section>
        </form>

        <aside class="summary checkout-summary">
          <h3>Đơn hàng của bạn</h3>
          <div>
            @for (it of cart.items(); track $index) {
              <div class="co-mini">
                <image-slot placeholder=" "></image-slot>
                <div>
                  <div class="cm-name">{{ it.name }}</div>
                  <div class="cm-meta">{{ it.meta }}</div>
                  <div class="cm-qty">SL: {{ it.qty }}</div>
                </div>
                <div class="cm-price">{{ it.price * it.qty | vnd }}</div>
              </div>
            }
          </div>
          <div class="summary__row" style="margin-top:var(--space-4)"><span>Tạm tính</span><span>{{ subtotal() | vnd }}</span></div>
          <div class="summary__row"><span>Giảm giá thành viên</span><span style="color:var(--color-sale)">−{{ discount() | vnd }}</span></div>
          <div class="summary__row"><span>Phí giao hàng</span><span>{{ shipCost() === 0 ? 'Miễn phí' : (shipCost() | vnd) }}</span></div>
          <div class="summary__row total"><span>Tổng cộng</span><span>{{ total() | vnd }}</span></div>
          <button class="btn" type="button" (click)="placeOrder()"
                  [style.background]="placed() ? 'var(--color-success)' : ''"
                  [style.borderColor]="placed() ? 'var(--color-success)' : ''">{{ placed() ? 'Đã đặt hàng ✓' : 'Đặt hàng' }}</button>
          <div class="summary__note">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
            <span>Giao dịch được mã hoá SSL. Thông tin của bạn được bảo mật.</span>
          </div>
        </aside>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  cart = inject(CartService);

  readonly shipOpts = [
    { title: 'Tiêu chuẩn', sub: '2–4 ngày làm việc', value: 0 },
    { title: 'Nhanh', sub: '1–2 ngày làm việc', value: 35000 },
    { title: 'Hoả tốc (nội thành)', sub: 'Trong 4 giờ', value: 60000 },
  ];
  readonly payOpts = [
    { title: 'Thẻ tín dụng / ghi nợ', sub: 'Visa, Mastercard, JCB' },
    { title: 'Ví MoMo / VNPay', sub: 'Quét mã QR để thanh toán' },
    { title: 'Thanh toán khi nhận hàng (COD)', sub: 'Trả tiền mặt cho shipper' },
  ];

  readonly shipIndex = signal(0);
  readonly payIndex = signal(0);
  readonly placed = signal(false);

  readonly coModel = signal<CheckoutData>({
    email: '', phone: '', lastName: '', firstName: '', address: '',
    province: 'TP. Hồ Chí Minh', district: '', ward: '',
  });
  readonly coForm = form(this.coModel, (path) => {
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
    required(path.phone, { message: 'Vui lòng nhập số điện thoại' });
    required(path.lastName, { message: 'Vui lòng nhập họ' });
    required(path.firstName, { message: 'Vui lòng nhập tên' });
    required(path.address, { message: 'Vui lòng nhập địa chỉ' });
    required(path.district, { message: 'Vui lòng nhập quận / huyện' });
    required(path.ward, { message: 'Vui lòng nhập phường / xã' });
  });

  readonly shipCost = computed(() => this.shipOpts[this.shipIndex()].value);
  readonly subtotal = computed(() => this.cart.subtotal());
  readonly discount = computed(() => Math.round(this.subtotal() * DISCOUNT_RATE));
  readonly total = computed(() => this.subtotal() - this.discount() + this.shipCost());

  async placeOrder(): Promise<void> {
    if (!this.cart.items().length) {
      alert('Giỏ hàng đang trống.');
      return;
    }
    await submit(this.coForm, {
      action: async () => { this.placed.set(true); return undefined; },
    });
  }
}
