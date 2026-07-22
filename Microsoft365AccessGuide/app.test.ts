import test from "node:test";
import assert from "node:assert/strict";
import { accessOptions, microsoftLinks } from "./app.ts";

test("the free web option does not claim desktop apps", () => {
  const web = accessOptions.find((option) => option.name.includes("web"));
  assert.ok(web);
  assert.equal(web.cost, "free");
  assert.equal(web.desktopApps, false);
});

test("all Microsoft pages use HTTPS", () => {
  assert.equal(
    Object.values(microsoftLinks).every((link) => link.startsWith("https://")),
    true,
  );
});
