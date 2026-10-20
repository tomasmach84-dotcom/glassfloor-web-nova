/* GLASSFLOOR — společné chování webu (hlavička, odhalování sekcí, mobilní menu).
   Vytaženo z barva-CMYK.html 1. 9. 2026 kvůli sdílení s podstránkami. */
  const hd = document.getElementById('hd');
  const updHd = () => hd.classList.toggle('scrolled', scrollY > 24);
  addEventListener('scroll', updHd, { passive: true });
  addEventListener('load', updHd);
  updHd();
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ---- mobilni menu (25.8.2026 faze 1) ---- */
  const mbtn = document.getElementById('mbtn');
  const mmenu = document.getElementById('mmenu');
  const setMenu = open => {
    hd.classList.toggle('menu-open', open);
    mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  mbtn.addEventListener('click', () => setMenu(!hd.classList.contains('menu-open')));
  mmenu.querySelectorAll('a, .cta').forEach(el => el.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  /* pri prechodu na sirku pocitace menu zavrit, at nezustane viset otevrene */
  const mq = matchMedia('(min-width:941px)');
  const onMq = e => { if (e.matches) setMenu(false); };
  if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);

/* Štítek GLASSFLOOR · Heliobus v pravém dolním rohu fotek, které logo ještě nemají.
   Všude stejně velký (velikost určuje css, ne rozlišení fotky), umístěný přes vlastní prvek,
   takže se nezmění rozložení stránky a při ořezu fotky (cover) zůstane vždy v rohu viditelné části. */
{
  const FOTKY = ['zahrada-vodni-linie', 'zahrada-svetliky-chodnik', 'interier-bazen', 'terasa-tegernsee',
    'pohled-shora-interier', 'interier-pracovna', 'terasa-kruhovy-svetlik', 'terasa-drevo-ctverec',
    'terasa-pure-vyhled', 'interier-pure-jidelna', 'interier-pure-krb', 'chrome-detail-terasa',
    'detail-interier-strop', 'detail-sklo-hrana-vodorovne', 'hero-chrome-mobil', 'hero-pure-mobil', 'hero-circle-mobil', 'varianta-airflow', 'varianta-rwa'];
  const jeZnacena = src => FOTKY.some(n => src.indexOf('/' + n + '.') > -1);
  document.querySelectorAll('img').forEach(img => {
    if (!jeZnacena(img.getAttribute('src') || '')) return;
    const rodic = img.parentElement;
    if (getComputedStyle(rodic).position === 'static') rodic.style.position = 'relative';
    const st = document.createElement('i');
    st.className = 'gf-stitek';
    st.setAttribute('aria-hidden', 'true');
    img.after(st);
    const umisti = () => {
      const w = st.offsetWidth, h = st.offsetHeight, m = parseFloat(getComputedStyle(st).getPropertyValue('--gf-odsazeni')) || 10;
      st.style.left = (img.offsetLeft + img.offsetWidth - w - m) + 'px';
      st.style.top = (img.offsetTop + img.offsetHeight - h - m) + 'px';
    };
    umisti();
    img.addEventListener('load', umisti);
    addEventListener('resize', umisti);
    if (window.ResizeObserver) new ResizeObserver(umisti).observe(img);
  });
}
