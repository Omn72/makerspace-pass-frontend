import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePassFormProps {
  onPassCreated: (pass: any) => void;
}

export function CreatePassForm({ onPassCreated }: CreatePassFormProps) {
  const [memberName, setMemberName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    setIsLoading(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      const newPass = {
        pass_id: Math.floor(Math.random() * 1000) + 1,
        member_name: memberName,
        certifications: [],
        safety_training: false,
        creation_timestamp: Math.floor(Date.now() / 1000),
      };
      
      onPassCreated(newPass);
      setMemberName("");
      setIsLoading(false);
      
      toast({
        title: "Access Pass Created!",
        description: `Successfully minted pass for ${memberName}`,
      });
    }, 2000);
  };

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
      <CardContent>
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
          <Button 
            type="submit" 
            variant="makerspace" 
            className="w-full"
            disabled={isLoading || !memberName.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Minting Pass...
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