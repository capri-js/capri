import { expect, test } from "@playwright/test";

["react", "preact"].forEach((framework) => {
  test(framework, async ({ page }) => {
    await page.goto(`/capri/${framework}`);
    const counter1 = page.locator("css=.counter").nth(0);
    const value1 = counter1.locator("css=span");
    expect(value1).toHaveText("0");
    await counter1.getByText("+").click();
    expect(value1).toHaveText("1");

    const counter2 = page.locator("css=.counter").nth(1);
    const value2 = counter2.locator("css=span");
    expect(value2).toHaveText("100");
    await counter2.getByText("+").click();
    expect(value2).toHaveText("101");
  });
});
