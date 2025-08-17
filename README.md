# MakerSpace Web3 Access Pass System

A decentralized makerspace membership system built on Aptos blockchain using Move smart contracts.

## 🚀 Features

- **Blockchain-based Access Passes**: NFT-style membership passes stored on Aptos
- **Machine Certifications**: Track equipment training and certifications
- **Safety Training**: Verifiable safety completion status
- **Web3 Integration**: Connect with Aptos wallets (Petra, Martian, etc.)
- **Real-time Updates**: Live blockchain data synchronization

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Blockchain**: Aptos Move Language
- **Wallet Integration**: Aptos Wallet Adapter
- **UI Components**: shadcn/ui
- **Build Tool**: Vite

## 📋 Smart Contract Functions

### Core Functions
- `initialize_counter(admin: &signer)` - Initialize the pass counter (admin only)
- `create_access_pass(member: &signer, name: String, timestamp: u64)` - Mint new access pass
- `add_certification(address: address, cert: String, is_safety: bool)` - Add certifications

### Data Structure
```move
struct AccessPass {
    pass_id: u64,
    member_name: String,
    certifications: vector<String>,
    safety_training: bool,
    creation_timestamp: u64,
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Aptos CLI
- Aptos wallet (Petra recommended)

### Installation
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Smart Contract Deployment

1. **Install Aptos CLI**
   ```bash
   curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
   ```

2. **Initialize Aptos Account**
   ```bash
   aptos init --network testnet
   ```

3. **Deploy the Move Module**
   ```bash
   aptos move publish --package-dir ./src/move --named-addresses MyModule=<YOUR_ADDRESS>
   ```

4. **Update Frontend Configuration**
   - Edit `src/lib/aptos.ts`
   - Update `MODULE_ADDRESS` with your deployed contract address

### Configuration

1. **Update Contract Address**
   ```typescript
   // src/lib/aptos.ts
   export const MODULE_ADDRESS = "0x..."; // Your deployed address
   ```

2. **Initialize Counter (Admin Only)**
   - Connect admin wallet
   - Call `initialize_counter` function once

## 🎮 Usage

### For Members
1. **Connect Wallet** - Use Petra or compatible Aptos wallet
2. **Create Access Pass** - Mint your membership NFT
3. **Add Certifications** - Complete machine training
4. **Safety Training** - Mark safety courses as complete

### For Admins
1. **Deploy Contract** - Publish Move module to Aptos
2. **Initialize System** - Run counter initialization
3. **Manage Certifications** - Add new equipment types

## 🔧 Development

### Project Structure
```
src/
├── components/           # React components
├── lib/                 # Utilities and Aptos integration
├── pages/              # Page components
├── move/               # Move smart contracts
└── assets/             # Static assets
```

### Key Components
- `AptosWalletConnection` - Wallet connectivity
- `Web3AccessPassCard` - Display pass information
- `Web3CreatePassForm` - Mint new passes
- `Web3AddCertificationForm` - Add certifications
- `SmartContractInfo` - Contract details

## 🌐 Networks

- **Testnet**: For development and testing
- **Mainnet**: For production deployment

Current configuration uses Aptos Testnet.

## 📚 Documentation

- [Aptos Documentation](https://aptos.dev/)
- [Move Language Guide](https://move-language.github.io/)
- [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)

## 🔒 Security

- Smart contracts use Aptos Resource Account pattern
- RLS (Resource-Level Security) implemented
- Wallet signature verification required
- No private key exposure in frontend

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- GitHub Issues: For bug reports and feature requests
- Aptos Discord: For blockchain-specific questions
- Documentation: Check the /docs folder for detailed guides

---

**Ready to revolutionize makerspace management with blockchain technology!** 🛠️⛓️