const config = {
  '*': ['cspell --no-must-find-files', 'prettier --list-different'],
  '**/*.{ts,tsx,js,jsx,cjs,mjs}': ['eslint'],
  '**/*.{md,mdx}': ['markdownlint'],
};

export default config;
