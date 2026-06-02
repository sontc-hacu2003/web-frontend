import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminThemeService {
  readonly dark = signal(false);
  readonly navOpen = signal(false);

  toggle() {
    this.dark.update(v => !v);
  }

  openNav() {
    this.navOpen.set(true);
  }

  closeNav() {
    this.navOpen.set(false);
  }
}
