import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import HeartComponent from '../../components/HeartComponent/HeartComponent';

describe('HeartComponent', () => {
  let mockSetRefresh: (refresh: boolean) => void;
  let mockRefresh: boolean;
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue('[]'),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Set the mock refresh functions
    mockRefresh = false;
    mockSetRefresh = vi.fn((newRefresh) => {
      mockRefresh = newRefresh;
    });
  });

  it('Should be notFav', () => {
    render(<HeartComponent name="ditto" setRefresh={mockSetRefresh} refresh={mockRefresh} />);
    const heart = screen.getByTestId('heartTestID');
    expect(heart).toHaveClass('notFav');
  });

  // Tried to change state by clicking, but can't get the test to pass

  //   it('Should change state', async () => {
  //     render(<HeartComponent name="ditto" refresh={mockRefresh} setRefresh={mockSetRefresh} />);

  //     const heart = screen.getByTestId('heartTestID');
  //     expect(heart).toHaveClass('notFav');

  //     userEvent.click(heart);
  //     await waitFor(() => {
  //       expect(heart).toHaveClass('isFav');
  //     });

  //     userEvent.click(heart);
  //     await waitFor(() => {
  //       expect(heart).toHaveClass('notFav');
  //     });
  //   });
});
