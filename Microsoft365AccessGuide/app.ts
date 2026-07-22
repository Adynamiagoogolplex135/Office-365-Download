import { arch, platform, release } from "node:os";
import { statfsSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const microsoftLinks = {
  webApps:
    "https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web",
  education: "https://www.microsoft.com/en-us/education/products/office",
  appsPortal: "https://m365.cloud.microsoft/apps",
  setup: "https://microsoft365.com/setup",
  currentChannel: "https://learn.microsoft.com/en-us/officeupdates/current-channel",
} as const;

export interface AccessOption {
  name: string;
  cost: string;
  desktopApps: boolean;
  requirements: string;
}

export const accessOptions: readonly AccessOption[] = [
  {
    name: "Microsoft 365 for the web",
    cost: "free",
    desktopApps: false,
    requirements: "Microsoft account and supported browser",
  },
  {
    name: "Office 365 Education A1",
    cost: "free for eligible institutions",
    desktopApps: false,
    requirements: "eligible school account; plan features vary",
  },
  {
    name: "Microsoft 365 desktop apps",
    cost: "subscription or organization-assigned plan",
    desktopApps: true,
    requirements: "Microsoft, work, or school account with desktop apps",
  },
];

export function buildSystemReport(target = ".") {
  const disk = statfsSync(target);
  const freeDiskGb = (disk.bavail * disk.bsize) / 1024 ** 3;
  return {
    operatingSystem: platform(),
    osRelease: release(),
    machine: arch(),
    runtime: process.version,
    freeDiskGb: Number(freeDiskGb.toFixed(2)),
  };
}

function usage(): string {
  return [
    "Microsoft 365 Access Guide",
    "Usage:",
    "  app.ts links",
    "  app.ts options",
    "  app.ts system",
  ].join("\n");
}

export function main(args: string[]): number {
  const command = args[0];

  if (command === "links") {
    console.log(JSON.stringify(microsoftLinks, null, 2));
    return 0;
  }
  if (command === "options") {
    console.log(JSON.stringify(accessOptions, null, 2));
    return 0;
  }
  if (command === "system") {
    console.log(JSON.stringify(buildSystemReport(), null, 2));
    return 0;
  }

  console.error(usage());
  return 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
