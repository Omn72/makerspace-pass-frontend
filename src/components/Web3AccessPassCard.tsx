import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Award, Calendar, User, Hash, RefreshCw } from "lucide-react";
import { getAccessPass, AccessPass } from "@/lib/aptos";
import { useToast } from "@/hooks/use-toast";

interface Web3AccessPassCardProps {
  refreshTrigger: number;
}

export function Web3AccessPassCard({ refreshTrigger }: Web3AccessPassCardProps) {
  const [accessPass, setAccessPass] = useState<AccessPass | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { account, connected } = useWallet();
  const { toast } = useToast();

  const loadAccessPass = async () => {
    if (!connected || !account) return;
    
    setIsLoading(true);
    try {
      const pass = await getAccessPass(account.address.toString());
      setAccessPass(pass);
    } catch (error) {
      console.error("Error loading access pass:", error);
      toast({
        title: "Error Loading Pass",
        description: "Could not load access pass data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccessPass();
  }, [connected, account, refreshTrigger]);

  const formatDate = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
  };

  if (!connected) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-muted-foreground">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-muted-foreground" />
            </div>
            Your Access Pass
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Connect your wallet to view your access pass
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            Loading Access Pass...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!accessPass) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            No Access Pass Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 space-y-2">
            <p className="text-muted-foreground">
              You don't have an access pass yet.
            </p>
            <Button onClick={loadAccessPass} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            Makerspace Access Pass
          </div>
          <Button onClick={loadAccessPass} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span className="text-sm">Pass ID</span>
            </div>
            <p className="font-mono text-lg text-makerspace-orange">#{accessPass.pass_id.padStart(4, '0')}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm">Member</span>
            </div>
            <p className="font-semibold text-foreground">{accessPass.member_name}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Created</span>
          </div>
          <p className="text-foreground">{formatDate(accessPass.creation_timestamp)}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Safety Training</span>
            {accessPass.safety_training ? (
              <Badge variant="secondary" className="bg-makerspace-success/20 text-makerspace-success border-makerspace-success/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            ) : (
              <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                <XCircle className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Machine Certifications</span>
            {accessPass.certifications.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {accessPass.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="bg-makerspace-blue/10 text-makerspace-blue border-makerspace-blue/30">
                    {cert}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">No certifications yet</p>
            )}
          </div>
        </div>

        <div className="bg-background/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <strong>On-Chain Data:</strong> This information is stored on the Aptos blockchain and verified by smart contract.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}