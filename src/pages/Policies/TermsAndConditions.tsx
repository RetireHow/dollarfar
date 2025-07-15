import { useEffect } from "react";

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 dark:text-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 text-center dark:text-white">
        Last Updated: July 15, 2025
      </p>

      <p>
        Welcome to <strong>Retirehow? Inc.</strong> ("Company," "we," "us," or
        "our"). These Terms and Conditions ("Terms") govern your access to and
        use of our website,{" "}
        <a
          href="https://dollarfar.com"
          className="text-blue-600 underline dark:text-white"
        >
          https://dollarfar.com
        </a>{" "}
        (the “Site”), and the digital products, content, and services we offer
        (collectively, the “Services”).
      </p>

      <p>
        By accessing or using our Site, you agree to be bound by these Terms and
        our Privacy Policy. If you do not agree with any part of these Terms,
        please do not use our Site or Services.
      </p>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          1. Use of the Site
        </h2>
        <p>
          You agree to use our Site only for lawful purposes and in accordance
          with these Terms. You must be at least the age of majority in your
          province or territory of residence to use our Services.
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Use the Site for any illegal or unauthorized purpose</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>
            Reproduce, duplicate, copy, sell, or exploit any part of the Site or
            Services without our written consent
          </li>
          <li>Post or transmit any harmful code (e.g., viruses or malware)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          2. Digital Products
        </h2>
        <p>
          All digital products available on our Site are provided for personal,
          non-commercial use only. You may not distribute, resell, share, or
          reproduce any of our products without express written permission.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          3. Payments and Billing
        </h2>
        <p>
          All payments are processed securely through third-party payment
          gateways. By purchasing a product, you agree to pay all applicable
          fees as listed on the Site. We reserve the right to change pricing at
          any time without prior notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          4. Refund Policy
        </h2>
        <p>
          Please refer to our{" "}
          <a
            href="/refund-policy"
            className="text-blue-600 underline dark:text-white"
          >
            Refund Policy
          </a>{" "}
          for detailed information. In general, all sales are final except in
          limited circumstances outlined in our refund policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          5. Intellectual Property
        </h2>
        <p>
          All content on the Site—including but not limited to text, graphics,
          logos, icons, images, digital products, and code—is the property of
          RetireHow? Inc. and protected by Canadian and international copyright
          and intellectual property laws. You may not use, copy, or reproduce
          our content without our express written consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          6. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, RetireHow? Inc. shall not be
          liable for any direct, indirect, incidental, or consequential damages
          arising out of your use or inability to use our Site or Services,
          including but not limited to loss of data, profits, or other
          intangible losses. All content and services are provided "as is"
          without warranties of any kind.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          7. Third-Party Links
        </h2>
        <p>
          Our Site may contain links to third-party websites. We are not
          responsible for the content, accuracy, or practices of these websites
          and encourage you to review their terms and policies separately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          8. Modifications to the Terms
        </h2>
        <p>
          We reserve the right to update or modify these Terms at any time.
          Changes will be posted on this page with the updated date. Your
          continued use of the Site after changes are posted constitutes your
          acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          9. Termination
        </h2>
        <p>
          We may terminate or suspend access to our Site and Services
          immediately, without prior notice or liability, for any reason,
          including breach of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          10. Governing Law
        </h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with
          the laws of the Province of Ontario, Canada, and the federal laws of
          Canada applicable therein, without regard to conflict of law
          principles.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          11. Contact Information
        </h2>
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
