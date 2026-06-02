import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin-appearance',
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div><h1>Giao diện</h1><p>Quản lý nội dung hiển thị ngoài storefront: trang chủ, header và footer.</p></div>
        <div class="a-page-actions"><button class="a-btn">Lưu thay đổi</button></div>
      </div>

      <div class="a-tabs">
        <button class="a-tab" [class.is-active]="tab() === 'home'" (click)="tab.set('home')">Trang chủ</button>
        <button class="a-tab" [class.is-active]="tab() === 'header'" (click)="tab.set('header')">Header</button>
        <button class="a-tab" [class.is-active]="tab() === 'footer'" (click)="tab.set('footer')">Footer</button>
      </div>

      @if (tab() === 'home') {
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Banner hero</span></div>
          <div class="a-card__body">
            <div class="a-form-grid">
              <div class="a-field"><label class="a-label">Eyebrow</label><input class="a-input" value="Bộ sưu tập mới"></div>
              <div class="a-field"><label class="a-label">Tiêu đề</label><input class="a-input" value="Xuân Hè 2026"></div>
            </div>
          </div>
        </div>
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Danh mục trang chủ</span><a class="a-card__link">+ Thêm danh mục</a></div>
          <div class="a-card__body" style="padding-top:6px">
            @for (c of homeCats; track c) {
              <div class="a-setting">
                <div style="display:flex;align-items:center;gap:12px;flex:1">
                  <span class="a-thumb" style="width:34px;height:42px"></span>
                  <input class="a-input" [value]="c" style="max-width:260px">
                </div>
                <button class="a-switch" [class.on]="on(c)" (click)="flip(c)"></button>
              </div>
            }
          </div>
        </div>
      }

      @if (tab() === 'header') {
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Thanh khuyến mãi</span></div>
          <div class="a-card__body">
            <div class="a-setting"><div><div class="a-setting__title">Hiển thị thanh khuyến mãi</div><div class="a-setting__desc">Dòng chữ chạy phía trên header.</div></div><button class="a-switch" [class.on]="on('promo')" (click)="flip('promo')"></button></div>
            <div class="a-field" style="margin-top:14px"><label class="a-label">Nội dung</label><input class="a-input" value="Miễn phí giao hàng cho đơn từ 499K · Đổi trả trong 30 ngày"></div>
          </div>
        </div>
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Menu điều hướng</span><a class="a-card__link">+ Thêm mục</a></div>
          <div class="a-card__body" style="padding-top:6px">
            @for (l of headerLinks; track l) {
              <div class="a-setting">
                <input class="a-input" [value]="l" style="max-width:260px">
                <button class="a-switch" [class.on]="on(l)" (click)="flip(l)"></button>
              </div>
            }
          </div>
        </div>
      }

      @if (tab() === 'footer') {
        <div class="a-cols-2">
          @for (col of footerCols; track col.title) {
            <div class="a-card">
              <div class="a-card__head"><span class="a-card__title">{{ col.title }}</span></div>
              <div class="a-card__body" style="padding-top:6px">
                @for (item of col.items; track item) {
                  <div class="a-setting"><span class="a-setting__title" style="font-weight:500">{{ item }}</span><button class="a-switch" [class.on]="on(col.title + item)" (click)="flip(col.title + item)"></button></div>
                }
              </div>
            </div>
          }
        </div>
        <div class="a-card">
          <div class="a-card__body">
            <div class="a-setting"><div><div class="a-setting__title">Hiển thị biểu tượng thanh toán</div><div class="a-setting__desc">VISA, Mastercard, MoMo, VNPay, COD ở chân trang.</div></div><button class="a-switch" [class.on]="on('pay')" (click)="flip('pay')"></button></div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminAppearanceComponent {
  readonly tab = signal<'home' | 'header' | 'footer'>('home');
  readonly homeCats = ['Nữ', 'Nam', 'Trẻ em', 'Phụ kiện'];
  readonly headerLinks = ['Nữ', 'Nam', 'Trẻ em', 'Nhà cửa', 'Bộ sưu tập', 'Sale'];
  readonly footerCols = [
    { title: 'Mua sắm', items: ['Nữ', 'Nam', 'Trẻ em', 'Phụ kiện', 'Hàng mới về'] },
    { title: 'Hỗ trợ', items: ['Theo dõi đơn hàng', 'Đổi trả', 'Hướng dẫn chọn size', 'Vận chuyển', 'Liên hệ'] },
    { title: 'Về chúng tôi', items: ['Câu chuyện', 'Bền vững', 'Cửa hàng', 'Tuyển dụng'] },
    { title: 'Tài khoản', items: ['Đăng nhập', 'Đăng ký', 'Thành viên', 'Ưu đãi của tôi'] },
  ];

  private readonly off = signal<Record<string, boolean>>({});
  on(key: string): boolean { return !this.off()[key]; }
  flip(key: string): void { this.off.update((m) => ({ ...m, [key]: !m[key] })); }
}
