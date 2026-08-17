import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="section" id="projects">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">{{ t().projects.eyebrow }}</p>
          <h2 class="section-title">{{ t().projects.title }}</h2>
        </div>

        <div class="grid">
          @for (project of t().projects.items; track project.name; let i = $index) {
            <article class="card project" appReveal [appRevealDelay]="i * 110">
              <header class="project__head">
                <h3 class="project__name gradient-text">{{ project.name }}</h3>
                <p class="project__tagline">{{ project.tagline }}</p>
              </header>

              <p class="project__summary">{{ project.summary }}</p>

              <h4 class="project__label">{{ t().projects.roleLabel }}</h4>
              <ul class="project__list">
                @for (item of project.contributions; track $index) {
                  <li>{{ item }}</li>
                }
              </ul>

              <h4 class="project__label">{{ t().projects.stackLabel }}</h4>
              <ul class="project__chips">
                @for (item of project.stack; track item) {
                  <li class="chip">{{ item }}</li>
                }
              </ul>

              <p class="project__note">{{ project.note }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; gap: 1.5rem; }
    .project__name { font-size: 1.7rem; }
    .project__tagline {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      letter-spacing: 0.08em;
      color: var(--text-dim);
      margin-block: 0.3rem 1.2rem;
    }
    .project__summary { color: var(--text-dim); max-width: 66ch; margin-bottom: 1.6rem; }
    .project__label {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--amber);
      margin: 0 0 0.75rem;
      font-weight: 500;
    }
    .project__list {
      display: grid;
      gap: 0.45rem;
      color: var(--text-dim);
      font-size: 0.92rem;
      margin-bottom: 1.6rem;
      max-width: 66ch;
    }
    .project__list li { position: relative; padding-left: 1.05rem; }
    .project__list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.62em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--cyan);
      opacity: 0.7;
    }
    .project__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-bottom: 1.5rem;
    }
    .project__note {
      font-size: 0.8rem;
      color: var(--text-dim);
      opacity: 0.75;
      border-top: 1px solid var(--line);
      padding-top: 1rem;
    }
  `,
})
export class Projects {
  protected readonly t = inject(I18nService).t;
}
