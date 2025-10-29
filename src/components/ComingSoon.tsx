import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Instagram } from "lucide-react";
import circlupLogo from "@/assets/circlup-logo.png";

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

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "You're on the list! 🎉",
        description: "We'll keep you posted on our launch.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4 relative overflow-hidden">
      {/* Animated Background Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary/20 animate-[bounce_1.5s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-1/3 w-3.5 h-3.5 rounded-full bg-primary/30 animate-[bounce_2s_ease-in-out_infinite_0.3s]" />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-primary/25 animate-[bounce_1.8s_ease-in-out_infinite_0.6s]" />
        <div className="absolute top-2/3 right-1/4 w-4.5 h-4.5 rounded-full bg-secondary/20 animate-[bounce_2.2s_ease-in-out_infinite_0.9s]" />
        <div className="absolute bottom-1/4 right-1/2 w-3.5 h-3.5 rounded-full bg-primary/30 animate-[bounce_1.7s_ease-in-out_infinite_1.2s]" />
      </div>
      
      <div className="w-full max-w-2xl text-center space-y-12 pb-16 animate-in fade-in duration-1000 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={circlupLogo}
            alt="Circlup Logo"
            className="h-[168px] md:h-[224px] w-auto drop-shadow-lg animate-in zoom-in duration-700"
          />
        </div>

        {/* Heading */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">Coming Soon</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto">
            Something exciting is on the way.{" "}
          </p>
          <p> Be the first to know when we launch.</p>
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
            className="flex-1 h-12 text-base bg-card border-2 border-border focus:border-primary transition-all duration-300 shadow-sm"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-8 bg-primary hover:bg-secondary text-primary-foreground font-semibold shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
          >
            {isSubmitting ? "Joining..." : "Notify Me"}
          </Button>
        </form>

        {/* Footer hint */}
        <p className="text-sm text-muted-foreground/60 animate-in fade-in duration-1000 delay-1000">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/circlup.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 animate-in fade-in duration-1000 delay-1200"
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm">Follow us on Instagram</span>
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
