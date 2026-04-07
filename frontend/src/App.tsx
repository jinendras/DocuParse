import { useEffect, useState, type ReactNode } from 'react'

type Feature = {
  title: string
  description: string
  icon: ReactNode
}

type FooterGroup = {
  title: string
  links: string[]
}

type Route = 'home' | 'register' | 'login'

const features: Feature[] = [
  {
    title: 'Fast Processing',
    description:
      'Process invoices in seconds with our optimized microservice architecture',
    icon: <LightningIcon />,
  },
  {
    title: 'Async Queue System',
    description:
      'Handle large volumes with our robust asynchronous processing queue',
    icon: <PulseIcon />,
  },
  {
    title: 'Real-time Dashboard',
    description: 'Monitor your invoice processing status with live updates',
    icon: <DocumentIcon />,
  },
  {
    title: 'Secure Authentication',
    description: 'Enterprise-grade security with encrypted data storage',
    icon: <ShieldIcon />,
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '5000+', label: 'Invoices Processed Daily' },
  { value: '<2s', label: 'Average Processing Time' },
]

const footerGroups: FooterGroup[] = [
  { title: 'Product', links: ['Features', 'Pricing', 'API Docs'] },
  { title: 'Company', links: ['About', 'Contact', 'Careers'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security'] },
]

function getRouteFromHash(hash: string): Route {
  if (hash === '#register') {
    return 'register'
  }

  if (hash === '#login') {
    return 'login'
  }

  return 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (route === 'register') {
    return <AuthPage mode="register" />
  }

  if (route === 'login') {
    return <AuthPage mode="login" />
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="DocuParse home">
          <DocumentIcon />
          <span>DocuParse</span>
        </a>

        <nav className="topbar-actions" aria-label="Primary">
          <a className="button button-secondary button-small" href="#login">
            Login
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="hero-kicker">Smart invoice automation for modern teams</p>
            <h1>Automate Your Invoice Processing</h1>
            <p className="hero-description">
              Upload, process, and extract invoice data with a scalable
              microservice system
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#register">
                Get Started
              </a>
              <a className="button button-secondary" href="#login">
                Login
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-glow" />
            <div className="hero-card">
              <DocumentIcon />
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <p className="section-kicker">Built to move fast</p>
            <h2>Powerful Features</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-section">
          <div className="section-heading stats-heading">
            <p className="section-kicker">Why teams pick DocuParse</p>
            <h2>Why Choose DocuParse?</h2>
            <p className="section-description">
              Built for developers and businesses who need reliable, scalable
              invoice processing. Our microservice architecture ensures high
              availability and easy integration.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#home" aria-label="DocuParse home">
              <DocumentIcon />
              <span>DocuParse</span>
            </a>
            <p>Automate your invoice processing with ease</p>
          </div>

          {footerGroups.map((group) => (
            <div className="footer-column" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 DocuParse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function AuthPage({ mode }: { mode: 'register' | 'login' }) {
  const isRegister = mode === 'register'

  return (
    <main className="auth-shell">
      <div className="auth-header">
        <a className="brand auth-brand" href="#home" aria-label="DocuParse home">
          <DocumentIcon />
          <span>DocuParse</span>
        </a>
        <p>{isRegister ? 'Create your account' : 'Sign in to your account'}</p>
      </div>

      <section className="auth-card">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>

        <form className="auth-form">
          {isRegister ? (
            <label className="field">
              <span>Full Name</span>
              <input type="text" placeholder="John Doe" />
            </label>
          ) : null}

          <label className="field">
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label className="field">
            <span>Password</span>
            <input type="password" placeholder="........" />
          </label>

          <button className="button button-primary auth-submit" type="submit">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <a href={isRegister ? '#login' : '#register'}>
            {isRegister ? 'Login here' : 'Sign up here'}
          </a>
        </p>
      </section>
    </main>
  )
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6" strokeLinecap="round" />
      <path d="M9 17h6" strokeLinecap="round" />
      <path d="M9 9h1" strokeLinecap="round" />
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M13 2 4 14h7l-1 8 9-12h-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12h5l2-6 4 12 2-6h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M12 3c2.6 2 5.4 3 8 3v6c0 5-3.4 8.6-8 9-4.6-.4-8-4-8-9V6c2.6 0 5.4-1 8-3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default App
