var Blockcount = 0
let PerSec = 0
let preis = []
let SecAdd = []

document.addEventListener("DOMContentLoaded", function () {
  ClickOnBlock();
  PermaUpdater();
  PerSecondAdding();
  loadUpgrades();  // Lade die Upgrades
});
function PermaUpdater() {
  document.getElementById("MinecraftClickerScore").innerHTML = Math.floor(Blockcount) + " Blocks";
  document.getElementById("MinecraftClicksPerSecond").innerHTML = PerSec + " Blocks / Second";
  setTimeout(PermaUpdater, 250)
}
function ClickOnBlock() {
  document.getElementById("block").addEventListener("click", function () {
    Blockcount++;
  });
}
function PerSecondAdding() {
  Blockcount = Blockcount + PerSec
  setTimeout(PerSecondAdding, 1000);
}
function buyUpgrade(x) {
  if (Blockcount > preis[x] - 1) {
    Blockcount -= preis[x];
    PerSec += SecAdd[x];
  } else {
    alert("Not enough blocks!");
  }
}



async function loadUpgrades() {
  try {
    // Lade die JSON-Datei
    const response = await fetch('upgrades.json');
    const upgrades = await response.json();

    // Container für die Buttons
    const container = document.getElementById('upgrades-container');

    upgrades.forEach((upgrade, index) => {
      preis.push(upgrade.cost);
      SecAdd.push(upgrade.clicksPerSecond);

      const button = document.createElement('button');
      button.innerHTML = `${upgrade.name}: ${upgrade.clicksPerSecond} Clicks/sec ${upgrade.cost}`;
      button.setAttribute('onclick', `buyUpgrade(${index})`);
      container.appendChild(button);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Upgrades:', error);
  }
}