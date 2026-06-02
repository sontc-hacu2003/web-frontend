import { Injectable } from '@angular/core';

export type OrderStatus = 'processing' | 'paid' | 'shipping' | 'delivered' | 'cancelled';
export interface OrderLine { name: string; meta: string; qty: number; price: number; }
export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  items: number;
  status: OrderStatus;
  payment: string;
  shipMethod: string;
  subtotal: number;
  discount: number;
  shipFee: number;
  total: number;
  lines: OrderLine[];
}

export type ProductStatus = 'active' | 'draft' | 'out';
export interface AdminProduct {
  id: string;
  name: string;
  cat: string;
  price: number;
  stock: number;
  sold: number;
  status: ProductStatus;
}

export type Tier = 'Silver' | 'Gold' | 'Platinum';
export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  joined: string;
  tier: Tier;
}

export type VoucherStatus = 'active' | 'expired';
export interface AdminVoucher {
  code: string;
  desc: string;
  type: string;
  value: string;
  used: number;
  limit: number;
  expiry: string;
  status: VoucherStatus;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  processing: 'Đang xử lý',
  paid: 'Đã thanh toán',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã huỷ',
};
export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  active: 'Đang bán',
  draft: 'Nháp',
  out: 'Hết hàng',
};

/** Rich mock data for the admin panel (prototype only). */
@Injectable({ providedIn: 'root' })
export class AdminDataService {
  readonly kpis = [
    { label: 'Doanh thu hôm nay', value: '18.420.000₫', delta: '12,5%', dir: 'up' as const, note: 'so với hôm qua', icon: 'revenue' },
    { label: 'Đơn hàng', value: '142', delta: '8,2%', dir: 'up' as const, note: 'tuần này', icon: 'orders' },
    { label: 'Khách hàng mới', value: '38', delta: '5,1%', dir: 'up' as const, note: 'tuần này', icon: 'customers' },
    { label: 'Tỉ lệ chuyển đổi', value: '3,8%', delta: '0,4%', dir: 'down' as const, note: 'so với tuần trước', icon: 'rate' },
  ];

  readonly topProducts = [
    { name: 'Áo khoác blazer dáng lửng', sold: 128, revenue: '165M' },
    { name: 'Đầm midi xếp ly', sold: 96, revenue: '76M' },
    { name: 'Áo thun cotton organic', sold: 312, revenue: '93M' },
    { name: 'Quần jeans ống suông', sold: 84, revenue: '58M' },
    { name: 'Áo hoodie nỉ bông', sold: 72, revenue: '50M' },
  ];

