import { expect, test } from "@playwright/test";

["react", "preact"].forEach((framework) => {
  test(framework, async ({ page }) => {
    await page.goto(`/capri/${framework}`);
    const counter1 = page.locator("css=.counter").nth(0);
    expect(counter1.locator("css=span")).toHaveText("0");
    await counter1.getByText("+").click();
    expect(counter1.locator("css=span")).toHaveText("1");

    const counter2 = page.locator("css=.counter").nth(1);
    expect(counter2.locator("css=span")).toHaveText("100");
    await counter2.getByText("+").click();
    expect(counter2.locator("css=span")).toHaveText("101");
  });
});
