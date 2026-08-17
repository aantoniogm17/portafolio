import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from './core/i18n.service';
import { Nav } from './components/nav';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Experience } from './components/experience';
import { Projects } from './components/projects';
import { Tech } from './components/tech';
import { Contact } from './components/contact';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Nav, Hero, About, Experience, Projects, Tech, Contact],
  template: `
    <a class="skip-link" href="#main">{{ t().nav.skipToContent }}</a>

    <app-nav />

    <main id="main">
      <app-hero />
      <app-about />
      <app-experience />
      <app-projects />
      <app-tech />
      <app-contact />
    </main>
  `,
})
export class App {
  protected readonly t = inject(I18nService).t;
}
