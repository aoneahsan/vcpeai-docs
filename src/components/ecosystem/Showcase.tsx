import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { ecosystemProducts } from '../../data/ecosystem';

/** A timed, user-pausable reel shown immediately before the docs footer. */
export default function Showcase(): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const playing = !paused && !active && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!playing || ecosystemProducts.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setIndex((current) => (current + 1) % ecosystemProducts.length);
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    const rail = track.current;
    const slide = rail?.children.item(index);
    if (rail && slide instanceof HTMLElement) {
      rail.scrollBy({ left: slide.getBoundingClientRect().left - rail.getBoundingClientRect().left,
        behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  }, [index, reducedMotion]);

  const move = (delta: number) => setIndex((current) => (current + delta + ecosystemProducts.length) % ecosystemProducts.length);
  return <section className="vcp-showcase" aria-label="More from Zaions" aria-roledescription="carousel"
    onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
    onFocusCapture={() => setActive(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(false); }}>
    <div className="vcp-showcase-inner">
      <div className="vcp-showcase-heading"><div><p className="vcp-eyebrow">From the same team</p><h2>More from Zaions</h2></div>
        <Link to="/ecosystem">See all products ↗</Link></div>
      <div className="vcp-showcase-rail"><button type="button" aria-label="Previous product" onClick={() => move(-1)}>←</button>
        <div className="vcp-showcase-track" ref={track} aria-live={playing ? 'off' : 'polite'}>
          {ecosystemProducts.map((product, position) => <article key={product.id} aria-roledescription="slide"
            aria-label={`${position + 1} of ${ecosystemProducts.length}`}>
            <img src={product.logo} alt="" loading={position ? 'lazy' : 'eager'} width="56" height="56" />
            <div><p className="vcp-showcase-number">{String(position + 1).padStart(2, '0')} / ZAIONS</p>
              <h3><Link to={`/ecosystem/${product.id}`}>{product.name}</Link></h3><p>{product.card}</p>
              <div className="vcp-ecosystem-actions"><a href={product.liveUrl}>Visit {product.name} ↗</a><Link to={`/ecosystem/${product.id}`}>Details →</Link></div></div>
          </article>)}</div>
        <button type="button" aria-label="Next product" onClick={() => move(1)}>→</button></div>
      <div className="vcp-showcase-controls"><button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
        {paused ? 'Play' : 'Pause'}</button><span>{index + 1} of {ecosystemProducts.length}</span></div>
    </div>
  </section>;
}
