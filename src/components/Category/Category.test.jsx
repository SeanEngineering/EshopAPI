import { render, screen } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Category from './Category';

test.skip('Category', () => {
    render(<Category />);
});
