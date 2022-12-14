import { render, screen } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';

test('Cart', () => {
    it('Should display a product, price, quantity, and total column', () => {
        render(<Cart uuid={3} />);
        const product = screen.getByText(/product/i);
        const price = screen.getByText(/product/i);
        const qty = screen.getByText(/QTY/i);
        const total = screen.getByText(/total/i);
        expect(product).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(qty).toBeInTheDocument();
        expect(total).toBeInTheDocument();
    });

    it('Should have a place to insert contact details', () => {
        render(<Cart uuid={3} />);
    });
    it('Should have a place to insert address details', () => {});
    it('Should have a place to insert additional info details', () => {});
});
