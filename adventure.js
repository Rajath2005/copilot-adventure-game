// Simple "Choose Your Own Adventure" CLI game using Node.js
// Beginner-friendly and uses the built-in `readline` module for input

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question, options, callback) {
  console.log('\n' + question);
  options.forEach((opt, i) => {
    console.log(`${i + 1}) ${opt.text}`);
  });

  rl.question('\nEnter the number of your choice: ', (answer) => {
    const choice = parseInt(answer.trim(), 10);
    if (!Number.isInteger(choice) || choice < 1 || choice > options.length) {
      console.log('Please enter a valid number for your choice.');
      return ask(question, options, callback);
    }
    options[choice - 1].action();
  });
}

function ending(message) {
  console.log('\n' + message);
  console.log('\n--- The End ---');
  rl.close();
}

// Scenes
function start() {
  console.log('Welcome to the Adventure!');
  console.log('Make choices by typing the number of the option you want.');

  ask('You wake up at a fork in a misty forest. Which way do you go?', [
    { text: 'Follow the path into a dark cave', action: cave },
    { text: 'Walk toward the light coming from a nearby village', action: village },
  ]);
}

function cave() {
  ask('Inside the cave you find two tunnels. One smells of damp earth, the other of smoke. What do you choose?', [
    { text: 'Take the damp tunnel', action: dampTunnel },
    { text: 'Follow the smoky tunnel', action: smokyTunnel },
    { text: 'Go back to the fork', action: start },
  ]);
}

function dampTunnel() {
  ask('You find an underground river and a small boat. What do you do?', [
    { text: 'Use the boat to cross the river', action: riverCrossing },
    { text: 'Follow the river on foot', action: followRiver },
    { text: 'Return to the cave entrance', action: cave },
  ]);
}

function riverCrossing() {
  ending("You bravely cross the river and find a chest of old coins. You take a few and head home richer (and wiser). Good job!");
}

function followRiver() {
  ending('While following the river you slip and fall, but a friendly hermit rescues you. You recover and decide a peaceful life with the hermit suits you.');
}

function smokyTunnel() {
  ask('The smoky tunnel opens to a cavern where a sleeping dragon snores. Do you...', [
    { text: 'Sneak past the dragon to find treasure', action: sneakTreasure },
    { text: 'Try to befriend the dragon', action: befriendDragon },
    { text: 'Quietly leave the cavern', action: cave },
  ]);
}

function sneakTreasure() {
  ending(`You sneak past the dragon, but step on a creaky bone. The dragon wakes and glares.
Luckily, it only wants a story. You tell it a tale, and it lets you take one gold piece as payment. You leave safely.`);
}

function befriendDragon() {
  ending('You offer the dragon a song. It enjoys your tune so much it takes you on a short flight above the forest. What a view! You return safely, with a story no one believes.');
}

function village() {
  ask('The village looks friendly. You see a market and an old map seller. Where do you go?', [
    { text: 'Visit the market', action: market },
    { text: 'Talk to the map seller', action: mapSeller },
    { text: 'Head back to the forest fork', action: start },
  ]);
}

function market() {
  ask('At the market, you see colourful stalls. A merchant offers you a mysterious locked box. Do you...', [
    { text: 'Buy the box', action: buyBox },
    { text: 'Ignore the merchant and explore more', action: exploreMarket },
  ]);
}

function buyBox() {
  ending('You buy the box and open it at home. Inside is a small note: "Courage was your reward." You feel proud of your choice.');
}

function exploreMarket() {
  ending('You enjoy the cheerful market and make a new friend who invites you to join their travels. A pleasant life awaits.');
}

function mapSeller() {
  ask('The map seller offers a map to a hidden waterfall. It costs a smile (and a small coin). Do you...', [
    { text: 'Buy the map', action: buyMap },
    { text: 'Decline and return to the village', action: village },
  ]);
}

function buyMap() {
  ending('The map leads you to a stunning waterfall. You relax, meditate, and discover a peaceful new purpose.');
}

// Handle Ctrl+C gracefully
rl.on('SIGINT', () => {
  console.log('\n\nGoodbye — thanks for playing!');
  rl.close();
  process.exit(0);
});

// Start the game
start();
