import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  input,
  viewChild,
} from '@angular/core';

interface Node {
  label: string;
  group: 0 | 1 | 2 | 3;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  icon?: IconSpec;
}

interface IconSpec {
  url: string;
  /** Color de marca del icono, usado en el anillo del nodo y en las aristas que lo tocan. */
  color: string;
  /** Los logos de fondo negro (p. ej. GitHub) son invisibles sobre el relleno oscuro del nodo. */
  invert?: boolean;
  /**
   * 'contain' (por defecto) respeta el logo transparente tal cual.
   * 'cover' se usa para iconos que ya traen su propio fondo cuadrado (p. ej. AWS),
   * así el fondo del icono llena el nodo sin dejar un borde visible.
   */
  fit?: 'contain' | 'cover';
}

/** Color del nodo central (mis iniciales). Cada tecnología usa el color de marca de su icono. */
const CENTER_COLOR = '#E9ECF4';

function devicon(slug: string, variant = 'original'): string {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;
}

/** Iconos tomados de devicon.dev, con su color de marca oficial. */
const ICONS: Record<string, IconSpec> = {
  Angular: { url: devicon('angularjs'), color: '#c4473a' },
  'C#': { url: devicon('csharp'), color: '#68217a' },
  JavaScript: { url: devicon('javascript'), color: '#f0db4f' },
  Ionic: { url: devicon('ionic'), color: '#4e8ef7' },
  Java: { url: devicon('java'), color: '#EA2D2E' },
  Python: { url: devicon('python'), color: '#ffd845' },
  'ASP.NET': { url: devicon('dot-net'), color: '#1384c8' },
  HTML: { url: devicon('html5'), color: '#e54d26' },
  CSS: { url: devicon('css3'), color: '#3d8fc6' },
  'SQL Server': { url: devicon('microsoftsqlserver'), color: '#ee352c' },
  Oracle: { url: devicon('oracle'), color: '#EA1B22' },
  // Devicon solo ofrece el wordmark de AWS (sin marca suelta); el tile de
  // skill-icons trae el logo compacto pensado para insignias cuadradas.
  AWS: { url: 'https://cdn.jsdelivr.net/gh/tandpfun/skill-icons/icons/AWS-Dark.svg', color: '#f90', fit: 'cover' },
  Firebase: { url: devicon('firebase'), color: '#ffa000' },
  Git: { url: devicon('git'), color: '#f34f29' },
  // El octocat de devicon es negro sólido; se invierte a blanco para que se
  // vea sobre el relleno oscuro del nodo (igual que el propio modo oscuro de GitHub).
  GitHub: { url: devicon('github'), color: '#E9ECF4', invert: true },
  'VS Code': { url: devicon('vscode'), color: '#3C99D4' },
  'Visual Studio': { url: devicon('visualstudio'), color: '#52218a' },
  'Android Studio': { url: devicon('androidstudio'), color: '#4285F4' },
};

/**
 * Grafo de fuerzas dibujado en canvas.
 *
 * No es decoración: la maestría de Antonio investiga redes neuronales de
 * grafos, así que el elemento que abre el sitio es un grafo de verdad — nodos,
 * aristas y una simulación de fuerzas (repulsión entre nodos, resortes en las
 * aristas, atracción al centro), no una animación de partículas.
 *
 * Tres cosas que importan más que el efecto visual:
 *  - El canvas se escala por devicePixelRatio, así que no se ve borroso en
 *    pantallas Retina.
 *  - Un IntersectionObserver detiene el bucle cuando el grafo sale de la
 *    pantalla: cero CPU y cero batería mientras nadie lo está viendo.
 *  - Si el sistema pide menos movimiento, se dibuja un solo cuadro estático.
 *
 * El grafo es un adorno del contenido, no el contenido: por eso el canvas
 * lleva `aria-hidden` y la lista real de tecnologías vive en su propia sección.
 */
