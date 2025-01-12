import { expect, test } from "@playwright/test";

["react", "preact"].forEach((framework) => {
  test(`${framework} - counter hydration`, async ({ page }) => {
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

  test(`${framework} - lazy loading strategies`, async ({ page }) => {
    // Disable JavaScript initially
    await page.route("**/*", (route) => {
      const type = route.request().resourceType();
      if (type === "script") {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Load the page with JS disabled
    await page.goto(`/capri/${framework}`);

    // Verify initial unhydrated state
    const visibleIsland = page
      .locator("text=uses the visible loading strategy")
      .locator("xpath=ancestor::div[contains(@class, 'box')]");
    const idleIsland = page
      .locator("text=uses the idle loading strategy")
      .locator("xpath=ancestor::div[contains(@class, 'box')]");

    await expect(visibleIsland.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );
    await expect(idleIsland.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );

    // Now enable JavaScript and remove the route
    await page.unroute("**/*");
    await page.reload();

    // Test visible loading strategy
    await expect(visibleIsland.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );
    await visibleIsland.scrollIntoViewIfNeeded();
    await expect(visibleIsland.locator("p").last()).toHaveText(
      "Status: Hydrated ✅",
      { timeout: 5000 },
    );

    // Test idle loading strategy
    await expect(idleIsland.locator("p").last()).toHaveText(
      "Status: Hydrated ✅",
      { timeout: 5000 },
    );
  });

  test(`${framework} - combined loading strategies`, async ({ page }) => {
    // Start with a wide viewport (media query won't match)
    await page.setViewportSize({ width: 1200, height: 800 });

    // Disable JavaScript initially
    await page.route("**/*", (route) => {
      const type = route.request().resourceType();
      if (type === "script") {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Load the page with JS disabled
    await page.goto(`/capri/${framework}`);

    // Get references to both combined strategy islands
    const visibleWithMedia = page
      .locator("text=combines visible loading with a media query")
      .locator("xpath=ancestor::div[contains(@class, 'box')]");
    const idleWithMedia = page
      .locator("text=combines idle loading with a media query")
      .locator("xpath=ancestor::div[contains(@class, 'box')]");

    // Verify initial unhydrated state
    await expect(visibleWithMedia.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );
    await expect(idleWithMedia.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );

    // Enable JavaScript and reload
    await page.unroute("**/*");
    await page.reload();

    // Scroll islands into view - they should NOT hydrate (viewport too wide)
    await visibleWithMedia.scrollIntoViewIfNeeded();
    await idleWithMedia.scrollIntoViewIfNeeded();

    // Wait a bit to ensure no hydration occurs
    await page.waitForTimeout(2000);
    await expect(visibleWithMedia.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );
    await expect(idleWithMedia.locator("p").last()).toHaveText(
      "Status: Not hydrated ⏳",
    );

    // Resize to trigger media query
    await page.setViewportSize({ width: 800, height: 800 });

    // Now the visible island should hydrate when scrolled into view
    await visibleWithMedia.scrollIntoViewIfNeeded();
    await expect(visibleWithMedia.locator("p").last()).toHaveText(
      "Status: Hydrated ✅",
      { timeout: 5000 },
    );

    // And the idle island should also hydrate
    await expect(idleWithMedia.locator("p").last()).toHaveText(
      "Status: Hydrated ✅",
      { timeout: 5000 },
    );
  });
});
