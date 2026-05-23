'use client'
import { useEffect } from 'react'

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f5f3ef;
  --white: #ffffff;
  --border: #e8e4de;
  --text: #1a1a1a;
  --muted: #888880;
  --dim: #d0ccc4;
  --accent: #1a7a5e;
  --accent2: #2a6496;
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'DM Sans', sans-serif;
  --mono: 'DM Mono', monospace;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.7;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--dim); }

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 48px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.4s, background 0.4s, backdrop-filter 0.4s;
}
nav.scrolled {
  border-color: var(--border);
  background: rgba(245,243,239,0.92);
  backdrop-filter: blur(20px);
}
.nav-logo {
  font-family: var(--serif);
  font-size: 22px; font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--text); text-decoration: none;
}
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links a {
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--muted); text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--text); }

/* HERO */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}
.hero-left {
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 64px 80px 64px;
}
.hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 48px;
}
.hero-tag::before { content: ''; width: 28px; height: 1px; background: var(--dim); }
.hero-title {
  font-family: var(--serif);
  font-size: clamp(54px, 6vw, 80px);
  font-weight: 300; line-height: 1.05;
  letter-spacing: -0.01em; margin-bottom: 32px;
  color: var(--text);
}
.hero-title em { font-style: italic; color: var(--accent); font-weight: 300; }
.hero-name {
  font-family: var(--serif);
  font-size: 22px; font-weight: 500;
  color: var(--text); margin-bottom: 10px;
}
.hero-bio {
  font-size: 14px; color: var(--muted);
  max-width: 420px; line-height: 1.85; margin-bottom: 10px;
}
.hero-avail {
  font-family: var(--mono); font-size: 11px;
  color: var(--accent); letter-spacing: 0.05em;
  margin-top: 16px; margin-bottom: 48px;
}
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

.btn-primary {
  padding: 13px 28px;
  background: var(--text); color: var(--white);
  border: none; border-radius: 100px;
  font-family: var(--sans); font-size: 13px; font-weight: 500;
  text-decoration: none; cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

.btn-outline {
  padding: 13px 28px;
  background: transparent; color: var(--muted);
  border: 1px solid var(--border); border-radius: 100px;
  font-family: var(--sans); font-size: 13px; font-weight: 500;
  text-decoration: none; cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.btn-outline:hover { border-color: var(--text); color: var(--text); }

/* HERO RIGHT — photo */
.hero-right {
  display: flex; align-items: center; justify-content: center;
  padding: 80px 48px 80px 0;
}
.hero-photo-wrap {
  width: 340px; height: 440px;
  border-radius: 4px; overflow: hidden;
}
.hero-photo-wrap img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: 50% 20%;
  display: block;
  transition: opacity 0.4s;
}
.hero-photo-wrap:hover img { opacity: 0.9; }

/* STATS */
.stats-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 860px; margin: 0 auto;
  padding: 64px 48px;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.stat-number {
  font-family: var(--serif);
  font-size: clamp(48px, 5vw, 72px);
  font-weight: 300; line-height: 1;
  color: var(--text); margin-bottom: 6px;
  font-variant-numeric: lining-nums tabular-nums; 
  letter-spacing: -0.02em; 
}
.stat-label { font-size: 18px; color: var(--muted); }

/* SECTIONS */
.section { max-width: 860px; margin: 0 auto; padding: 80px 48px; }
.section-eyebrow {
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 12px;
}
.section-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 400; line-height: 1.15;
  margin-bottom: 52px; color: var(--text);
}
.section-title span {
  display: inline-block;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 2px;
}
.divider { width: 100%; height: 1px; background: var(--border); }

/* EDUCATION */
.edu-card {
  padding: 36px 0; border-bottom: 1px solid var(--border);
  display: grid; grid-template-columns: 1fr auto;
  gap: 24px; align-items: start;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.5s, transform 0.5s;
}
.edu-card.visible { opacity: 1; transform: none; }
.edu-degree { font-family: var(--serif); font-size: 20px; font-weight: 500; margin-bottom: 3px; }
.edu-school { color: var(--muted); font-size: 13px; margin-bottom: 16px; }
.edu-period { font-family: var(--mono); font-size: 11px; color: var(--muted); white-space: nowrap; }
.edu-details { list-style: none; }
.edu-details li {
  font-size: 13px; color: var(--muted); line-height: 1.7;
  padding: 3px 0 3px 14px; position: relative;
}
.edu-details li::before { content: '–'; position: absolute; left: 0; color: var(--dim); }

