import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';

type Panel = 'overview' | 'orders' | 'address' | 'profile';

@Component({
  selector: 'app-account',
  imports: [RouterLink, ImageSlotComponent, FormField],
  template: `
    <div class="wrap">
      <nav class="crumb">
        <a routerLink="/">Trang chủ</a><span class="sep">/</span>
        <span class="current">Tài khoản</span>
      </nav>

      <div class="account">
        <aside class="acct-nav">
          <div class="acct-greet">
            <div class="ag-hi">Xin chào</div>
            <div class="ag-name">Nguyễn An</div>
          </div>
          <a href="#" [class.is-active]="panel() === 'overview'" (click)="go('overview', $event)"><svg viewBox="0 0 24 24" stroke-width="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Tổng quan</a>
          <a href="#" [class.is-active]="panel() === 'orders'" (click)="go('orders', $event)"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Đơn hàng</a>
          <a href="#" [class.is-active]="panel() === 'address'" (click)="go('address', $event)"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Địa chỉ</a>
          <a href="#" [class.is-active]="panel() === 'profile'" (click)="go('profile', $event)"><svg viewBox="0 0 24 24" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg> Thông tin</a>
          <a routerLink="/dang-nhap" class="logout"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Đăng xuất</a>
        </aside>

        <div class="acct-content">
          @if (panel() === 'overview') {
            <section class="acct-panel is-active">
              <h2>Tổng quan</h2>
              <div class="stat-cards">
                <div class="stat-card"><div class="sc-num">12</div><div class="sc-label">Đơn hàng</div></div>
                <div class="stat-card"><div class="sc-num">3</div><div class="sc-label">Đang giao</div></div>
                <div class="stat-card"><div class="sc-num">1.250</div><div class="sc-label">Điểm thành viên</div></div>
              </div>
              <h3 style="font-size:15px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:16px;">Đơn hàng gần đây</h3>
              <div class="order-card">
                <div class="order-head">
                  <div><div class="oh-id">#MS-20418</div><div class="oh-meta">28/05/2026 · 2 sản phẩm</div></div>
                  <span class="order-status shipping">Đang giao</span>
                </div>
                <div class="order-body">
                  <image-slot placeholder=" "></image-slot>
                  <div class="ob-info"><div class="ob-name">Áo khoác blazer dáng lửng</div><div class="ob-sub">Đen · M · +1 sản phẩm</div></div>
                  <div class="ob-total">1.489.000₫</div>
                </div>
              </div>
            </section>
          }

          @if (panel() === 'orders') {
            <section class="acct-panel is-active">
              <h2>Đơn hàng của tôi</h2>
              @for (o of orders; track o.id) {
                <div class="order-card">
                  <div class="order-head"><div><div class="oh-id">#{{ o.id }}</div><div class="oh-meta">{{ o.meta }}</div></div><span class="order-status {{ o.statusClass }}">{{ o.status }}</span></div>
                  <div class="order-body"><image-slot placeholder=" "></image-slot><div class="ob-info"><div class="ob-name">{{ o.name }}</div><div class="ob-sub">{{ o.sub }}</div></div><div class="ob-total">{{ o.total }}</div></div>
                </div>
              }
            </section>
          }

          @if (panel() === 'address') {
            <section class="acct-panel is-active">
              <h2>Sổ địa chỉ</h2>
              <div class="addr-grid">
                <div class="addr-card default">
                  <div class="ac-tag">Mặc định</div>
                  <h4>Nguyễn An</h4>
                  <p>0901 234 567<br>123 Lê Lợi, P. Bến Nghé<br>Quận 1, TP. Hồ Chí Minh</p>
                  <div class="ac-actions"><a href="#">Chỉnh sửa</a><a href="#">Xoá</a></div>
                </div>
                <div class="addr-card">
                  <div class="ac-tag" style="color:var(--color-muted)">Văn phòng</div>
                  <h4>Nguyễn An</h4>
                  <p>0901 234 567<br>45 Nguyễn Huệ, P. Bến Nghé<br>Quận 1, TP. Hồ Chí Minh</p>
                  <div class="ac-actions"><a href="#">Chỉnh sửa</a><a href="#">Xoá</a><a href="#">Đặt mặc định</a></div>
                </div>
              </div>
              <div style="margin-top:24px"><button class="btn btn--ghost" type="button">+ Thêm địa chỉ</button></div>
            </section>
          }

          @if (panel() === 'profile') {
            <section class="acct-panel is-active">
              <h2>Thông tin cá nhân</h2>
              <form class="profile-form" (submit)="$event.preventDefault(); save()">
                <div class="field-row">
                  <div class="field">
                    <label>Họ</label>
                    <input type="text" [formField]="profileForm.lastName">
                    @if (profileForm.lastName().touched() && profileForm.lastName().invalid()) {
                      <p class="field-err">{{ profileForm.lastName().errors()[0]?.message }}</p>
                    }
                  </div>
                  <div class="field">
                    <label>Tên</label>
                    <input type="text" [formField]="profileForm.firstName">
                    @if (profileForm.firstName().touched() && profileForm.firstName().invalid()) {
                      <p class="field-err">{{ profileForm.firstName().errors()[0]?.message }}</p>
                    }
                  </div>
                </div>
                <div class="field">
                  <label>Email</label>
                  <input type="email" [formField]="profileForm.email">
                  @if (profileForm.email().touched() && profileForm.email().invalid()) {
                    <p class="field-err">{{ profileForm.email().errors()[0]?.message }}</p>
                  }
                </div>
                <div class="field">
                  <label>Số điện thoại</label>
                  <input type="tel" [formField]="profileForm.phone">
                  @if (profileForm.phone().touched() && profileForm.phone().invalid()) {
                    <p class="field-err">{{ profileForm.phone().errors()[0]?.message }}</p>
                  }
                </div>
                <div class="field"><label>Ngày sinh</label><input type="text" [formField]="profileForm.birthday" placeholder="DD/MM/YYYY"></div>
                <button class="btn" type="submit"
                        [style.background]="saved() ? 'var(--color-success)' : ''"
                        [style.borderColor]="saved() ? 'var(--color-success)' : ''">{{ saved() ? 'Đã lưu ✓' : 'Lưu thay đổi' }}</button>
              </form>
            </section>
          }
        </div>
      </div>
    </div>
  `,
})
export class AccountComponent {
  readonly panel = signal<Panel>('overview');
  readonly saved = signal(false);

