import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { localizedEcosystemProducts } from '../../data/ecosystem';

/** A timed, user-pausable reel shown immediately before the docs footer. */
export default function Showcase(): React.JSX.Element {
  const ecosystemProducts = localizedEcosystemProducts();
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
  return <section className="vcp-showcase" aria-label={translate({ id: 'ecosystem.moreFromZaions', message: 'More from Zaions' })} aria-roledescription={translate({ id: 'ecosystem.carousel', message: 'carousel' })}
    onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
    onFocusCapture={() => setActive(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(false); }}>
    <div className="vcp-showcase-inner">
      <div className="vcp-showcase-heading"><div><p className="vcp-eyebrow">{translate({ id: 'ecosystem.sameTeam', message: 'From the same team' })}</p><h2>{translate({ id: 'ecosystem.moreFromZaions', message: 'More from Zaions' })}</h2></div>
        <Link to="/ecosystem">{translate({ id: 'ecosystem.seeAll', message: 'See all products' })} ↗</Link></div>
      <div className="vcp-showcase-rail"><button type="button" aria-label={translate({ id: 'ecosystem.previousProduct', message: 'Previous product' })} onClick={() => move(-1)}>←</button>
        <div className="vcp-showcase-track" ref={track} aria-live={playing ? 'off' : 'polite'}>
          {ecosystemProducts.map((product, position) => <article key={product.id} aria-roledescription={translate({ id: 'ecosystem.slide', message: 'slide' })}
            aria-label={translate({ id: 'ecosystem.positionOf', message: '{position} of {total}' }, { position: position + 1, total: ecosystemProducts.length })}>
            <img src={product.logo} alt="" loading={position ? 'lazy' : 'eager'} width="56" height="56" />
            <div><p className="vcp-showcase-number">{String(position + 1).padStart(2, '0')} / ZAIONS</p>
              <h3><Link to={`/ecosystem/${product.id}`}>{product.name}</Link></h3><p>{product.card}</p>
              <div className="vcp-ecosystem-actions"><a href={product.liveUrl}>{translate({ id: 'ecosystem.visitNamedProduct', message: 'Visit {name}' }, { name: product.name })} ↗</a><Link to={`/ecosystem/${product.id}`}>{translate({ id: 'ecosystem.details', message: 'Details' })} →</Link></div></div>
          </article>)}</div>
        <button type="button" aria-label={translate({ id: 'ecosystem.nextProduct', message: 'Next product' })} onClick={() => move(1)}>→</button></div>
      <div className="vcp-showcase-controls"><button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
        {paused ? translate({ id: 'ecosystem.play', message: 'Play' }) : translate({ id: 'ecosystem.pause', message: 'Pause' })}</button><span>{translate({ id: 'ecosystem.positionOf', message: '{position} of {total}' }, { position: index + 1, total: ecosystemProducts.length })}</span></div>
    </div>
  </section>;
}