/* EXPERIENCE */
.exp-card {
  padding: 36px 0; border-bottom: 1px solid var(--border);
  display: grid; grid-template-columns: 160px 1fr; gap: 40px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.5s, transform 0.5s;
}
.exp-card.visible { opacity: 1; transform: none; }
.exp-period { font-family: var(--mono); font-size: 11px; color: var(--accent); margin-bottom: 6px; }
.exp-org { font-size: 12px; color: var(--muted); line-height: 1.5; }
.exp-title { font-family: var(--serif); font-size: 19px; font-weight: 500; margin-bottom: 14px; }
.exp-bullets { list-style: none; }
.exp-bullets li {
  font-size: 13px; color: var(--muted); line-height: 1.7;
  padding: 2px 0 2px 14px; position: relative;
}
.exp-bullets li::before { content: '–'; position: absolute; left: 0; color: var(--dim); }

/* SKILLS */
.skills-grid { display: flex; flex-direction: column; }
.skill-row {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 32px; padding: 20px 0;
  border-bottom: 1px solid var(--border); align-items: start;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s, transform 0.5s;
}
.skill-row.visible { opacity: 1; transform: none; }
.skill-label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); padding-top: 4px; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag {
  padding: 5px 14px;
  border: 1px solid var(--border); border-radius: 100px;
  font-size: 12px; color: var(--text);
  background: var(--white);
  transition: border-color 0.2s, color 0.2s; cursor: default;
}
.skill-tag:hover { border-color: var(--accent); color: var(--accent); }

/* LANGUAGES */
.lang-grid {
  display: grid; grid-template-columns: repeat(5, 1fr);
  gap: 16px; margin-top: 48px;
}
.lang-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px 16px;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s, transform 0.5s;
}
.lang-card.visible { opacity: 1; transform: none; }
.lang-card:hover { border-color: var(--accent); }
.lang-name { font-family: var(--serif); font-size: 18px; font-weight: 500; margin-bottom: 4px; }
.lang-fluent .lang-name { color: var(--accent); }
.lang-level { font-size: 11px; color: var(--muted); font-family: var(--mono); }

/* CERTIFICATIONS */
.cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cert-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px;
  font-size: 13px; color: var(--muted); line-height: 1.6;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s, transform 0.5s;
}
.cert-card.visible { opacity: 1; transform: none; }

/* CONTACT */
.contact-section {
  max-width: 860px; margin: 0 auto;
  padding: 100px 48px; text-align: center;
}
.contact-title {
  font-family: var(--serif);
  font-size: clamp(40px, 4.5vw, 60px);
  font-weight: 300; line-height: 1.1; margin-bottom: 16px;
}
.contact-title em { font-style: italic; color: var(--accent); }
.contact-sub { color: var(--muted); font-size: 14px; margin-bottom: 40px; }
.contact-links { display: flex; gap: 12px; justify-content: center; }

/* FOOTER */
footer {
  border-top: 1px solid var(--border);
  padding: 28px 48px;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-name { font-family: var(--serif); font-size: 14px; color: var(--muted); }
.footer-note { font-size: 12px; color: var(--dim); font-family: var(--mono); }

/* ANIMATIONS */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}
.hero-tag   { animation: fadeUp 0.7s 0.1s both; }
.hero-title { animation: fadeUp 0.7s 0.2s both; }
.hero-name  { animation: fadeUp 0.7s 0.32s both; }
.hero-bio   { animation: fadeUp 0.7s 0.4s both; }
.hero-avail { animation: fadeUp 0.7s 0.48s both; }
.hero-btns  { animation: fadeUp 0.7s 0.56s both; }

