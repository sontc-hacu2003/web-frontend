import { Component, computed, signal } from '@angular/core';

interface Job {
  title: string;
  cat: string;
  location: string;
  type: string;
}

@Component({
  selector: 'app-careers',
  template: `
    <section class="page-hero">
      <span class="eyebrow">Về chúng tôi</span>
      <h1>Gia nhập Maison</h1>
      <p>Chúng tôi đang tìm những người đồng hành đam mê thời trang, bền vững và trải nghiệm khách hàng.</p>
    </section>

    <div class="wrap">
      <div class="jobs">
        <div class="job-filters">
          @for (f of filters; track f) {
            <button [class.is-active]="active() === f" (click)="active.set(f)">{{ f === 'all' ? 'Tất cả' : f }}</button>
          }
        </div>

        <div>
          @for (job of visible(); track job.title) {
            <a href="#" class="job-row">
              <div><div class="jr-title">{{ job.title }}</div><div class="jr-meta"><span>{{ job.cat }}</span><span>{{ job.location }}</span><span>{{ job.type }}</span></div></div>
              <span class="jr-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export class CareersComponent {
  readonly filters = ['all', 'Thiết kế', 'Vận hành', 'Marketing', 'Cửa hàng'];
  readonly active = signal('all');

  readonly jobs: Job[] = [
    { title: 'Fashion Designer', cat: 'Thiết kế', location: 'TP.HCM', type: 'Toàn thời gian' },
    { title: 'Performance Marketing Lead', cat: 'Marketing', location: 'TP.HCM', type: 'Toàn thời gian' },
    { title: 'Chuyên viên Vận hành kho', cat: 'Vận hành', location: 'Bình Dương', type: 'Toàn thời gian' },
    { title: 'Store Manager — Tràng Tiền', cat: 'Cửa hàng', location: 'Hà Nội', type: 'Toàn thời gian' },
    { title: 'Sales Associate (Part-time)', cat: 'Cửa hàng', location: 'TP.HCM', type: 'Bán thời gian' },
    { title: 'UI/UX Designer (E-commerce)', cat: 'Thiết kế', location: 'TP.HCM · Remote', type: 'Toàn thời gian' },
  ];

  readonly visible = computed(() =>
    this.active() === 'all' ? this.jobs : this.jobs.filter((j) => j.cat === this.active()),
  );
}
