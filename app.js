const inquirer = require("inquirer");
const fs = require("fs");
const Raid = require("./libs/payout");
function initData() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Whats the total Payout?",
        name: "payout",
      },
      {
        type: "input",
        message: "How many cuts?",
        name: "players",
      },
      {
        type: "input",
        message: "How many Tanks?",
        name: "tankCount",
      },
      {
        type: "input",
        message: "How many healers are getting a bonus?",
        name: "healerCount",
      },
      {
        type: "input",
        message: "What is the Orginization Cut?",
        name: "orgCut",
      },
    ])
    .then((data) => {
      raid = new Raid(
        data.payout,
        data.players,
        data.tankCount,
        data.healerCount,
        data.orgCut
      );
      return calc();
    });
}
function calc() {
  const tankCutTotal = Math.floor(raid.payout * 0.02);
  const tankCutEach = Math.floor(tankCutTotal / raid.tankCount);
  const orgCut = raid.payout * (raid.orgCut * 0.01);
  const healerCut = Math.floor(orgCut * 0.1);
  const healerCutEach = Math.floor(healerCut / raid.healerCount);
  const totalDeduction = orgCut + tankCutTotal;
  const finalPot = raid.payout - totalDeduction;
  const finalPayoutEach = Math.floor(finalPot / raid.players);
  const newOrgCut = orgCut - healerCut;
  if (finalPot + totalDeduction > raid.payout) {
    console.log("Something went wrong");
  } else if (raid.healerCount <= 0) {
    console.log("***********************************");
    console.log("*                                 *");
    console.log("*                                 *");
    console.log("*     GDKP Payout Breakdown       *");
    console.log("*                                 *");
    console.log("*                                 *");
    console.log("***********************************");
    console.log(`Original Pot: `, parseInt(raid.payout));
    console.log(`Total Deductions: `, totalDeduction);
    console.log(`Org Cut: `, orgCut);
    console.log(`Tank Cut Total: `, tankCutTotal);
    console.log(`Tank Cut Each: `, tankCutEach);
    console.log(`Pot: `, finalPot);
    console.log(`Each Player Payout: `, finalPayoutEach);
  } else {
    console.log("***********************************");
    console.log("*                                 *");
    console.log("*                                 *");
    console.log("*     GDKP Payout Breakdown       *");
    console.log("*                                 *");
    console.log("*                                 *");
    console.log("***********************************");
    console.log(`Original Pot: `, parseInt(raid.payout));
    console.log(`Total Deductions: `, totalDeduction);
    console.log(`Org Cut: `, newOrgCut);
    console.log(`Tank Cut Total: `, tankCutTotal);
    console.log(`Tank Cut Each: `, tankCutEach);
    console.log(`Healer Cut Total: `, healerCut);
    console.log(`Healer Cut Each: `, healerCutEach);
    console.log(`Pot: `, finalPot);
    console.log(`Each Player Payout: `, finalPayoutEach);
  }
}

initData();
