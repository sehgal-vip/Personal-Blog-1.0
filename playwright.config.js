const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: 'https://vipulsehgal.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 60000
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
