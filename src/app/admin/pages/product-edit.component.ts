import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { AdminDataService, ProductStatus } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-product-edit',
  imports: [RouterLink, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="a-content">
      <div class="a-page-head">
        <div>
          <a class="a-card__link" routerLink="/admin/san-pham">← Quay lại danh sách</a>
          <h1 style="margin-top:6px">{{ isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}</h1>
          <p>{{ isEdit ? editing?.id : 'Tạo sản phẩm mới cho cửa hàng.' }}</p>
        </div>
      </div>

      <div class="a-cols-2">
        <div class="a-card">
          <div class="a-card__head"><span class="a-card__title">Thông tin sản phẩm</span></div>
          <div class="a-card__body">
            <form class="a-form-grid" (submit)="$event.preventDefault(); save()">
              <div class="a-field a-field--full">
                <label class="a-label">Tên sản phẩm</label>
                <input class="a-input" [formField]="pForm.name" placeholder="VD: Áo thun cotton organic">
                @if (pForm.name().touched() && pForm.name().invalid()) {
                  <p class="field-err">{{ pForm.name().errors()[0]?.message }}</p>
                }
              </div>
              <div class="a-field">
                <label class="a-label">Danh mục</label>
                <select class="a-select" [formField]="pForm.cat">
                  @for (c of cats; track c) { <option>{{ c }}</option> }
                </select>
              </div>
              <div class="a-field">
                <label class="a-label">Trạng thái</label>
                <select class="a-select" [formField]="pForm.status">
                  <option value="active">Đang bán</option>
                  <option value="draft">Nháp</option>
                  <option value="out">Hết hàng</option>
                </select>
              </div>
              <div class="a-field">
                <label class="a-label">Giá (₫)</label>
                <input class="a-input" type="number" [formField]="pForm.price" placeholder="299000">
              </div>
              <div class="a-field">
                <label class="a-label">Tồn kho</label>
                <input class="a-input" type="number" [formField]="pForm.stock" placeholder="0">
              </div>
              <div class="a-field a-field--full">
                <label class="a-label">Mô tả</label>
                <textarea class="a-textarea" [formField]="pForm.description" placeholder="Mô tả chất liệu, phom dáng, hướng dẫn bảo quản…"></textarea>
              </div>
              <div class="a-field--full" style="display:flex;gap:10px">
                <button class="a-btn" type="submit">{{ saved() ? 'Đã lưu ✓' : 'Lưu sản phẩm' }}</button>
                <a class="a-btn a-btn--ghost" routerLink="/admin/san-pham">Huỷ</a>
              </div>
            </form>
          </div>
        </div>

        <div class="a-card" style="align-self:start">
          <div class="a-card__head"><span class="a-card__title">Hình ảnh</span></div>
          <div class="a-card__body">
            <div class="a-chart a-chart--sm"><span class="a-chart__label">[ Kéo-thả ảnh sản phẩm ]<br>điền sau</span></div>
            <p class="a-field__hint" style="margin-top:12px">Khuyến nghị 1200×1500px, định dạng JPG/PNG/WebP.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminProductEditComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private data = inject(AdminDataService);

  readonly cats = ['Áo', 'Đầm', 'Quần', 'Chân váy', 'Áo khoác', 'Phụ kiện'];
  readonly editing = this.data.findProduct(this.route.snapshot.paramMap.get('id') ?? '');
  readonly isEdit = !!this.editing;
  readonly saved = signal(false);

  readonly model = signal({
    name: this.editing?.name ?? '',
    cat: this.editing?.cat ?? 'Áo',
    price: this.editing?.price ?? 0,
    stock: this.editing?.stock ?? 0,
    status: (this.editing?.status ?? 'draft') as ProductStatus,
    description: '',
  });
  readonly pForm = form(this.model, (path) => {
    required(path.name, { message: 'Vui lòng nhập tên sản phẩm' });
    required(path.cat, { message: 'Chọn danh mục' });
  });

  async save(): Promise<void> {
    await submit(this.pForm, {
      action: async () => {
        this.saved.set(true);
        setTimeout(() => this.router.navigate(['/admin/san-pham']), 600);
        return undefined;
      },
    });
  }
}
