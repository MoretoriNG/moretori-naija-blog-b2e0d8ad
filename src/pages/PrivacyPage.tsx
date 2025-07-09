
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, UserCheck, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                <p className="text-gray-600">
                  We collect information you provide directly to us, such as when you create an account, 
                  subscribe to our newsletter, or contact us. This may include your name, email address, 
                  and any other information you choose to provide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Usage Information</h4>
                <p className="text-gray-600">
                  We automatically collect certain information about your device and how you interact with 
                  our service, including your IP address, browser type, pages visited, and the time and 
                  date of your visits.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• To provide, maintain, and improve our services</li>
                <li>• To send you newsletters and marketing communications (with your consent)</li>
                <li>• To respond to your comments, questions, and requests</li>
                <li>• To analyze usage patterns and trends to improve user experience</li>
                <li>• To detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• With service providers who assist us in operating our website</li>
                <li>• When required by law or to protect our rights</li>
                <li>• In connection with a merger, acquisition, or sale of assets</li>
                <li>• With your explicit consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-orange-600" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Access the personal information we hold about you</li>
                <li>• Request correction of inaccurate or incomplete information</li>
                <li>• Request deletion of your personal information</li>
                <li>• Object to processing of your personal information</li>
                <li>• Request data portability</li>
                <li>• Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">Email: privacy@example.com</p>
                <p className="text-gray-600">Phone: +234 (0) 123 456 7890</p>
                <p className="text-gray-600">Address: Lagos, Nigeria</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
