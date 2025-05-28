import { remote } from "webdriverio";

const SWIPE_AMOUNT = 600;

const mobileScroll = async (client) => {
  await client.executeScript("mobile: scroll", [
    {
      direction: "down",
      // velocity somehow doesn't work. It's ignored by Appium.
      // The following script arguments are not known and will be ignored: velocity
      // velocity: 500,
    },
  ]);
};

const mobileScrollToElement = async (client, selector) => {
  const targetScale = await client.$(selector);
  await client.executeScript("mobile: scrollToElement", [
    {
      elementId: targetScale.elementId,
    },
  ]);
};

const performSwipe = async (client, offest, amount) => {
  const windowSize = await client.getWindowSize();
  await client
    .action("pointer", {
      parameters: { pointerType: "touch" },
    })
    .move(windowSize.width / 2, offest + amount)
    .down("left")
    .move(windowSize.width / 2, offest)
    .up("left")
    .perform();
};

const performSwipeWithInertiaPrevention = async (client, offest, amount) => {
  const windowSize = await client.getWindowSize();
  await client
    .action("pointer", {
      parameters: { pointerType: "touch" },
    })
    .move(windowSize.width / 2, offest + amount)
    .down("left")
    .move(windowSize.width / 2, offest - 1)
    .move(windowSize.width / 2, offest)
    .up("left")
    .perform();
};

const performSwipeWithPause = async (client, offest, amount) => {
  const windowSize = await client.getWindowSize();
  await client
    .action("pointer", {
      parameters: { pointerType: "touch" },
    })
    .move(windowSize.width / 2, offest + amount)
    .down("left")
    .move(windowSize.width / 2, offest)
    .pause(1000)
    .up("left")
    .perform();
};

const performSwipeSlowly = async (client, offest, amount) => {
  const windowSize = await client.getWindowSize();
  await client
    .action("pointer", {
      parameters: { pointerType: "touch" },
    })
    .move(windowSize.width / 2, offest + amount)
    .down("left")
    .move({ duration: 1000, x: windowSize.width / 2, y: offest })
    .up("left")
    .perform();
};

const performSwipeSlowlyWithInertiaPrevention = async (
  client,
  offest,
  amount
) => {
  const windowSize = await client.getWindowSize();
  await client
    .action("pointer", {
      parameters: { pointerType: "touch" },
    })
    .move(windowSize.width / 2, offest + amount)
    .down("left")
    .move({ duration: 1000, x: windowSize.width / 2, y: offest - 1 })
    .move(windowSize.width / 2, offest)
    .up("left")
    .perform();
};

const main = async () => {
  const client = await remote({
    path: "/wd/hub",
    port: 4723,
    capabilities: {
      platformName: "ios",
      "appium:automationName": "XCUITest",
      "appium:platformVersion": "18.4",
      "appium:deviceName": "iPhone 16 Pro",
      "appium:app": "./ScrollTest.zip",
    },
  });

  //await mobileScroll(client);

  // This cannot find element outside of the viewport
  //await mobileScrollToElement(client, "~400");

  //await performSwipe(client, 100, SWIPE_AMOUNT);

  //await performSwipeWithInertiaPrevention(client, 100, SWIPE_AMOUNT);

  //await performSwipeWithPause(client, 100, SWIPE_AMOUNT);

  //await performSwipeSlowly(client, 100, SWIPE_AMOUNT);

  await performSwipeSlowlyWithInertiaPrevention(client, 100, SWIPE_AMOUNT);
};

await main();
