import { useState } from "react";
import { WalletConnection } from "@/components/WalletConnection";
import { AccessPassCard } from "@/components/AccessPassCard";
import { CreatePassForm } from "@/components/CreatePassForm";
import { AddCertificationForm } from "@/components/AddCertificationForm";
import { Cog, Zap } from "lucide-react";

interface AccessPass {
  pass_id: number;
  member_name: string;
  certifications: string[];
  safety_training: boolean;
  creation_timestamp: number;
}

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [accessPass, setAccessPass] = useState<AccessPass | null>(null);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handlePassCreated = (pass: AccessPass) => {
    setAccessPass(pass);
  };

  const handleCertificationAdded = (certification: string, isSafetyTraining: boolean) => {
    if (!accessPass) return;

    if (isSafetyTraining) {
      setAccessPass({
        ...accessPass,
        safety_training: true,
      });
    } else {
      setAccessPass({
        ...accessPass,
        certifications: [...accessPass.certifications, certification],
      });
    }
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
              <h1 className="text-2xl font-bold text-foreground">MakerSpace</h1>
              <p className="text-sm text-muted-foreground">Access Pass Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-makerspace-orange" />
              <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Makerspace Access Portal
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your access pass, track certifications, and unlock the power of making with blockchain-verified credentials.
            </p>
          </div>

          {/* Wallet Connection */}
          <WalletConnection 
            isConnected={isWalletConnected} 
            onConnect={handleWalletConnect} 
          />

          {isWalletConnected && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Access Pass Display or Creation */}
              <div className="space-y-6">
                {accessPass ? (
                  <AccessPassCard accessPass={accessPass} />
                ) : (
                  <CreatePassForm onPassCreated={handlePassCreated} />
                )}
              </div>

              {/* Add Certification */}
              <div className="space-y-6">
                <AddCertificationForm 
                  onCertificationAdded={handleCertificationAdded}
                  hasPass={!!accessPass}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="text-center pt-8 border-t border-border/50">
            <p className="text-muted-foreground">
              Powered by Aptos Blockchain • Secure • Decentralized • Verified
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;