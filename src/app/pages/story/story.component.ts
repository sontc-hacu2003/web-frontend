import { Component } from '@angular/core';
import { ImageSlotComponent } from '../../components/image-slot/image-slot.component';

@Component({
  selector: 'app-story',
  imports: [ImageSlotComponent],
  template: `
    <section class="page-hero">
      <span class="eyebrow">Về chúng tôi</span>
      <h1>Câu chuyện của Maison</h1>
      <p>Khởi nguồn từ niềm tin rằng thời trang cơ bản, chất lượng nên dành cho tất cả mọi người.</p>
    </section>

    <div class="media-band wrap"><image-slot placeholder="Ảnh thương hiệu (rộng)"></image-slot></div>

    <div class="prose">
      <p class="lede">Maison ra đời năm 2018 tại TP. Hồ Chí Minh với một ý tưởng đơn giản: tạo ra những món đồ mặc hằng ngày được may đo tỉ mỉ, bền đẹp theo năm tháng và có mức giá hợp lý.</p>
      <h2>Chúng tôi tin vào sự tối giản</h2>
      <p>Thay vì chạy theo xu hướng nhất thời, chúng tôi tập trung vào những thiết kế kinh điển — dễ phối, hợp nhiều dáng người và bền với thời gian. Mỗi sản phẩm đều trải qua quá trình thử nghiệm chất liệu và phom dáng kỹ lưỡng trước khi đến tay bạn.</p>
      <h2>Chất lượng đặt lên hàng đầu</h2>
      <p>Chúng tôi làm việc trực tiếp với các xưởng may có chứng nhận, sử dụng cotton hữu cơ, linen và sợi tái chế khi có thể. Việc cắt giảm khâu trung gian giúp chúng tôi mang đến chất lượng cao với giá thành minh bạch.</p>
    </div>

    <div class="value-grid">
      <div><div class="v-num">01</div><h3>Thiết kế bền vững</h3><p>Ưu tiên chất liệu thân thiện môi trường và quy trình sản xuất có trách nhiệm.</p></div>
      <div><div class="v-num">02</div><h3>Giá minh bạch</h3><p>Bạn biết chính xác mình trả tiền cho điều gì — không phụ phí thương hiệu.</p></div>
      <div><div class="v-num">03</div><h3>Phục vụ tận tâm</h3><p>Đổi trả 30 ngày, hỗ trợ 7 ngày/tuần, lắng nghe mọi phản hồi của bạn.</p></div>
    </div>
  `,
})
export class StoryComponent {}
