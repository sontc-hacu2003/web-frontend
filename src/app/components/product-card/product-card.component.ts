import { Component, Input, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { VndPipe } from '../../pipes/vnd.pipe';
import { ImageSlotComponent } from '../image-slot/image-slot.component';

/** Product card (ported from S.productCard in scripts/data.js). */
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, VndPipe, ImageSlotComponent],
  template: `
    <article class="product">
      <a class="product__media" routerLink="/san-pham">
        @if (product.sale) {
          <span class="product__badge is-sale">Sale</span>
        } @else if (product.badge) {
          <span class="product__badge">{{ product.badge }}</span>
        }
        <button class="product__wish" [class.is-active]="wished()" (click)="toggleWish($event)" aria-label="Yêu thích">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>
        </button>
        <image-slot placeholder="Ảnh sản phẩm"></image-slot>
        <button class="product__add" type="button" (click)="add($event)">+ Thêm vào giỏ</button>
      </a>
      <div class="product__info">
        <a class="product__name" routerLink="/san-pham">{{ product.name }}</a>
        <div class="product__price">
          @if (product.sale) {
            <span class="now is-sale">{{ product.price | vnd }}</span><span class="was">{{ product.was | vnd }}</span>
          } @else {
            <span class="now">{{ product.price | vnd }}</span>
          }
        </div>
        <div class="product__swatches">
          @for (c of swatches; track $index) {
            <span class="swatch" [style.background]="c"></span>
          }
        </div>
      </div>
    </article>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() index = 0;

  private products = inject(ProductService);
  private cart = inject(CartService);
  readonly wished = signal(false);

  get swatches(): string[] {
    return this.products.swatchesFor(this.index);
  }

  toggleWish(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.wished.update((v) => !v);
  }

  add(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.cart.add({ name: this.product.name, meta: 'Mặc định · M', price: this.product.price });
  }
}
