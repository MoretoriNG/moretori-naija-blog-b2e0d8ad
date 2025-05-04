
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About VibeHub</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to VibeHub - a youth-centric, modern digital publication that aims to keep you informed and entertained with the latest in tech, auto, health, entertainment, and news.
          </p>
          
          <p>
            Founded in 2023, VibeHub was created with a simple mission: to provide intelligent, relevant, and engaging content for today's dynamic young adults. We understand that your interests are diverse and ever-evolving, which is why our platform covers a wide range of topics that matter to you.
          </p>
          
          <h2>Our Mission</h2>
          
          <p>
            At VibeHub, we believe in the power of information and storytelling. Our mission is to:
          </p>
          
          <ul>
            <li>Deliver accurate, thoughtful, and timely content</li>
            <li>Showcase diverse perspectives and voices</li>
            <li>Create a community where ideas can be shared and discussed</li>
            <li>Keep you informed about the topics that matter most to your life</li>
          </ul>
          
          <h2>Our Team</h2>
          
          <p>
            Our team consists of passionate writers, editors, and content creators who are dedicated to bringing you the best content possible. From tech enthusiasts to health experts, our diverse team ensures that all our content is well-researched, accurate, and engaging.
          </p>
          
          <h2>Join Our Community</h2>
          
          <p>
            VibeHub is more than just a blog - it's a community. We invite you to join us by subscribing to our newsletter, following us on social media, and participating in discussions. Your voice matters to us, and we're excited to hear what you have to say.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <a href="mailto:contact@vibehub.com">Contact Us</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#subscribe">Subscribe to Newsletter</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
