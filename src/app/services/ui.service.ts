import { Injectable, signal } from '@angular/core';

/** Open/close state for the cart drawer + mobile menu, with body scroll lock. */
@Injectable({ providedIn: 'root' })
export class UiService {
  readonly cartOpen = signal(false);
  readonly menuOpen = signal(false);

  openCart(): void { this.cartOpen.set(true); this.lock(); }
  closeCart(): void { this.cartOpen.set(false); this.unlock(); }
  openMenu(): void { this.menuOpen.set(true); this.lock(); }
  closeMenu(): void { this.menuOpen.set(false); this.unlock(); }

  closeAll(): void {
    this.cartOpen.set(false);
    this.menuOpen.set(false);
    this.unlock();
  }

  private lock(): void { document.body.style.overflow = 'hidden'; }
  private unlock(): void { document.body.style.overflow = ''; }
}
