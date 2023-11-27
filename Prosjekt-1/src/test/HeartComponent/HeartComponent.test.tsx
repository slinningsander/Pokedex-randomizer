import { render, screen } from '@testing-library/react';
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
  });
  mockRefresh = false;
  // eslint-disable-next-line prefer-const
  mockSetRefresh = vi.fn((newRefresh) => {
    mockRefresh = newRefresh;
  });

  it('Should be notFav', () => {
    render(<HeartComponent name="ditto" setRefresh={mockSetRefresh} refresh={mockRefresh} />);
    const heart = screen.getByTestId('heartTestID');
    expect(heart).toHaveClass('notFav');
  });
});
