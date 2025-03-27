import { Link } from "react-router-dom";

export default function TermsAndConditionPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Terms and Conditions
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            1. Introduction
          </h2>
          <p className="text-gray-700 mt-2">
            Welcome to our <Link className="text-blue-700 hover:underline" to="https://resources.dollarfar.com/">https://resources.dollarfar.com/</Link> website. These Terms
            and Conditions govern your access and use of our website{" "}
            <Link className="text-blue-700 hover:underline" to="https://resources.dollarfar.com/">https://resources.dollarfar.com/</Link>, including the various
            calculators available for use on the Website, as well as the modal
            for downloading PDF reports.
          </p>
          <p className="text-gray-700 mt-2">
            By using our Website and the services offered, you agree to be bound
            by these Terms. If you do not agree to these Terms, please refrain
            from using our Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            2. Services Provided
          </h2>
          <p className="text-gray-700 mt-2">
            Our Website provides a variety of online calculators, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>Cost of Living Comparison Calculator</li>
            <li>Compound Interest Rate Calculator</li>
            <li>Net Worth Calculator</li>
            <li>Budget Calculator</li>
            <li>Registered Retirement Savings Plan (RRSP) Calculator</li>
            <li>Registered Retirement Income Fund (RRIF) Calculator</li>
            <li>Comprehensive Retirement Income Calculator</li>
          </ul>
          <p className="text-gray-700 mt-2">
            These calculators are designed to help users evaluate various
            financial scenarios. After completing a calculation, users have the
            option to download a PDF report containing the results of their
            calculations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            3. User Registration and Information Collection
          </h2>
          <p className="text-gray-700 mt-2">
            To download the PDF report, users must enter their{" "}
            <strong>name</strong>, <strong>email</strong>, and{" "}
            <strong>phone number</strong> in the provided modal. By submitting
            this information, you agree to allow us to store and process your
            personal data in accordance with our Privacy Policy.
          </p>
          <p className="text-gray-700 mt-2">
            Before proceeding with the download, you must check the{" "}
            <strong>Terms and Conditions checkbox</strong>, acknowledging that
            you have read and agreed to these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            4. Personal Data and Privacy
          </h2>
          <p className="text-gray-700 mt-2">
            We are committed to safeguarding your personal information. The
            personal data you provide (name, email, phone) will be used for the
            purpose of sending you the PDF report and for further communication
            related to the calculations. For more details on how we collect,
            use, and protect your information, please refer to our Privacy
            Policy.
          </p>
          <p className="text-gray-700 mt-2">
            By using our Website, you consent to the collection and processing
            of your personal data as outlined in our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            5. Use of Website and Calculators
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              <strong>Accuracy of Data:</strong> The calculators provided are
              intended for informational purposes only. While we strive to
              provide accurate and reliable results, we make no guarantees
              regarding the precision of the calculations. You are responsible
              for ensuring the accuracy of the data you enter.
            </li>
            <li>
              <strong>Non-Commercial Use:</strong> The calculators are intended
              for personal, non-commercial use. You may not use them for any
              unlawful or unauthorized purpose.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            6. Terms for PDF Downloads
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              To download the PDF, you must input your personal information and
              agree to the Terms and Conditions by checking the checkbox in the
              modal.
            </li>
            <li>
              Once the PDF is downloaded, you will receive an email with a copy
              of your report. The email will be sent to the address you provided
              during the download process.
            </li>
            <li>
              The PDF report is for personal use only and cannot be used for
              commercial purposes without express permission from us.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            7. Prohibited Activities
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>Interfere with the operation of the Website.</li>
            <li>
              Use the Website to transmit harmful software, viruses, or
              malicious code.
            </li>
            <li>Infringe upon the intellectual property rights of others.</li>
            <li>
              Misuse any information provided on the Website for fraudulent or
              unlawful purposes.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 mt-2">
            We make no warranties or representations regarding the accuracy,
            reliability, or completeness of the calculators, results, or any
            content provided on the Website. You acknowledge that any reliance
            on the information provided by the Website is at your own risk.
          </p>
          <p className="text-gray-700 mt-2">
            In no event shall we be liable for any direct, indirect, incidental,
            special, or consequential damages arising from your use of the
            Website or downloading the PDF reports.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">9. Indemnity</h2>
          <p className="text-gray-700 mt-2">
            You agree to indemnify and hold harmless [Your Website Name], its
            affiliates, and its employees from any claims, liabilities, damages,
            or expenses arising out of your use of the Website, violation of
            these Terms, or infringement of any third-party rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            10. Changes to Terms
          </h2>
          <p className="text-gray-700 mt-2">
            We reserve the right to modify, update, or change these Terms at any
            time. Changes will take effect immediately upon posting on the
            Website. You are encouraged to review these Terms periodically to
            stay informed about any updates.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            11. Governing Law
          </h2>
          <p className="text-gray-700 mt-2">
            These Terms are governed by and construed in accordance with the
            laws of [Your Country/State]. Any disputes arising from these Terms
            shall be subject to the exclusive jurisdiction of the courts in
            [Your Country/State].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            12. Contact Us
          </h2>
          <p className="text-gray-700 mt-2">
            If you have any questions regarding these Terms and Conditions or
            need further clarification, please contact us:
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Email:</strong> [Your Email Address]
            <br />
            <strong>Phone:</strong> [Your Phone Number]
            <br />
            <strong>Address:</strong> [Your Physical Address, if applicable]
          </p>
        </section>
      </div>
    </div>
  );
}
