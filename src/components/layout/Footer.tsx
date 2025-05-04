
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-vibehub-purple to-vibehub-blue-bright bg-clip-text text-transparent">
                VibeHub
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              A modern, youth-centric blog focused on tech, auto, health, entertainment, and news to keep you informed daily.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-base font-semibold">Categories</h3>
              <ul className="mt-4 space-y-2">
                {["Tech", "Auto", "Health", "Entertainment", "News"].map((category) => (
                  <li key={category}>
                    <Link
                      to={`/category/${category.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Subscribe</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Get the latest news and updates.
              </p>
              <form className="mt-4 flex flex-col space-y-2">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="w-full"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VibeHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
