import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flower2, DollarSign, Cpu, GraduationCap, Users, Wrench, Zap } from 'lucide-react';
import './GrantsPage.css';
import Footer from '../components/Footer';

const GrantsPage: React.FC = () => {
  const [devSidebarCollapsed, setDevSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('devSidebarCollapsed');
    return saved === 'true';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    
    const checkSidebarState = setInterval(() => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
      clearInterval(checkSidebarState);
    };
  }, []);

  return (
    <div className="App">
      <div className={`grants-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
        <div className="grants-container">
          {/* Hero Section */}
          <section className="grants-hero">
            <div className="grants-hero-icon">
              <Flower2 size={64} />
            </div>
            <h1>Bitcoin Books <span style={{color: '#007AFF'}}>Grants</span></h1>
            <p className="grants-tagline">
              $BWRITER token awards for quality book submissions, plus public discovery platform for independent funding
            </p>
            <div className="grants-badge">DUAL FUNDING PLATFORM</div>
          </section>

          {/* Dual System Section */}
          <section className="mission-section">
            <h2>Two Paths to Funding</h2>
            <div className="mission-content">
              <p className="mission-statement">
                Bitcoin Books creates <strong>a unique funding ecosystem</strong> where quality literary and educational work gets recognized through 
                $BWRITER token awards and becomes discoverable for potential independent funding:
              </p>
              
              <div className="mission-pillars">
                <div className="pillar">
                  <div className="pillar-icon"><DollarSign size={32} /></div>
                  <h3>Bitcoin Books Curation</h3>
                  <p><strong>$BWRITER token awards for quality literary work</strong><br/>
                  We review book proposals and award $BWRITER tokens to exceptional literary works, signaling their quality to the broader ecosystem.</p>
                </div>
                <div className="pillar">
                  <div className="pillar-icon"><Flower2 size={32} /></div>
                  <h3>Public Discovery Platform</h3>
                  <p><strong>Independent funding through public discovery</strong><br/>
                  All submissions become publicly viewable with funding addresses, enabling direct discovery and independent funding.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Focus Areas */}
          <section className="focus-section">
            <h2>Focus Areas for Both Programs</h2>
            <div className="focus-content">
              <p className="focus-intro">
                Our platform showcases exceptional literary and educational work across key innovation areas. Bitcoin Books awards $BWRITER tokens 
                to signal quality, while independent funders can discover and support book projects that align with their values:
              </p>
              
              <div className="focus-areas">
                <div className="focus-area">
                  <div className="focus-area-icon"><Wrench size={24} /></div>
                  <h4>Bitcoin Books Platform Development</h4>
                  <ul>
                    <li>Enhance book marketplace functionality and reader experience</li>
                    <li>Create innovative book monetization and publishing features</li>
                    <li>Develop educational reading tools and resources</li>
                    <li>Build integrations with literary and educational platforms</li>
                  </ul>
                  <div style={{marginTop: '10px', fontSize: '12px', color: '#007AFF'}}>
                    Bitcoin Books awards $BWRITER for platform and marketplace improvements
                  </div>
                </div>
                
                <div className="focus-area">
                  <div className="focus-area-icon"><Zap size={24} /></div>
                  <h4>BSV Ecosystem Infrastructure</h4>
                  <ul>
                    <li>Demonstrate real-world blockchain applications</li>
                    <li>Create developer tools and infrastructure</li>
                    <li>Research scalability and efficiency improvements</li>
                    <li>Build bridges to traditional industries</li>
                  </ul>
                  <div style={{marginTop: '10px', fontSize: '12px', color: '#007AFF'}}>
                    Independent funders may support infrastructure projects
                  </div>
                </div>
                
                <div className="focus-area">
                  <div className="focus-area-icon"><GraduationCap size={24} /></div>
                  <h4>STEM Education & Research</h4>
                  <ul>
                    <li>Develop interactive STEM learning platforms</li>
                    <li>Create open educational resources</li>
                    <li>Build tools for educators and researchers</li>
                    <li>Enable new forms of academic publishing</li>
                  </ul>
                  <div style={{marginTop: '10px', fontSize: '12px', color: '#007AFF'}}>
                    $BWRITER curation signals attract funder attention
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Grant Categories */}
          <section className="categories-section">
            <h2>Apply by Role</h2>
            <p className="categories-intro">
              Choose your application path below. Submit your book or platform proposal as a public .nft file, compete for $BWRITER token awards, 
              and become discoverable for potential independent funding:
            </p>
            
            <div className="categories-grid">
              <Link to="/developers/grants" className="category-card developer-card">
                <div className="category-header">
                  <h3><Cpu size={20} style={{marginRight: '8px', verticalAlign: 'middle'}} />Developer Grants</h3>
                  <div className="category-badge">APPLY NOW</div>
                </div>
                <p>
                  Building the infrastructure, tools, and applications that power the future of decentralized book publishing and literary platforms.
                </p>
                <div className="category-details">
                  <div className="detail">Publishing Infrastructure</div>
                  <div className="detail">Reading Platform Innovation</div>
                  <div className="detail">Book Publishing Tools</div>
                  <div className="detail">Literary Research Projects</div>
                </div>
                <div className="category-cta">View Developer Opportunities →</div>
              </Link>

              <Link to="/authors/grants" className="category-card author-card">
                <div className="category-header">
                  <h3><Users size={20} style={{marginRight: '8px', verticalAlign: 'middle'}} />Author Grants</h3>
                  <div className="category-badge">APPLY NOW</div>
                </div>
                <p>
                  Creating educational books, documentation, and literary research that advances knowledge and understanding.
                </p>
                <div className="category-details">
                  <div className="detail">Educational Books</div>
                  <div className="detail">Technical Literature</div>
                  <div className="detail">Research Publications</div>
                  <div className="detail">Learning Materials</div>
                </div>
                <div className="category-cta">View Writing Opportunities →</div>
              </Link>

              <Link to="/publishers/grants" className="category-card publisher-card">
                <div className="category-header">
                  <h3><Flower2 size={20} style={{marginRight: '8px', verticalAlign: 'middle'}} />Publisher Grants</h3>
                  <div className="category-badge">APPLY NOW</div>
                </div>
                <p>
                  Scaling book platforms, distribution networks, and publishing infrastructure for the decentralized literary future.
                </p>
                <div className="category-details">
                  <div className="detail">Book Platform Development</div>
                  <div className="detail">Literary Distribution</div>
                  <div className="detail">Book Publishing Innovation</div>
                  <div className="detail">Publishing Infrastructure Scaling</div>
                </div>
                <div className="category-cta">View Publisher Opportunities →</div>
              </Link>
            </div>
          </section>

          {/* Impact Section */}
          <section className="impact-section">
            <h2>Creating Lasting Impact</h2>
            <div className="impact-content">
              <p>
                Independent funding sources believe in nurturing literary ideas that bloom into transformative books and educational 
                resources. Grants support book projects that:
              </p>
              
              <div className="impact-points">
                <div className="impact-point">
                  <div className="impact-point-icon"><Flower2 size={24} /></div>
                  <h4>Plant Seeds of Literary Innovation</h4>
                  <p>Support early-stage book projects and educational content that could reshape entire industries</p>
                </div>
                <div className="impact-point">
                  <div className="impact-point-icon"><Zap size={24} /></div>
                  <h4>Foster Literary Growth</h4>
                  <p>Provide resources and mentorship to help promising book projects reach their full potential</p>
                </div>
                <div className="impact-point">
                  <div className="impact-point-icon"><GraduationCap size={24} /></div>
                  <h4>Enable Literary Flourishing</h4>
                  <p>Create sustainable ecosystems where book publishing, education, and collaboration thrive</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta-section">
            <div className="cta-content">
              <Flower2 size={48} />
              <h2>Ready to Make Your Mark?</h2>
              <p>
                Apply for Bitcoin Books grants to support your innovative projects in blockchain-based book publishing and literary development. 
                Whether you're a developer pushing technical boundaries, an author creating educational content, or a publisher scaling book platforms—
                submit your proposal for $BWRITER token grant consideration.
              </p>
              <div className="cta-buttons">
                <Link to="/developers/grants" className="cta-button developer">
                  Apply as Developer
                </Link>
                <Link to="/authors/grants" className="cta-button author">
                  Apply as Author
                </Link>
                <Link to="/publishers/grants" className="cta-button publisher">
                  Apply as Publisher
                </Link>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <section className="footer-note">
            <p>
              <strong>Note:</strong> Bitcoin Books awards grants in $BWRITER tokens to support innovative book and literary projects. 
              Applications are reviewed on a rolling basis, with priority given to projects that demonstrate 
              clear potential for advancing BSV blockchain technology and decentralized book publishing.
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default GrantsPage;