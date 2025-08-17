import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, Copy } from "lucide-react";
import { MODULE_ADDRESS, MODULE_NAME } from "@/lib/aptos";
import { useToast } from "@/hooks/use-toast";

export function SmartContractInfo() {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(MODULE_ADDRESS);
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
    });
  };

  const openExplorer = () => {
    window.open(`https://explorer.aptoslabs.com/account/${MODULE_ADDRESS}?network=testnet`, '_blank');
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          Smart Contract Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Module Name</p>
            <p className="font-mono text-foreground">{MODULE_NAME}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Contract Address</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-foreground text-sm break-all">{MODULE_ADDRESS}</p>
              <Button size="sm" variant="ghost" onClick={copyAddress}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="text-foreground">Aptos Testnet</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Available Functions:</p>
          <div className="bg-background/30 rounded-lg p-3 space-y-1">
            <p className="text-xs font-mono text-muted-foreground">• initialize_counter(admin: &signer)</p>
            <p className="text-xs font-mono text-muted-foreground">• create_access_pass(member: &signer, name: String, timestamp: u64)</p>
            <p className="text-xs font-mono text-muted-foreground">• add_certification(address: address, cert: String, is_safety: bool)</p>
          </div>
        </div>

        <Button onClick={openExplorer} variant="outline" className="w-full">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </Button>

        <div className="bg-makerspace-warning/10 border border-makerspace-warning/30 rounded-lg p-3">
          <p className="text-xs text-makerspace-warning">
            <strong>Setup Required:</strong> Deploy your Move module and update MODULE_ADDRESS in src/lib/aptos.ts
          </p>
        </div>
      </CardContent>
    </Card>
  );
}