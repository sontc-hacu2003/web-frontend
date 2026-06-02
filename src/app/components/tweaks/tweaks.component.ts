import { Component, OnInit, effect, signal } from '@angular/core';

/* ════════════════════════════════════════════════════════════════
   BẬT / TẮT BẢNG TWEAKS
   Đổi thành false để tắt hoàn toàn bảng Tweaks trên mọi trang.
   ════════════════════════════════════════════════════════════════ */
export const TWEAKS_ENABLED = true;

type FontKey = 'system' | 'bevietnam' | 'manrope' | 'playfair' | 'lora';

interface TweakState {
  accent: string;
  font: FontKey;
  radius: string;
  promo: boolean;
}

const KEY = 'maison_tweaks';
const DEFAULTS: TweakState = { accent: '#1a1a1a', font: 'system', radius: '0', promo: true };

const ACCENTS = [
  { name: 'Đen', val: '#1a1a1a' },
  { name: 'Navy', val: '#2a3b5e' },
  { name: 'Rêu', val: '#3d5240' },
  { name: 'Nâu', val: '#6b4a2b' },
  { name: 'Mận', val: '#7a1f2b' },
];
const FONTS: Record<FontKey, { label: string; stack: string }> = {
  system: { label: 'Hệ thống', stack: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, "Noto Sans", sans-serif' },
  bevietnam: { label: 'Be Vietnam Pro', stack: '"Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif' },
  manrope: { label: 'Manrope', stack: 'Manrope, ui-sans-serif, system-ui, sans-serif' },
  playfair: { label: 'Playfair Display', stack: '"Playfair Display", Georgia, serif' },
  lora: { label: 'Lora', stack: 'Lora, Georgia, "Times New Roman", serif' },
};
const RADII = [
  { name: 'Vuông', val: '0' },
  { name: 'Bo nhẹ', val: '6' },
  { name: 'Bo tròn', val: '980' },
];

/**
 * Self-contained Tweaks panel (ported from scripts/tweaks.js).
 * Live-themes the storefront via CSS custom properties; persisted to localStorage.
 */
@Component({
  selector: 'app-tweaks',
  template: `
    <button class="tw-fab" (click)="open.set(!open())" aria-label="Tweaks">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </button>

    <div class="tw-panel" [class.is-open]="open()">
      <div class="tw-head"><strong>Tweaks</strong>
        <button (click)="open.set(false)" aria-label="Đóng"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>
      </div>
      <div class="tw-body">
        <div class="tw-sec">
          <label>Màu nhấn</label>
          <div class="tw-swatches">
            @for (a of accents; track a.val) {
              <button class="tw-swatch" [class.is-active]="state().accent === a.val" [style.background]="a.val" [title]="a.name" (click)="set({ accent: a.val })"></button>
            }
          </div>
        </div>
        <div class="tw-sec">
          <label>Kiểu chữ</label>
          <div class="tw-fonts">
            @for (f of fontOpts; track f.val) {
              <button class="tw-font" [class.is-active]="state().font === f.val" [style.fontFamily]="f.stack" (click)="set({ font: f.val })">{{ f.label }}</button>
            }
          </div>
        </div>
        <div class="tw-sec">
          <label>Bo góc nút</label>
          <div class="tw-seg">
            @for (r of radii; track r.val) {
              <button [class.is-active]="state().radius === r.val" (click)="set({ radius: r.val })">{{ r.name }}</button>
            }
          </div>
        </div>
        <div class="tw-sec">
          <div class="tw-toggle"><span>Thanh khuyến mãi</span>
            <button class="tw-sw" [class.on]="state().promo" (click)="set({ promo: !state().promo })"></button>
          </div>
        </div>
      </div>
      <button class="tw-reset" (click)="reset()">Đặt lại mặc định</button>
    </div>
  `,
  styles: [`
    .tw-fab{position:fixed;right:20px;bottom:20px;z-index:9998;width:48px;height:48px;border-radius:50%;border:1px solid #e2e2e2;background:#fff;color:#1a1a1a;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(0,0,0,.16)}
    .tw-fab:hover{background:#fafafa}
    .tw-panel{position:fixed;right:20px;bottom:80px;z-index:9999;width:300px;background:#fff;color:#1a1a1a;border:1px solid #e2e2e2;box-shadow:0 16px 50px rgba(0,0,0,.18);font-family:ui-sans-serif,system-ui,sans-serif;transform:translateY(16px);opacity:0;visibility:hidden;transition:opacity .2s ease,transform .2s ease,visibility .2s}
    .tw-panel.is-open{opacity:1;visibility:visible;transform:translateY(0)}
    .tw-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #e2e2e2}
    .tw-head strong{font-size:12px;text-transform:uppercase;letter-spacing:.12em}
    .tw-head button{border:0;background:none;cursor:pointer;width:26px;height:26px;display:flex;align-items:center;justify-content:center;color:#666}
    .tw-body{padding:16px;display:flex;flex-direction:column;gap:18px;max-height:70vh;overflow:auto}
    .tw-sec>label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#888;font-weight:700;margin-bottom:9px}
    .tw-swatches{display:flex;gap:10px}
    .tw-swatch{width:30px;height:30px;border-radius:50%;border:1px solid rgba(0,0,0,.15);cursor:pointer;padding:0;position:relative}
    .tw-swatch.is-active{box-shadow:0 0 0 2px #fff,0 0 0 4px #1a1a1a}
    .tw-seg{display:flex;border:1px solid #e2e2e2}
    .tw-seg button{flex:1;padding:9px 4px;border:0;background:#fff;cursor:pointer;font-size:12px;font-weight:600;color:#888;border-right:1px solid #e2e2e2}
    .tw-seg button:last-child{border-right:0}
    .tw-seg button.is-active{background:#1a1a1a;color:#fff}
    .tw-fonts{display:flex;flex-direction:column;gap:8px}
    .tw-font{text-align:left;padding:10px 12px;border:1px solid #e2e2e2;background:#fff;cursor:pointer;font-size:16px;color:#1a1a1a;line-height:1;transition:border-color .15s}
    .tw-font:hover{border-color:#bbb}
    .tw-font.is-active{border-color:#1a1a1a;box-shadow:inset 0 0 0 1px #1a1a1a}
    .tw-toggle{display:flex;align-items:center;justify-content:space-between}
    .tw-toggle span{font-size:13px}
    .tw-sw{width:42px;height:24px;border-radius:980px;background:#ccc;border:0;cursor:pointer;position:relative;transition:background .2s}
    .tw-sw::after{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .2s}
    .tw-sw.on{background:#1a1a1a}.tw-sw.on::after{transform:translateX(18px)}
    .tw-reset{font-size:12px;color:#888;background:none;border:0;border-top:1px solid #e2e2e2;padding:12px 16px;cursor:pointer;text-align:center;width:100%}
    .tw-reset:hover{color:#1a1a1a}
  `],
})
export class TweaksComponent implements OnInit {
  readonly accents = ACCENTS;
  readonly radii = RADII;
  readonly fontOpts: { label: string; val: FontKey; stack: string }[] =
    (Object.keys(FONTS) as FontKey[]).map((val) => ({ val, label: FONTS[val].label, stack: FONTS[val].stack }));

  readonly open = signal(false);
  readonly state = signal<TweakState>(this.load());

  constructor() {
    effect(() => this.apply(this.state()));
  }

  ngOnInit(): void { /* effect handles initial apply */ }

  set(patch: Partial<TweakState>): void {
    const next = { ...this.state(), ...patch };
    this.state.set(next);
    this.save(next);
  }

  reset(): void {
    this.state.set({ ...DEFAULTS });
    this.save(DEFAULTS);
  }

  private apply(s: TweakState): void {
    const r = document.documentElement.style;
    r.setProperty('--color-ink', s.accent);
    r.setProperty('--color-ink-hover', `color-mix(in srgb, ${s.accent} 84%, #000)`);
    r.setProperty('--font-sans', (FONTS[s.font] || FONTS.system).stack);
    r.setProperty('--btn-radius', s.radius + 'px');
    document.body.classList.toggle('tw-no-promo', !s.promo);
  }

  private load(): TweakState {
    try {
      return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY) || 'null') || {}) };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private save(s: TweakState): void {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
  }
}
