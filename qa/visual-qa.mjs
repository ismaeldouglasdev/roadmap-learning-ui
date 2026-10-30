// QA visual e funcional do RoadmapMaster.
// Usa o Chromium do Playwright ou o caminho do sistema se disponível.
// Uso: node qa/visual-qa.mjs <baseUrl> <outDir>
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4173';
const outDir = process.argv[3] ?? '/tmp/rm-qa-shots';
mkdirSync(outDir, { recursive: true });

const problems = [];
const note = (msg) => { problems.push(msg); console.log(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

// Tenta usar o Chromium do Playwright, senão o do sistema
const playwrightChrome = '/home/ismaeldev/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const systemChrome = '/usr/bin/google-chrome';
const systemBrave = '/usr/bin/brave';
const executablePath = existsSync(playwrightChrome) ? playwrightChrome : existsSync(systemChrome) ? systemChrome : existsSync(systemBrave) ? systemBrave : undefined;

const browser = await chromium.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));

// ---------- 1. Landing ----------
console.log('\n[1] Landing page');
await page.goto(baseUrl, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
if (!(await page.title()).length) note('title da página está vazio');
else ok(`title: "${await page.title()}"`);
await page.screenshot({ path: `${outDir}/01-landing-light.png`, fullPage: false });

// ---------- 2. Boot do tema ----------
// A landing é escura por design, então o toggle vive no topo do roadmap.
// Aqui checamos só que o script de boot rodou sem erro e definiu o colorScheme.
console.log('\n[2] Boot do tema');
const html = page.locator('html');
const scheme = await page.evaluate(() => document.documentElement.style.colorScheme);
if (scheme === 'dark' || scheme === 'light') ok(`colorScheme definido no boot: ${scheme}`);
else note(`colorScheme não definido no boot (valor="${scheme}")`);
await page.screenshot({ path: `${outDir}/02-landing.png`, fullPage: false });

// ---------- 3. Entrar como convidado ----------
console.log('\n[3] Modo convidado');
const guest = page.getByRole('button', { name: /Começar sem conta/i }).first();
if (await guest.count() === 0) note('botão "Começar sem conta" não encontrado');
else {
  await guest.click();
  await page.waitForTimeout(900);
  const hasRoadmap = await page.getByText('Meu Roadmap').count();
  if (hasRoadmap > 0) ok('entrou no roadmap');
  else note('não encontrou "Meu Roadmap" após entrar como convidado');
  await page.screenshot({ path: `${outDir}/03-roadmap-light.png`, fullPage: false });
}

// ---------- 4. Dark mode no roadmap ----------
console.log('\n[4] Roadmap: toggle de tema');
const toggle2 = page.locator('button[aria-label*="modo"]').first();
if (await toggle2.count() === 0) {
  note('toggle de tema não encontrado no topo do roadmap');
} else {
  const before = await html.getAttribute('class');
  await toggle2.click();
  await page.waitForTimeout(500);
  const after = await html.getAttribute('class');
  if (after?.includes('dark') && !before?.includes('dark')) ok('toggle ligou o modo escuro');
  else if (before?.includes('dark') && !after?.includes('dark')) ok('toggle desligou o modo escuro');
  else note(`toggle não alternou a classe .dark (antes="${before}" depois="${after}")`);
  const persisted = await page.evaluate(() => localStorage.getItem('roadmap-theme'));
  if (persisted === 'dark' || persisted === 'light') ok(`persistido em localStorage: roadmap-theme=${persisted}`);
  else note(`tema não persistido (roadmap-theme="${persisted}")`);
  await page.screenshot({ path: `${outDir}/04-roadmap-dark.png`, fullPage: false });
  await toggle2.click();
  await page.waitForTimeout(300);
}

// ---------- 5. Modais ----------
console.log('\n[5] Modais (a11y)');
// A primeira fase já começa expandida no app (expandedPhase='phase-1').
// Garante que não está recolhida antes de procurar os SkillCards.
const phaseToggle = page.locator('button[aria-expanded="true"]').first();
if (await phaseToggle.count() > 0) {
  const expanded = await phaseToggle.getAttribute('aria-expanded');
  if (expanded === 'false') await phaseToggle.click();
}
// SkillCards são botões de skill (rounded-xl border-2, contêm "tópicos"/"módulos").
// Evita o PhaseCard, que também é um button e diz "Fundamentos".
const skillCard = page.locator('button.rounded-xl.border-2').filter({ hasText: /Python Avançado|TypeScript Moderno|Docker|Infraestrutura/i }).first();
if (await skillCard.count() === 0) {
  // Fallback: qualquer botão que pareça um card (contém barra de progresso)
  const fallback = page.locator('button').filter({ has: page.locator('div') }).filter({ hasText: /XP|tópicos|módulos/i }).first();
  if (await fallback.count() === 0) note('nenhum card de skill clicável encontrado');
  else {
    await fallback.click();
    await page.waitForTimeout(700);
    const dialog = page.locator('[role="dialog"]');
    if (await dialog.count() === 0) note('modal NÃO expõe role="dialog"');
    else ok('modal com role="dialog"');
  }
} else {
  await skillCard.click();
  await page.waitForTimeout(700);
  const dialog = page.locator('[role="dialog"]');
  if (await dialog.count() === 0) {
    note('modal NÃO expõe role="dialog"');
  } else {
    ok('modal com role="dialog"');
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  if (await page.locator('[role="dialog"]').count() === 0) ok('Escape fecha o modal');
  else note('Escape NÃO fecha o modal');
}

// ---------- 6. Progressbar ----------
console.log('\n[6] Indicadores de progresso');
const bars = page.locator('[role="progressbar"]');
const n = await bars.count();
if (n === 0) note('nenhum role="progressbar" encontrado');
else {
  ok(`${n} progressbar(es) encontrados`);
  const first = bars.first();
  for (const attr of ['aria-valuenow', 'aria-valuemin', 'aria-valuemax']) {
    const v = await first.getAttribute(attr);
    if (v !== null) ok(`${attr}="${v}"`);
    else note(`${attr} ausente no progressbar`);
  }
}

// ---------- 7. Erros de console ----------
console.log('\n[7] Console');
if (consoleErrors.length === 0) ok('nenhum erro de console');
else consoleErrors.forEach((e) => note(`console: ${e.slice(0, 200)}`));

// ---------- 8. Mobile 390x844 ----------
console.log('\n[8] Mobile (390x844)');
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});
const mobileErrors = [];
mobile.on('console', (m) => { if (m.type() === 'error') mobileErrors.push(m.text()); });
mobile.on('pageerror', (e) => mobileErrors.push(`pageerror: ${e.message}`));

