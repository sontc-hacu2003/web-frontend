import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shipping',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <span class="eyebrow">Hỗ trợ</span>
      <h1>Vận chuyển &amp; giao hàng</h1>
      <p>Giao hàng toàn quốc, miễn phí cho đơn từ 499K. Theo dõi đơn hàng theo thời gian thực.</p>
    </section>

    <div class="wrap">
      <div class="doc">
        <nav class="toc">
          <h4>Nội dung</h4>
          <a href="#phuong-thuc">Phương thức</a>
          <a href="#phi">Phí vận chuyển</a>
          <a href="#thoi-gian">Thời gian giao</a>
          <a href="#theo-doi">Theo dõi đơn</a>
        </nav>
        <article class="prose" style="padding-top:0">
          <h2 id="phuong-thuc">Phương thức giao hàng</h2>
          <p>Maison hợp tác với các đơn vị vận chuyển uy tín để giao hàng đến 63 tỉnh thành. Bạn có thể chọn giao tiêu chuẩn, giao nhanh hoặc hoả tốc (nội thành) khi thanh toán.</p>
          <h2 id="phi">Phí vận chuyển</h2>
          <table class="size-table is-active" style="margin:8px 0 16px">
            <thead><tr><th>Phương thức</th><th>Thời gian</th><th>Phí</th></tr></thead>
            <tbody>
              <tr><td>Tiêu chuẩn</td><td>2–4 ngày</td><td>Miễn phí từ 499K, dưới đó 30.000₫</td></tr>
              <tr><td>Nhanh</td><td>1–2 ngày</td><td>35.000₫</td></tr>
              <tr><td>Hoả tốc (nội thành)</td><td>Trong 4 giờ</td><td>60.000₫</td></tr>
            </tbody>
          </table>
          <h2 id="thoi-gian">Thời gian xử lý</h2>
          <p>Đơn hàng đặt trước 14:00 sẽ được xử lý trong ngày. Đơn đặt cuối tuần hoặc ngày lễ sẽ xử lý vào ngày làm việc kế tiếp.</p>
          <h2 id="theo-doi">Theo dõi đơn hàng</h2>
          <p>Sau khi đơn được giao cho đơn vị vận chuyển, bạn sẽ nhận mã vận đơn qua email và SMS. Tra cứu bất cứ lúc nào tại <a class="inline" routerLink="/theo-doi-don">Theo dõi đơn hàng</a>.</p>
        </article>
      </div>
    </div>
  `,
})
export class ShippingComponent {}
