import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { LINKS } from '../core/content';
import { SkillGraph } from './skill-graph';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkillGraph],
  template: `
    <section class="hero" id="top">
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="eyebrow">{{ t().hero.eyebrow }}</p>
          <h1 class="hero__name">{{ t().hero.name }}</h1>
          <p class="hero__headline">{{ t().hero.headline }}</p>
          <p class="hero__lead">{{ t().hero.lead }}</p>

          <div class="hero__cta">
            <a class="btn btn--primary" href="#projects">{{ t().hero.ctaPrimary }}</a>
            <a class="btn btn--ghost" [href]="cv()" download>{{ t().hero.ctaSecondary }}</a>
          </div>
        </div>

        <div class="hero__graph">
          <app-skill-graph />
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      min-height: 100svh;
      display: flex;
      align-items: center;
      padding-block: 7rem 3rem;
    }
    .hero__inner {
      display: grid;
      gap: 2.5rem;
      align-items: center;
    }
    .hero__copy > * {
      animation: rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    }
    /* Entrada escalonada: el ojo sigue el orden de lectura en lugar de recibir
       todo el bloque de golpe. */
    .hero__copy > *:nth-child(1) { animation-delay: 0.05s; }
    .hero__copy > *:nth-child(2) { animation-delay: 0.15s; }
    .hero__copy > *:nth-child(3) { animation-delay: 0.25s; }
    .hero__copy > *:nth-child(4) { animation-delay: 0.35s; }
    .hero__copy > *:nth-child(5) { animation-delay: 0.45s; }

    @keyframes rise {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: none; }
    }

    .hero__name {
      font-size: clamp(2.4rem, 7vw, 4.4rem);
      margin-bottom: 1rem;
    }
    .hero__headline {
      font-family: var(--font-display);
      font-size: clamp(1.05rem, 2.2vw, 1.42rem);
      font-weight: 500;
      line-height: 1.4;
      max-width: 30ch;
      background: var(--grad);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 1.15rem;
    }
    .hero__lead {
      color: var(--text-dim);
      max-width: 52ch;
      margin-bottom: 2rem;
    }
    .hero__cta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }
    .hero__graph {
      position: relative;
      height: clamp(300px, 46vh, 460px);
      animation: fade 1.4s ease 0.4s backwards;
    }
    @keyframes fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @media (min-width: 960px) {
      .hero__inner {
        grid-template-columns: 1.05fr 0.95fr;
        gap: 3rem;
      }
      .hero__graph { height: min(560px, 68vh); }
    }
  `,
})
export class Hero {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected cv(): string {
    return this.i18n.lang() === 'es' ? LINKS.cvEs : LINKS.cvEn;
  }
}