  readonly profileModel = signal({
    lastName: 'Nguyễn', firstName: 'An', email: 'an.nguyen@email.com',
    phone: '0901 234 567', birthday: '',
  });
  readonly profileForm = form(this.profileModel, (path) => {
    required(path.lastName, { message: 'Vui lòng nhập họ' });
    required(path.firstName, { message: 'Vui lòng nhập tên' });
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
    required(path.phone, { message: 'Vui lòng nhập số điện thoại' });
  });

  async save(): Promise<void> {
    await submit(this.profileForm, {
      action: async () => { this.saved.set(true); return undefined; },
    });
  }

  readonly orders = [
    { id: 'MS-20418', meta: '28/05/2026 · 2 sản phẩm', status: 'Đang giao', statusClass: 'shipping', name: 'Áo khoác blazer dáng lửng', sub: 'Đen · M · +1 sản phẩm', total: '1.489.000₫' },
    { id: 'MS-20106', meta: '14/05/2026 · 1 sản phẩm', status: 'Đã giao', statusClass: 'delivered', name: 'Đầm midi xếp ly', sub: 'Be · S', total: '799.000₫' },
    { id: 'MS-19877', meta: '02/05/2026 · 3 sản phẩm', status: 'Đã giao', statusClass: 'delivered', name: 'Áo thun cotton organic', sub: 'Trắng · M · +2 sản phẩm', total: '897.000₫' },
    { id: 'MS-19540', meta: '21/04/2026 · 1 sản phẩm', status: 'Đang xử lý', statusClass: 'processing', name: 'Quần jeans ống suông', sub: 'Xanh · 29', total: '699.000₫' },
  ];

  go(p: Panel, e: Event): void {
    e.preventDefault();
    this.panel.set(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
