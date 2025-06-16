import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MortgageCalculator } from "./MortgageCalculator";

// Mock Recharts
vi.mock("recharts", () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Line: () => null,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div style={{ width: 100, height: 100 }}>{children}</div>
  ),
}));

describe("MortgageCalculator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Renders the calculator with default values
  it("renders the calculator with default values", () => {
    render(<MortgageCalculator />);

    expect(screen.getByLabelText("Mortgage Amount ($)")).toHaveValue(300000);
    expect(screen.getByLabelText("Annual Interest Rate (%)")).toHaveValue(5);
    expect(screen.getByLabelText("Amortization Period (years)")).toHaveValue(
      25
    );
    expect(screen.getByLabelText("Term (years)")).toHaveValue(5);
    expect(screen.getByLabelText("Payment Frequency")).toHaveValue("monthly");
    expect(screen.getByLabelText("Prepayment Amount ($)")).toHaveValue(0);
    expect(screen.getByText("Calculate Mortgage")).toBeInTheDocument();
  });

  // Test 2: Updates form values when inputs change
  it("updates form values when inputs change", () => {
    render(<MortgageCalculator />);

    const principalInput = screen.getByLabelText("Mortgage Amount ($)");
    fireEvent.change(principalInput, { target: { value: "400000" } });
    expect(principalInput).toHaveValue(400000);

    const rateInput = screen.getByLabelText("Annual Interest Rate (%)");
    fireEvent.change(rateInput, { target: { value: "3.5" } });
    expect(rateInput).toHaveValue(3.5);
  });

  // Test 3: Calculates mortgage and shows results
  it("calculates mortgage and shows results", async () => {
    render(<MortgageCalculator />);

    // Change some values
    fireEvent.change(screen.getByLabelText("Mortgage Amount ($)"), {
      target: { value: "250000" },
    });
    fireEvent.change(screen.getByLabelText("Annual Interest Rate (%)"), {
      target: { value: "4.5" },
    });

    // Click calculate button
    fireEvent.click(screen.getByText("Calculate Mortgage"));

    // Wait for calculation to complete
    await waitFor(() => {
      expect(screen.getByText("Mortgage Summary")).toBeInTheDocument();
      expect(screen.getByText(/Payment Amount:/)).toBeInTheDocument();
    });
  });

  // Test 4: Shows loading state during calculation
  it("shows loading state during calculation", async () => {
    render(<MortgageCalculator />);

    fireEvent.click(screen.getByText("Calculate Mortgage"));

    expect(screen.getByText("Calculating...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText("Calculating...")).not.toBeInTheDocument();
    });
  });

  // Test 5: Toggles between summary and schedule tabs
it('toggles between summary and schedule tabs', async () => {
  render(<MortgageCalculator />);
  
  // Calculate first
  fireEvent.click(screen.getByText('Calculate Mortgage'));
  
  // Wait for summary to appear
  await waitFor(() => {
    expect(screen.getByText('Principal Payments')).toBeInTheDocument();
  });
  
  // Switch to schedule tab
  const scheduleTab = screen.getAllByText('Payment Schedule').find(el => el.tagName === 'BUTTON');
  if (scheduleTab) {
    fireEvent.click(scheduleTab);
  }
  
  // Verify schedule content - check for first row
  await waitFor(() => {
    const firstPeriod = screen.getAllByText(/monthly 1|weekly 1|bi-weekly 1/i)[0];
    expect(firstPeriod).toBeInTheDocument();
  });
});

  // Test 6: Disables prepayment fields when prepayment amount is 0
  it("disables prepayment fields when prepayment amount is 0", () => {
    render(<MortgageCalculator />);

    expect(screen.getByLabelText("Prepayment Frequency")).toBeDisabled();
    expect(screen.getByLabelText("Start With Payment #")).toBeDisabled();

    // Enable prepayment and check fields
    fireEvent.change(screen.getByLabelText("Prepayment Amount ($)"), {
      target: { value: "100" },
    });

    expect(screen.getByLabelText("Prepayment Frequency")).not.toBeDisabled();
    expect(screen.getByLabelText("Start With Payment #")).not.toBeDisabled();
  });

  // Test 7: Shows charts when results are available
  it("shows charts when results are available", async () => {
    render(<MortgageCalculator />);

    fireEvent.click(screen.getByText("Calculate Mortgage"));

    await waitFor(() => {
      expect(
        screen.getByText("Mortgage Balance Over Time")
      ).toBeInTheDocument();
      expect(screen.getByText("Yearly Payment Breakdown")).toBeInTheDocument();
    });
  });

  // Test 8: Shows empty state when no calculation
  it("shows empty state when no calculation", () => {
    render(<MortgageCalculator />);

    expect(screen.getByText("No calculation yet")).toBeInTheDocument();
    expect(screen.getByText(/Enter your mortgage details/)).toBeInTheDocument();
  });

  // Test 9: Validates term years doesn't exceed amortization
  it("validates term years doesn't exceed amortization", () => {
    render(<MortgageCalculator />);

    const termInput = screen.getByLabelText("Term (years)");
    expect(termInput).toHaveAttribute("max", "25"); // Default amortization is 25

    // Change amortization to 30
    fireEvent.change(screen.getByLabelText("Amortization Period (years)"), {
      target: { value: "30" },
    });
    expect(termInput).toHaveAttribute("max", "30");
  });

  // Test 10: Formats currency correctly
  it("formats currency correctly", async () => {
    render(<MortgageCalculator />);

    // Set values that will produce known results
    fireEvent.change(screen.getByLabelText("Mortgage Amount ($)"), {
      target: { value: "100000" },
    });
    fireEvent.change(screen.getByLabelText("Annual Interest Rate (%)"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText("Amortization Period (years)"), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByText("Calculate Mortgage"));

    await waitFor(() => {
      // Check that currency values are formatted with $ and commas
      const paymentAmount = screen.getByText(/Payment Amount:/).textContent;
      expect(paymentAmount).toMatch(/\$\d{1,3}(,\d{3})*\.\d{2}/);
    });
  });
});
