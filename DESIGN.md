# DESIGN.md — Hệ thống thiết kế Maison

Tài liệu này mô tả các **design token** và quy ước style của storefront, kèm hướng dẫn **custom**. Toàn bộ giao diện được điều khiển bằng **CSS custom properties** (biến CSS) khai báo ở `:root`, nên hầu hết việc tuỳ biến chỉ cần sửa giá trị token — không phải đụng vào component.

> Phong cách: tối giản kiểu editorial, action color gần-đen, nền trung tính, typography hệ thống. Đây là thiết kế gốc, không sao chép thương hiệu nào.

---

## 1. Cấu trúc file CSS

| File | Vai trò |
|---|---|
| `src/styles.css` | Điểm vào: `@import` 3 file dưới + style cho placeholder ảnh, thông báo lỗi form, tiện ích Tweaks. |
| `src/styles/storefront.css` | **Tokens (`:root`)** + reset + header/footer/nav/mega menu, hero, lưới sản phẩm, product card, drawer giỏ hàng. |
| `src/styles/pages.css` | Trang PLP, PDP, giỏ hàng, thanh toán, tài khoản, tìm kiếm. |
| `src/styles/content.css` | Trang nội dung: hero phụ, prose, value-grid, cửa hàng, size table, tiers, voucher. |

Tất cả khai báo là global (không scoped) nên sửa một chỗ là áp dụng toàn site.

---

## 2. Design tokens

Khai báo tại đầu `src/styles/storefront.css` trong khối `:root`. Sửa giá trị tại đây để đổi toàn cục.

### 2.1 Màu sắc

| Token | Giá trị hiện tại | Dùng cho |
|---|---|---|
| `--color-heading` | `#1d1d1f` | Tiêu đề |
| `--color-label` | `rgba(0,0,0,.80)` | Nhãn, text đậm |
| `--color-body` | `rgba(0,0,0,.56)` | Nội dung thường |
| `--color-muted` | `rgba(0,0,0,.48)` | Text phụ, chú thích |
| `--color-bg` | `#ffffff` | Nền chính |
| `--color-surface` | `#f5f5f5` | Nền vùng phụ (footer, ô) |
| `--color-surface-sunken` | `#ededed` | Nền lõm / placeholder ảnh |
| `--color-border` | `#e2e2e2` | Viền nhạt |
| `--color-border-strong` | `#1d1d1f` | Viền đậm |
| `--color-ink` | `#1a1a1a` | **Action color** (nút, link nhấn, trạng thái active) |
| `--color-ink-hover` | `#000000` | Action color khi hover |
| `--color-sale` | `#c8102e` | Giá sale, lỗi form, badge sale |
| `--color-success` | `#248a3d` | Trạng thái thành công |

> `--color-ink` và `--color-ink-hover` cũng bị **Tweaks panel** ghi đè lúc chạy (xem mục 6).

### 2.2 Typography

| Token | Giá trị | Ghi chú |
|---|---|---|
| `--font-sans` | system stack (ui-sans-serif, system-ui, Segoe UI, Roboto…) | Font chính toàn site |
| `--tracking-uppercase` | `0.12em` | Giãn chữ cho text in hoa |
| `--tracking-wide` | `0.04em` | Giãn chữ nhẹ |

Không dùng font ngoài (không tải Google Fonts) → tải nhanh, không phụ thuộc mạng.

### 2.3 Spacing (thang 4px)

`--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` · `--space-5: 20px` · `--space-6: 24px` · `--space-8: 32px` · `--space-10: 40px` · `--space-12: 48px` · `--space-16: 64px` · `--space-20: 80px`

### 2.4 Layout & hiệu ứng

| Token | Giá trị | Ghi chú |
|---|---|---|
| `--maxw` | `1600px` | Bề rộng tối đa của `.wrap` |
| `--header-h` | `64px` | Chiều cao header |
| `--topbar-h` | `34px` | Chiều cao thanh khuyến mãi |
| `--btn-radius` | (Tweaks set, mặc định `0`) | Bo góc nút |
| `--shadow-drawer` | `-8px 0 40px rgba(0,0,0,.12)` | Bóng drawer giỏ hàng |
| `--shadow-mega` | `0 16px 40px rgba(0,0,0,.08)` | Bóng mega menu |

---

## 3. Component & class chính

| Thành phần | Class | File |
|---|---|---|
| Nút | `.btn`, `.btn--light`, `.btn--ghost` | storefront.css |
| Bố cục trang | `.wrap` (canh giữa, max `--maxw`), `.section`, `.section--tight` | storefront.css |
| Product card | `.product`, `.product__media`, `.product__badge`, `.product__price` (`.now`, `.was`, `.is-sale`), `.product__swatches .swatch` | storefront.css |
| Lưới / carousel | `.grid`, `.carousel`, `.carousel__track`, `.carousel__nav` | storefront.css |
| Form | `.field`, `.field-row`, `.field-row-3`; lỗi: `.field-err` | pages.css / styles.css |
| Trạng thái active | quy ước class `.is-active` (tab, filter, option…) | nhiều file |
| Placeholder ảnh | phần tử `<image-slot>` + `.img-ph__label` | styles.css |

---

## 4. Responsive breakpoints

Thiết kế desktop-first, các mốc max-width:

| Breakpoint | Thay đổi chính |
|---|---|
| `1100px` | Lưới sản phẩm 4→2 cột; PDP về 1 cột |
| `900px` | PLP/giỏ/thanh toán/tài khoản về 1 cột; TOC nằm ngang |
| `760px` | Ẩn nav desktop, hiện hamburger + mobile menu; gallery PDP xếp dọc |
| `600px` | Form field-row về 1 cột; size table thu nhỏ chữ |

