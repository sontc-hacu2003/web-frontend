import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiService } from '../../services/ui.service';

/** Mobile slide-in nav + scrim (ported from scripts/chrome.js overlaysHTML). */
@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink],
  template: `
    <div class="scrim" [class.is-open]="ui.menuOpen()" (click)="ui.closeMenu()"></div>
    <aside class="mobile-menu" [class.is-open]="ui.menuOpen()">
      <div class="mobile-menu__head">
        <strong style="text-transform:uppercase;letter-spacing:.1em;">Menu</strong>
        <button class="icon-btn" (click)="ui.closeMenu()" aria-label="Đóng">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>
      </div>
      <nav>
        <a routerLink="/danh-muc" (click)="ui.closeMenu()">Nữ</a>
        <a routerLink="/danh-muc" (click)="ui.closeMenu()">Nam</a>
        <a routerLink="/danh-muc" (click)="ui.closeMenu()">Trẻ em</a>
        <a routerLink="/danh-muc" (click)="ui.closeMenu()">Nhà cửa</a>
        <a routerLink="/danh-muc" (click)="ui.closeMenu()">Bộ sưu tập</a>
        <a routerLink="/danh-muc" class="is-sale" (click)="ui.closeMenu()">Sale</a>
      </nav>
    </aside>
  `,
})
export class MobileMenuComponent {
  ui = inject(UiService);
}