  readonly orders: AdminOrder[] = [
    this.order('MS-20418', 'Nguyễn An', 'an.nguyen@email.com', '0901 234 567', '123 Lê Lợi, Q1, TP.HCM', '01/06/2026', 'shipping', 'Thẻ tín dụng', 'Giao nhanh', [
      { name: 'Áo khoác blazer dáng lửng', meta: 'Đen · M', qty: 1, price: 1290000 },
      { name: 'Áo thun basic cổ tròn', meta: 'Trắng · L', qty: 1, price: 199000 },
    ]),
    this.order('MS-20417', 'Trần Bình', 'binh.tran@email.com', '0902 111 222', '45 Nguyễn Huệ, Q1, TP.HCM', '01/06/2026', 'paid', 'Ví MoMo', 'Tiêu chuẩn', [
      { name: 'Đầm midi xếp ly', meta: 'Be · S', qty: 1, price: 799000 },
    ]),
    this.order('MS-20416', 'Lê Chi', 'chi.le@email.com', '0903 333 444', '12 Hai Bà Trưng, Hà Nội', '31/05/2026', 'processing', 'COD', 'Tiêu chuẩn', [
      { name: 'Áo sơ mi linen tay dài', meta: 'Xanh · M', qty: 1, price: 549000 },
      { name: 'Quần chinos slim fit', meta: 'Be · 30', qty: 1, price: 549000 },
      { name: 'Túi tote canvas', meta: 'Mặc định', qty: 4, price: 259000 },
    ]),
    this.order('MS-20415', 'Phạm Dung', 'dung.pham@email.com', '0904 555 666', '78 Trần Phú, Đà Nẵng', '31/05/2026', 'delivered', 'Thẻ tín dụng', 'Tiêu chuẩn', [
      { name: 'Áo sơ mi linen tay dài', meta: 'Trắng · S', qty: 1, price: 549000 },
    ]),
    this.order('MS-20414', 'Vũ Em', 'em.vu@email.com', '0905 777 888', '9 Lý Tự Trọng, Q1, TP.HCM', '30/05/2026', 'cancelled', 'VNPay', 'Hoả tốc', [
      { name: 'Áo len cổ tròn', meta: 'Xám · L', qty: 1, price: 629000 },
      { name: 'Chân váy chữ A', meta: 'Đen · M', qty: 1, price: 459000 },
    ]),
    this.order('MS-20413', 'Đỗ Giang', 'giang.do@email.com', '0906 999 000', '34 Pasteur, Q3, TP.HCM', '30/05/2026', 'delivered', 'Thẻ tín dụng', 'Nhanh', [
      { name: 'Áo polo pique', meta: 'Navy · L', qty: 2, price: 389000 },
    ]),
    this.order('MS-20412', 'Bùi Hà', 'ha.bui@email.com', '0907 121 212', '56 Cầu Giấy, Hà Nội', '29/05/2026', 'paid', 'Ví MoMo', 'Tiêu chuẩn', [
      { name: 'Áo khoác denim', meta: 'Xanh · M', qty: 1, price: 899000 },
    ]),
    this.order('MS-20411', 'Ngô Khoa', 'khoa.ngo@email.com', '0908 343 434', '11 Lê Duẩn, Q1, TP.HCM', '29/05/2026', 'processing', 'COD', 'Tiêu chuẩn', [
      { name: 'Quần short kaki', meta: 'Be · 31', qty: 2, price: 349000 },
      { name: 'Áo thun cotton organic', meta: 'Trắng · M', qty: 1, price: 299000 },
    ]),
    this.order('MS-20410', 'Mai Lan', 'lan.mai@email.com', '0909 565 656', '23 Bà Triệu, Hà Nội', '28/05/2026', 'shipping', 'Thẻ tín dụng', 'Nhanh', [
      { name: 'Áo sweater cardigan', meta: 'Kem · M', qty: 1, price: 829000 },
    ]),
    this.order('MS-20409', 'Hồ Minh', 'minh.ho@email.com', '0910 787 878', '67 Nguyễn Trãi, Q5, TP.HCM', '28/05/2026', 'delivered', 'VNPay', 'Tiêu chuẩn', [
      { name: 'Đầm sơ mi dáng dài', meta: 'Xanh · S', qty: 1, price: 759000 },
    ]),
    this.order('MS-20408', 'Lý Nga', 'nga.ly@email.com', '0911 909 090', '88 Hùng Vương, Cần Thơ', '27/05/2026', 'delivered', 'Thẻ tín dụng', 'Tiêu chuẩn', [
      { name: 'Áo hoodie nỉ bông', meta: 'Xám · L', qty: 1, price: 699000 },
    ]),
    this.order('MS-20407', 'Phan Oanh', 'oanh.phan@email.com', '0912 010 101', '5 Võ Văn Tần, Q3, TP.HCM', '27/05/2026', 'cancelled', 'COD', 'Tiêu chuẩn', [
      { name: 'Quần jeans ống suông', meta: 'Xanh · 29', qty: 1, price: 699000 },
    ]),
  ];

  readonly products: AdminProduct[] = [
    this.prod('SP-001', 'Áo thun cotton organic', 'Áo', 299000, 320, 312, 'active'),
    this.prod('SP-002', 'Áo sơ mi linen tay dài', 'Áo', 549000, 145, 88, 'active'),
    this.prod('SP-003', 'Đầm midi xếp ly', 'Đầm', 799000, 64, 96, 'active'),
    this.prod('SP-004', 'Quần jeans ống suông', 'Quần', 699000, 0, 84, 'out'),
    this.prod('SP-005', 'Áo khoác blazer dáng lửng', 'Áo khoác', 1290000, 52, 128, 'active'),
    this.prod('SP-006', 'Chân váy chữ A', 'Chân váy', 459000, 78, 41, 'active'),
    this.prod('SP-007', 'Áo len cổ tròn', 'Áo', 629000, 96, 33, 'active'),
    this.prod('SP-008', 'Áo polo pique', 'Áo', 389000, 210, 57, 'active'),
    this.prod('SP-009', 'Áo thun basic cổ tròn', 'Áo', 199000, 540, 286, 'active'),
    this.prod('SP-010', 'Quần chinos slim fit', 'Quần', 549000, 130, 49, 'active'),
    this.prod('SP-011', 'Áo hoodie nỉ bông', 'Áo khoác', 699000, 88, 72, 'active'),
    this.prod('SP-012', 'Đầm sơ mi dáng dài', 'Đầm', 759000, 0, 28, 'draft'),
    this.prod('SP-013', 'Áo khoác denim', 'Áo khoác', 899000, 41, 35, 'active'),
    this.prod('SP-014', 'Quần short kaki', 'Quần', 349000, 162, 64, 'active'),
    this.prod('SP-015', 'Túi tote canvas', 'Phụ kiện', 259000, 25, 51, 'active'),
  ];

