import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createAccessPass } from "@/lib/aptos";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Web3CreatePassFormProps {
  onPassCreated: () => void;
}

export function Web3CreatePassForm({ onPassCreated }: Web3CreatePassFormProps) {
  const [memberName, setMemberName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { account, connected } = useWallet();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !connected || !account) return;

    setIsLoading(true);
    
    try {
      const response = await createAccessPass(account, memberName);
      
      toast({
        title: "Access Pass Created!",
        description: `Successfully minted pass for ${memberName}`,
      });
      
      setMemberName("");
      onPassCreated();
    } catch (error: any) {
      console.error("Error creating pass:", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to create access pass. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-muted-foreground">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-muted-foreground" />
            </div>
            Create Access Pass
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Connect your wallet to create an access pass
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          Create Access Pass
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-makerspace-warning/10 border-makerspace-warning/30">
          <AlertCircle className="h-4 w-4 text-makerspace-warning" />
          <AlertDescription className="text-makerspace-warning">
            <strong>Smart Contract Required:</strong> Make sure your Move module is deployed to the address configured in the app.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="memberName" className="text-foreground">Member Name</Label>
            <Input
              id="memberName"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="Enter your full name"
              className="bg-background/50 border-border/50"
              required
            />
          </div>
          
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Transaction Details:</strong><br/>
              Function: create_access_pass<br/>
              Network: Aptos Testnet<br/>
              Gas: ~0.001 APT
            </p>
          </div>

          <Button 
            type="submit" 
            variant="makerspace" 
            className="w-full"
            disabled={isLoading || !memberName.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Creating Pass...
              </>
            ) : (
              "Create Access Pass"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}