@Component({
  selector: 'app-skill-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #canvas class="graph" aria-hidden="true"></canvas>
    @if (description()) {
      <p class="sr-only">{{ description() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .graph {
      display: block;
      width: 100%;
      height: 100%;
      cursor: crosshair;
    }
  `,
})
export class SkillGraph implements OnDestroy {
  readonly description = input<string>('');
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private nodes: Node[] = [];
  private edges: [number, number][] = [];
  private frame = 0;
  private hover = -1;
  private running = false;
  private width = 0;
  private height = 0;
  private observer?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private reduced = false;
  private readonly images = new Map<string, HTMLImageElement>();

  constructor() {
    afterNextRender(() => this.setup());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
  }

  // ── Arranque ──────────────────────────────────────────────────────────────

  private setup(): void {
    const canvas = this.canvasRef().nativeElement;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.buildGraph();
    this.resize();

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      if (!this.running) this.draw();
    });
    this.resizeObserver.observe(canvas);

    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerleave', this.onPointerLeave);

    if (this.reduced) {
      // Sin movimiento: se relaja la simulación de golpe y se pinta una vez.
      for (let i = 0; i < 300; i++) this.step();
      this.draw();
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? this.start() : this.stop()),
      { threshold: 0 },
    );
    this.observer.observe(canvas);
  }

  private buildGraph(): void {
    const groups: { items: string[]; group: 0 | 1 | 2 }[] = [
      { group: 0, items: ['Angular', 'C#', 'JavaScript', 'Ionic', 'Java', 'Python', 'ASP.NET', 'HTML', 'CSS'] },
      { group: 1, items: ['SQL Server', 'Oracle', 'AWS', 'Firebase'] },
      { group: 2, items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Android Studio'] },
    ];

    this.nodes = [
      { label: 'AGM', group: 3, x: 0, y: 0, vx: 0, vy: 0, r: 26, color: CENTER_COLOR },
    ];
    this.edges = [];

    for (const { items, group } of groups) {
      const anchorIndex = this.nodes.length;
      items.forEach((label, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 120;
        const icon = ICONS[label];
        this.nodes.push({
          label,
          group,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          r: i === 0 ? 18 : 13,
          color: icon?.color ?? CENTER_COLOR,
          icon,
        });
        if (icon) this.preload(icon.url);
        // El primer elemento de cada grupo cuelga del centro; el resto, de él.
        this.edges.push(i === 0 ? [0, anchorIndex] : [anchorIndex, anchorIndex + i]);
      });
      // Un par de aristas cruzadas para que el grafo no parezca un árbol rígido.
      if (items.length > 3) {
        this.edges.push([anchorIndex + 1, anchorIndex + 2]);
        this.edges.push([anchorIndex + 2, anchorIndex + 3]);
      }
    }
  }

  private preload(url: string): void {
    if (this.images.has(url)) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => { if (!this.running) this.draw(); };
    img.src = url;
    this.images.set(url, img);
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // ── Bucle ─────────────────────────────────────────────────────────────────

  private start(): void {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.step();
      this.draw();
      this.frame = requestAnimationFrame(loop);
    };
    this.frame = requestAnimationFrame(loop);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  /** Un paso de la simulación: repulsión, resortes, centrado y amortiguación. */
  private step(): void {
    const n = this.nodes.length;

    for (let i = 0; i < n; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < n; j++) {
        const b = this.nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist = Math.hypot(dx, dy) || 0.01;
        const min = a.r + b.r + 26;
        const force = (2600 / (dist * dist)) + (dist < min ? (min - dist) * 0.06 : 0);
        dx /= dist;
        dy /= dist;
        a.vx -= dx * force;
        a.vy -= dy * force;
        b.vx += dx * force;
        b.vy += dy * force;
      }
    }

    for (const [i, j] of this.edges) {
      const a = this.nodes[i];
      const b = this.nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.01;
      const rest = i === 0 ? 130 : 84;
      const force = (dist - rest) * 0.012;
      const ux = dx / dist;
      const uy = dy / dist;
      a.vx += ux * force;
      a.vy += uy * force;
      b.vx -= ux * force;
      b.vy -= uy * force;
    }

    const bound = Math.min(this.width, this.height) * 0.42;
    for (let i = 0; i < n; i++) {
      const node = this.nodes[i];
      // El nodo central se queda anclado; el resto orbita a su alrededor.
      if (i === 0) {
        node.x *= 0.9;
        node.y *= 0.9;
        node.vx = node.vy = 0;
        continue;
      }
      node.vx += -node.x * 0.0015;
      node.vy += -node.y * 0.0015;
      node.vx *= 0.86;
      node.vy *= 0.86;
      node.x += node.vx;
      node.y += node.vy;

      const dist = Math.hypot(node.x, node.y);
      if (bound > 0 && dist > bound) {
        node.x = (node.x / dist) * bound;
        node.y = (node.y / dist) * bound;
      }
    }
  }

  // ── Dibujo ────────────────────────────────────────────────────────────────

  private draw(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.translate(this.width / 2, this.height / 2);

    const neighbours = this.neighboursOf(this.hover);

    ctx.lineWidth = 1;
    for (const [i, j] of this.edges) {
      const a = this.nodes[i];
      const b = this.nodes[j];
      const active = this.hover === -1 || neighbours.has(i) || neighbours.has(j);
      const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      gradient.addColorStop(0, a.color);
      gradient.addColorStop(1, b.color);
      ctx.globalAlpha = active ? 0.34 : 0.07;
      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const active = this.hover === -1 || neighbours.has(i);
      const color = node.color;

      ctx.globalAlpha = active ? 1 : 0.18;

      if (i === this.hover) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.16;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(11, 15, 26, 0.92)';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = i === this.hover ? 2 : 1.2;
      ctx.stroke();

      this.drawIcon(ctx, node);

      ctx.fillStyle = node.group === 3 ? color : 'rgba(233, 236, 244, 0.92)';
      ctx.font = `${node.group === 3 ? 600 : 400} ${node.group === 3 ? 13 : 10}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.fillText(node.label, node.x, node.y + node.r + 12);
    }

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  private drawIcon(ctx: CanvasRenderingContext2D, node: Node): void {
    if (!node.icon) return;
    const img = this.images.get(node.icon.url);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r - 2, 0, Math.PI * 2);
    ctx.clip();

    if (node.icon.invert) ctx.filter = 'invert(1)';

    const box = node.r * 1.5;
    const ratio = img.naturalWidth / img.naturalHeight;
    const cover = node.icon.fit === 'cover';
    let w = box;
    let h = box / ratio;
    if (cover ? h < box : h > box) {
      h = box;
      w = box * ratio;
    }
    ctx.drawImage(img, node.x - w / 2, node.y - h / 2, w, h);

    ctx.restore();
  }

  private neighboursOf(index: number): Set<number> {
    const set = new Set<number>();
    if (index < 0) return set;
    set.add(index);
    for (const [i, j] of this.edges) {
      if (i === index) set.add(j);
      if (j === index) set.add(i);
    }
    return set;
  }

  // ── Puntero ───────────────────────────────────────────────────────────────

  private readonly onPointerMove = (event: PointerEvent): void => {
    const rect = this.canvasRef().nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left - this.width / 2;
    const y = event.clientY - rect.top - this.height / 2;

    let found = -1;
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (Math.hypot(node.x - x, node.y - y) <= node.r + 10) {
        found = i;
        break;
      }
    }
    if (found !== this.hover) {
      this.hover = found;
      if (!this.running) this.draw();
    }
  };

  private readonly onPointerLeave = (): void => {
    this.hover = -1;
    if (!this.running) this.draw();
  };
}
