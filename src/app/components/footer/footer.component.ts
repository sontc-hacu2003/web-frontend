import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageSlotComponent } from '../image-slot/image-slot.component';

/** Service strip + footer (ported from scripts/chrome.js footerHTML). */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, ImageSlotComponent],
  template: `
    <div class="wrap"><div class="services">
      <div class="service"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h13v10H3zM16 10h4l1 3v4h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg><h5>Giao hàng nhanh</h5><p>Miễn phí cho đơn từ 499K</p></div>
      <div class="service"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12a9 9 0 1 0 9-9"/><polyline points="3 4 3 12 11 12"/></svg><h5>Đổi trả 30 ngày</h5><p>Hoàn tiền dễ dàng</p></div>
      <div class="service"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg><h5>Thanh toán an toàn</h5><p>Đa dạng phương thức</p></div>
      <div class="service"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><h5>Hỗ trợ 24/7</h5><p>Luôn sẵn sàng giúp bạn</p></div>
    </div></div>

    <footer class="footer"><div class="wrap"><div class="footer__cols">
      <div class="footer__brand"><image-slot fit="contain" placeholder="Logo"></image-slot>
        <p>Thời trang cơ bản, chất lượng, dành cho mọi ngày.</p>
        <div class="footer__social">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1.3-3 3v2H8v3h3v6h3v-6h2.5l.5-3H14v-2c0-.6.4-1 1-1z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4c.5 2 2 3.3 4 3.5v3c-1.5 0-3-.5-4-1.3V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V4z"/></svg></a>
        </div>
      </div>
      <div class="footer__col"><h5>Mua sắm</h5><ul><li><a routerLink="/danh-muc">Nữ</a></li><li><a routerLink="/danh-muc">Nam</a></li><li><a routerLink="/danh-muc">Trẻ em</a></li><li><a routerLink="/danh-muc">Phụ kiện</a></li><li><a routerLink="/danh-muc">Hàng mới về</a></li></ul></div>
      <div class="footer__col"><h5>Hỗ trợ</h5><ul><li><a routerLink="/theo-doi-don">Theo dõi đơn hàng</a></li><li><a routerLink="/doi-tra">Đổi trả</a></li><li><a routerLink="/huong-dan-size">Hướng dẫn chọn size</a></li><li><a routerLink="/van-chuyen">Vận chuyển</a></li><li><a routerLink="/lien-he">Liên hệ</a></li></ul></div>
      <div class="footer__col"><h5>Về chúng tôi</h5><ul><li><a routerLink="/cau-chuyen">Câu chuyện</a></li><li><a routerLink="/ben-vung">Bền vững</a></li><li><a routerLink="/cua-hang">Cửa hàng</a></li><li><a routerLink="/tuyen-dung">Tuyển dụng</a></li></ul></div>
      <div class="footer__col"><h5>Tài khoản</h5><ul><li><a routerLink="/dang-nhap">Đăng nhập</a></li><li><a routerLink="/dang-nhap">Đăng ký</a></li><li><a routerLink="/thanh-vien">Thành viên</a></li><li><a routerLink="/uu-dai">Ưu đãi của tôi</a></li><li><a routerLink="/admin">Quản trị</a></li></ul></div>
    </div>
    <div class="footer__bottom"><span>© 2026 Maison. Tất cả các quyền được bảo lưu.</span>
      <div class="footer__pay"><span>VISA</span><span>MC</span><span>MOMO</span><span>VNPAY</span><span>COD</span></div>
    </div></div></footer>
  `,
})
export class FooterComponent {}
