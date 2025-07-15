import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 dark:text-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 text-center dark:text-white">
        Last Updated: July 15, 2025
      </p>

      <p>
        Welcome to <strong>RetireHow? Inc.</strong> ("we," "our," "us"). We
        respect your privacy and are committed to protecting the personal
        information you provide to us through our website,{" "}
        <a
          href="https://dollarfar.com"
          className="text-blue-600 underline dark:text-white"
        >
          https://dollarfar.com
        </a>{" "}
        (the "Site"). This Privacy Policy outlines how we collect, use,
        disclose, and protect your personal information in accordance with the
        Personal Information Protection and Electronic Documents Act (PIPEDA)
        and other applicable Canadian privacy laws.
      </p>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>
            <strong>Contact Information:</strong> Name, email address, phone
            number, mailing address
          </li>
          <li>
            <strong>Account Information:</strong> Login credentials, profile
            details
          </li>
          <li>
            <strong>Financial Information:</strong> If applicable, details you
            provide when purchasing products or services
          </li>
          <li>
            <strong>Usage Data:</strong> IP address, browser type, operating
            system, referring URLs, pages viewed, and time spent on the Site
          </li>
          <li>
            <strong>Communication Data:</strong> Messages, feedback, or
            inquiries you send us
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>
            To provide and manage services or content offered through the Site
          </li>
          <li>To respond to inquiries, support requests, or feedback</li>
          <li>
            To send you updates, newsletters, and marketing communications (only
            if you opt in)
          </li>
          <li>To improve our website functionality and user experience</li>
          <li>To detect and prevent fraud or other unauthorized activities</li>
          <li>To comply with legal and regulatory obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          3. How We Share Your Information
        </h2>
        <p>
          We do not sell or rent your personal information. We may share your
          data in the following situations:
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>
            With service providers who perform functions on our behalf (e.g.,
            payment processors, email services)
          </li>
          <li>
            With legal authorities if required by law, court order, or to comply
            with legal processes
          </li>
          <li>
            In connection with a business transaction, such as a merger or
            acquisition (we’ll provide notice before your information is
            transferred)
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          4. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience, analyze site usage, and deliver personalized content. You
          can control or disable cookies through your browser settings. However,
          disabling cookies may affect the functionality of our website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          5. Your Rights and Choices
        </h2>
        <p>As a Canadian resident, you have the right to:</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Access your personal information</li>
          <li>Request corrections to inaccurate or incomplete data</li>
          <li>
            Withdraw your consent at any time (subject to legal or contractual
            restrictions)
          </li>
          <li>Request the deletion of your personal data, where applicable</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:support@dollarfar.com"
            className="text-blue-600 underline dark:text-white"
          >
            support@dollarfar.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          6. Data Security
        </h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, disclosure, or misuse.
          However, no system can be 100% secure, and we cannot guarantee
          absolute protection.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          7. Third-Party Links
        </h2>
        <p>
          Our website may contain links to third-party sites. We are not
          responsible for the privacy practices of those sites. We encourage you
          to read their privacy policies before providing any information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          8. Children’s Privacy
        </h2>
        <p>
          Our site is not intended for individuals under the age of 18. We do
          not knowingly collect personal information from children. If we learn
          we have done so, we will delete the information promptly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          9. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with the updated date. Your continued use of the
          site after changes are posted constitutes your acceptance of the
          revised policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          10. Contact Us
        </h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or our data practices, please contact us at:
        </p>
        <address className="not-italic space-y-1">
          <div>
            <strong>RetireHow? Inc.</strong>
          </div>
          <div>
            Website:{" "}
            <a
              href="https://dollarfar.com"
              className="text-blue-600 underline dark:text-white"
            >
              https://dollarfar.com
            </a>
          </div>
          <div>
            Email:{" "}
            <a
              href="mailto:support@dollarfar.com"
              className="text-blue-600 underline dark:text-white"
            >
              support@dollarfar.com
            </a>
          </div>
          <div>Address: Toronto, Ontario, Canada</div>
        </address>
      </section>
    </div>
  );
}
