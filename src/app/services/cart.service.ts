import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CartItem } from '../models/product.model';
import { UiService } from './ui.service';

/** Persisted cart state + derived totals (ported from scripts/chrome.js). */
@Injectable({ providedIn: 'root' })
export class CartService {
  private ui = inject(UiService);
  private readonly KEY = 'maison_cart';

  readonly items = signal<CartItem[]>(this.load());

  readonly count = computed(() => this.items().reduce((s, it) => s + it.qty, 0));
  readonly subtotal = computed(() => this.items().reduce((s, it) => s + it.price * it.qty, 0));

  constructor() {
    effect(() => {
      try { localStorage.setItem(this.KEY, JSON.stringify(this.items())); } catch { /* ignore */ }
    });
  }

  private load(): CartItem[] {
    try {
      const raw = JSON.parse(localStorage.getItem(this.KEY) || 'null');
      if (Array.isArray(raw)) return raw;
    } catch { /* ignore */ }
    return [
      { name: 'Áo khoác blazer dáng lửng', meta: 'Đen · M', price: 1290000, qty: 1 },
      { name: 'Áo thun basic cổ tròn', meta: 'Trắng · L', price: 199000, qty: 2 },
    ];
  }

  add(item: { name: string; meta?: string; price: number; qty?: number }): void {
    const meta = item.meta || 'Mặc định · M';
    const list = [...this.items()];
    const existing = list.find((it) => it.name === item.name && it.meta === meta);
    if (existing) existing.qty += item.qty || 1;
    else list.push({ name: item.name, meta, price: item.price, qty: item.qty || 1 });
    this.items.set(list);
    this.ui.openCart();
  }

  updateQty(index: number, delta: number): void {
    const list = [...this.items()];
    const it = list[index];
    if (!it) return;
    it.qty = Math.max(0, it.qty + delta);
    if (!it.qty) list.splice(index, 1);
    this.items.set(list);
  }

  remove(index: number): void {
    const list = [...this.items()];
    list.splice(index, 1);
    this.items.set(list);
  }
}
