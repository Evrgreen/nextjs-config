npm create-next-app <Project Name> 
create tsconfig.json  @root
  -add support for absolute paths 
      -contents : "baseUrl": "./",
                  "paths" :{
                      "@components/*":["./components/*"]
                  }
      
          
npm run dev to populate tsconfig and spin up server
typescript installs:
npm i -D typescript @types/react @types/node ts-node

accessibility installs: 
	npm i -D axe-core


testing: 
 -npm i -D @testing-library/jest-dom @testing-library/react babel-jest jest
 -create .babelrc @root 
    --contents :
       {
        "presets": ["next/babel"]
       }
  -create jest.setup.ts
       -contents: import "@testing-library/jest-dom";
  -create jest.config.ts
       -contents: module.exports = {
	                  testEnvironment: 'node',
                   	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
                    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	                  moduleNameMapper: {
		                '^@components(.*)$': '<rootDir>/components$1',
	                  },
                    moduleDirectories: ['node_modules', '<rootDir>./'],
                  };
  --create test/test-utils.ts
      -contents: 
            import { render, RenderOptions, RenderResult } from '@testing-library/react';
            import React, { ReactElement } from 'react';

            interface ProviderProps {
              children?: NonNullable<React.ReactNode>;
            }

            const Providers: React.FC<ProviderProps> = ({ children }) => {
              return <Any Providers yoor app needs or a fragment>
                        {children};
                      </closing tag for provider>;
            };

            const customRender = (
              ui: ReactElement,
              options?: Omit<RenderOptions, 'queries'>,
            ): RenderResult => render(ui, { wrapper: Providers, ...options });

            export * from '@testing-library/react';

            export { customRender as render };
     -create test script in package.json: 
              "test": "jest --env=jsdom"
	      
	   
Configure eslint :

     -create .eslintignore @root: 
     		-contents:  
				node_modules
				coverage
				.next
     -create .eslintrc.js @root:
     		-content: 
			module.exports = {
				  env: {
				    browser: true,
				    es2021: true,
				    node: true,
				    jest: true,
				  },
				  extends: [
				    'plugin:@typescript-eslint/recommended',
				    'plugin:react/recommended',
				    'plugin:react-hooks/recommended',
				    'airbnb',
				    'plugin:prettier/recommended',
				    'plugin:import/errors',
				    'plugin:import/warnings',
				    'plugin:import/typescript',
				    'plugin:jsx-a11y/recommended',
				  ],
				  parser: '@typescript-eslint/parser',
				  parserOptions: {
				    ecmaFeatures: {
				      jsx: true,
				    },
				    ecmaVersion: 12,
				    sourceType: 'module',
				  },
				  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
				  rules: {
				    'prettier/prettier': 'error',
				    'react/react-in-jsx-scope': 'off',
				    'react/jsx-filename-extension': 'off',
				    'import/extensions': 'off',
				    'import/no-unresolved': 'error',
				    'import/order': [
				      'error',
				      {
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'object', 'index']],
					pathGroups: [
					  {
					    pattern: 'react',
					    group: 'external',
					    position: 'before',
					  },
					],
					pathGroupsExcludedImportTypes: ['react'],
					'newlines-between': 'never',
					alphabetize: {
					  order: 'asc',
					  caseInsensitive: true,
					},
				      },
				    ],
				    'import/no-extraneous-dependencies': [
				      'error',
				      { devDependencies: ['jest.setup.ts', '**/*.test.tsx', '**/*.spec.tsx', '**/*.test.ts', '**/*.spec.ts'] },
				    ],
				  },
				  settings: {
				    react: {
				      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
				    },
				    'import/resolver': {
				      // use <root>/tsconfig.json
				      typescript: {
					project: '.',
				      },
				    },
				  },
				};
