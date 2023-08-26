// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const newDiskTemplate = () => ({
  roomId: 'start',
  rooms: [
    {
      id: 'start',
      imgUrl: 'img/first-room.jpg',
      name: 'The First Room',
      desc: `There's a DOOR to the NORTH, but it is overgrown with VINES. Type ITEMS to see a list of items in the room.`,
      items: [
        {
          name: 'nametag',
          imgUrl: 'img/item/nametag.png',
          desc: `it's an empty NAMETAG, better put your name on it`,
          isTakeable: true,
          onUse() {
          
          // TODO !!! lose prompt() for better alternative 
            let player = getCharacter('player');
            let inputValue = getInput();
            
            if (!inputValue) {
                            
              inputValue = prompt(`type your NAME if you want a NICKNAME`);
              player.nickname = inputValue;
            }
              
              println(`${player.nickname} is on your nametag`);
            
              
              let nametag = getItem('nametag');
              nametag.desc = `a fancy nametag spelling your name: ${player.nickname}`;
                       
              console.log(inputValue, player.nickname, nametag.desc);
          },
        },
        {
          name: 'door',
          desc: 'It leads NORTH.',
          onUse: () => println(`Type GO NORTH to try the DOOR.`),
        },
        {
          name: ['vines', 'vine'],
          desc: `They grew over the DOOR, blocking it from being opened.`,
        },
        {
          name: 'axe',
          imgUrl: 'img/item/axe.png',
          desc: `You could probably USE it to cut the VINES, unblocking the DOOR.`,
          isTakeable: true,
          onUse() {
          
            const chars = getCharactersInRoom('start');
            const chr = ('child', chars.name);
            
            console.log(chars + " " + chr);
           
            const room = getRoom('start');
            const exit = getExit('north', room.exits);

            if (exit.block) {
              delete exit.block;
              println(`You cut through the vines, unblocking the DOOR to the NORTH.`);
              getItem('axe').desc = `You USED it to cut the VINES, unblocking the DOOR.`;
            } else {
              println(`There is nothing to use the axe on.`);
            }
          },
        }
      ],
      exits: [
        {
          dir: 'north',
          id: 'clearing',
          block: `The DOOR leading NORTH is overgrown with VINES.`,
        },
      ],
    },
    // ROOM: CLEARING
    {
      id: 'clearing',
      imgUrl: 'img/clearing.png',
      name: 'A Forest Clearing',
      desc: `It's a forest clearing. To the SOUTH is The First Room. In the EAST there's a dilapidated shed with an open DOOR.`,
      items: [
        {
          name: 'flashlight',
          imgUrl: 'img/item/flashlight.png',
          desc: 'It looks like someone dropped a flashlight a long time ago, it looks rusty.',
          isTakeable: true,
          onUse() {
            // check if we have the battery
            if (getItem('battery')) {
              
              // set flag for later use
              flashlightOn = 1;
              
              // get the cellar room to unblock the exit
              const room = getRoom('cellar');
              const exit = getExit('east', room.exits);
              
              if (exit.block) {
                
                delete exit.block;
                
                room.desc = 'by the dim light of the flashlight you can see a door to the EAST';
              }
              
              println('with the battery the flashlight works, not well... but it emits a dim light');
              
              getItem('flashlight').desc = 'you have a working flashlight'; 
            } else {
              
              println(`there is no battery, it doesn't work.`);
            }
          },
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'start',
        },
        {
          dir: 'east',
          id: 'shed',
        },
      ],
    },
    // SHED ROOM
    {
      id: 'shed',
      imgUrl: 'img/shed.png',
      name: 'dilapitated shed',
      desc: `It's a small building that looks like a shed. It has a STAIRCASE going DOWN into a pitch-dark cellar.`,
      items: [
      {
        name: 'matchbox',
        imgUrl: 'img/item/matchbox.png',
        desc: `It's a matchbox. It has two matches in it... It feels wet...`,
        isTakeable: true,
        onUse() {
            println('you try lighting a match but they are wet and fall apart in your hands.');
            getItem('matchbox').desc = `the matches have become unusable.`;
        }
      },
      {
        name: 'battery',
        imgUrl: 'img/item/battery.png',
        desc: 'A battery, maybe it works.',
        isTakeable: true,
        onUse() {
            // check if we have the battery
            if (getItem('flashlight')) {
              
              // set flag for later use
              if (flashlightOn = 0) {
              
                // get the cellar room to unblock the exit
                const room = getRoom('cellar');
                const exit = getExit('east', room.exits);
              
                if (exit.block) {
                
                  delete exit.block;
                
                  room.desc = 'by the dim light of the flashlight you can see a door to the EAST';
              }
              println('the flashlight works with the old battery');
            }
          } 
        },
      },
      {
        name: 'staircase',
        desc: 'It is a spiral staircase, go SOUTH to use it',
        onUse: () => println('type SOUTH to use the staircase.'),
      },
      // TEST ITEMS
      {name: 'item1', imgUrl: 'img/item/battery.png', isTakeable: true,},
      {name: 'item2', imgUrl: 'img/item/battery.png', isTakeable: true,},
      {name: 'item3', imgUrl: 'img/item/battery.png', isTakeable: true,},
      {name: 'item4', imgUrl: 'img/item/battery.png', isTakeable: true,},
      ],
      exits: [
        {
          dir: 'west',
          id: 'clearing',
        },
        {
          dir: ['south', 'down'],
          id: 'cellar',
        }
      ],
    },
    //     CELLAR ROOM
    {
      id: 'cellar',
      imgUrl: 'img/cellar.png',
      name: 'dark cellar',
      desc: 'its too dark to see anything, this is really dangerous ! better go back UP',
      exits: [
        {
          dir: ['north', 'up'],
          id: 'cellar',
        },
        {
          dir: 'east',
          id: 'tunnel',
          block: 'there could be a door but it is too dark to see',
        },
      ],
    },
    // TUNNEL ROOM
    {
      id: "tunnel",
      imgUrl: 'img/tunnel_block.png',
      name: "tunnel",
      desc: `a tunnel, it is barely lit but a dark shadow is blocking what seems to be a DOOR leading EAST. WTF!!! is that a F##!?'N kangaroo !?`,
      items: [
        {
          name: 'beercan',
          imgUrl: 'img/item/beercan.png',
          desc: `you see something behind the KANGAROO, it looks like a BEER can`,
          isTakeable: false,
          onUse() {
            
            const joey = getCharacter('joey');
            const player = getCharacter('player');
            const beerCan = getItem('beercan');
            
            if (joey.beaten === true) {
            
              var randomNumber = Math.ceil(Math.random() * 11) + 9;
            
              println(`the KANGAROO man was holding on to a cold one !!!, you down the BEERCAN...`);
              
              player.health += randomNumber;
              
              println(`you feel a light buzz, and maybe a little more heroic !${randomNumber} health has been rewarded to you !`);
              
              beerCan.desc = `it's an empty beercan.`;
              
            } else {
              
              println(`you'd like that beer, it looks like the KANGAROO just grabbed it fresh and cold...`);
            }
           
          },
        },
        {
          name: 'shimmer',
          imgUrl: `what's that!?, I cant see`,
          desc: `there's something there but I have more urgent stuff right now it looks like`,
          isTakeable: false,
          onUse() {
            
  
            const coin = getItem('coin');
            
            if (coin.isTakeable === true) {
              println(`you flip the coin, it landed on ${coinToss()}`);
            }
          }
        },
      ],
      exits: [
        {
          dir: 'west',
          id: 'cellar',
        },
        {
          dir: 'east',
          id: 'large hall',
          block: 'there is an angry kangaroo silhouette blocking the EAST EXIT!',
        },
      ],
    },
    // LARGE HALL
    {
      id: 'large hall',
      imgUrl: 'img/room-placeholder.png',
      name: 'large hall',
      desc: `it's a large hall`,
      exits: [
        {
          dir: 'west',
          id: 'tunnel,'
        },
      ],
    },
    // DEATH
    {
      id: 'death',
      imgUrl: 'img/room-placeholder.png',
      name: 'death',
      desc: 'you have died, nothing else to do but LOAD or RESET',
    },
    
  ],
  characters: [
    // PLAYER
    {
      name: 'player',
      nickname: 'john-doe',
      health: 40,
      alive: true,
    },
    // START ROOM
    {
      name: ['child', 'kid'],
      roomId: 'start',
      desc: 'this KID is crying his little face off !!!',
      onTalk: () => println(`can you help me open this door ?`),
      topics: [
        {
          option: `how to open the DOOR?`,
          line: `LOOK for the AXE to cut the VINES.`,
        },
        {
          option: `what is BEHIND the DOOR`,
          line: `my pet FROG went there !`,
        },
        {
          option: `why should I CARE ??`,
          line: `are you some heartless, froghating, child abusing sadist ??, shame on your janky ass !!! now get, get !!! cut the VINES with the AXE you dumb #@!`,
          onSelected() {
            const room = getRoom('start');
            const exit = getExit('north', room.exits);
            
            if (exit.block) {
              
              delete exit.block;
              
              println(`!!!? the CHILD's tantrum made the VINES recede`);
            } else {
              
              println('the DOOR rattles');
            }
            
          },
        },   
      ],
    },
      // FOREST CLEARING 
    {
      name: ['noise', 'voice'],
      roomId: 'clearing',
      desc: 'you hear a NOISE, like whispering in the woods...',
      onTalk: () => println(`turn back now !!!, now the whisper has become a threatening deep voice`),
      topics: [
        {
          option: `WHO is there !?`,
          line: 'if you explore the SHED you will surely perish...',
          onSelected() {
            
            const character = getCharacter('noise');
            
            character.desc = 'the NOISE has become a VOICE';
          },
        },
        {
          option: 'SHOW yourself !!',
          line: 'if you go SOUTH you can still live...',
          onSelected() {
            
            const character = getCharacter('noise');
            
            character.desc = 'the VOICE is freaking you out';
          },         
        },
        {
          option: `I'm not AFRAID of you, whoever you are !!`,
          line: `Then at least get something like a FLASHLIGHT, you can't get anywhere without it...`,
          onSelected() {
            
            const character = getCharacter('noise');
            
            character.desc = 'the VOICE has disappeared.';
            
            println('that was weird, maybe lets get ITEMS like a FLASHLIGHT, you never know...');
          }, 
        },
      ],
    },
    // TUNNEL
    {
      name: 'joey',
      roomId: 'tunnel',
      health: 25,
      turns: 4,
      beaten: false,
      desc: 'a shadow figure looking like a angry demon KANGAROO, red glowing eyes, growling... in english !!!',
      onTalk: () => println('!!!YOU SHALL NOT PAAASSSSS!!!'),
      topics: [
        {
          option: 'I better RUN',
          line: `run, coward !, don't come back here !!!`,
        },
        {
          option: 'en GARDE !!',
          line: 'prepare to DIE !!!',
//   TODO!
          onSelected() {
            
            let player = getCharacter('player');
            let enemy = getCharacter('joey');         
            let beerCan = getItem('beercan');
            
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            
            if (enemy.beaten === false) { 
            
              console.log('fight instigated: ' + player.name + ' vs.: ' + enemy.name);
              let result = playGame(player.health, enemy.health, enemy.turns, enemy.name);
              if (result === "won") {
                
                const room = getRoom('tunnel');
                const exit = getExit('east', room.exits);
                
                player.health += randomNumber;
                
                beerCan.desc = `it's a fresh cold BEERCAN.`;
                beerCan.isTakeable = true;
                    
                println(`you beat ${enemy.name}, you got ${randomNumber} bonus, your health is: ${player.health}.`);
                
                enemy.desc = `it was just some dude with a kangaroo suit on, scared the life out of me !!! not so tough now, huh !?`;
                         
                if (exit.block) {
                
                  displayImageByRoomId('img/tunnel.png');
                  // add item to room on win
                  createNewItem('shimmer',
                              'coin',
                              'img/item/coin.png',
                              'a shiny coin',
                              true);
                             
                  delete exit.block;
                }
                
 
                enemy.topics = [
                  {
                    option: `what lies AHEAD?`,
                    line: `I tried to stop you...`,
                  },
                ];
              }
              
            } else if (result === "loss") {
            
              enemy.topics = 'you still want MORE ?';
              enemy.desc = `come at ${enemy.name} again!? with ${player.health} points ?`;
              enemy.turns = 1;
            } else if (result === "game_over") {
              
              player.alive = false;
              
              println(`game over, better LOAD or you're stuck here !`);
              
              enterRoom('death');
              console.log('game over');
            }                         
            console.log(player.health, enemy.health, enemy.turns, enemy.name);          
          },
        },
      ],
    },
  ],
}); // newDiskTemplate
