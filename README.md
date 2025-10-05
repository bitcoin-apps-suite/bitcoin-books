# Bitcoin Books - Academic Publishing & Decentralized Library Platform

Bitcoin Books combines a comprehensive academic publishing platform with decentralized document storage, built on Bitcoin SV blockchain technology. The platform serves both individual users and academic institutions with secure, encrypted document management and a full-featured library management system.

## Platform Overview

### 📚 **Academic Library Management** (Koha Foundation)
Professional-grade library management system for institutions, researchers, and publishers.

### 📝 **Personal Document Storage** (HandCash Integration)  
Secure, encrypted document storage and editing for individual users.

## Core Features

### Academic Publishing Platform
- **Peer Review Management**: Comprehensive workflow for academic peer review
- **Academic Reputation System**: Tokenized reputation scoring for researchers
- **Publication Lifecycle**: From submission to publication with blockchain verification
- **Research Collaboration**: Multi-institutional research project management
- **Regulatory Compliance**: Securities law compliant tokenization framework

### Library Management (Koha Foundation)
- **Cataloging & Circulation**: Professional library cataloging with MARC records
- **User Management**: Role-based permissions for institutions
- **Reports & Analytics**: Comprehensive reporting and analytics dashboard
- **Multi-language Support**: International library standards compliance

### Personal Document Storage
- 🔒 **Encrypted Storage**: All documents encrypted before blockchain storage
- 🔑 **HandCash Authentication**: Secure wallet-based login
- 🌐 **Access Anywhere**: Cross-device document synchronization
- 💎 **Permanent Storage**: Immutable storage on Bitcoin SV
- ✍️ **Rich Editor**: Distraction-free writing with image support
- 💾 **Auto-save**: Automatic document saving

### Blockchain Integration (BSV)
- **Tokenized Research**: Academic publications as blockchain tokens
- **Smart Contracts**: Automated revenue sharing for authors/reviewers
- **Transparent Funding**: Immutable research funding records
- **Court-Compliant**: Regulatory dissolution mechanisms

## Technology Stack

### Academic Platform
- **Backend**: Perl, MySQL/MariaDB
- **Frontend**: HTML5, CSS3, JavaScript
- **Server**: Apache HTTP Server
- **License**: GNU GPL v3

### Document Storage App
- **Frontend**: React with TypeScript
- **Authentication**: HandCash OAuth2 REST API
- **Encryption**: AES encryption via CryptoJS
- **State Management**: React hooks

### Blockchain Layer
- **Blockchain**: Bitcoin SV (BSV)
- **Smart Contracts**: BSV-native contract system
- **License**: BSV Open License v5

## Getting Started

### Academic Platform
Institutional deployment with Koha foundation - detailed installation guide coming soon.

### Personal Document App

#### Prerequisites
- Node.js (v16 or later)
- HandCash wallet and developer account
- HandCash App ID from [Developer Dashboard](https://app.handcash.io/developers)

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bitcoin-apps-suite/bitcoin-books.git
   cd bitcoin-books
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your HandCash configuration:
   ```
   REACT_APP_HANDCASH_APP_ID=your_handcash_app_id_here
   REACT_APP_HANDCASH_REDIRECT_URL=http://localhost:3000/auth/handcash/callback
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

### Deployment

Deploy to any static hosting service like Vercel, Netlify, or GitHub Pages.

For Vercel:
```bash
npm install -g vercel
vercel
```

## Architecture

### Academic Platform Architecture
```
┌─────────────────────────────────────┐
│        Bitcoin Books Core          │  ← GPL v3 License
│    (Koha + Academic Workflows)     │
├─────────────────────────────────────┤
│       Integration API Layer        │  ← Bridge Layer
├─────────────────────────────────────┤
│     BSV Blockchain Services        │  ← BSV Open License
│   (Smart Contracts + Tokenization) │
└─────────────────────────────────────┘
```

### Document Storage Flow
1. **Authentication**: HandCash OAuth2 wallet login
2. **Encryption**: Client-side AES encryption of documents
3. **Storage**: Encrypted data stored on Bitcoin SV blockchain
4. **Access**: Only authenticated user can decrypt documents

## Key Components

### Academic Platform
- **Publication Management**: Manuscript submission and review workflows
- **Reputation Engine**: Academic scoring and tokenization system
- **Smart Contracts**: Revenue sharing and compliance automation
- **Library System**: Full Koha ILS integration

### Document Storage App
- `HandCashAuthService`: OAuth2 authentication with HandCash
- `BlockchainDocumentService`: Encrypted document storage/retrieval
- `DocumentEditor`: Rich text editor with blockchain integration
- `Login`: HandCash authentication interface

## Security Features

- **Client-side Encryption**: Documents encrypted before leaving device
- **Wallet Authentication**: Secure HandCash wallet-based login
- **Immutable Storage**: Blockchain-based permanent record keeping
- **Academic Integrity**: Tamper-proof peer review and publication records
- **Regulatory Compliance**: Court-ordered contract dissolution capabilities

## Keyboard Shortcuts

- **Ctrl/Cmd + S**: Save document
- **Ctrl/Cmd + N**: New document
- **F11**: Toggle fullscreen mode
- **Tab**: Insert 4 spaces (indentation)

## Development

### Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

### HandCash Integration
- HandCash Connect SDK for wallet operations
- HandCash OAuth2 REST API for authentication
- BSV library for blockchain operations

### Environment Variables
- `REACT_APP_HANDCASH_APP_ID`: Your HandCash application ID
- `REACT_APP_HANDCASH_REDIRECT_URL`: OAuth callback URL

## Roadmap

### Phase 1: Foundation ✅
- Document storage app (current)
- Academic platform design
- Blockchain integration planning

### Phase 2: Academic Features 🔄
- Peer review system implementation
- Academic reputation scoring
- Research collaboration tools

### Phase 3: Tokenization 📋
- Smart contract deployment
- Token economics implementation
- Regulatory compliance framework

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is dual-licensed:

- **Document Storage App**: Open BSV License version 5
- **Academic Platform**: GNU GPL v3 (Koha compatibility)
- **Blockchain Components**: BSV Open License v5

Copyright © 2025 The Bitcoin Corporation LTD  
Registered in England and Wales • Company No. 16735102

## Support

For support, please contact the development team or create an issue on GitHub.

## Acknowledgments

- Built on Bitcoin SV blockchain
- Powered by HandCash for authentication
- Based on [Koha ILS](https://koha-community.org/) for academic platform
- Inspired by the need for decentralized, academic-grade document management
