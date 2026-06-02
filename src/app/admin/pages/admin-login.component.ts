import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { AdminThemeService } from '../services/admin-theme.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-auth" [class.theme-dark]="theme.dark()">
      <div class="admin-auth__card">
        <div class="admin-auth__brand">
          <span class="a-brand__mark">M</span>
          <span><span class="a-brand__name" style="font-size:17px;font-weight:700">Maison</span><div class="a-brand__tag">Admin</div></span>
        </div>
        <h1>Đăng nhập quản trị</h1>
        <p class="sub">Truy cập bảng điều khiển cửa hàng Maison.</p>

        <form (submit)="$event.preventDefault(); login()">
          <div class="a-field">
            <label class="a-label">Email</label>
            <input class="a-input" type="email" [formField]="loginForm.email" placeholder="admin@maison.vn">
            @if (loginForm.email().touched() && loginForm.email().invalid()) {
              <p class="field-err">{{ loginForm.email().errors()[0]?.message }}</p>
            }
          </div>
          <div class="a-field">
            <label class="a-label">Mật khẩu</label>
            <input class="a-input" type="password" [formField]="loginForm.password" placeholder="••••••••">
            @if (loginForm.password().touched() && loginForm.password().invalid()) {
              <p class="field-err">{{ loginForm.password().errors()[0]?.message }}</p>
            }
          </div>
          <button class="a-btn" type="submit">Đăng nhập</button>
        </form>

        <p class="admin-auth__foot">Bản demo — nhập bất kỳ email hợp lệ để vào dashboard.</p>
      </div>
    </div>
  `,
})
export class AdminLoginComponent {
  theme = inject(AdminThemeService);
  private router = inject(Router);

  readonly loginModel = signal({ email: '', password: '' });
  readonly loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
    required(path.password, { message: 'Vui lòng nhập mật khẩu' });
  });

  async login(): Promise<void> {
    await submit(this.loginForm, {
      action: async () => { this.router.navigate(['/admin']); return undefined; },
    });
  }
}
