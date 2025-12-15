export default function EmailsUI() {
  return (
    <>
      <h1 className="text-3xl font-bold m-5">Client Email Format</h1>
      <main style={{ lineHeight: "30px", margin: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            Hi <strong>[User Name]</strong>,
          </p>
          <p>
            Thank you for booking your consultation session with RetireHow!
            We're excited to help you explore your retirement planning options.
          </p>
        </header>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            <strong>Session Details:</strong>
          </p>
          <p>
            <strong>- Date & Time:</strong> [Selected Time Slot] ([User's Time
            Zone])
          </p>
          <p>
            <strong>- Duration:</strong> 30 minutes
          </p>
          <p>
            <strong>- Format:</strong> Online video call (Zoom/Google Meet link
            will be sent 24 hours before)
          </p>
          <p>
            <strong>- Consultant:</strong> [Consultant Name]
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            <strong>How to Join:</strong>
          </p>
          <p>
            We'll send you the meeting link and any preparation materials 24
            hours before your scheduled session.
          </p>
        </div>

        <footer>
          <p style={{ marginBottom: "15px" }}>
            We're looking forward to helping you make informed decisions about
            your retirement planning!
          </p>

          <p style={{ marginBottom: "8px" }}>Warm regards,</p>

          <p>The RetireHow Team</p>
          <p>[Your Phone Number]</p>
          <p>[Your Website]</p>
          <p>[Your Email]</p>
        </footer>
      </main>

      <h1 className="text-3xl font-bold m-5">Advisor Email Format</h1>
      <main style={{ lineHeight: "30px", margin: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            Hi <strong>Rao Movva</strong>,
          </p>
          <p>NEW CONSULTATION BOOKING</p>
        </header>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            <strong>Session Details:</strong>
          </p>
          <p>
            <strong>- Client Name:</strong> [name]
          </p>
          <p>
            <strong>- Client Location:</strong> [State/Province & Country]
          </p>
          <p>
            <strong>- Scheduled Time:</strong> [Selected Time Slot] ([Your Time
            Zone])
          </p>
          <p>
            <strong>- Scheduled Time:</strong> [Selected Time Slot] ([Client's
            Time Zone])
          </p>
          <p>
            <strong>- Duration:</strong> 30 minutes
          </p>
          <p>
            <strong>- Format:</strong> Online video call (Zoom/Google Meet link
            will be sent 24 hours before)
          </p>
          <p>
            <strong>- Consultant:</strong> [Consultant Name]
          </p>
        </div>

        <footer>
          <p>This is an automated notification from Dollarfar Booking System</p>
        </footer>
      </main>
    </>
  );
}
