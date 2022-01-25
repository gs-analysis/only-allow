const boxen = require("boxen");
const whichPMRuns = require("which-pm-runs");

const exitAndMsg = (msg) => {
  console.log(msg);
  process.exit(1);
};

const argv = process.argv.slice(2);
const wantPM = argv[0];

if (!wantPM) {
  exitAndMsg("请指定安装工具，目前支持包安装工具为 < npm || yarn || pnpm >");
}

const supportPMs = ["npm", "yarn", "pnpm"];

if (!supportPMs.includes(wantPM)) {
  exitAndMsg("请更换想要使用的包安装工具，目前支持包安装工具为 < npm || yarn || pnpm >");
}

const boxenOpts = { borderColor: "red", borderStyle: "double", padding: 1 };
const usedPM = whichPMRuns();

if (usedPM && usedPM.name !== wantPM) {
  switch (wantPM) {
    case "npm":
      exitAndMsg(boxen("请使用 npm install 方式进行安装", boxenOpts));
      break;
    case "yarn":
      exitAndMsg(
        boxen(
          "请使用 yarn install 方式进行安装\n\n如果你没有 yarn, 首先请全局安装 yarn：npm i -g yarn \n\nyarn 详情查看 https://yarnpkg.com/",
          boxenOpts
        )
      );
      break;
    case "pnpm":
      exitAndMsg(
        boxen(
          "请使用 pnpm install 方式进行安装\n\n如果你没有 pnpm, 首先请全局安装 pnpm：npm i -g pnpm \n\npnpm 详情查看 https://pnpm.js.org/",
          boxenOpts
        )
      );
      break;
  }
}
