import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Content, DICTIONARY, Lang } from './content';

const STORAGE_KEY = 'portafolio.lang';

/**
 * Traducción con signals.
 *
 * `lang` es la única fuente de verdad. `t` es un computed que deriva de ella,
 * así que cambiar el idioma repinta el sitio entero sin recargar la página,
 * sin suscripciones manuales y sin fugas de memoria.
 *
 * El `effect` sincroniza tres efectos secundarios con el estado: el atributo
 * `lang` del documento (lectores de pantalla y traductores automáticos lo
 * necesitan), el título de la pestaña, y la preferencia guardada.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.initialLang());
  readonly t = computed<Content>(() => DICTIONARY[this.lang()]);
  readonly other = computed<Lang>(() => (this.lang() === 'es' ? 'en' : 'es'));

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.doc.documentElement.lang = DICTIONARY[lang].htmlLang;
      this.doc.title =
        lang === 'es'
          ? 'Antonio García Morán — Desarrollador de software'
          : 'Antonio García Morán — Software developer';
      try {
        this.doc.defaultView?.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Modo privado o almacenamiento bloqueado: el idioma sigue funcionando,
        // solo no se recuerda entre visitas.
      }
    });
  }

  toggle(): void {
    this.lang.set(this.other());
  }

  /**
   * Orden de preferencia: lo que el visitante eligió antes, luego el idioma
   * de su navegador, y español como respaldo.
   */
  private initialLang(): Lang {
    try {
      const saved = this.doc.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      /* sin acceso a localStorage */
    }
    const nav = this.doc.defaultView?.navigator.language ?? 'es';
    return nav.toLowerCase().startsWith('en') ? 'en' : 'es';
  }
}
