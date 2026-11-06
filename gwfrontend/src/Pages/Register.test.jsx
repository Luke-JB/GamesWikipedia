import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router';
import Register from '../Pages/Register'; // Adjust the import path as per your project structure
import { registerUser } from '../api/api'; // Adjust as per your project structure

// Mock the API call for registration
vi.mock('../api/api', () => ({
  registerUser: vi.fn(),
}));

// Mock useNavigate to prevent actual navigation during testing
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock useNavigate
    MemoryRouter: actual.MemoryRouter, // Ensure MemoryRouter is available
  };
});

describe('Register Component', () => {
  test('renders and handles form submission', async () => {
    const mockNavigate = vi.fn(); // Create mock function for useNavigate

    // Mock useNavigate to return mockNavigate
    useNavigate.mockReturnValue(mockNavigate);

    // Mock successful API call
    registerUser.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input into the form fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/submit/i));

    // Wait for the navigation to be triggered after successful registration
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  test('shows alert on password mismatch', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input with mismatched passwords
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/submit/i));

    // Expect the alert to be shown for password mismatch
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  test('handles API failure gracefully', async () => {
    // Simulate failed API call
    registerUser.mockRejectedValueOnce(new Error('Registration failed'));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input into the form fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/submit/i));

    // Wait for the error message from the failed API call
    await waitFor(() => expect(screen.getByText(/registration failed/i)).toBeInTheDocument());
  });
});