@media (max-width: 768px) {
  nav { padding: 16px 24px; }
  .hero { grid-template-columns: 1fr; }
  .hero-left { padding: 96px 24px 32px; }
  .hero-right { padding: 0 24px 48px; justify-content: flex-start; }
  .hero-photo-wrap { width: 100%; height: 56vw; }
  .stats-row { grid-template-columns: 1fr; gap: 28px; padding: 48px 24px; }
  .section { padding: 56px 24px; }
  .exp-card { grid-template-columns: 1fr; gap: 8px; }
  .skill-row { grid-template-columns: 1fr; gap: 10px; }
  .lang-grid { grid-template-columns: repeat(2, 1fr); }
  .cert-grid { grid-template-columns: 1fr; }
  footer { flex-direction: column; gap: 8px; text-align: center; padding: 24px; }
}
`

export default function Home() {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const nav = document.getElementById('main-nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'))
    }, 800)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const skills = [
    { label: 'Data & Computing', tags: ['Python', 'Machine Learning', 'Data Analysis', 'Statistical Analysis', 'Tableau', 'Microsoft Power BI', 'Origin Lab', 'Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint'] },
    { label: 'Engineering & Process', tags: ['Chemical Engineering', 'Process Engineering', 'Thermodynamics', 'Heat & Mass Transfer', 'Aspen Plus', 'Environmental Engineering', 'Wastewater Treatment', 'Food Science', 'Waste Management', 'Product Stewardship'] },
    { label: 'Biomedical & Lab', tags: ['Nanoindentation', 'Microindentation', 'Fluorescence Spectroscopy', 'Absorbance Spectroscopy', 'Medical Imaging', 'Optical Coherence Tomography', 'Functional Materials', 'Semiconductor', 'Nanotechnology', 'Nanomaterials', 'Biomedical Devices', 'Laboratory Skills', 'Analytical Skills'] },
    { label: 'Computational', tags: ['Computational Chemistry', 'Computational Modelling', 'Autodock', 'Gaussian / GaussView', 'Discovery Studio Visualizer', 'Drug Discovery', 'Drug Disposition & Kinetics'] },
    { label: 'Quality & Regulatory', tags: ['GMP', 'ISO 13485', 'ISO 14971', 'IEC 60601', 'IEC 62366', 'FMEA', 'Fault Tree Analysis', 'CAPA', 'Six Sigma', 'Lean / Kaizen', 'DOE', 'SPC'] },
    { label: 'Project & Leadership', tags: ['Project Management', 'Cross-functional Team Leadership', 'Critical Thinking', 'Problem Solving', 'Time Management', 'Cross-Cultural Communication', 'Cultural Awareness', 'Teamwork', 'Communication'] },
  ]

  const languages = [
    { name: 'Thai', level: 'Native', fluent: true },
    { name: 'English', level: 'IELTS 6.5 · TOEIC 830', fluent: true },
    { name: 'Korean', level: 'Elementary', fluent: false },
    { name: 'Japanese', level: 'Elementary', fluent: false },
    { name: 'Chinese', level: 'Elementary', fluent: false },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav id="main-nav">
        <a href="#" className="nav-logo">Ploy</a>
        <ul className="nav-links">
          <li><a href="#education">Education</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">Medical Engineering · Chemical Engineering</div>
          <h1 className="hero-title">
            Engineering at the<br />
            <em>intersection</em> of<br />
            science and data
          </h1>
          <p className="hero-name">Waraitip Laosangprateep</p>
          <p className="hero-bio">
            Master&apos;s in Medical Engineering at University of Auckland,
            with a foundation in Chemical Engineering from Thammasat University (SIIT).
            Research experience across New Zealand, Taiwan, and Thailand.
          </p>
          <p className="hero-bio">
            Passionate about cross-cultural exchange — professionally fluent in Thai and English,
            with basic knowledge of Korean, Japanese, and Chinese.
          </p>
          <p className="hero-avail">
            Available from 16 August 2026 · Open to Thailand, Singapore &amp; beyond
          </p>
          <div className="hero-btns">
            <a href="#experience" className="btn-primary">View my work</a>
            <a href="#contact" className="btn-outline">Get in touch</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-photo-wrap">
            <img src="/ploy.jpg" alt="Ploy" />
          </div>
        </div>
      </section>
        
      <div className="stats-row">
          {[
  { number: '2', label: 'Engineering degrees' },
  { number: '3', label: 'Countries researched in' },
  { number: '2 + 3', label: 'Languages' },
      ].map((s, i) => (
  <div key={i} className="animate-on-scroll" style={{transitionDelay:`${i*0.15}s`}}>
    <div className="stat-number">{s.number}</div>
    <div className="stat-label">{s.label}</div>
      </div>
          ))}
      </div>

      <div className="divider" />

      {/* EDUCATION */}
      <section className="section" id="education">
        <p className="section-eyebrow">Academic background</p>
        <h2 className="section-title"><span>Education</span></h2>
        <div className="edu-card animate-on-scroll">
          <div>
            <h3 className="edu-degree">Master of Medical Engineering</h3>
            <p className="edu-school">University of Auckland · New Zealand</p>
            <ul className="edu-details">
              <li>Thesis: Mechanical characterisation of growth plate structures using microindentation techniques</li>
              <li>Coursework: Advanced Functional Materials · Semiconductor &amp; Materials Science · Medical Device &amp; Technology Development · Advanced Imaging (OCT, MRI, Ultrasound) · Machine Learning for Biomedical Applications · Engineering Project Management · Drug Disposition &amp; Kinetics · Waste Management · Product Stewardship</li>
            </ul>
          </div>
          <span className="edu-period">2025 – 2026</span>
        </div>
        <div className="edu-card animate-on-scroll" style={{transitionDelay:'0.12s'}}>
          <div>
            <h3 className="edu-degree">Bachelor of Engineering — Chemical Engineering</h3>
            <p className="edu-school">Thammasat University (SIIT) · Thailand</p>
            <ul className="edu-details">
              <li>GPA: 3.22 / 4.00 · International Programme, full English instruction</li>
              <li>Senior Project: Theoretical study on butylone inclusion complexes with β-cyclodextrin — presented at PACCON 2024</li>
              <li>Coursework: Chemical Reaction Engineering · Process Design · Thermodynamics · Heat &amp; Mass Transfer · Fluid Mechanics · Environmental Engineering · Wastewater Treatment · Food Science · Aspen Plus · Computational Chemistry · Molecular Docking (Autodock, Gaussian)</li>
            </ul>
          </div>
          <span className="edu-period">2020 – 2024</span>
        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <p className="section-eyebrow">Work &amp; Research</p>
        <h2 className="section-title"><span>Experience</span></h2>
        <div className="exp-card animate-on-scroll">
          <div><p className="exp-period">2025 – Present</p><p className="exp-org">University of Auckland</p></div>
          <div>
            <h3 className="exp-title">Master&apos;s Thesis Researcher</h3>
            <ul className="exp-bullets">
              <li>Performed nanoindentation and microindentation mechanical testing on biological tissue samples across growth plate sub-structures</li>
              <li>Applied critical analysis to reconcile conflicting experimental data and form evidence-based conclusions</li>
              <li>Developed expertise in precision instrumentation, sample preparation, and quantitative data interpretation</li>
            </ul>
          </div>
        </div>
        <div className="exp-card animate-on-scroll" style={{transitionDelay:'0.1s'}}>
          <div><p className="exp-period">Jun – Jul 2023</p><p className="exp-org">Academia Sinica, Taiwan</p></div>
          <div>
            <h3 className="exp-title">Research Intern — SWCNTs Defect Characterisation</h3>
            <ul className="exp-bullets">
              <li>Conducted independent experiments on SWCNTs using absorbance and fluorescence spectroscopy for cancer diagnostic applications</li>
              <li>Designed and executed DOE-style experiments; analysed spectral data using Origin Lab</li>
              <li>Gained proficiency in nanomaterial characterisation, medical imaging principles, and precision instrumentation</li>
            </ul>
          </div>
        </div>
        <div className="exp-card animate-on-scroll" style={{transitionDelay:'0.2s'}}>
          <div><p className="exp-period">2024 – 2026</p><p className="exp-org">Auckland, New Zealand</p></div>
          <div>
            <h3 className="exp-title">Customer Service &amp; Operations</h3>
            <ul className="exp-bullets">
              <li>Retail and food service across Lily&apos;s Collection, Blue Elephant, Mi&amp;Chi, Khao San Eatery, and The Coffee Club</li>
              <li>Developed cross-cultural communication, multitasking, and creative problem-solving in fast-paced environments</li>
              <li>Operated POS systems, cash handling, and inter-departmental cooperation</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS + LANGUAGES */}
      <section className="section" id="skills">
        <p className="section-eyebrow">Capabilities</p>
        <h2 className="section-title"><span>Skills</span></h2>
        <div className="skills-grid">
          {skills.map((row, i) => (
            <div key={i} className="skill-row animate-on-scroll" style={{transitionDelay:`${i*0.05}s`}}>
              <span className="skill-label">{row.label}</span>
              <div className="skill-tags">
                {row.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="lang-grid">
          {languages.map((l, i) => (
            <div key={i} className={`lang-card animate-on-scroll${l.fluent ? ' lang-fluent' : ''}`} style={{transitionDelay:`${i*0.08}s`}}>
              <div className="lang-name">{l.name}</div>
              <div className="lang-level">{l.level}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CERTIFICATIONS */}
      <section className="section">
        <p className="section-eyebrow">Credentials</p>
        <h2 className="section-title"><span>Certifications</span></h2>
        <div className="cert-grid">
          {[
            'Google Data Analysis with Python Specialization',
            'Poster Presentation — PACCON 2024 (Pure and Applied Chemistry International Conference)',
            'Internship Certificate — Academia Sinica, Institute of Atomic and Molecular Sciences, Taiwan',
          ].map((c, i) => (
            <div key={i} className="cert-card animate-on-scroll" style={{transitionDelay:`${i*0.1}s`}}>{c}</div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <p className="section-eyebrow" style={{marginBottom:'16px'}}>Let&apos;s connect</p>
        <h2 className="contact-title">Let&apos;s <em>work</em> together</h2>
        <p className="contact-sub">Open to opportunities in Thailand, Singapore, and beyond · Available from August 2026</p>
        <div className="contact-links">
          <a href="mailto:Waraitip.l26@gmail.com" className="btn-primary">Email me →</a>
          <a href="https://www.linkedin.com/in/waraitip-laosangprateep-b33933388" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
        </div>
      </section>

      <footer>
        <span className="footer-name">Waraitip Laosangprateep</span>
        <span className="footer-note">Auckland, New Zealand · 2026</span>
      </footer>
    </>
  )
}