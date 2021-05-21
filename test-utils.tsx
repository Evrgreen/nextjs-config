import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';

interface ProviderProps {
	children?: NonNullable<React.ReactNode>;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
	return <>{children};</>;
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render }
