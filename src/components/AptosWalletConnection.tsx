import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AptosWalletConnection() {
  const { 
    connect, 
    disconnect, 
    account, 
    connected, 
    wallet 
  } = useWallet();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      // This will show the wallet selection modal
      if (!connected) {
        await connect("Petra" as any); // Default to Petra wallet
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address.toString());
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openExplorer = () => {
    if (account?.address) {
      window.open(`https://explorer.aptoslabs.com/account/${account.address.toString()}?network=testnet`, '_blank');
    }
  };

  if (connected && account) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-makerspace-success/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-makerspace-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Wallet Connected</p>
                  <p className="text-sm text-muted-foreground">Aptos Wallet</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-makerspace-success rounded-full animate-pulse" />
            </div>
            
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono text-muted-foreground">
                  {account.address.toString().slice(0, 6)}...{account.address.toString().slice(-4)}
                </p>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={copyAddress}>
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={openExplorer}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              onClick={disconnect} 
              variant="outline" 
              className="w-full"
            >
              Disconnect
            </Button>
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
          Connect Your Aptos Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Connect your Aptos wallet to interact with the MakerSpace smart contract on the blockchain.
          </p>
          
          <div className="bg-makerspace-blue/10 border border-makerspace-blue/20 rounded-lg p-3">
            <p className="text-sm text-makerspace-blue">
              <strong>Network:</strong> Aptos Testnet
            </p>
          </div>
          
          <Button 
            onClick={handleConnect} 
            variant="makerspace" 
            className="w-full"
          >
            Connect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}