---

## 5. Custom nhanh (tĩnh — sửa code)

**Đổi action color toàn site** → sửa `--color-ink` / `--color-ink-hover` trong `:root` (`storefront.css`). Mọi nút, link nhấn, trạng thái active đổi theo.

```css
:root {
  --color-ink: #2a3b5e;        /* ví dụ: navy */
  --color-ink-hover: #1f2d47;
}
```

**Đổi font** → sửa `--font-sans`. Nếu dùng Google Fonts: thêm `<link>` vào `src/index.html` rồi đặt tên font đầu danh sách:

```css
--font-sans: "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif;
```

**Bo góc nút mặc định** → đổi `--btn-radius` (hoặc tắt Tweaks ghi đè, xem mục 6).

**Đổi bảng màu swatch của product card** → sửa mảng `swatchSets` trong `src/app/services/product.service.ts`.

**Đổi danh sách sản phẩm** → sửa mảng `catalog` cũng trong `product.service.ts`.

**Thay placeholder bằng ảnh thật** → trong `src/app/components/image-slot/image-slot.component.ts`, đổi template sang `<img>`:

```ts
template: `<img [src]="src" [alt]="placeholder" style="width:100%;height:100%;object-fit:cover">`,
```
rồi thêm `@Input() src` và truyền ảnh ở nơi dùng. CSS canh kích thước (`image-slot { … }`) vẫn giữ nguyên.

---

## 6. Custom lúc chạy — Tweaks panel

Nút bánh răng góc dưới-phải mở **Tweaks** (`src/app/components/tweaks/tweaks.component.ts`). Cho phép đổi **không cần build**:

- **Màu nhấn** → ghi đè `--color-ink` / `--color-ink-hover`.
- **Kiểu chữ** → ghi đè `--font-sans` (5 font: Hệ thống / Be Vietnam Pro / Manrope / Playfair Display / Lora — 4 font ngoài tải qua Google Fonts trong `src/index.html`).
- **Bo góc nút** → ghi đè `--btn-radius` (Vuông / Bo nhẹ / Bo tròn).
- **Thanh khuyến mãi** → bật/tắt `.topbar` (class `tw-no-promo` trên `<body>`).

Lựa chọn lưu ở `localStorage` key `maison_tweaks`. Muốn thêm option (vd. thêm màu nhấn), sửa mảng `ACCENTS` / `FONTS` / `RADII` trong `tweaks.component.ts`. Muốn **bật/tắt** panel: đổi hằng `TWEAKS_ENABLED` (đầu `tweaks.component.ts`) thành `true`/`false` — layout đã bọc `<app-tweaks>` bằng `@if (tweaksEnabled)`.

---

## 7. Mở rộng gợi ý

- **Thêm accent color thứ 2**: định nghĩa token mới (vd. `--color-accent`) trong `:root`, dùng `oklch()` cùng lightness/chroma với `--color-ink`, chỉ đổi hue — để giữ hoà sắc.
- **Tách CSS theo component**: chuyển từng khối từ file global vào `styles: […]` của component tương ứng (Angular tự scope). Hiện để global cho gần với bản gốc và dễ chỉnh tổng thể.
- **Đổi spacing tổng thể**: chỉnh thang `--space-*` (vd. tăng đều để site “thoáng” hơn).

---

## 8. Trang quản trị (admin.css)

Trang quản trị có **bộ token riêng**, khai báo trong `src/styles/admin.css` dưới `.admin-shell, .admin-auth` (light) và `.theme-dark` (dark). Không ảnh hưởng storefront vì được scope dưới các class này.

| Token | Light | Dark | Dùng cho |
|---|---|---|---|
| `--admin-accent` | `#2a3b5e` | `#8aa0d6` | Màu nhấn (nav active, nút chính, link, chart) |
| `--admin-accent-soft` | `#eef1f7` | `#20283a` | Nền nhạt của trạng thái active |
| `--a-bg` | `#f5f6f8` | `#0f1012` | Nền nội dung |
| `--a-card` | `#ffffff` | `#1a1b1f` | Nền thẻ / sidebar input |
| `--a-sidebar` | `#ffffff` | `#151619` | Nền sidebar |
| `--a-border` / `--a-border-soft` | `#e6e6e9` / `#efeff1` | `#2a2b31` / `#232429` | Viền |
| `--a-text` / `--a-muted` / `--a-heading` | (tối) | (sáng) | Chữ |
| `--a-sale` / `--a-success` / `--a-warning` | đỏ / xanh / cam | bản sáng hơn | Trạng thái |

**Đổi màu nhấn admin** → sửa `--admin-accent` (+ `--admin-accent-soft`, `--admin-accent-hover`) ở cả khối light và `.theme-dark`. Ví dụ chuyển sang rêu `#3d5240`.

**Light/dark** điều khiển bởi `AdminThemeService` (`src/app/admin/services/admin-theme.service.ts`): signal `dark`, nút chuyển ở topbar, lưu `localStorage` key `maison_admin_theme`. Layout gắn class `theme-dark` lên `.admin-shell`.

**Component admin chính** (class trong `admin.css`): `.a-card`, `.kpi`, `.a-table` + `.a-pill.is-*` (trạng thái), `.a-btn` (`--ghost`/`--danger`/`--sm`), `.a-input`/`.a-select`/`.a-textarea`, `.a-switch`, `.a-tabs`/`.a-tab`, `.a-timeline`, `.a-chart` (placeholder biểu đồ — cắm thư viện chart vào đây sau).
