import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Revela un elemento cuando entra al viewport.
 *
 * Usa IntersectionObserver en lugar de escuchar el evento `scroll`: el trabajo
 * lo hace el navegador fuera del hilo principal, así que la página no se
 * entrecorta al desplazarse. Cada elemento se deja de observar en cuanto se
 * revela — no tiene sentido seguir vigilándolo.
 *
 * Si el visitante pidió menos movimiento en su sistema operativo, el elemento
 * aparece de inmediato y el observer nunca se crea.
 */
@Directive({
  selector: '[appReveal]',
  host: { '[style.--reveal-delay.ms]': 'appRevealDelay()' },
})
export class RevealDirective implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  readonly appRevealDelay = input(0);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced || typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-revealed');
        return;
      }

      el.classList.add('reveal');
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-revealed');
            this.observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
