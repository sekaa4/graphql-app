module.exports = {
  '**/*.{json,css,scss,md}': (filenames) => ['npm run format:fix', 'npm run validate'],
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    'npm run format:fix',
    'npm run lint:fix',
    'npm run type:check',
    'npm run format:check',
  ],
};
