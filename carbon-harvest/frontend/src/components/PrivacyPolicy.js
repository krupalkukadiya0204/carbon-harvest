import React from 'react';
import './PrivacyPolicy.css';

// PrivacyPolicy component
const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
        <div className="container">
            <h1 className="privacy-policy-title">Privacy Policy</h1>
            <div className="privacy-policy-content">
                <section>
                    <h2>Introduction</h2>
                    <p>
                        Welcome to CarbonHarvest! At CarbonHarvest, accessible from www.carbonharvest.com,
                        we prioritize the privacy and security of our visitors. This Privacy Policy outlines the
                        types of information we collect, how we use it, and the measures we take to protect it.
                        Our commitment is to ensure transparency and trust in our practices.
                    </p>
                </section>

                <section>
                    <h2>Scope of This Policy</h2>
                    <p>
                        This Privacy Policy applies solely to our online activities on the CarbonHarvest website.
                        It governs the collection and use of information shared by visitors on our site. Please note that
                        this policy does not apply to information collected offline or through other channels.
                    </p>
                </section>

                <section>
                    <h2>Consent</h2>
                    <p>
                        By using the CarbonHarvest website, you consent to this Privacy Policy and agree to its terms.
                        We may update this policy periodically, and any changes will be posted on this page.
                        Continued use of our site signifies your acceptance of any revisions.
                    </p>
                </section>

                <section>
                    <h2>Information We Collect</h2>
                    <p>
                        The types of personal information we collect depend on how you interact with our website.
                        We collect information that you voluntarily provide and data gathered through your website interactions.
                    </p>
                    <ul>
                        <li><strong>Personal Information:</strong> Includes data such as your name, email address, phone number, company
                            name, and address, which you may provide when registering for an account or contacting us.</li>
                        <li><strong>Usage Data:</strong> Information about your interactions with our website, such as the pages you
                            visit, the links you click, and the time spent on our site.</li>
                    </ul>
                </section>

                <section>
                    <h2>How We Use Your Information</h2>
                    <p>
                        The information we collect is used to enhance and personalize your experience on our site.
                        Our uses include:
                    </p>
                    <ul>
                        <li>Operating and maintaining our website</li>
                        <li>Personalizing your experience</li>
                        <li>Developing new features and functionalities</li>
                        <li>Communicating with you for customer service and marketing purposes</li>
                        <li>Analyzing website usage to improve our services</li>
                    </ul>
                </section>

                <section>
                    <h2>Log Files</h2>
                    <p>
                        CarbonHarvest utilizes log files, a standard industry practice. These files record your interactions
                        with our website and include information such as:
                    </p>
                    <ul>
                        <li>IP addresses</li>
                        <li>Browser types</li>
                        <li>ISP details</li>
                        <li>Date and time stamps</li>
                        <li>Referring/exit pages</li>
                        <li>Click data</li>
                    </ul>
                    <p>
                        This information is used for website analytics and does not identify individual users.
                    </p>
                </section>

                <section>
                    <h2>Cookies and Web Beacons</h2>
                    <p>
                        We use cookies to enhance your experience by storing your preferences.
                        These cookies customize your experience on our website based on your browser type and the pages you access.
                    </p>
                </section>

                <section>
                    <h2>Third-Party Privacy Policies</h2>
                    <p>
                        CarbonHarvest may use third-party services, each with its own Privacy Policy.
                        These third parties may use technologies like cookies and web beacons. We do not have control over these cookies.
                    </p>
                    <p>
                        It is recommended to consult the respective Privacy Policies of these third-party ad servers for more
                        detailed information.
                    </p>
                </section>

                <section>
                    <h2>Data Security</h2>
                    <p>
                        We implement various security measures to protect your data.
                        However, remember that no method of transmission over the Internet or electronic storage is 100% secure.
                    </p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <p>
                        Email: <a href="mailto:contact@carbonharvest.com">contact@carbonharvest.com</a>
                    </p>
                </section>
            </div>
        </div>
    </div>
);
};

export default PrivacyPolicy;