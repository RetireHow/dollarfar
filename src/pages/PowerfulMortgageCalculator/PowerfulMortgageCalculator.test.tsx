import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {PowerfulMortgageCalculator} from './PowerfulMortgageCalculator';

// Mock components
vi.mock('../../components/UI/PageHero', () => ({
  default: () => <div>PageHero Mock</div>,
}));

vi.mock('./ExportMortgagePDFModal', () => ({
  ExportMortgagePDFModal: () => <div>Export PDF Modal Mock</div>,
}));

describe('PowerfulMortgageCalculator', () => {
  it('renders the main calculator title', () => {
    render(<PowerfulMortgageCalculator />);
    expect(screen.getByText('Mortgage Calculator')).toBeInTheDocument();
  });

  it('displays default home price input value', () => {
    render(<PowerfulMortgageCalculator />);
    // Look for formatted value with $ and commas
    expect(screen.getByDisplayValue('$300,000')).toBeInTheDocument();
  });

  it('toggles between basic and advanced tabs', async () => {
    render(<PowerfulMortgageCalculator />);
    
    const advancedTab = screen.getByText('Advanced');
    fireEvent.click(advancedTab);
    
    await waitFor(() => {
      expect(screen.getByText('Annual Property Tax')).toBeInTheDocument();
    });
  });

  it('resets all inputs when reset button is clicked', async () => {
    render(<PowerfulMortgageCalculator />);
    
    // Change some values using formatted values
    fireEvent.change(screen.getByDisplayValue('$300,000'), { 
      target: { value: '400000' }
    });
    fireEvent.change(screen.getByDisplayValue('20%'), { 
      target: { value: '10' } 
    });
    
    // Click reset
    fireEvent.click(screen.getByText('Reset Calculator'));
    
    await waitFor(() => {
      // Check for formatted default values
      expect(screen.getByDisplayValue('$300,000')).toBeInTheDocument();
      expect(screen.getByDisplayValue('20%')).toBeInTheDocument();
    });
  });

});