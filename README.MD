npm create-next-app <Project Name>   
create src folder @root for all non nextjs auto created files (components, etc)
	
	
typescript installs:
npm i -D typescript @types/react @types/react-dom @types/node ts-node @typescript-eslint/eslint-plugin @typescript-eslint/parser

accessibility installs: 
	npm i -D axe-core

eslint plugins:
	npm i -D eslint eslint-config-airbnb eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
	
	
testing: 
 -npm i -D @testing-library/jest-dom @testing-library/user-event @testing-library/react babel-jest jest @types/jest
	
dependencies: 
	npm i cross-env
 
create package.json scripts: 
	  "dev": "cross-env NODE_OPTIONS='--inspect' next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
	
	
create new debugger if needed: 
	chrome debugger: 
			"version": "0.2.0",
				"configurations": [
					{
						"type": "node",
						"request": "attach",
						"name": "Attach Debugger",
						"skipFiles": ["<node_internals>/**"],
						"port": 9229
					}
				]
			}

convert _app to tsx: 
	contents: 
		import '@styles/globals.css';
 
			import { FC } from 'react';
			import { AppProps } from 'next/app';
			import Head from "next/head"
			import Layout from "@components/Layout"
	
			const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
			  	
			    return(
				  <Head>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				  </Head>
				   <Layout>
					<Component {...pageProps} />;
			          <Layout/>
				)
			};

			export default MyApp;

create src/test/test-utils.tsx: 
		contents: 
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

			export { customRender as render };
