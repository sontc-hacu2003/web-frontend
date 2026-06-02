# Maison — Angular

Storefront thời trang "Maison" được chuyển từ bộ HTML/CSS/JS tĩnh sang **Angular v21** (standalone components + signals + **zoneless** change detection + Angular Router). Toàn bộ 19 trang gốc đã được port thành một ứng dụng SPA.

## Chạy dự án

Yêu cầu **Node.js v22.22+** (hoặc v24.13+) và TypeScript 5.9 (đã khai trong `devDependencies`).

```bash
npm install
npm start          # = ng serve  →  http://localhost:4200
```

Build production:

```bash
npm run build      # xuất ra dist/maison-angular
```

> Lưu ý: cần `npm install` để tải Angular CLI + dependencies trước khi chạy. Dự án này là **mã nguồn** — không kèm `node_modules`.

## Kiến trúc

- **Standalone components** (mặc định từ Angular 19+, không cần `standalone: true`, không dùng NgModule). Bootstrap tại `src/main.ts` → `src/app/app.config.ts`.
- **Zoneless** — không có zone.js; thay đổi giao diện được điều khiển hoàn toàn bằng **signals** (`provideZonelessChangeDetection()` trong `app.config.ts`).
- **Signals** cho toàn bộ state (giỏ hàng, bộ lọc, tab, tweaks…).
- **Builder** `@angular/build:application` (chuẩn từ Angular 20+).
- **Angular Router** với lazy-load (`loadComponent`) cho từng trang — xem `src/app/app.routes.ts`.
- **CSS toàn cục giữ nguyên** từ bản gốc: `src/styles/{storefront,pages,content}.css`, cộng `src/styles/admin.css` cho trang quản trị — import trong `src/styles.css`.
- **Tách layout**: `StorefrontLayoutComponent` bọc toàn bộ trang công khai (header/footer/drawer/tweaks); `AdminLayoutComponent` bọc trang quản trị (sidebar/topbar). `AppComponent` chỉ còn `<router-outlet>`.

```
src/app/
├─ app.component.ts          # root: chỉ <router-outlet>
├─ storefront-layout.component.ts   # shell storefront
├─ app.config.ts / app.routes.ts
├─ models/product.model.ts   # Product, CartItem
├─ pipes/vnd.pipe.ts         # format tiền VND  ({{ price | vnd }})
├─ services/                 # product / cart / ui (signals)
├─ components/               # header, footer, cart-drawer, mobile-menu, product-card, carousel, image-slot, tweaks
├─ pages/                    # 19 trang storefront
│  ├─ home, plp, pdp, cart, checkout, search
│  ├─ account, login, membership, offers, track-order
│  └─ stores, story, sustainability, careers, contact, returns, shipping, size-guide
└─ admin/                    # trang quản trị (xem phần dưới)
   ├─ admin-layout.component.ts
   ├─ services/  (admin-data, admin-theme)
   └─ pages/     (dashboard, orders, order-detail, products, product-edit, customers, promotions, appearance, settings, admin-login)
```

## Trang quản trị (Maison Admin)

Thiết kế **nguyên bản** (không sao chép template thương mại nào), layout sidebar + topbar riêng, màu nhấn **navy** `#2a3b5e`, có **light/dark** (nút chuyển ở topbar, lưu `localStorage` key `maison_admin_theme`).

Truy cập: `/admin` (dashboard) — hoặc link **Quản trị** ở footer storefront. Trang đăng nhập: `/admin/dang-nhap`.

| Route | Màn hình |
|---|---|
| `/admin` | Dashboard (KPI, biểu đồ placeholder, bán chạy, đơn gần đây) |
| `/admin/don-hang` | Danh sách đơn (lọc theo trạng thái) |
| `/admin/don-hang/:id` | Chi tiết đơn (sản phẩm, tiến trình, khách, thanh toán) |
| `/admin/san-pham` | Danh sách sản phẩm |
| `/admin/san-pham/moi` · `/admin/san-pham/:id` | Thêm / sửa sản phẩm (Signal Forms) |
| `/admin/khach-hang` | Khách hàng |
| `/admin/khuyen-mai` | Mã giảm giá / voucher |
| `/admin/giao-dien` | Nội dung storefront (trang chủ / header / footer) |
| `/admin/cai-dat` | Cấu hình cửa hàng |

Dữ liệu mẫu trong `src/app/admin/services/admin-data.service.ts`. Biểu đồ đang để **placeholder** — cắm thư viện chart (vd ApexCharts/Chart.js) vào `.a-chart` sau.
```

## Bản đồ trang ↔ route

| Trang gốc | Route | Component |
|---|---|---|
| Trang chu.html | `/` | HomeComponent |
| Danh muc.html | `/danh-muc` | PlpComponent |
| San pham.html | `/san-pham` | PdpComponent |
| Gio hang.html | `/gio-hang` | CartComponent |
| Thanh toan.html | `/thanh-toan` | CheckoutComponent |
| Tim kiem.html | `/tim-kiem` | SearchComponent |
| Tai khoan.html | `/tai-khoan` | AccountComponent |
| Dang nhap.html | `/dang-nhap` | LoginComponent |
| Thanh vien.html | `/thanh-vien` | MembershipComponent |
| Uu dai.html | `/uu-dai` | OffersComponent |
| Theo doi don.html | `/theo-doi-don` | TrackOrderComponent |
| Cua hang.html | `/cua-hang` | StoresComponent |
| Cau chuyen.html | `/cau-chuyen` | StoryComponent |
| Ben vung.html | `/ben-vung` | SustainabilityComponent |
| Tuyen dung.html | `/tuyen-dung` | CareersComponent |
| Lien he.html | `/lien-he` | ContactComponent |
| Doi tra.html | `/doi-tra` | ReturnsComponent |
| Van chuyen.html | `/van-chuyen` | ShippingComponent |
| Huong dan size.html | `/huong-dan-size` | SizeGuideComponent |

## Ghi chú khi chuyển đổi

- **Signal Forms** (`@angular/forms/signals`, API thử nghiệm của v21) dùng cho mọi form nhập liệu: **Đăng nhập/Đăng ký** (`/dang-nhap`), **Thanh toán** (`/thanh-toan`), **Liên hệ** (`/lien-he`), **Newsletter** (trang chủ) và **Hồ sơ tài khoản** (`/tai-khoan`). Mô hình form là một `signal`, ràng buộc bằng `[formField]`, validate bằng schema (`required`, `email`, `minLength`), gửi bằng `submit()` — lỗi hiện ra sau khi field `touched()`. Ô tìm kiếm và ô nhập mã giảm giá là input đơn (đã bind signal) nên giữ nguyên.
- **`<image-slot>`** (web component kéo-thả ảnh) đã được thay bằng một component placeholder cùng tên (`ImageSlotComponent`, selector `image-slot`) hiển thị ô sọc + nhãn mô tả. Khi có ảnh thật, thay nội dung component này bằng `<img>` là xong — CSS canh kích thước vẫn giữ nguyên.
- **Giỏ hàng** lưu ở `localStorage` (key `maison_cart`) như bản gốc; **Tweaks** lưu ở key `maison_tweaks`.
- Mọi liên kết `*.html` đã đổi thành `routerLink`; điều hướng là SPA, không tải lại trang.
- Logic dùng chung (cart, mega menu, drawer) trước nằm rải trong `chrome.js`/`data.js`/các script trang nay gom vào services + components tương ứng.
