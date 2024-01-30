import { render, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar/Navbar';
import * as ReactRouterDom from 'react-router-dom';

// Mock the useNavigate hook from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object),
    useNavigate: vi.fn(), // Mock useNavigate
  };
});

describe('Navbar component', () => {
  it('navigates to the correct paths when clicked', () => {
    // Mock the navigate function
    const mockNavigate = vi.fn();
    // Mock the useNavigate hook

    vi.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

    const { getByText } = render(<Navbar />);

    fireEvent.click(getByText('Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(getByText('Favorites'));
    expect(mockNavigate).toHaveBeenCalledWith('/details/favorites');
  });
});
