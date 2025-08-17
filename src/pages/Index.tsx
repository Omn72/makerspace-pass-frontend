import { useState } from "react";
import { AptosWalletConnection } from "@/components/AptosWalletConnection";
import { Web3AccessPassCard } from "@/components/Web3AccessPassCard";
import { Web3CreatePassForm } from "@/components/Web3CreatePassForm";
import { Web3AddCertificationForm } from "@/components/Web3AddCertificationForm";
import { SmartContractInfo } from "@/components/SmartContractInfo";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Cog, Zap, Code2 } from "lucide-react";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { connected } = useWallet();

  const handlePassCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCertificationAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Cog className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MakerSpace Web3</h1>
              <p className="text-sm text-muted-foreground">Aptos Blockchain Access Pass Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-makerspace-orange" />
              <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Blockchain Makerspace
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your access pass and certifications on the Aptos blockchain with verifiable, decentralized credentials.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Code2 className="w-4 h-4" />
              <span>Powered by Aptos Move Smart Contracts</span>
            </div>
          </div>

          {/* Wallet Connection */}
          <AptosWalletConnection />

          {connected && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Access Pass */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Web3AccessPassCard refreshTrigger={refreshTrigger} />
                  <Web3CreatePassForm onPassCreated={handlePassCreated} />
                </div>
                <Web3AddCertificationForm 
                  onCertificationAdded={handleCertificationAdded}
                  hasPass={true} // This will be dynamically determined by the component
                />
              </div>

              {/* Right Column - Smart Contract Info */}
              <div className="space-y-6">
                <SmartContractInfo />
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="text-center pt-8 border-t border-border/50">
            <p className="text-muted-foreground">
              Powered by Aptos Move • Decentralized • Immutable • Verifiable
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;