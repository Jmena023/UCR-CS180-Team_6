const { chromium } = require("@playwright/test");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:8081", {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await page.getByText("WELCOME TO THE HUNT").waitFor({ timeout: 120000 });
  await page.screenshot({ path: "preview/welcome.png", fullPage: true });
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByText("Your crew awaits.").waitFor();
  await page.getByRole("button", { name: "Go back" }).click();
  await page.getByRole("button", { name: "Create Account" }).click();
  await page.getByText("Join the adventure.").waitFor();
  await page.getByRole("button", { name: "Go back" }).click();
  await page.getByRole("button", { name: "Skip" }).click();
  await page.getByText("PICK YOUR ADVENTURE").waitFor({ timeout: 120000 });
  await page.screenshot({ path: "preview/home.png", fullPage: true });
  await page
    .getByRole("button", { name: "Play Album Hunt", exact: true })
    .click();
  await page.getByText("Create a room", { exact: true }).click();
  await page.getByText("Start the hunt", { exact: true }).click();
  await page.getByText("Use a demo photo", { exact: true }).click();
  await page.getByText("Submit photo", { exact: true }).click();
  await page.getByText("You’re locked in.", { exact: true }).waitFor();
  await page.screenshot({ path: "preview/game.png", fullPage: true });
  console.log(
    JSON.stringify({
      errors,
      url: page.url(),
      status: "Welcome → sign in/create account/skip → home → game verified",
    }),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
