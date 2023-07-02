import { getByAltText, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getProducts } from '../../service/products';

describe('full app rendering', () => {
    it('Should render out the full application', async () => {
        const user = userEvent.setup();
        render(<App />);
        await waitFor(() => {
            screen.getByText(/File/i);
        });

        expect(screen.getByText(/Decorative/i)).toBeInTheDocument();
        expect(screen.getByText(/Vehicles/i)).toBeInTheDocument();
    });

    it('Should be able to move to a different category', async () => {
        const user = userEvent.setup();
        render(<App />);
        await waitFor(async () => {
            await getProducts();
            await screen.getByText(/Decorative/i);
        });
        await user.click(screen.getByTestId('vehicle'));
        await waitFor(() => {
            screen.getByTestId('card');
        });
        expect(screen.getByText(/Decorative/i)).not.toBeInTheDocument();
    });
});
