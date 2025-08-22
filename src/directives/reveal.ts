import type { DirectiveBinding } from 'vue';

type RevealOptions = {
  rootMargin?: string;   // eg: "0px 0px -10% 0px"
  threshold?: number;    // eg: 0.15
  once?: boolean;        // si true, no hace unobserve
};

const DEFAULTS: Required<RevealOptions> = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15,
  once: true,
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions | undefined>) {
    // Asegura clase base
    el.classList.add('reveal');

    const opts = { ...DEFAULTS, ...(binding.value ?? {}) };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            if (opts.once) {
              io.unobserve(el);
            }
          } else if (!opts.once) {
            el.classList.remove('is-visible');
          }
        });
      },
      { root: null, rootMargin: opts.rootMargin, threshold: opts.threshold }
    );

    // Guarda instancia para cleanup
    (el as any).__revealObserver = io;
    io.observe(el);
  },
  unmounted(el: HTMLElement) {
    const io: IntersectionObserver | undefined = (el as any).__revealObserver;
    if (io) io.unobserve(el);
    delete (el as any).__revealObserver;
  },
};
