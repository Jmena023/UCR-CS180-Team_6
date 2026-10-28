const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
(async () => {
  const b = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const p = await b.newPage({ viewport: { width: 360, height: 800 } });
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto("http://localhost:8081", { waitUntil: "domcontentloaded" });
  await p
    .getByRole("button", { name: "Play Photo Battle", exact: true })
    .click();
  await p.getByText("Create a room", { exact: true }).click();
  await p.getByRole("button", { name: "Edit game settings" }).click();
  await p.getByText("15s", { exact: true }).click();
  await p.getByRole("button", { name: "1", exact: true }).click();
  await p.getByText("Start the hunt", { exact: true }).click();
  await p.getByText("Use a demo photo", { exact: true }).click();
  await p.getByText("Submit photo", { exact: true }).click();
  await p
    .getByText("PICK YOUR FAVORITE", { exact: true })
    .waitFor({ timeout: 25000 });
  await p.screenshot({ path: "preview/battle-voting.png" });
  assert.equal(await p.getByText("Challenge", { exact: true }).count(), 0);
  await p.getByRole("button", { name: "Select", exact: true }).nth(1).click();
  await p.getByText("Confirm vote", { exact: true }).click();
  await p.getByText("VOTE SUBMITTED", { exact: true }).waitFor();
  await p
    .getByText("The votes are in.", { exact: true })
    .waitFor({ timeout: 20000 });
  await p.getByText("Continue", { exact: true }).click();
  await p.getByText("FINAL STANDINGS", { exact: true }).waitFor();
  await p.screenshot({ path: "preview/results.png" });
  await p.getByText("Play again", { exact: true }).click();
  await p.getByText("Start the hunt", { exact: true }).last().waitFor();
  assert.ok((await p.locator("body").innerText()).includes("JNGLE6"));
  assert.equal(errors.length, 0);
  console.log(
    "PASS: Battle anonymous entries, vote, timed results, game over, preserved-room rematch; zero runtime errors.",
  );
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
