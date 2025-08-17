import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CheckCircle } from "lucide-react";

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
}

export function WalletConnection({ isConnected, onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      onConnect();
      setIsConnecting(false);
    }, 1000);
  };

  if (isConnected) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-makerspace-success/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-makerspace-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Wallet Connected</p>
                <p className="text-sm text-muted-foreground">0x1234...5678</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-makerspace-success rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          Connect Your Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Connect your Aptos wallet to manage your makerspace access pass and certifications.
        </p>
        <Button 
          onClick={handleConnect} 
          variant="makerspace" 
          className="w-full"
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </CardContent>
    </Card>
  );
}