import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, email, minLength, submit } from '@angular/forms/signals';

interface LoginData { email: string; password: string; }
interface RegisterData { firstName: string; lastName: string; email: string; password: string; }

@Component({
  selector: 'app-login',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth">
      <div class="auth-card">
        <h1>Tài khoản Maison</h1>
        <p class="auth-sub">Đăng nhập để theo dõi đơn hàng và nhận ưu đãi thành viên.</p>

        <div class="auth-tabs">
          <button [class.is-active]="tab() === 'login'" (click)="tab.set('login')">Đăng nhập</button>
          <button [class.is-active]="tab() === 'register'" (click)="tab.set('register')">Đăng ký</button>
        </div>

        @if (tab() === 'login') {
          <form class="auth-form is-active" (submit)="$event.preventDefault(); doLogin()">
            <div class="field">
              <label>Email</label>
              <input type="email" [formField]="loginForm.email" placeholder="ban@email.com">
              @if (loginForm.email().touched() && loginForm.email().invalid()) {
                <p class="field-err">{{ loginForm.email().errors()[0]?.message }}</p>
              }
            </div>
            <div class="field">
              <label>Mật khẩu</label>
              <input type="password" [formField]="loginForm.password" placeholder="••••••••">
              @if (loginForm.password().touched() && loginForm.password().invalid()) {
                <p class="field-err">{{ loginForm.password().errors()[0]?.message }}</p>
              }
            </div>
            <div class="auth-row">
              <label><input type="checkbox"> Ghi nhớ đăng nhập</label>
              <a href="#">Quên mật khẩu?</a>
            </div>
            <button class="btn" type="submit">Đăng nhập</button>
            <div class="auth-divider">hoặc</div>
            <div class="social-btns">
              <button class="social-btn" type="button"><svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22 12c0-.7-.06-1.4-.18-2H12v3.8h5.6a4.8 4.8 0 0 1-2 3.2v2.6h3.2C20.7 17.8 22 15.2 22 12z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H3.1v2.7A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 13.8a6 6 0 0 1 0-3.6V7.5H3.1a10 10 0 0 0 0 9z"/><path fill="#EA4335" d="M12 6.6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.7C7.2 8 9.4 6.6 12 6.6z"/></svg> Tiếp tục với Google</button>
              <button class="social-btn" type="button"><svg viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg> Tiếp tục với Facebook</button>
            </div>
          </form>
        } @else {
          <form class="auth-form is-active" (submit)="$event.preventDefault(); doRegister()">
            <div class="field-row">
              <div class="field">
                <label>Họ</label>
                <input type="text" [formField]="registerForm.firstName" placeholder="Nguyễn">
                @if (registerForm.firstName().touched() && registerForm.firstName().invalid()) {
                  <p class="field-err">{{ registerForm.firstName().errors()[0]?.message }}</p>
                }
              </div>
              <div class="field">
                <label>Tên</label>
                <input type="text" [formField]="registerForm.lastName" placeholder="An">
                @if (registerForm.lastName().touched() && registerForm.lastName().invalid()) {
                  <p class="field-err">{{ registerForm.lastName().errors()[0]?.message }}</p>
                }
              </div>
            </div>
            <div class="field">
              <label>Email</label>
              <input type="email" [formField]="registerForm.email" placeholder="ban@email.com">
              @if (registerForm.email().touched() && registerForm.email().invalid()) {
                <p class="field-err">{{ registerForm.email().errors()[0]?.message }}</p>
              }
            </div>
            <div class="field">
              <label>Mật khẩu</label>
              <input type="password" [formField]="registerForm.password" placeholder="Tối thiểu 8 ký tự">
              @if (registerForm.password().touched() && registerForm.password().invalid()) {
                <p class="field-err">{{ registerForm.password().errors()[0]?.message }}</p>
              }
            </div>
            <div class="auth-row">
              <label><input type="checkbox"> Tôi đồng ý với <a href="#" style="border:0">Điều khoản</a> &amp; <a href="#" style="border:0">Bảo mật</a></label>
            </div>
            <button class="btn" type="submit">Tạo tài khoản</button>
            <p class="auth-foot">Đăng ký để nhận giảm 10% cho đơn hàng đầu tiên.</p>
          </form>
        }
      </div>
    </div>
  `,
})
export class LoginComponent {
  private router = inject(Router);
  readonly tab = signal<'login' | 'register'>('login');

  readonly loginModel = signal<LoginData>({ email: '', password: '' });
  readonly loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
    required(path.password, { message: 'Vui lòng nhập mật khẩu' });
  });

  readonly registerModel = signal<RegisterData>({ firstName: '', lastName: '', email: '', password: '' });
  readonly registerForm = form(this.registerModel, (path) => {
    required(path.firstName, { message: 'Vui lòng nhập họ' });
    required(path.lastName, { message: 'Vui lòng nhập tên' });
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
    required(path.password, { message: 'Vui lòng nhập mật khẩu' });
    minLength(path.password, 8, { message: 'Mật khẩu tối thiểu 8 ký tự' });
  });

  async doLogin(): Promise<void> {
    await submit(this.loginForm, {
      action: async () => { this.router.navigate(['/tai-khoan']); return undefined; },
    });
  }

  async doRegister(): Promise<void> {
    await submit(this.registerForm, {
      action: async () => { this.router.navigate(['/tai-khoan']); return undefined; },
    });
  }
}
