import { Component, inject, signal } from '@angular/core';
import { AdminThemeService } from '../services/admin-theme.service';

@Component({
  selector: 'app-admin-settings',
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div><h1>Cài đặt</h1><p>Cấu hình chung của cửa hàng Maison.</p></div>
        <div class="a-page-actions"><button class="a-btn">{{ saved() ? 'Đã lưu ✓' : 'Lưu thay đổi' }}</button></div>
      </div>

      <div class="a-cols-2">
        <div style="display:flex;flex-direction:column;gap:18px">
          <div class="a-card">
            <div class="a-card__head"><span class="a-card__title">Thông tin cửa hàng</span></div>
            <div class="a-card__body">
              <div class="a-form-grid">
                <div class="a-field a-field--full"><label class="a-label">Tên cửa hàng</label><input class="a-input" value="Maison"></div>
                <div class="a-field"><label class="a-label">Email</label><input class="a-input" type="email" value="hotro@maison.vn"></div>
                <div class="a-field"><label class="a-label">Hotline</label><input class="a-input" value="1900 1234"></div>
                <div class="a-field"><label class="a-label">Tiền tệ</label><select class="a-select"><option>VND (₫)</option><option>USD ($)</option></select></div>
                <div class="a-field"><label class="a-label">Ngôn ngữ</label><select class="a-select"><option>Tiếng Việt</option><option>English</option></select></div>
              </div>
            </div>
          </div>

          <div class="a-card">
            <div class="a-card__head"><span class="a-card__title">Phương thức thanh toán</span></div>
            <div class="a-card__body" style="padding-top:6px">
              @for (m of payments; track m) {
                <div class="a-setting"><span class="a-setting__title" style="font-weight:500">{{ m }}</span><button class="a-switch" [class.on]="on(m)" (click)="flip(m)"></button></div>
              }
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px">
          <div class="a-card">
            <div class="a-card__head"><span class="a-card__title">Bán hàng</span></div>
            <div class="a-card__body" style="padding-top:6px">
              <div class="a-setting"><div><div class="a-setting__title">Giảm 10% cho thành viên</div><div class="a-setting__desc">Tự động áp dụng khi khách đăng nhập.</div></div><button class="a-switch" [class.on]="on('member')" (click)="flip('member')"></button></div>
              <div class="a-setting"><div><div class="a-setting__title">Miễn phí giao từ 499K</div><div class="a-setting__desc">Ngưỡng miễn phí vận chuyển tiêu chuẩn.</div></div><button class="a-switch" [class.on]="on('freeship')" (click)="flip('freeship')"></button></div>
              <div class="a-setting"><div><div class="a-setting__title">Cho phép đặt khi hết hàng</div><div class="a-setting__desc">Khách vẫn đặt được sản phẩm tồn kho 0.</div></div><button class="a-switch" [class.on]="on('backorder')" (click)="flip('backorder')"></button></div>
            </div>
          </div>

          <div class="a-card">
            <div class="a-card__head"><span class="a-card__title">Giao diện admin</span></div>
            <div class="a-card__body">
              <div class="a-setting"><div><div class="a-setting__title">Chế độ tối</div><div class="a-setting__desc">Áp dụng cho toàn bộ trang quản trị.</div></div><button class="a-switch" [class.on]="theme.dark()" (click)="theme.toggle()"></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminSettingsComponent {
  theme = inject(AdminThemeService);
  readonly saved = signal(false);
  readonly payments = ['Thẻ tín dụng / ghi nợ', 'Ví MoMo', 'VNPay', 'Thanh toán khi nhận hàng (COD)'];

  private readonly off = signal<Record<string, boolean>>({ backorder: true });
  on(key: string): boolean { return !this.off()[key]; }
  flip(key: string): void { this.off.update((m) => ({ ...m, [key]: !m[key] })); }
}
