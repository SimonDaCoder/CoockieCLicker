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
  document.getElementById("MinecraftClicksPerSecond").innerHTML = Math.floor(PerSec * 10)/10 + " Blocks / Second";
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
    document.getElementById(`${x}`).style.cssText = 'box-shadow: 4px 4px 8px rgb(0, 55, 0, 0.7);';
    setTimeout(function() {
      document.getElementById(`${x}`).style.boxShadow = '';
  }, 150);
  } else {
    document.getElementById(`${x}`).style.cssText = 'box-shadow: 4px 4px 8px rgb(155, 0, 0, 0.7);';
    setTimeout(function() {
      document.getElementById(`${x}`).style.boxShadow = '';
  }, 250);
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
      button.innerHTML = `<p> ${upgrade.name}: ${upgrade.clicksPerSecond} Clicks/sec</p><p> ${upgrade.cost}</p>`;
      button.setAttribute('onclick', `buyUpgrade(${index})`);
      button.setAttribute('id', `${index}`);
      container.appendChild(button);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Upgrades:', error);
  }
}