import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, email, submit } from '@angular/forms/signals';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <span class="eyebrow">Hỗ trợ</span>
      <h1>Liên hệ với chúng tôi</h1>
      <p>Đội ngũ chăm sóc khách hàng của Maison sẵn sàng hỗ trợ bạn từ 8:00–22:00 mỗi ngày.</p>
    </section>

    <div class="wrap">
      <div class="contact">
        <form class="contact-form" (submit)="$event.preventDefault(); send()">
          <div class="field-row">
            <div class="field">
              <label>Họ và tên</label>
              <input type="text" [formField]="contactForm.name" placeholder="Nguyễn An">
              @if (contactForm.name().touched() && contactForm.name().invalid()) {
                <p class="field-err">{{ contactForm.name().errors()[0]?.message }}</p>
              }
            </div>
            <div class="field">
              <label>Email</label>
              <input type="email" [formField]="contactForm.email" placeholder="ban@email.com">
              @if (contactForm.email().touched() && contactForm.email().invalid()) {
                <p class="field-err">{{ contactForm.email().errors()[0]?.message }}</p>
              }
            </div>
          </div>
          <div class="field-row">
            <div class="field"><label>Số điện thoại</label><input type="tel" [formField]="contactForm.phone" placeholder="09xx xxx xxx"></div>
            <div class="field"><label>Chủ đề</label>
              <select [formField]="contactForm.subject"><option>Đơn hàng &amp; vận chuyển</option><option>Đổi trả &amp; hoàn tiền</option><option>Sản phẩm</option><option>Hợp tác</option><option>Khác</option></select>
            </div>
          </div>
          <div class="field">
            <label>Nội dung</label>
            <textarea [formField]="contactForm.message" placeholder="Bạn cần chúng tôi hỗ trợ điều gì?"></textarea>
            @if (contactForm.message().touched() && contactForm.message().invalid()) {
              <p class="field-err">{{ contactForm.message().errors()[0]?.message }}</p>
            }
          </div>
          <button class="btn" type="submit"
                  [style.background]="sent() ? 'var(--color-success)' : ''"
                  [style.borderColor]="sent() ? 'var(--color-success)' : ''">{{ sent() ? 'Đã gửi ✓' : 'Gửi tin nhắn' }}</button>
        </form>

        <aside class="contact-info">
          <h3>Thông tin liên hệ</h3>
          <div class="contact-item"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><div><div class="ci-label">Hotline</div><div class="ci-val">1900 1234</div></div></div>
          <div class="contact-item"><svg viewBox="0 0 24 24" stroke-width="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg><div><div class="ci-label">Email</div><div class="ci-val">hotro&#64;maison.vn</div></div></div>
          <div class="contact-item"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><div><div class="ci-label">Trụ sở</div><div class="ci-val">123 Lê Lợi, Quận 1, TP.HCM</div></div></div>
          <div class="contact-item"><svg viewBox="0 0 24 24" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg><div><div class="ci-label">Giờ làm việc</div><div class="ci-val">8:00 – 22:00 (T2–CN)</div></div></div>
        </aside>
      </div>
    </div>
  `,
})
export class ContactComponent {
  readonly sent = signal(false);

  readonly contactModel = signal<ContactData>({
    name: '', email: '', phone: '', subject: 'Đơn hàng & vận chuyển', message: '',
  });
  readonly contactForm = form(this.contactModel, (path) => {
    required(path.name, { message: 'Vui lòng nhập họ tên' });
    required(path.email, { message: 'Vui lòng nhập email' });
    email(path.email, { message: 'Email không hợp lệ' });
    required(path.message, { message: 'Vui lòng nhập nội dung' });
  });

  async send(): Promise<void> {
    await submit(this.contactForm, {
      action: async () => { this.sent.set(true); return undefined; },
    });
  }
}
