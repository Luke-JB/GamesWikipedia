import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

// Mock before importing Login
vi.mock('../api/api', () => ({
  loginUser: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../Components/Footer', () => ({
  default: () => <div>Mock Footer</div>,
}));

// Now import after mocks
import Login from './Login';
import { loginUser } from '../api/api';

describe('Login Component', () => {
  const mockSetIsLoggedIn = vi.fn();
  const mockAlert = vi.fn();

  beforeEach(() => {
    global.alert = mockAlert;
    vi.clearAllMocks();
  });

  it('renders and submits the form successfully', async () => {
    loginUser.mockResolvedValueOnce({ data: {} });

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'testpass' },
    });
    fireEvent.click(screen.getByLabelText(/Remember Me/i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockAlert).toHaveBeenCalledWith('Login successful');
    });
  });

  it('shows alert on failed login', async () => {
    loginUser.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Login failed');
    });
  });
});