  readonly customers: AdminCustomer[] = [
    this.cust('KH-1042', 'Nguyễn An', 'an.nguyen@email.com', '0901 234 567', 12, 14890000, '03/2024', 'Gold'),
    this.cust('KH-1041', 'Trần Bình', 'binh.tran@email.com', '0902 111 222', 5, 4290000, '08/2024', 'Silver'),
    this.cust('KH-1040', 'Lê Chi', 'chi.le@email.com', '0903 333 444', 23, 31200000, '01/2023', 'Platinum'),
    this.cust('KH-1039', 'Phạm Dung', 'dung.pham@email.com', '0904 555 666', 3, 1850000, '02/2026', 'Silver'),
    this.cust('KH-1038', 'Vũ Em', 'em.vu@email.com', '0905 777 888', 8, 7640000, '11/2024', 'Gold'),
    this.cust('KH-1037', 'Đỗ Giang', 'giang.do@email.com', '0906 999 000', 6, 5120000, '05/2025', 'Silver'),
    this.cust('KH-1036', 'Bùi Hà', 'ha.bui@email.com', '0907 121 212', 15, 18900000, '09/2023', 'Gold'),
    this.cust('KH-1035', 'Ngô Khoa', 'khoa.ngo@email.com', '0908 343 434', 2, 980000, '03/2026', 'Silver'),
    this.cust('KH-1034', 'Mai Lan', 'lan.mai@email.com', '0909 565 656', 31, 42600000, '06/2022', 'Platinum'),
    this.cust('KH-1033', 'Hồ Minh', 'minh.ho@email.com', '0910 787 878', 7, 6230000, '12/2024', 'Gold'),
  ];

  readonly vouchers: AdminVoucher[] = [
    { code: 'WELCOME10', desc: 'Ưu đãi thành viên mới', type: 'Phần trăm', value: '10%', used: 842, limit: 2000, expiry: '30/06/2026', status: 'active' },
    { code: 'FREESHIP50', desc: 'Miễn phí vận chuyển +', type: 'Cố định', value: '50.000₫', used: 1203, limit: 1500, expiry: '15/06/2026', status: 'active' },
    { code: 'HABD15', desc: 'Ưu đãi sinh nhật', type: 'Phần trăm', value: '15%', used: 96, limit: 500, expiry: '31/07/2026', status: 'active' },
    { code: 'SUMMER25', desc: 'Sale hè', type: 'Phần trăm', value: '25%', used: 0, limit: 3000, expiry: '01/07/2026', status: 'active' },
    { code: 'SPRING20', desc: 'Sale Xuân', type: 'Phần trăm', value: '20%', used: 1980, limit: 2000, expiry: '30/04/2026', status: 'expired' },
  ];

  recentOrders(n = 6): AdminOrder[] { return this.orders.slice(0, n); }
  findOrder(id: string): AdminOrder | undefined { return this.orders.find((o) => o.id === id); }
  findProduct(id: string): AdminProduct | undefined { return this.products.find((p) => p.id === id); }

  private order(id: string, customer: string, email: string, phone: string, address: string, date: string, status: OrderStatus, payment: string, shipMethod: string, lines: OrderLine[]): AdminOrder {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const discount = Math.round(subtotal * 0.1);
    const shipFee = subtotal >= 499000 ? 0 : 30000;
    const items = lines.reduce((s, l) => s + l.qty, 0);
    return { id, customer, email, phone, address, date, items, status, payment, shipMethod, subtotal, discount, shipFee, total: subtotal - discount + shipFee, lines };
  }
  private prod(id: string, name: string, cat: string, price: number, stock: number, sold: number, status: ProductStatus): AdminProduct {
    return { id, name, cat, price, stock, sold, status };
  }
  private cust(id: string, name: string, email: string, phone: string, orders: number, spent: number, joined: string, tier: Tier): AdminCustomer {
    return { id, name, email, phone, orders, spent, joined, tier };
  }
}