const checkNoOverflow = async (label) => {
  const metrics = await mobile.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (metrics.scrollWidth > metrics.clientWidth + 1) {
    note(`${label}: overflow horizontal (scrollWidth=${metrics.scrollWidth} > clientWidth=${metrics.clientWidth})`);
  } else {
    ok(`${label}: sem overflow horizontal (${metrics.scrollWidth}px)`);
  }
};

await mobile.goto(baseUrl, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(600);
await checkNoOverflow('landing');
await mobile.screenshot({ path: `${outDir}/06-mobile-landing.png`, fullPage: false });

const mobileGuest = mobile.getByRole('button', { name: /Começar sem conta/i }).first();
if (await mobileGuest.count() === 0) note('mobile: botão "Começar sem conta" não encontrado');
else {
  await mobileGuest.click();
  await mobile.waitForTimeout(900);
  await checkNoOverflow('roadmap');
  await mobile.screenshot({ path: `${outDir}/07-mobile-roadmap.png`, fullPage: false });

  const mobileCard = mobile.locator('button.rounded-xl.border-2').filter({ hasText: /Python Avançado|TypeScript Moderno|Docker|Infraestrutura/i }).first();
  if (await mobileCard.count() === 0) note('mobile: nenhum card de skill clicável encontrado');
  else {
    await mobileCard.click();
    await mobile.waitForTimeout(700);
    if (await mobile.locator('[role="dialog"]').count() === 0) note('mobile: modal NÃO expõe role="dialog"');
    else ok('mobile: modal com role="dialog"');
    await checkNoOverflow('modal de skill');
    await mobile.screenshot({ path: `${outDir}/08-mobile-modal.png`, fullPage: false });
    await mobile.keyboard.press('Escape');
    await mobile.waitForTimeout(400);
  }
}

if (mobileErrors.length === 0) ok('mobile: nenhum erro de console');
else mobileErrors.forEach((e) => note(`mobile console: ${e.slice(0, 200)}`));

await browser.close();

console.log(`\n${'='.repeat(50)}`);
if (problems.length === 0) {
  console.log('QA PASSOU — nenhum problema detectado');
} else {
  console.log(`QA: ${problems.length} problema(s):`);
  problems.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
}
process.exit(problems.length === 0 ? 0 : 1);
