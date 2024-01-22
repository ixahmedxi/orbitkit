const config = {
  '*': ['cspell', 'prettier --list-different'],
  '**/*.{ts,tsx,js,jsx,cjs,mjs}': ['eslint'],
  '**/*.{md,mdx}': ['markdownlint'],
};

export default config;
