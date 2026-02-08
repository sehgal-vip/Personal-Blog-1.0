const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const readScriptFromPage = (relativePath) => {
  const filePath = path.join(__dirname, '..', relativePath);
  const contents = fs.readFileSync(filePath, 'utf8');
  const match = contents.match(/<script>([\s\S]*?)<\/script>\s*$/);
  if (!match) {
    throw new Error(`Inline script not found in ${relativePath}`);
  }
  return match[1];
};

test('projects arrow navigation highlights rows', async ({ page }) => {
  const projectsScript = readScriptFromPage('pages/projects.html');
  const html = `<!doctype html>
  <html>
    <body>
      <div class="reading-list">
        <section class="collapsible-section" data-section="projects">
          <div class="section-filters">
            <div class="filter-group">
              <button class="filter-toggle" data-filter="year" data-section="projects"></button>
              <div class="filter-dropdown filter-year" data-section="projects">
                <label class="filter-option">
                  <input type="checkbox" value="all" checked>
                  <span>All</span>
                </label>
              </div>
            </div>
          </div>
          <table class="data-table">
            <tbody>
              <tr data-year="2026"><td>Row 1</td></tr>
              <tr data-year="2026"><td>Row 2</td></tr>
              <tr data-year="2024"><td>Row 3</td></tr>
            </tbody>
          </table>
        </section>
      </div>
      <script>${projectsScript}</script>
    </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  const rows = page.locator('.data-table tbody tr');
  await expect(rows.first()).toBeVisible();

  await page.keyboard.press('ArrowDown');
  await expect(rows.first()).toHaveClass(/row-selected/);

  await page.keyboard.press('ArrowDown');
  await expect(rows.nth(1)).toHaveClass(/row-selected/);
});

test('reading arrow navigation stops on pagination before next section', async ({ page }) => {
  const readingScript = readScriptFromPage('pages/reading.html');
  const html = `<!doctype html>
  <html>
    <body>
      <div class="reading-list">
        <section class="collapsible-section" data-section="papers">
          <div class="section-filters">
            <div class="filter-group">
              <button class="filter-toggle" data-filter="year" data-section="papers"></button>
              <div class="filter-dropdown filter-year" data-section="papers">
                <label class="filter-option">
                  <input type="checkbox" value="all" checked>
                  <span>All</span>
                </label>
              </div>
            </div>
            <div class="filter-group">
              <button class="filter-toggle" data-filter="author" data-section="papers"></button>
              <div class="filter-dropdown filter-author" data-section="papers">
                <label class="filter-option">
                  <input type="checkbox" value="all" checked>
                  <span>All</span>
                </label>
              </div>
            </div>
          </div>
          <table class="data-table">
            <tbody>
              <tr data-year="2026" data-author="A"><td>Paper 1</td></tr>
              <tr data-year="2026" data-author="A"><td>Paper 2</td></tr>
              <tr data-year="2026" data-author="A"><td>Paper 3</td></tr>
              <tr data-year="2026" data-author="A"><td>Paper 4</td></tr>
              <tr data-year="2026" data-author="A"><td>Paper 5</td></tr>
              <tr data-year="2026" data-author="A"><td>Paper 6</td></tr>
            </tbody>
          </table>
          <div class="section-pagination" data-section="papers">
            <button class="pagination-btn pagination-prev" disabled>Prev</button>
            <span class="pagination-info">Page 1 of 1</span>
            <button class="pagination-btn pagination-next">Next</button>
            <button class="pagination-btn pagination-all">Select All</button>
          </div>
        </section>
        <section class="collapsible-section" data-section="books">
          <div class="section-filters">
            <div class="filter-group">
              <button class="filter-toggle" data-filter="year" data-section="books"></button>
              <div class="filter-dropdown filter-year" data-section="books">
                <label class="filter-option">
                  <input type="checkbox" value="all" checked>
                  <span>All</span>
                </label>
              </div>
            </div>
            <div class="filter-group">
              <button class="filter-toggle" data-filter="author" data-section="books"></button>
              <div class="filter-dropdown filter-author" data-section="books">
                <label class="filter-option">
                  <input type="checkbox" value="all" checked>
                  <span>All</span>
                </label>
              </div>
            </div>
          </div>
          <table class="data-table">
            <tbody>
              <tr data-year="2025" data-author="B"><td>Book 1</td></tr>
              <tr data-year="2025" data-author="B"><td>Book 2</td></tr>
            </tbody>
          </table>
          <div class="section-pagination" data-section="books">
            <button class="pagination-btn pagination-prev" disabled>Prev</button>
            <span class="pagination-info">Page 1 of 1</span>
            <button class="pagination-btn pagination-next" disabled>Next</button>
            <button class="pagination-btn pagination-all">Select All</button>
          </div>
        </section>
      </div>
      <script>${readingScript}</script>
    </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  const papersSection = page.locator('section[data-section="papers"]');
  await expect(papersSection.locator('tbody tr').first()).toBeVisible();
  await expect(papersSection.locator('.pagination-info')).toContainText('Page');

  const visibleCount = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('section[data-section="papers"] tbody tr'));
    return rows.filter(row => row.style.display !== 'none').length;
  });

  for (let i = 0; i < visibleCount; i++) {
    await page.keyboard.press('ArrowDown');
  }

  await page.keyboard.press('ArrowDown');
  const paginationSelected = papersSection.locator('.pagination-selected');
  await expect(paginationSelected).toHaveCount(1);

  await page.keyboard.press('ArrowDown');
  const booksSelected = page.locator('section[data-section="books"] tbody tr.row-selected');
  await expect(booksSelected).toHaveCount(1);
});
