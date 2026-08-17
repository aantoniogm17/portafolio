import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="section" id="about">
      <div class="container about">
        <div appReveal>
          <p class="eyebrow">{{ t().about.eyebrow }}</p>
          <h2 class="section-title">{{ t().about.title }}</h2>
          <div class="about__prose">
            @for (paragraph of t().about.paragraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>
        </div>

        <aside class="card about__now" appReveal [appRevealDelay]="120">
          <h3 class="about__now-title">{{ t().about.nowTitle }}</h3>
          <dl>
            @for (item of t().about.now; track item.label) {
              <div class="about__row">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            }
          </dl>
        </aside>
      </div>
    </section>
  `,
  styles: `
    .about { display: grid; gap: 2.5rem; }
    .about__prose { display: grid; gap: 1.1rem; color: var(--text-dim); max-width: 62ch; }
    .about__prose p:first-child { color: var(--text); font-size: 1.06rem; }
    .about__now { align-self: start; }
    .about__now-title {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--amber);
      margin-bottom: 1.2rem;
    }
    dl { margin: 0; display: grid; gap: 1.1rem; }
    .about__row { display: grid; gap: 0.2rem; }
    dt {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-dim);
    }
    dd { margin: 0; font-size: 0.94rem; }
    @media (min-width: 900px) {
      .about { grid-template-columns: 1.6fr 1fr; gap: 4rem; }
    }
  `,
})
export class About {
  protected readonly t = inject(I18nService).t;
}
