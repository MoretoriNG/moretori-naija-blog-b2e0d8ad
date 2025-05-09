
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Thank you for subscribing! You'll receive our newsletter soon.");
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-900 to-blue-900 border-t border-gray-800 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-block rounded-lg bg-blue-500/30 px-3 py-1 text-sm">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                <span>Newsletter</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tighter">
              Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Moretori Naija</span>
            </h2>
            <p className="text-sm text-white/70 max-w-md">
              Get the latest news and updates from Nigeria delivered directly to your inbox.
            </p>
          </div>
          
          <div className="w-full md:w-auto max-w-sm">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Input 
                  className="bg-white/10 border-white/20 focus:bg-white/20 text-white pl-10"
                  placeholder="Enter your email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              </div>
              <Button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Done
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
