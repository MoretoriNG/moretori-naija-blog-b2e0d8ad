
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">About Moretori Naija</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to Moretori Naija - a youth-centric, modern digital publication that aims to keep you informed and entertained with the latest in tech, auto, health, entertainment, and news from Nigeria and around the world.
          </p>
          
          <p>
            Founded in 2023, Moretori Naija was created with a simple mission: to provide intelligent, relevant, and engaging content for today's dynamic young Nigerians and Africans. We understand that your interests are diverse and ever-evolving, which is why our platform covers a wide range of topics that matter to you.
          </p>
          
          <h2 className="text-cyan-700">Our Mission</h2>
          
          <p>
            At Moretori Naija, we believe in the power of information and storytelling. Our mission is to:
          </p>
          
          <ul>
            <li>Deliver accurate, thoughtful, and timely content</li>
            <li>Showcase diverse Nigerian and African perspectives and voices</li>
            <li>Create a community where ideas can be shared and discussed</li>
            <li>Keep you informed about the topics that matter most to your life</li>
          </ul>
          
          <h2 className="text-orange-600">Our Team</h2>
          
          <p>
            Our team consists of passionate Nigerian writers, editors, and content creators who are dedicated to bringing you the best content possible. From tech enthusiasts to health experts, our diverse team ensures that all our content is well-researched, accurate, and engaging.
          </p>
          
          <h2 className="text-cyan-700">Join Our Community</h2>
          
          <p>
            Moretori Naija is more than just a blog - it's a community. We invite you to join us by subscribing to our newsletter, following us on social media, and participating in discussions. Your voice matters to us, and we're excited to hear what you have to say.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
            <a href="mailto:contact@moretorinaija.com">Contact Us</a>
          </Button>
          <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50" asChild>
            <a href="#subscribe">Subscribe to Newsletter</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
