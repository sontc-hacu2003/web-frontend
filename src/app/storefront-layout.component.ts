import { Component, HostListener, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { TweaksComponent, TWEAKS_ENABLED } from './components/tweaks/tweaks.component';
import { UiService } from './services/ui.service';

/** Storefront chrome (header/footer/drawers/tweaks) wrapping all public pages. */
@Component({
  selector: 'app-storefront-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    MobileMenuComponent,
    TweaksComponent,
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-mobile-menu></app-mobile-menu>
    <app-cart-drawer></app-cart-drawer>
    @if (tweaksEnabled) {
      <app-tweaks></app-tweaks>
    }
  `,
})
export class StorefrontLayoutComponent implements OnInit {
  readonly tweaksEnabled = TWEAKS_ENABLED;
  private ui = inject(UiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.ui.closeAll());
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.ui.closeAll();
  }
}
