import React from 'react';
import './PlatformPage.css';
import Footer from '../components/Footer';

const PlatformPage: React.FC = () => {
  return (
    <div className="platform-page">
      <div className="platform-header">
        <h1>Bitcoin Books Platform</h1>
        <p className="tagline">Academic Publishing & Decentralized Library Management</p>
      </div>

      <section className="platform-section">
        <h2>What is Bitcoin Books?</h2>
        <p>
          Bitcoin Books is a comprehensive academic publishing and library management platform that combines 
          traditional library science with blockchain technology. Our platform serves both individual users 
          with secure document storage and academic institutions with professional-grade library management, 
          peer review systems, and tokenized research incentives.
        </p>
      </section>

      <section className="platform-section">
        <h2>How It Works</h2>
        <div className="how-it-works-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Personal Document Storage</h3>
            <p>
              Individual users can write and store documents with end-to-end encryption 
              using HandCash authentication for secure, permanent blockchain storage.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Academic Peer Review</h3>
            <p>
              Institutions can manage comprehensive peer review workflows with transparent 
              academic reputation scoring and automated reviewer assignment.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Library Management</h3>
            <p>
              Professional library cataloging with MARC records, circulation management, 
              and multi-institutional collaboration built on the proven Koha foundation.
            </p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Tokenized Publishing</h3>
            <p>
              Academic publications become blockchain tokens with smart contract revenue 
              sharing for authors, reviewers, editors, and institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Encrypted Document Storage</h3>
            <p>Personal documents encrypted client-side with HandCash wallet authentication</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📚</div>
            <h3>Professional Library Management</h3>
            <p>Full Koha ILS integration with MARC cataloging and circulation management</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎓</div>
            <h3>Academic Peer Review</h3>
            <p>Comprehensive peer review workflows with transparent reputation scoring</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💎</div>
            <h3>Tokenized Research</h3>
            <p>Academic publications as blockchain tokens with automated revenue sharing</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚖️</div>
            <h3>Regulatory Compliance</h3>
            <p>Securities law compliant tokenization with court-ordered dissolution mechanisms</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🌐</div>
            <h3>Multi-Institutional</h3>
            <p>Collaborate across institutions with standardized academic workflows</p>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <h2>For Developers</h2>
        <div className="developer-info">
          <h3>Open Source & Decentralized</h3>
          <p>
            Bitcoin Books is built on open-source principles combining the proven Koha library 
            system with modern blockchain technology. Developers can contribute to academic workflows, 
            library management features, or blockchain integration components.
          </p>
          
          <h3>Technical Stack</h3>
          <ul>
            <li><strong>Academic Platform:</strong> Perl, MySQL/MariaDB, Apache (Koha foundation)</li>
            <li><strong>Document App:</strong> React, TypeScript, HandCash Integration</li>
            <li><strong>Blockchain:</strong> Bitcoin SV, Smart Contracts, Tokenization</li>
            <li><strong>Storage:</strong> Encrypted client-side, BSV blockchain</li>
            <li><strong>Libraries:</strong> MARC cataloging, multi-institutional collaboration</li>
          </ul>

          <h3>Dual Licensing</h3>
          <p>
            The platform uses dual licensing: GPL v3 for the core library system (Koha compatibility) 
            and BSV Open License for blockchain components. This ensures both academic standards 
            compliance and patent protection for innovative blockchain features.
          </p>
        </div>
      </section>

      <section className="platform-section">
        <h2>Use Cases</h2>
        <div className="use-cases">
          <div className="use-case">
            <h3>🏛️ Academic Institutions</h3>
            <p>Manage library collections, peer review, and research collaboration with blockchain transparency</p>
          </div>
          <div className="use-case">
            <h3>🎓 Researchers & Academics</h3>
            <p>Publish papers with tokenized incentives, transparent peer review, and reputation scoring</p>
          </div>
          <div className="use-case">
            <h3>📚 Publishers & Editors</h3>
            <p>Streamline academic publishing with automated workflows and smart contract revenue sharing</p>
          </div>
          <div className="use-case">
            <h3>📖 Individual Writers</h3>
            <p>Store personal documents securely with encrypted blockchain storage and wallet authentication</p>
          </div>
          <div className="use-case">
            <h3>🔬 Research Institutions</h3>
            <p>Track funding transparency, collaboration networks, and multi-institutional projects</p>
          </div>
          <div className="use-case">
            <h3>📋 Librarians</h3>
            <p>Professional cataloging, circulation management, and digital preservation on blockchain</p>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <h2>The Vision</h2>
        <p className="vision-text">
          Bitcoin Books reimagines academic publishing and library management for the digital age. 
          By combining the proven excellence of traditional library science with transparent blockchain 
          technology, we're creating a new paradigm where researchers truly own their work, institutions 
          can verify authenticity, and academic collaboration transcends traditional boundaries.
        </p>
        <p className="vision-text">
          Our platform strengthens the legacy publishing industry through innovation rather than disruption, 
          providing both individual researchers and academic institutions with the tools they need for 
          transparent, incentivized, and globally collaborative scholarly communication.
        </p>
      </section>

      <section className="platform-section cta-section">
        <h2>Get Started</h2>
        <p>Join the future of academic publishing and library management</p>
        <div className="cta-buttons">
          <a href="/signup" className="cta-button primary">Sign Up for Updates</a>
          <a href="/docs" className="cta-button secondary">Read Documentation</a>
          <a href="https://github.com/bitcoin-apps-suite/bitcoin-books" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="cta-button secondary">
            View on GitHub
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PlatformPage;