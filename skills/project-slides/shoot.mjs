/**
 * shoot.mjs: screenshot every slide of a project-slides HTML deck and report overflow.
 * Usage: node shoot.mjs <deck.html> [out-dir] (default: shots)
 * CHROMIUM_PATH: optional Chromium executable path.
 * PLAYWRIGHT_DIR: directory containing node_modules/playwright.
 * LD_LIBRARY_PATH may be needed if the Chromium build needs local libraries.
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const [deckFile, output = 'shots'] = process.argv.slice(2);
if (!deckFile) {
  console.error('Usage: node shoot.mjs <deck.html> [out-dir]');
  process.exit(2);
}
let playwright;
try { playwright = await import('playwright'); } catch {
  for (const directory of [process.cwd(), process.env.PLAYWRIGHT_DIR].filter(Boolean)) {
    try {
      playwright = createRequire(path.join(path.resolve(directory), 'noop.js'))('playwright');
      break;
    } catch { /* Try the next resolution directory. */ }
  }
}
if (!playwright) {
  console.error('Playwright not found: run from a directory where `npm i playwright` was run, or set PLAYWRIGHT_DIR');
  process.exit(2);
}

const out = path.resolve(output);
const slides = [], consoleErrors = [];
let browser;
try {
  await mkdir(out, { recursive: true });
  browser = await playwright.chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push({ type: 'console', message: message.text() });
  });
  page.on('pageerror', error => consoleErrors.push({ type: 'pageerror', message: error.message }));
  const url = pathToFileURL(path.resolve(deckFile));
  url.hash = '1';
  await page.goto(url.href, { waitUntil: 'load' });
  const n = await page.locator('#deck .slide').count();
  if (!n) throw new Error('No slides found matching #deck .slide');
  for (let i = 1; i <= n; i++) {
    await page.evaluate(index => { location.hash = '#' + index; }, i);
    await page.waitForFunction(index =>
      document.querySelectorAll('#deck .slide')[index - 1]?.classList.contains('current'), i);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, `slide-${i}.png`) });
    const result = await page.evaluate(index => {
      const slide = document.querySelectorAll('#deck .slide')[index - 1];
      const bounds = slide.getBoundingClientRect(), problems = [];
      for (const element of [slide, ...slide.querySelectorAll('*')]) {
        if (element.parentElement?.closest('svg')) continue;
        const style = getComputedStyle(element), rect = element.getBoundingClientRect();
        const detail = {
          tag: element.tagName.toLowerCase(), class: element.getAttribute('class') || '',
          text: (element.textContent || '').trim().slice(0, 60),
        };
        if (!element.matches('svg')) {
          const textBlock = !!element.textContent.trim() &&
            !['inline', 'none', 'contents'].includes(style.display);
          const { scrollWidth, clientWidth, scrollHeight, clientHeight } = element;
          if ((scrollWidth > clientWidth + 1 && (style.overflowX !== 'visible' || textBlock)) ||
              (scrollHeight > clientHeight + 1 && (style.overflowY !== 'visible' || textBlock))) {
            problems.push({ type: 'overflow', ...detail, scrollWidth, clientWidth, scrollHeight, clientHeight });
          }
          if (style.textOverflow === 'ellipsis' && scrollWidth > clientWidth) {
            problems.push({ type: 'text truncated', ...detail, scrollWidth, clientWidth });
          }
        }
        if (element !== slide && rect.width > 0 && rect.height > 0 &&
            (rect.left < bounds.left - 1 || rect.right > bounds.right + 1 ||
             rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1)) {
          problems.push({ type: 'outside slide', ...detail,
            rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom },
            slideRect: { left: bounds.left, top: bounds.top, right: bounds.right, bottom: bounds.bottom } });
        }
      }
      return { counter: document.querySelector('.counter')?.textContent ?? null, problems };
    }, i);
    if (result.counter !== `${i} / ${n}`) {
      result.problems.push({ type: 'counter mismatch', expected: `${i} / ${n}`, actual: result.counter });
    }
    slides.push({ slide: i, ...result });
  }
  await page.keyboard.press('g');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(out, 'overview.png'), fullPage: true });
  await page.keyboard.press('g');
  await browser.close();
  browser = null;
  const problemCount = slides.reduce((sum, slide) => sum + slide.problems.length, 0);
  const summary = `${n} slides, ${problemCount} problems, ${consoleErrors.length} console errors`;
  const lines = slides.map(({ slide, problems }) =>
    `slide ${slide}: ${problems.length ? problems.map(problem => JSON.stringify(problem)).join('; ') : 'ok'}`);
  lines.push(...consoleErrors.map(error => `${error.type}: ${JSON.stringify(error.message)}`), summary);
  await writeFile(path.join(out, 'report.json'), JSON.stringify({
    slides, consoleErrors, slideCount: n, problemCount, consoleErrorCount: consoleErrors.length, summary,
  }, null, 2) + '\n');
  console.log(lines.join('\n'));
  process.exitCode = problemCount || consoleErrors.length ? 1 : 0;
} catch (error) {
  console.error(`Screenshot run failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}
