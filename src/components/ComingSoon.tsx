import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import circlupLogo from "@/assets/circlup-logo.png";
import { BouncingDots } from "./BouncingDots";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("email_signups")
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "You're on the list! 🎉",
        description: "We'll keep you posted on our launch.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4 relative overflow-hidden">
      {/* Animated Background Dots */}
      <BouncingDots />
      
      <div className="w-full max-w-2xl text-center space-y-12 pb-16 animate-in fade-in duration-1000 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={circlupLogo}
            alt="CirclUp Logo"
            className="h-[118px] md:h-[157px] w-auto drop-shadow-lg animate-in zoom-in duration-700"
          />
        </div>

        {/* Heading */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight font-poppins">Coming Soon</h1>
          <p className="text-xl md:text-2xl text-yellow max-w-lg mx-auto font-poppins font-semibold">
            Something exciting is on the way.{" "}
          </p>
          <p className="font-poppins"> Be the first to know when we launch.</p>
        </div>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-500"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 text-base bg-card border-2 border-border focus:border-primary transition-all duration-300 shadow-sm font-poppins"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-8 bg-primary hover:bg-secondary text-primary-foreground font-semibold shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 font-poppins"
          >
            {isSubmitting ? "Joining..." : "Notify Me"}
          </Button>
        </form>

        {/* Footer hint */}
        <p className="text-sm text-muted-foreground/60 animate-in fade-in duration-1000 delay-1000 font-poppins">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/circlup.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 animate-in fade-in duration-1000 delay-1200 font-poppins"
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm">Follow us on Instagram</span>
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
