import { Injectable, computed, effect, signal } from '@angular/core';

/** Admin light/dark theme (persisted) + mobile sidebar open state. */
@Injectable({ providedIn: 'root' })
export class AdminThemeService {
  private readonly KEY = 'maison_admin_theme';
  private readonly theme = signal<'light' | 'dark'>(this.load());
  readonly dark = computed(() => this.theme() === 'dark');
  readonly navOpen = signal(false);

  constructor() {
    effect(() => {
      try { localStorage.setItem(this.KEY, this.theme()); } catch { /* ignore */ }
    });
  }

  toggle(): void { this.theme.update((t) => (t === 'dark' ? 'light' : 'dark')); }
  openNav(): void { this.navOpen.set(true); }
  closeNav(): void { this.navOpen.set(false); }

  private load(): 'light' | 'dark' {
    try {
      const v = localStorage.getItem(this.KEY);
      if (v === 'light' || v === 'dark') return v;
    } catch { /* ignore */ }
    return 'light';
  }
}
