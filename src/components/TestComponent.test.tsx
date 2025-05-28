import { render } from '@testing-library/react';
import { TestComponent } from '#/components/TestComponent';

describe('TestComponent', () => {
  it('renders correctly', () => {
    const element = render(<TestComponent />);

    expect(element.getByText('Test Component')).toBeInTheDocument();
  });
});
