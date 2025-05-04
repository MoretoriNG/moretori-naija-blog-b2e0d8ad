
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-br from-vibehub-purple/10 to-vibehub-blue-bright/10 border-t border-border/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-vibehub-purple/20 px-3 py-1 text-sm">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                <span>Subscribe to our Newsletter</span>
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibehub-purple to-vibehub-blue-bright">Moretori Naija</span>
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Get the latest news, trends, and updates from Nigeria delivered directly to your inbox. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 min-[400px]:flex-row lg:justify-end">
            <div className="grid gap-3 min-[400px]:flex sm:flex-col lg:flex-row">
              <Input 
                className="max-w-lg flex-1" 
                placeholder="Enter your email" 
                type="email"
              />
              <Button className="inline-flex h-10 items-center justify-center gap-2 bg-vibehub-purple hover:bg-vibehub-purple-dark rounded-md px-4 py-2 text-sm font-medium text-white transition-colors">
                Subscribe 
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
