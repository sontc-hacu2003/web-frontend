import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-track-order',
  template: `
    <section class="page-hero">
      <span class="eyebrow">Hỗ trợ</span>
      <h1>Theo dõi đơn hàng</h1>
      <p>Nhập mã đơn hàng để xem trạng thái giao hàng theo thời gian thực.</p>
    </section>

    <div class="wrap" style="padding:48px 0 80px;">
      <div class="track-box">
        <div class="track-form">
          <input type="text" [value]="input()" (input)="input.set($any($event.target).value)" placeholder="Ví dụ: MS-20418">
          <button class="btn" type="button" (click)="track()">Tra cứu</button>
        </div>
      </div>

      @if (shown()) {
        <div class="track-result" style="display:block">
          <div class="track-head">
            <div><div class="th-id">Đơn #{{ orderId() }}</div><div class="th-meta">Đặt ngày 28/05/2026 · 2 sản phẩm · Giao nhanh</div></div>
            <span class="order-status shipping">Đang giao</span>
          </div>
          <div class="timeline">
            <div class="tl-step done"><div class="tl-title">Đã đặt hàng</div><div class="tl-time">28/05/2026, 09:12</div></div>
            <div class="tl-step done"><div class="tl-title">Đã xác nhận &amp; đóng gói</div><div class="tl-time">28/05/2026, 14:40</div></div>
            <div class="tl-step done"><div class="tl-title">Đã giao cho đơn vị vận chuyển</div><div class="tl-time">29/05/2026, 08:05</div></div>
            <div class="tl-step current"><div class="tl-title">Đang giao đến bạn</div><div class="tl-time">Dự kiến 30/05/2026</div></div>
            <div class="tl-step"><div class="tl-title">Giao thành công</div><div class="tl-time">—</div></div>
          </div>
        </div>
      }
    </div>
  `,
})
export class TrackOrderComponent {
  readonly input = signal('MS-20418');
  readonly orderId = signal('MS-20418');
  readonly shown = signal(true);

  track(): void {
    const v = this.input().trim();
    if (!v) { this.shown.set(false); return; }
    this.orderId.set(v.toUpperCase());
    this.shown.set(true);
  }
}
