import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import GameAdd from './GameAdd';
import { addGame } from '../api/api';
import { vi } from 'vitest';

// Mock the addGame API function using Vitest's vi.fn()
vi.mock('../api/api', () => ({
  addGame: vi.fn()
}));

describe('GameAdd Component', () => {
  const setup = (isLoggedIn = true) => {
    return render(<GameAdd isLoggedIn={isLoggedIn} />);
  };

  test('renders form with initial values', () => {
    setup();

    // Check if form fields are present
    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year of Release:/i)).toBeInTheDocument();
    expect(screen.getByText(/FPS/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();  // Co-op radio button
    expect(screen.getByText(/PC/i)).toBeInTheDocument();  // Platform checkbox
  });

  test('handles input change for text fields', () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Game Title' } });
    fireEvent.change(screen.getByLabelText(/Year of Release:/i), { target: { value: '2022' } });

    expect(screen.getByLabelText(/Title:/i).value).toBe('New Game Title');
    expect(screen.getByLabelText(/Year of Release:/i).value).toBe('2022');
  });

  test('handles input change for radio buttons (genre)', () => {
    setup();

    fireEvent.click(screen.getByLabelText(/RPG/i));

    expect(screen.getByLabelText(/RPG/i).checked).toBe(true);
    expect(screen.getByLabelText(/FPS/i).checked).toBe(false);
  });

  test('handles input change for checkboxes (platforms)', () => {
    setup();

    fireEvent.click(screen.getByLabelText(/PC/i));
    fireEvent.click(screen.getByLabelText(/PS5/i));

    expect(screen.getByLabelText(/PC/i).checked).toBe(true);
    expect(screen.getByLabelText(/PS5/i).checked).toBe(true);
  });

  test('submits form and calls addGame API', async () => {
    const mockGameData = {
      gameName: 'New Game Title',
      gameRelease: '2022',
      gameGenre: 'RPG',
      gameDeveloper: 'Game Studio',
      gamePublisher: 'Publisher',
      gameDirector: 'Director',
      gameWriter: 'Writer',
      gameComposer: 'Composer',
      gameCoop: true,
      gameIndie: true,
      gamePlatform: ['PC', 'PS5'],
      gameDescription: 'Description of the game',
      gameInfo: 'Extra game info'
    };

    setup();

    // Mock input changes
    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Game Title' } });
    fireEvent.change(screen.getByLabelText(/Year of Release:/i), { target: { value: '2022' } });
    fireEvent.click(screen.getByLabelText(/RPG/i));
    fireEvent.click(screen.getByLabelText(/PC/i));
    fireEvent.click(screen.getByLabelText(/PS5/i));

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if addGame was called with the expected data
    await waitFor(() => expect(addGame).toHaveBeenCalledWith(mockGameData));
  });

  test('handles API failure', async () => {
    // Simulate API failure
    addGame.mockRejectedValueOnce(new Error('API error'));

    setup();

    // Submit the form with valid data
    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Game Title' } });
    fireEvent.change(screen.getByLabelText(/Year of Release:/i), { target: { value: '2022' } });
    fireEvent.click(screen.getByLabelText(/RPG/i));
    fireEvent.click(screen.getByLabelText(/PC/i));
    fireEvent.click(screen.getByLabelText(/PS5/i));
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addGame).toHaveBeenCalled());
  });
});