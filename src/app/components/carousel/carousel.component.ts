import { Component, ElementRef, ViewChild } from '@angular/core';

/** Horizontal product carousel with prev/next buttons (ported from the page scripts). */
@Component({
  selector: 'app-carousel',
  template: `
    <div class="carousel">
      <button class="carousel__nav carousel__nav--prev" (click)="scroll(-1)" aria-label="Trước">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="carousel__track" #track><ng-content></ng-content></div>
      <button class="carousel__nav carousel__nav--next" (click)="scroll(1)" aria-label="Sau">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `,
})
export class CarouselComponent {
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLElement>;

  scroll(dir: number): void {
    const el = this.track.nativeElement;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  }
}
