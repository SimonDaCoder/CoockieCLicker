var Blockcount = 0
let PerSec = 0
let preis = []
let SecAdd = []
let MultiplierExtra = []
let NameExtra = []
let preisExtra = []

document.addEventListener("DOMContentLoaded", function () {
  ClickOnBlock();
  PermaUpdater();
  PerSecondAdding();
  loadUpgrades();  // Lade die Upgrades
  loadPlayerUpgrades(); // Lade die Player Upgrades
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
    const response = await fetch('upgrades.json');
    const upgrades = await response.json();

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

async function loadPlayerUpgrades() {
  try {
    const response = await fetch('playerupgrades.json');
    const upgrades = await response.json();

    const container = document.getElementById('extra-upgrades');


    upgrades.forEach((upgrade, index) => {
      NameExtra.push(upgrade.name)
      preisExtra.push(upgrade.cost);
      MultiplierExtra.push(upgrade.multiplier);

      const div = document.createElement('div');
      div.className = `ExtraUpgradDiv_${index}`;

      const div2 = document.createElement('div');
      div2.className = `ExtraUpgradeDiv2_${index}`;

      const button = document.createElement('button');
      button.class = 'buttino123';
      button.style.backgroundImage = `url('images/Haste.png')`;
      button.setAttribute('onclick', `buyExtraUpgrade(${index})`);
      button.setAttribute('id', `${index}`);

      const p1 = document.createElement('p');
      p1.textContent = upgrade.name;
      p1.className = `ExtraUpgradeName`;
      
      const p2 = document.createElement('p');
      p2.textContent = upgrade.cost;
      p2.className = `ExtraUpgradeCost`;
      
      const p3 = document.createElement('p');
      p3.textContent = upgrade.multiplier;
      p3.className = `ExtraUpgradeMultiplier`;

      div.appendChild(button);
      div.appendChild(div2);
      div2.appendChild(p1);
      div2.appendChild(p2);
      div.appendChild(p3);
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Upgrades:', error);
  }
}