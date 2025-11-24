export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Privacy Policy</h1>
        
        <p className="text-sm text-gray-500 mb-8">Last Updated: November 24, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Lilith Echo ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Alexa Skill service.
          </p>
          <p className="mb-4">
            By using Lilith Echo, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">2.1 User Identification</h3>
          <p className="mb-4">We collect:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Alexa User ID:</strong> A unique identifier provided by Amazon to distinguish users</li>
            <li><strong>Session ID:</strong> Temporary identifiers for individual conversation sessions</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            Note: We do NOT collect your name, email address, phone number, or any other personally identifiable information unless you explicitly provide it during conversation.
          </p>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">2.2 Conversation Data</h3>
          <p className="mb-4">We store:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Voice Input Transcripts:</strong> Text transcriptions of your voice commands (provided by Alexa)</li>
            <li><strong>Conversation History:</strong> Complete records of your interactions with Lilith</li>
            <li><strong>Conversation Summaries:</strong> AI-generated summaries of important details and context</li>
            <li><strong>Timestamps:</strong> Date and time of each interaction</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">2.3 Usage Information</h3>
          <p className="mb-4">We collect:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Intent types triggered during sessions</li>
            <li>Session duration and frequency</li>
            <li>Error logs for debugging purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Provide Personalized Responses:</strong> Use conversation history and summaries to create context-aware, personalized interactions</li>
            <li><strong>Maintain Continuity:</strong> Remember previous conversations to create an ongoing relationship with Lilith</li>
            <li><strong>Generate AI Responses:</strong> Send conversation context to Google Gemini AI to generate appropriate responses</li>
            <li><strong>Improve Service Quality:</strong> Analyze usage patterns to enhance the user experience</li>
            <li><strong>Debug Issues:</strong> Use error logs to identify and fix technical problems</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">4. Data Storage and Security</h2>
          
          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">4.1 Where We Store Data</h3>
          <p className="mb-4">Your data is stored in:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>MongoDB Atlas:</strong> Secure cloud database with encryption at rest and in transit</li>
            <li>Database servers are located in secure data centers with industry-standard security measures</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">4.2 Data Security Measures</h3>
          <p className="mb-4">We implement:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Encryption of data in transit using HTTPS/TLS</li>
            <li>Encryption of data at rest in MongoDB</li>
            <li>Secure authentication for database access</li>
            <li>Regular security updates and monitoring</li>
            <li>Access controls limiting who can view your data</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">4.3 Data Retention</h3>
          <p className="mb-4">
            We retain your conversation data indefinitely to maintain conversation continuity. You may request deletion at any time (see Section 8).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">5. Third-Party Services</h2>
          
          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">5.1 Amazon Alexa</h3>
          <p className="mb-4">
            The Service operates on Amazon's Alexa platform. Amazon's privacy policy applies to their handling of voice data. We receive only transcribed text, not audio recordings.
          </p>
          <p className="mb-4">
            <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201809740" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
              View Amazon Alexa Privacy Policy
            </a>
          </p>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">5.2 Google Gemini AI</h3>
          <p className="mb-4">
            We use Google's Gemini AI to generate conversational responses. Your conversation context is sent to Gemini's API for processing. Google's privacy policy and terms apply to their processing.
          </p>
          <p className="mb-4">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
              View Google Privacy Policy
            </a>
          </p>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">5.3 MongoDB Atlas</h3>
          <p className="mb-4">
            Your data is stored on MongoDB Atlas cloud infrastructure. MongoDB's security and privacy practices apply to data storage.
          </p>
          <p className="mb-4">
            <a href="https://www.mongodb.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
              View MongoDB Privacy Policy
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">6. Data Sharing and Disclosure</h2>
          <p className="mb-4">We do NOT:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Sell your personal information to third parties</li>
            <li>Share your conversations for marketing purposes</li>
            <li>Use your data for advertising</li>
          </ul>
          
          <p className="mb-4 mt-6">We MAY share data only:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>With AI Service:</strong> Conversation context is sent to Google Gemini to generate responses</li>
            <li><strong>Legal Compliance:</strong> If required by law, court order, or government regulation</li>
            <li><strong>Service Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">7. Children's Privacy</h2>
          <p className="mb-4">
            Lilith Echo is NOT intended for users under 18 years of age. We do not knowingly collect information from children under 18. If we discover that a child under 18 has provided us with personal information, we will delete such information immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">8. Your Rights and Choices</h2>
          
          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">8.1 Access Your Data</h3>
          <p className="mb-4">
            You may request a copy of all data we have stored about you. Contact us using the information in Section 11.
          </p>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">8.2 Delete Your Data</h3>
          <p className="mb-4">
            You may request deletion of all your conversation data at any time. We will permanently delete your data within 30 days of your request. Note that this will reset all conversation history and personalization.
          </p>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">8.3 Disable the Skill</h3>
          <p className="mb-4">
            You can disable the Lilith Echo skill through your Alexa app at any time. This will stop new data collection, but existing data will remain unless you request deletion.
          </p>

          <h3 className="text-xl font-semibold text-purple-200 mb-3 mt-6">8.4 Alexa Voice Recordings</h3>
          <p className="mb-4">
            To manage or delete Alexa voice recordings, use the Alexa Privacy Settings in your Alexa app or visit your Amazon account settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">9. International Users</h2>
          <p className="mb-4">
            Our service may be accessed from various countries. If you use the Service from outside the region where our servers are located, your data may be transferred internationally. By using the Service, you consent to such transfers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this policy. Your continued use of the Service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy, want to access your data, or request data deletion, please contact us at:
          </p>
          <div className="ml-4 space-y-2">
            <p><strong>Email:</strong> support@lilithecho.com</p>
            <p><strong>Data Deletion Request:</strong> privacy@lilithecho.com</p>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            We will respond to all requests within 30 days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">12. GDPR Compliance (EU Users)</h2>
          <p className="mb-4">
            If you are located in the European Union, you have additional rights under GDPR:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Right to Access:</strong> Request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us using the information in Section 11.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">13. California Privacy Rights (CCPA)</h2>
          <p className="mb-4">
            California residents have specific rights under the California Consumer Privacy Act:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to opt-out of sale of personal information (Note: We do not sell personal information)</li>
            <li>Right to deletion of personal information</li>
            <li>Right to non-discrimination for exercising CCPA rights</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>© 2025 Lilith Echo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
