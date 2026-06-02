import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./storefront-layout.component').then((m) => m.StorefrontLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Maison — Cửa hàng thời trang',
      },
      {
        path: 'danh-muc',
        loadComponent: () => import('./pages/plp/plp.component').then((m) => m.PlpComponent),
        title: 'Trang phục Nữ | Maison',
      },
      {
        path: 'san-pham',
        loadComponent: () => import('./pages/pdp/pdp.component').then((m) => m.PdpComponent),
        title: 'Áo khoác blazer dáng lửng | Maison',
      },
      {
        path: 'gio-hang',
        loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Giỏ hàng | Maison',
      },
      {
        path: 'thanh-toan',
        loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
        title: 'Thanh toán | Maison',
      },
      {
        path: 'tim-kiem',
        loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
        title: 'Tìm kiếm | Maison',
      },
      {
        path: 'tai-khoan',
        loadComponent: () => import('./pages/account/account.component').then((m) => m.AccountComponent),
        title: 'Tài khoản của tôi | Maison',
      },
      {
        path: 'dang-nhap',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Đăng nhập | Maison',
      },
      {
        path: 'thanh-vien',
        loadComponent: () => import('./pages/membership/membership.component').then((m) => m.MembershipComponent),
        title: 'Thành viên Maison | Maison',
      },
      {
        path: 'uu-dai',
        loadComponent: () => import('./pages/offers/offers.component').then((m) => m.OffersComponent),
        title: 'Ưu đãi của tôi | Maison',
      },
      {
        path: 'theo-doi-don',
        loadComponent: () => import('./pages/track-order/track-order.component').then((m) => m.TrackOrderComponent),
        title: 'Theo dõi đơn hàng | Maison',
      },
      {
        path: 'cua-hang',
        loadComponent: () => import('./pages/stores/stores.component').then((m) => m.StoresComponent),
        title: 'Hệ thống cửa hàng | Maison',
      },
      {
        path: 'cau-chuyen',
        loadComponent: () => import('./pages/story/story.component').then((m) => m.StoryComponent),
        title: 'Câu chuyện | Maison',
      },
      {
        path: 'ben-vung',
        loadComponent: () => import('./pages/sustainability/sustainability.component').then((m) => m.SustainabilityComponent),
        title: 'Bền vững | Maison',
      },
      {
        path: 'tuyen-dung',
        loadComponent: () => import('./pages/careers/careers.component').then((m) => m.CareersComponent),
        title: 'Tuyển dụng | Maison',
      },
      {
        path: 'lien-he',
        loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
        title: 'Liên hệ | Maison',
      },
      {
        path: 'doi-tra',
        loadComponent: () => import('./pages/returns/returns.component').then((m) => m.ReturnsComponent),
        title: 'Đổi trả & hoàn tiền | Maison',
      },
      {
        path: 'van-chuyen',
        loadComponent: () => import('./pages/shipping/shipping.component').then((m) => m.ShippingComponent),
        title: 'Vận chuyển | Maison',
      },
      {
        path: 'huong-dan-size',
        loadComponent: () => import('./pages/size-guide/size-guide.component').then((m) => m.SizeGuideComponent),
        title: 'Hướng dẫn chọn size | Maison',
      },
    ],
  },

  // ─── Admin ───
  {
    path: 'admin/dang-nhap',
    loadComponent: () => import('./admin/pages/admin-login.component').then((m) => m.AdminLoginComponent),
    title: 'Đăng nhập — Maison Admin',
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/pages/dashboard.component').then((m) => m.AdminDashboardComponent),
        title: 'Dashboard — Maison Admin',
        data: { title: 'Dashboard', crumb: 'Tổng quan hoạt động' },
      },
      {
        path: 'don-hang',
        loadComponent: () => import('./admin/pages/orders.component').then((m) => m.AdminOrdersComponent),
        title: 'Đơn hàng — Maison Admin',
        data: { title: 'Đơn hàng', crumb: 'Quản lý đơn hàng' },
      },
      {
        path: 'don-hang/:id',
        loadComponent: () => import('./admin/pages/order-detail.component').then((m) => m.AdminOrderDetailComponent),
        title: 'Chi tiết đơn — Maison Admin',
        data: { title: 'Chi tiết đơn hàng', crumb: 'Đơn hàng' },
      },
      {
        path: 'san-pham',
        loadComponent: () => import('./admin/pages/products.component').then((m) => m.AdminProductsComponent),
        title: 'Sản phẩm — Maison Admin',
        data: { title: 'Sản phẩm', crumb: 'Danh mục sản phẩm' },
      },
      {
        path: 'san-pham/moi',
        loadComponent: () => import('./admin/pages/product-edit.component').then((m) => m.AdminProductEditComponent),
        title: 'Thêm sản phẩm — Maison Admin',
        data: { title: 'Thêm sản phẩm', crumb: 'Sản phẩm' },
      },
      {
        path: 'san-pham/:id',
        loadComponent: () => import('./admin/pages/product-edit.component').then((m) => m.AdminProductEditComponent),
        title: 'Sửa sản phẩm — Maison Admin',
        data: { title: 'Sửa sản phẩm', crumb: 'Sản phẩm' },
      },
      {
        path: 'khach-hang',
        loadComponent: () => import('./admin/pages/customers.component').then((m) => m.AdminCustomersComponent),
        title: 'Khách hàng — Maison Admin',
        data: { title: 'Khách hàng', crumb: 'Quản lý khách hàng' },
      },
      {
        path: 'khuyen-mai',
        loadComponent: () => import('./admin/pages/promotions.component').then((m) => m.AdminPromotionsComponent),
        title: 'Khuyến mãi — Maison Admin',
        data: { title: 'Khuyến mãi', crumb: 'Mã giảm giá & voucher' },
      },
      {
        path: 'giao-dien',
        loadComponent: () => import('./admin/pages/appearance.component').then((m) => m.AdminAppearanceComponent),
        title: 'Giao diện — Maison Admin',
        data: { title: 'Giao diện', crumb: 'Nội dung storefront' },
      },
      {
        path: 'cai-dat',
        loadComponent: () => import('./admin/pages/settings.component').then((m) => m.AdminSettingsComponent),
        title: 'Cài đặt — Maison Admin',
        data: { title: 'Cài đặt', crumb: 'Cấu hình cửa hàng' },
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
