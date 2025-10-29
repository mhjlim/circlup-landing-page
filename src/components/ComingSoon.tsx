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
        <div className="absolute top-[10%] left-[15%] w-4 h-4 rounded-full bg-primary/20 animate-[bounce-natural_1.8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[25%] w-3.5 h-3.5 rounded-full bg-primary/30 animate-[bounce-natural_2.2s_ease-in-out_infinite_0.4s]" />
        <div className="absolute top-[35%] left-[8%] w-4 h-4 rounded-full bg-primary/25 animate-[bounce-natural_2s_ease-in-out_infinite_0.8s]" />
        <div className="absolute top-[45%] right-[12%] w-4.5 h-4.5 rounded-full bg-secondary/20 animate-[bounce-natural_2.4s_ease-in-out_infinite_1.2s]" />
        <div className="absolute top-[60%] left-[20%] w-3.5 h-3.5 rounded-full bg-primary/30 animate-[bounce-natural_1.9s_ease-in-out_infinite_1.6s]" />
        <div className="absolute bottom-[15%] right-[40%] w-4 h-4 rounded-full bg-secondary/25 animate-[bounce-natural_2.1s_ease-in-out_infinite_0.5s]" />
        <div className="absolute top-[25%] left-[45%] w-3 h-3 rounded-full bg-primary/20 animate-[bounce-natural_2.3s_ease-in-out_infinite_0.9s]" />
        <div className="absolute bottom-[30%] left-[10%] w-4 h-4 rounded-full bg-primary/25 animate-[bounce-natural_1.7s_ease-in-out_infinite_1.3s]" />
        <div className="absolute top-[70%] right-[20%] w-3.5 h-3.5 rounded-full bg-secondary/30 animate-[bounce-natural_2.5s_ease-in-out_infinite_1.8s]" />
        <div className="absolute bottom-[20%] right-[8%] w-4 h-4 rounded-full bg-primary/20 animate-[bounce-natural_2s_ease-in-out_infinite_0.6s]" />
        <div className="absolute top-[15%] right-[45%] w-3.5 h-3.5 rounded-full bg-primary/30 animate-[bounce-natural_2.2s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-[40%] right-[30%] w-4 h-4 rounded-full bg-secondary/20 animate-[bounce-natural_1.9s_ease-in-out_infinite_1.4s]" />
        <div className="absolute top-[50%] left-[35%] w-3 h-3 rounded-full bg-primary/25 animate-[bounce-natural_2.4s_ease-in-out_infinite_0.8s]" />
        <div className="absolute bottom-[10%] left-[42%] w-4 h-4 rounded-full bg-primary/30 animate-[bounce-natural_2.1s_ease-in-out_infinite_1.7s]" />
        <div className="absolute top-[80%] left-[25%] w-3.5 h-3.5 rounded-full bg-secondary/25 animate-[bounce-natural_2.3s_ease-in-out_infinite_1.1s]" />
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
