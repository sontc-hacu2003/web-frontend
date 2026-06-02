import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-returns',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <span class="eyebrow">Hỗ trợ</span>
      <h1>Đổi trả &amp; hoàn tiền</h1>
      <p>Đổi trả miễn phí trong vòng 30 ngày. Đơn giản, nhanh chóng, không rườm rà.</p>
    </section>

    <div class="wrap">
      <div class="doc">
        <nav class="toc">
          <h4>Nội dung</h4>
          <a href="#chinh-sach">Chính sách</a>
          <a href="#dieu-kien">Điều kiện đổi trả</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#hoan-tien">Hoàn tiền</a>
        </nav>
        <article class="prose" style="padding-top:0">
          <h2 id="chinh-sach">Chính sách đổi trả</h2>
          <p>Bạn có thể đổi hoặc trả sản phẩm trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng. Phí vận chuyển đổi trả lần đầu được Maison chi trả hoàn toàn.</p>
          <h2 id="dieu-kien">Điều kiện đổi trả</h2>
          <ul>
            <li>Sản phẩm còn nguyên tem, mác và chưa qua sử dụng</li>
            <li>Còn đầy đủ bao bì, phụ kiện đi kèm</li>
            <li>Có hoá đơn hoặc mã đơn hàng</li>
            <li>Không áp dụng với đồ lót, đồ bơi và sản phẩm khuyến mãi cuối mùa</li>
          </ul>
          <h2 id="quy-trinh">Quy trình đổi trả</h2>
          <p>Truy cập mục <a class="inline" routerLink="/theo-doi-don">Theo dõi đơn hàng</a> → chọn đơn cần đổi trả → chọn lý do → in nhãn vận chuyển. Bạn cũng có thể mang trực tiếp đến bất kỳ <a class="inline" routerLink="/cua-hang">cửa hàng Maison</a> nào.</p>
          <h2 id="hoan-tien">Thời gian hoàn tiền</h2>
          <p>Sau khi nhận và kiểm tra hàng, chúng tôi hoàn tiền trong vòng <strong>3–7 ngày làm việc</strong> về phương thức thanh toán ban đầu. Với thanh toán COD, tiền sẽ được hoàn qua chuyển khoản ngân hàng.</p>
        </article>
      </div>
    </div>
  `,
})
export class ReturnsComponent {}
