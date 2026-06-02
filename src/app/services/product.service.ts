import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

/** Shared catalog + helpers (ported from scripts/data.js). */
@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly swatchSets: string[][] = [
    ['#1a1a1a', '#c8102e', '#d9c7a3'],
    ['#2a3b5e', '#ffffff', '#9aa5b1'],
    ['#3d5240', '#e8e0d0'],
    ['#6b4a2b', '#1a1a1a', '#c2b8a3'],
    ['#b5255a', '#1a1a1a'],
    ['#e8e0d0', '#9aa5b1', '#2a3b5e'],
  ];

  readonly catalog: Product[] = [
    { name: 'Áo thun cotton organic', price: 299000, cat: 'Áo', badge: 'Mới' },
    { name: 'Áo sơ mi linen tay dài', price: 549000, cat: 'Áo' },
    { name: 'Đầm midi xếp ly', price: 799000, cat: 'Đầm', badge: 'Mới' },
    { name: 'Quần jeans ống suông', price: 699000, cat: 'Quần' },
    { name: 'Áo khoác blazer dáng lửng', price: 1290000, cat: 'Áo khoác', badge: 'Mới' },
    { name: 'Chân váy chữ A', price: 459000, cat: 'Chân váy' },
    { name: 'Áo len cổ tròn', price: 629000, cat: 'Áo' },
    { name: 'Áo polo pique', price: 389000, cat: 'Áo' },
    { name: 'Áo thun basic cổ tròn', price: 199000, was: 299000, sale: true, cat: 'Áo' },
    { name: 'Quần chinos slim fit', price: 549000, cat: 'Quần' },
    { name: 'Áo hoodie nỉ bông', price: 699000, was: 899000, sale: true, cat: 'Áo khoác' },
    { name: 'Đầm sơ mi dáng dài', price: 759000, cat: 'Đầm' },
    { name: 'Áo khoác denim', price: 899000, cat: 'Áo khoác' },
    { name: 'Quần short kaki', price: 349000, was: 449000, sale: true, cat: 'Quần' },
    { name: 'Áo sweater cardigan', price: 829000, cat: 'Áo' },
    { name: 'Túi tote canvas', price: 259000, cat: 'Phụ kiện' },
  ];

  newArrivals(): Product[] { return this.catalog.slice(0, 8); }
  bestsellers(): Product[] { return this.catalog.slice(8, 16); }
  related(): Product[] { return this.catalog.slice(2, 10); }

  /** PLP pool: catalog + a deduped copy with badges stripped (prototype data). */
  plpPool(): Product[] {
    return this.catalog.concat(this.catalog.map((p) => ({ ...p, badge: undefined })));
  }

  swatchesFor(index: number): string[] {
    return this.swatchSets[index % this.swatchSets.length];
  }

  /** Accent-insensitive substring search over name + category. */
  search(q: string): Product[] {
    const query = this.norm(q.trim());
    if (!query) return [];
    return this.catalog.filter(
      (p) => this.norm(p.name).includes(query) || this.norm(p.cat).includes(query),
    );
  }

  private norm(s: string): string {
    return (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  }
}
