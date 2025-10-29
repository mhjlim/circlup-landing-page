import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import circlupLogo from "@/assets/circlup-logo.png";

interface EmailSignup {
  id: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const [emails, setEmails] = useState<EmailSignup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchEmails();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchEmails = async () => {
    try {
      const { data, error } = await supabase
        .from("email_signups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEmails(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <img src={circlupLogo} alt="Circlup Logo" className="h-16 w-auto" />
          <Button onClick={handleSignOut} variant="outline" className="font-poppins">
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">Email Signups</CardTitle>
            <CardDescription className="font-poppins">
              {emails.length} total signups
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground font-poppins">Loading...</p>
            ) : emails.length === 0 ? (
              <p className="text-center text-muted-foreground font-poppins">No signups yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-poppins">Email</TableHead>
                    <TableHead className="font-poppins">Signed Up</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.map((signup) => (
                    <TableRow key={signup.id}>
                      <TableCell className="font-poppins">{signup.email}</TableCell>
                      <TableCell className="font-poppins">{formatDate(signup.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="font-poppins"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
