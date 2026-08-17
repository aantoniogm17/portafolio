import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';

/**
 * Línea de tiempo. Aquí el orden sí carga información — la secuencia de
 * puestos es el dato — así que la estructura visual es cronológica y no un
 * simple listado de tarjetas.
 */
@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="section" id="experience">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">{{ t().experience.eyebrow }}</p>
          <h2 class="section-title">{{ t().experience.title }}</h2>
        </div>

        <ol class="timeline">
          @for (job of t().experience.jobs; track job.company; let i = $index) {
            <li class="timeline__item" appReveal [appRevealDelay]="i * 90">
              <div class="timeline__marker" aria-hidden="true"></div>
              <p class="timeline__period">{{ job.period }}</p>
              <h3 class="timeline__role">{{ job.role }}</h3>
              <p class="timeline__company">{{ job.company }}</p>
              <ul class="timeline__bullets">
                @for (bullet of job.bullets; track $index) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .timeline {
      position: relative;
      display: grid;
      gap: 2.8rem;
      padding-left: 1.9rem;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 6px;
      bottom: 6px;
      width: 1px;
      background: linear-gradient(180deg, var(--cyan), var(--violet), transparent);
      opacity: 0.45;
    }
    .timeline__item { position: relative; }
    .timeline__marker {
      position: absolute;
      left: -1.9rem;
      top: 7px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--bg);
      border: 1.5px solid var(--cyan);
      transition: box-shadow 0.3s ease, background 0.3s ease;
    }
    .timeline__item:hover .timeline__marker {
      background: var(--cyan);
      box-shadow: 0 0 0 5px rgba(61, 214, 196, 0.14);
    }
    .timeline__period {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      color: var(--text-dim);
      margin-bottom: 0.35rem;
    }
    .timeline__role { font-size: 1.16rem; }
    .timeline__company {
      color: var(--violet);
      font-size: 0.92rem;
      margin-bottom: 0.9rem;
    }
    .timeline__bullets {
      display: grid;
      gap: 0.5rem;
      color: var(--text-dim);
      font-size: 0.94rem;
      max-width: 68ch;
    }
    .timeline__bullets li { position: relative; padding-left: 1.1rem; }
    .timeline__bullets li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 5px;
      height: 1px;
      background: var(--line-strong);
    }
  `,
})
export class Experience {
  protected readonly t = inject(I18nService).t;
}
