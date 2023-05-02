module.exports = {
  'src/**/*.{json,css,scss,md}': (filenames) => ['npm run format:fix', 'npm run validate'],
  'src/**/*.{js,jsx,ts,tsx}': (filenames) => [
    'npm run format:fix',
    'npm run lint',
    'npm run type:check',
    'npm run format:check',
  ],
};
