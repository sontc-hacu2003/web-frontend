import { Component } from '@angular/core';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';

@Component({
  selector: 'app-sustainability',
  imports: [ImageSlotComponent],
  template: `
    <section class="page-hero">
      <span class="eyebrow">Về chúng tôi</span>
      <h1>Cam kết bền vững</h1>
      <p>Thời trang đẹp không nên đánh đổi bằng môi trường. Đây là cách chúng tôi đang hành động.</p>
    </section>

    <div class="media-band wrap"><image-slot placeholder="Ảnh bền vững (rộng)"></image-slot></div>

    <div class="prose">
      <p class="lede">Chúng tôi đặt mục tiêu sử dụng 100% chất liệu bền vững vào năm 2028, và đang đi được hơn nửa chặng đường.</p>
      <h2>Chất liệu có trách nhiệm</h2>
      <ul>
        <li>Cotton hữu cơ được chứng nhận GOTS</li>
        <li>Sợi polyester tái chế từ chai nhựa thu gom</li>
        <li>Linen từ cây lanh canh tác ít nước</li>
        <li>Bao bì giấy tái chế, mực in gốc đậu nành</li>
      </ul>
      <h2>Sản xuất minh bạch</h2>
      <p>Toàn bộ xưởng may đối tác đều được kiểm định điều kiện lao động và trả lương công bằng. Chúng tôi công bố danh sách xưởng và tỷ lệ chất liệu bền vững trên từng nhãn sản phẩm.</p>
      <h2>Vòng đời sản phẩm</h2>
      <p>Chương trình thu hồi quần áo cũ giúp tái chế hoặc quyên góp, giảm rác thải dệt may. Mang 5 món đồ cũ đến cửa hàng để nhận voucher cho lần mua kế tiếp.</p>
    </div>

    <div class="value-grid">
      <div><div class="v-num">68%</div><h3>Chất liệu bền vững</h3><p>Tỷ lệ trong bộ sưu tập hiện tại, tăng đều mỗi mùa.</p></div>
      <div><div class="v-num">100%</div><h3>Bao bì tái chế</h3><p>Toàn bộ hộp và túi đóng gói đã chuyển sang vật liệu tái chế.</p></div>
      <div><div class="v-num">12T</div><h3>Quần áo thu hồi</h3><p>Số lượng (tấn) được tái chế qua chương trình thu hồi năm 2025.</p></div>
    </div>
  `,
})
export class SustainabilityComponent {}
