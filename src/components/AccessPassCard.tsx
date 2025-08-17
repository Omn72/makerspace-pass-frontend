import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Award, Calendar, User, Hash } from "lucide-react";

interface AccessPass {
  pass_id: number;
  member_name: string;
  certifications: string[];
  safety_training: boolean;
  creation_timestamp: number;
}

interface AccessPassCardProps {
  accessPass: AccessPass;
}

export function AccessPassCard({ accessPass }: AccessPassCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-primary-foreground" />
          </div>
          Makerspace Access Pass
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span className="text-sm">Pass ID</span>
            </div>
            <p className="font-mono text-lg text-makerspace-orange">#{accessPass.pass_id.toString().padStart(4, '0')}</p>
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
      </CardContent>
    </Card>
  );
}