import { Component, Input } from '@angular/core';

/**
 * Drop-in replacement for the old <image-slot> web component.
 * Renders a subtly-striped placeholder with a monospace caption.
 * Keeps the `image-slot` element name so the global CSS sizing rules apply.
 */
@Component({
  selector: 'image-slot',
  template: `<span class="img-ph__label">{{ placeholder }}</span>`,
})
export class ImageSlotComponent {
  @Input() placeholder = '';
  /** Kept for API parity with the original component (unused for placeholders). */
  @Input() fit = 'cover';
}
