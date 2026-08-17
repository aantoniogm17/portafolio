import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { LINKS } from '../core/content';

/**
 * Barra superior. Se vuelve opaca al bajar para que el texto siga siendo
 * legible sobre cualquier sección.
 *
 * El botón de idioma muestra el idioma al que vas a cambiar, no el actual:
 * es la convención que menos confunde. El `aria-label` lo dice completo para
 * quien usa lector de pantalla, porque "EN" a secas no significa nada.
 */
@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="nav" [class.nav--scrolled]="scrolled()">
      <div class="container nav__inner">
        <a class="nav__brand" href="#top">
          <span class="nav__mark">AGM</span>
          <span class="nav__name">Antonio García Morán</span>
        </a>

        <nav class="nav__links" [attr.aria-label]="t().nav.about">
          <a href="#about">{{ t().nav.about }}</a>
          <a href="#experience">{{ t().nav.experience }}</a>
          <a href="#projects">{{ t().nav.projects }}</a>
          <a href="#stack">{{ t().nav.stack }}</a>
          <a href="#contact">{{ t().nav.contact }}</a>
        </nav>

        <div class="nav__actions">
          <button
            type="button"
            class="lang"
            (click)="i18n.toggle()"
            [attr.aria-label]="t().nav.toggleLabel">
            <span class="lang__opt" [class.is-on]="i18n.lang() === 'es'">ES</span>
            <span class="lang__sep" aria-hidden="true">/</span>
            <span class="lang__opt" [class.is-on]="i18n.lang() === 'en'">EN</span>
          </button>

          <a class="btn btn--ghost nav__cv" [href]="cv()" download>{{ t().nav.cv }}</a>
        </div>
      </div>
    </header>
  `,
  styles: `
    .nav {
      position: fixed;
      inset: 0 0 auto;
      z-index: 50;
      padding-block: 1rem;
      transition: background 0.3s ease, border-color 0.3s ease, padding 0.3s ease;
      border-bottom: 1px solid transparent;
    }
    .nav--scrolled {
      padding-block: 0.6rem;
      background: rgba(11, 15, 26, 0.82);
      backdrop-filter: blur(14px);
      border-bottom-color: var(--line);
    }
    .nav__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .nav__brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-mono);
      font-size: 0.82rem;
    }
    .nav__mark {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: var(--grad);
      color: #08111b;
      font-weight: 700;
      font-size: 0.66rem;
      letter-spacing: 0.03em;
    }
    .nav__name {
      color: var(--text-dim);
    }
    .nav__links {
      display: none;
      gap: 1.6rem;
      font-size: 0.9rem;
    }
    .nav__links a {
      color: var(--text-dim);
      position: relative;
      transition: color 0.25s ease;
    }
    .nav__links a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      height: 1px;
      width: 0;
      background: var(--grad);
      transition: width 0.3s ease;
    }
    .nav__links a:hover {
      color: var(--text);
    }
    .nav__links a:hover::after {
      width: 100%;
    }
    .nav__actions {
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }
    .lang {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.4rem 0.7rem;
      border: 1px solid var(--line-strong);
      border-radius: 999px;
      background: transparent;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.74rem;
      cursor: pointer;
      transition: border-color 0.25s ease;
    }
    .lang:hover {
      border-color: var(--cyan);
    }
    .lang__opt {
      transition: color 0.25s ease;
    }
    .lang__opt.is-on {
      color: var(--text);
      font-weight: 600;
    }
    .lang__sep {
      opacity: 0.4;
    }
    .nav__cv {
      padding: 0.45rem 1rem;
      font-size: 0.84rem;
    }
    @media (min-width: 900px) {
      .nav__links { display: flex; }
    }
    @media (max-width: 560px) {
      .nav__name { display: none; }
    }
  `,
})
export class Nav {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly scrolled = signal(false);

  protected cv(): string {
    return this.i18n.lang() === 'es' ? LINKS.cvEs : LINKS.cvEn;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}
