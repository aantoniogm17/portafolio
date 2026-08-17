import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { LINKS } from '../core/content';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="section" id="contact">
      <div class="container contact" appReveal>
        <p class="eyebrow">{{ t().contact.eyebrow }}</p>
        <h2 class="section-title contact__title">{{ t().contact.title }}</h2>
        <p class="contact__lead">{{ t().contact.lead }}</p>

        <a class="contact__mail gradient-text" [href]="links.mailto">{{ links.email }}</a>

        <div class="contact__meta">
          <span class="contact__where">{{ t().contact.locationLabel }} — {{ t().contact.location }}</span>
        </div>

        <div class="contact__actions">
          <a class="btn btn--primary" [href]="links.cvEs" download>{{ t().contact.cvEs }}</a>
          <a class="btn btn--ghost" [href]="links.cvEn" download>{{ t().contact.cvEn }}</a>
          <a class="btn btn--ghost" [href]="links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a class="btn btn--ghost" [href]="links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer__inner">
        <span>© {{ t().footer.year }} Antonio García Morán</span>
        <span>{{ t().footer.built }}</span>
      </div>
    </footer>
  `,
  styles: `
    .contact__title { margin-bottom: 1rem; }
    .contact__lead { color: var(--text-dim); max-width: 50ch; margin-bottom: 2rem; }
    .contact__mail {
      display: inline-block;
      font-family: var(--font-display);
      font-size: clamp(1.2rem, 3.6vw, 2.1rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      word-break: break-word;
    }
    .contact__meta {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      color: var(--text-dim);
      margin-block: 1rem 2.2rem;
    }
    .contact__actions { display: flex; flex-wrap: wrap; gap: 0.7rem; }
    .footer {
      border-top: 1px solid var(--line);
      padding-block: 2rem;
    }
    .footer__inner {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem 1.5rem;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      color: var(--text-dim);
    }
  `,
})
export class Contact {
  protected readonly t = inject(I18nService).t;
  protected readonly links = LINKS;
}
