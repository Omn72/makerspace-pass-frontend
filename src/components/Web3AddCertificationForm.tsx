import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addCertification } from "@/lib/aptos";

interface Web3AddCertificationFormProps {
  onCertificationAdded: () => void;
  hasPass: boolean;
}

const MACHINE_CERTIFICATIONS = [
  "3D Printer",
  "Laser Cutter", 
  "CNC Mill",
  "Wood Shop",
  "Welding Station",
  "Electronics Lab",
  "Textile Lab",
  "Pottery Wheel",
];

export function Web3AddCertificationForm({ onCertificationAdded, hasPass }: Web3AddCertificationFormProps) {
  const [certificationType, setCertificationType] = useState("");
  const [customCertification, setCustomCertification] = useState("");
  const [isSafetyTraining, setIsSafetyTraining] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { account, connected } = useWallet();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !account || !hasPass) {
      toast({
        title: "Cannot Add Certification",
        description: !connected ? "Please connect your wallet" : "You need to create an access pass first.",
        variant: "destructive",
      });
      return;
    }

    const certName = certificationType === "custom" ? customCertification : certificationType;
    if (!certName && !isSafetyTraining) return;

    setIsLoading(true);
    
    try {
      await addCertification(
        account,
        account.address.toString(),
        isSafetyTraining ? "Safety Training" : certName,
        isSafetyTraining
      );
      
      if (isSafetyTraining) {
        toast({
          title: "Safety Training Completed!",
          description: "Your safety training status has been updated on-chain.",
        });
      } else {
        toast({
          title: "Certification Added!",
          description: `${certName} certification has been added to your pass.`,
        });
      }
      
      setCertificationType("");
      setCustomCertification("");
      setIsSafetyTraining(false);
      onCertificationAdded();
    } catch (error: any) {
      console.error("Error adding certification:", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to add certification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected || !hasPass) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-muted-foreground">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-muted-foreground" />
            </div>
            Add Certification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            {!connected ? "Connect your wallet to add certifications" : "Create an access pass first to add certifications"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          Add Certification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Certification Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={isSafetyTraining ? "makerspace" : "makerspaceOutline"}
                onClick={() => {
                  setIsSafetyTraining(!isSafetyTraining);
                  setCertificationType("");
                }}
                className="flex-1"
              >
                Safety Training
              </Button>
              <Button
                type="button"
                variant={!isSafetyTraining ? "makerspace" : "makerspaceOutline"}
                onClick={() => setIsSafetyTraining(false)}
                className="flex-1"
              >
                Machine Certification
              </Button>
            </div>
          </div>

          {!isSafetyTraining && (
            <div className="space-y-2">
              <Label htmlFor="machine" className="text-foreground">Machine/Equipment</Label>
              <Select value={certificationType} onValueChange={setCertificationType}>
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue placeholder="Select a machine" />
                </SelectTrigger>
                <SelectContent>
                  {MACHINE_CERTIFICATIONS.map((machine) => (
                    <SelectItem key={machine} value={machine}>
                      {machine}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom...</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {certificationType === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="customCert" className="text-foreground">Custom Certification</Label>
              <Input
                id="customCert"
                value={customCertification}
                onChange={(e) => setCustomCertification(e.target.value)}
                placeholder="Enter certification name"
                className="bg-background/50 border-border/50"
                required
              />
            </div>
          )}

          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Transaction Details:</strong><br/>
              Function: add_certification<br/>
              Target: {account?.address.toString().slice(0, 6)}...{account?.address.toString().slice(-4)}<br/>
              Gas: ~0.001 APT
            </p>
          </div>

          <Button 
            type="submit" 
            variant="makerspaceSecondary" 
            className="w-full"
            disabled={isLoading || (!isSafetyTraining && !certificationType)}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Adding...
              </>
            ) : (
              "Add Certification"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}