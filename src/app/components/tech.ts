import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'app-tech',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="section" id="stack">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">{{ t().tech.eyebrow }}</p>
          <h2 class="section-title">{{ t().tech.title }}</h2>
        </div>

        <div class="groups">
          @for (group of t().tech.groups; track group.label; let i = $index) {
            <div class="group" appReveal [appRevealDelay]="i * 100">
              <h3 class="group__label">{{ group.label }}</h3>
              <ul class="group__items">
                @for (item of group.items; track item) {
                  <li class="chip">{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .groups { display: grid; gap: 2.2rem; }
    .group__label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 1rem;
      padding-bottom: 0.7rem;
      border-bottom: 1px solid var(--line);
    }
    .group__items { display: flex; flex-wrap: wrap; gap: 0.55rem; }
    @media (min-width: 860px) {
      .groups { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
    }
  `,
})
export class Tech {
  protected readonly t = inject(I18nService).t;
}
