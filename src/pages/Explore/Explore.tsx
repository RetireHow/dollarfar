/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select, Checkbox, Button, Typography } from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function RetirementInquiryPreview() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Title */}
        <header className="mb-6">
          <Title
            level={3}
            className="!mb-1 !text-2xl !font-semibold tracking-tight"
          >
            Retirement Simulator — Results: Next Steps
          </Title>
          <Paragraph className="!mt-1 !text-sm text-gray-600">
            Preview of the on-screen messages, CTA banner, and the client
            requisition form.
          </Paragraph>
        </header>

        {/* Messages */}
        <section className="mb-6 space-y-4">
          <MessageBlock
            title="Message 1 — Stretch Your Dollars Further"
            content={
              <>
                💡{" "}
                <em>
                  Not there yet? Discover how far your income can really go.
                </em>{" "}
                Compare 9,000+ cities worldwide and see where your dollars
                stretch further — only at <strong>DollarFar.com</strong>.
              </>
            }
          />
          <MessageBlock
            title="Message 2 — Live Well for Less"
            content={
              <>
                🌴 <em>Keep your lifestyle — and spend less doing it.</em>{" "}
                Living abroad part-time can lower costs without lowering
                comfort. Enjoy warmer winters and rich cultural experiences.
                Curious how it works? <strong>Ask us today.</strong>
              </>
            }
          />
        </section>

        {/* CTA Banner */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 p-5 shadow-md">
            <p className="text-center text-lg font-semibold text-white">
              👉 Ready to make this doable? Complete the form below and we’ll
              map a plan to maintain your lifestyle — at home or abroad.
            </p>
          </div>
        </section>

        {/* Form */}
        <Form layout="vertical" className="space-y-8">
          {/* Section A */}
          <FormSection title="A. Personal Information">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Form.Item label="Full Name" required>
                <Input placeholder="Jane Doe" disabled />
              </Form.Item>
              <Form.Item label="Email" required>
                <Input type="email" placeholder="jane@email.com" disabled />
              </Form.Item>
              <Form.Item label="Phone (optional)">
                <Input type="tel" placeholder="+1 (555) 123-4567" disabled />
              </Form.Item>
              <Form.Item label="Province/State of Residence">
                <Input placeholder="Ontario" disabled />
              </Form.Item>
            </div>
          </FormSection>

          {/* Section B */}
          <FormSection title="B. Retirement Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Form.Item label="Target Retirement Age">
                <Input type="number" placeholder="62" disabled />
              </Form.Item>
              <Form.Item label="Desired Annual Retirement Income (local currency)">
                <Input type="number" placeholder="60,000" disabled />
              </Form.Item>
            </div>
            <Form.Item
              label="Estimated Total Savings (RRSP/TFSA/401k/etc.)"
              className="mt-4"
            >
              <Input type="number" placeholder="450,000" disabled />
            </Form.Item>
            <Form.Item
              label="Open to lower-cost destinations abroad?"
              className="mt-4"
            >
              <Select defaultValue="Select…">
                <Option>Select…</Option>
                <Option>Yes</Option>
                <Option>No</Option>
                <Option>Maybe</Option>
              </Select>
            </Form.Item>
          </FormSection>

          {/* Section C */}
          <FormSection title="C. Part-Time Abroad Preferences">
            <Form.Item
              label="Ideal Destination(s) for Winter/Part-Time Living (cities/countries)"
              required
            >
              <Input
                placeholder="Lisbon, Puerto Vallarta, Goa, Chiang Mai"
                disabled
              />
            </Form.Item>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Form.Item label="Months Abroad Per Year">
                <Select defaultValue="Select…">
                  <Option>Select…</Option>
                  <Option>2–3 months</Option>
                  <Option>4–5 months</Option>
                  <Option>6+ months</Option>
                  <Option>Undecided</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Earliest Start (season/year)">
                <Input placeholder="Winter 2026" disabled />
              </Form.Item>
            </div>
            <Form.Item
              label="Estimated Total Budget for Part-Time Living (per season)"
              required
              className="mt-4"
              extra="Include housing, food, transport, flights, insurance, and extras."
            >
              <Input type="number" placeholder="12,000" disabled />
            </Form.Item>
          </FormSection>

          {/* Section D */}
          <FormSection title="D. Interest Areas">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "Cost-of-Living Comparison",
                "Cross-Border / Expat Living Options",
                "Comprehensive Retirement Planning",
                "RRSP / TFSA / Pension Optimization",
                "Real Estate / Relocation Strategies",
              ].map((label, i) => (
                <Checkbox key={i}>{label}</Checkbox>
              ))}
            </div>
          </FormSection>

          {/* Section E */}
          <FormSection title="E. Notes (optional)">
            <Input.TextArea
              rows={4}
              placeholder="Anything else we should know? Medical needs, school calendars, visa considerations, pets, etc."
              disabled
            />
          </FormSection>

          {/* Section F */}
          <FormSection title="F. Consent & Disclosures">
            <Paragraph className="mb-3 text-sm text-gray-700">
              We operate with a <strong>no-profit motive</strong> for guidance.
              If you engage us for planning or coordination, we charge{" "}
              <strong>actual third-party costs</strong> (e.g., bookings, local
              services, insurance) plus a{" "}
              <strong>10% service delivery fee</strong> on the total project
              costs. No hidden fees. This is not financial advice.
            </Paragraph>
            <div className="space-y-2">
              <Checkbox>
                I acknowledge the pricing model (actuals + 10% service delivery
                fee) and would like to be contacted.
              </Checkbox>
              <Checkbox>
                I consent to be contacted by DollarFar.com for educational and
                informational purposes.
              </Checkbox>
              <Checkbox>
                I agree to receive occasional updates about tools and resources
                (optional).
              </Checkbox>
            </div>
            <Form.Item
              label="Type your full name as signature"
              required
              className="mt-4"
            >
              <Input placeholder="Full legal name" />
            </Form.Item>
            <div className="mt-6">
              <Button type="primary" block>
                Submit & Request My Plan (Preview Button)
              </Button>
            </div>
          </FormSection>

          {/* Hidden fields */}
          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-xs text-gray-600">
            <p className="mb-1 font-medium">
              Internal Context (example fields captured from simulator):
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <code>sim_result_status</code>:{" "}
                <span className="font-mono">shortfall</span>
              </li>
              <li>
                <code>desired_income_input</code>:{" "}
                <span className="font-mono">$60,000</span>
              </li>
              <li>
                <code>gap_amount</code>:{" "}
                <span className="font-mono">$8,500 / yr</span>
              </li>
            </ul>
          </section>
        </Form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          UI preview only • Tailwind + Ant Design • Ready for developer handoff
        </p>
      </div>
    </div>
  );
}

/* Helper Components */

function FormSection({ title, children }: { title: any; children: any }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-base font-semibold tracking-tight">{title}</h3>
      {children}
    </section>
  );
}

function MessageBlock({ title, content }: { title: any; content: any }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-[15px] leading-6">{content}</p>
    </div>
  );
}
