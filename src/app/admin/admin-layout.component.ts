import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AdminThemeService } from '../services/admin-theme.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell" [class.theme-dark]="theme.dark()" [class.nav-open]="theme.navOpen()">
      <aside class="a-sidebar">
        <a class="a-brand" routerLink="/admin">
          <span class="a-brand__mark">M</span>
          <span><span class="a-brand__name">Maison</span><div class="a-brand__tag">Admin</div></span>
        </a>
        <nav class="a-nav">
          <div class="a-nav__section">Tổng quan</div>
          <a class="a-nav__link" routerLink="/admin" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Dashboard
          </a>
          <div class="a-nav__section">Bán hàng</div>
          <a class="a-nav__link" routerLink="/admin/don-hang" routerLinkActive="is-active">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Đơn hàng <span class="a-nav__badge">6</span>
          </a>
          <a class="a-nav__link" routerLink="/admin/san-pham" routerLinkActive="is-active">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4a1 1 0 0 1 1-1h8a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg> Sản phẩm
          </a>
          <a class="a-nav__link" routerLink="/admin/khach-hang" routerLinkActive="is-active">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg> Khách hàng
          </a>
          <a class="a-nav__link" routerLink="/admin/khuyen-mai" routerLinkActive="is-active">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M13 6v12"/></svg> Khuyến mãi
          </a>
          <div class="a-nav__section">Tuỳ chỉnh</div>
          <a class="a-nav__link" routerLink="/admin/giao-dien" routerLinkActive="is-active">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> Giao diện
          </a>
          <a class="a-nav__link" routerLink="/admin/cai-dat" routerLinkActive="is-active">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Cài đặt
          </a>
        </nav>
        <div class="a-side-user">
          <span class="a-avatar">AN</span>
          <span><div class="a-side-user__name">An Nguyễn</div><div class="a-side-user__role">Quản trị viên</div></span>
        </div>
      </aside>

      <div class="a-main">
        <div class="a-topbar">
          <button class="a-icon-btn a-hamburger" (click)="theme.openNav()" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div>
            <div class="a-topbar__title">{{ title() }}</div>
            @if (crumb()) { <div class="a-topbar__crumb">{{ crumb() }}</div> }
          </div>
          <div class="a-topbar__spacer"></div>
          <div class="a-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
            <input placeholder="Tìm đơn, sản phẩm, khách…">
          </div>
          <button class="a-icon-btn" (click)="theme.toggle()" [attr.aria-label]="theme.dark() ? 'Chế độ sáng' : 'Chế độ tối'">
            @if (theme.dark()) {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>
            } @else {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            }
          </button>
          <button class="a-icon-btn" aria-label="Thông báo"><span class="dot"></span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
          </button>
          <span class="a-avatar">AN</span>
        </div>

        <router-outlet></router-outlet>
      </div>

      <div class="a-scrim" (click)="theme.closeNav()"></div>
    </div>
  `,
})
export class AdminLayoutComponent {
  theme = inject(AdminThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly title = signal('Dashboard');
  readonly crumb = signal('');

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let r = this.route;
      while (r.firstChild) r = r.firstChild;
      const data = r.snapshot.data;
      this.title.set((data['title'] as string) ?? 'Maison Admin');
      this.crumb.set((data['crumb'] as string) ?? '');
      this.theme.closeNav();
    });
  }
}
