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
      onLook() {
        
        // play a sound
        const pl = new Tone.Player({
          url: 'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_MP3.mp3',
          autostart: true,
        }).toDestination();
        
        pl.start();
      },
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
          
            console.log(getInput());
           
            const room = getRoom('start');
            const exit = getExit('north', room.exits);
            const child = getCharacter('child');

            if (exit.block) {
              
              delete exit.block;
              
              println(`You cut through the vines, unblocking the DOOR to the NORTH.`);
              
              getItem('axe').desc = `You USED it to cut the VINES, unblocking the DOOR.`;
              
              child.topics[2].line = `thank you, sir... you look into the CHILD his watery eyes, Ugh now you have to at least take a look. how bad can it be ?`;
              child.topics[0].option = `where did your FROG go, KID ?`;
              child.topics[0].line = `wow you opened the DOOR !!!, I saw it going into a small SHED through the keyhole of the DOOR`;
              
            } else {
              
              println(`There is nothing to use the axe on.`);
            }
          },
        },
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
          dir: ['south', 'back'],
          id: 'start',
        },
        {
          dir: ['east', 'shed'],
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
              if (flashlightOn === 0) {
              
                // get the cellar room to unblock the exit
                const room = getRoom('cellar');
                const exit = getExit('east', room.exits);
                
                // update flashlightOn flag
                flashlightOn = 1;
              
                if (exit.block) {
                
                  delete exit.block;
                
                  room.desc = 'by the dim light of the flashlight you can see a door to the EAST';
                  
                  println('the flashlight works with the old battery');
                  
                  console.log('used battery on flashlight');
              }
            } else if (flashlightOn === 1) {
              
              println('you already did that, there are more important things to do');
                
              console.log('used battery on flashlight already');
            }
          } 
        },
      },
      {
        name: 'staircase',
        desc: 'It is a spiral staircase, go SOUTH to use it',
        onUse: () => println('type SOUTH to use the staircase.'),
      },
 
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
      imgUrl: 'img/large_hall.png',
      name: 'large hall',
      desc: `you enters a vast, dimly lit HALL. The ceiling is high, supported by ancient stone pillars. He notices TWO unusual CREATURES standing before him.`,
      items: [
        {
          name: 'reptile',
          imgUrl: 'img/item/frog.png',
          desc: `a small reptile it seems, CREATURE TWO has is in his hands`,
          isTakeable: false,
        },
      ],
      exits: [
        {
          dir: 'west',
          id: 'tunnel',
        },
        {
          dir: ['south', 'down'],
          id: 'ladder',
          block: true,
        },
        {
          dir: 'north',
          id: 'alcove',
          block: true,
        },
      ],
    },
    // A LADDER
    {
      id: 'ladder',
      imgUrl: 'img/ladder.png',
      name: 'ladder',
      desc: 'it is a rusty ladder going down...',
    },
    // ALCOVE
    {
      id: 'alcove',
      imgUrl: 'img/alcove.png',
      name: 'alcove',
      desc: `into a narrower passage. He comes upon a stout wooden door adorned with ancient symbols pulsating with an eerie glow.`,
    },
    {
      
    },
    // DEATH
    {
      id: 'death',
      imgUrl: 'img/game_over.png',
      name: 'death',
      desc: 'you have died, nothing else to do but LOAD or REFRESH, there is a big red BUTTON in front on you',
      items: [
        {
          name: ['refresh', 'button'],
          desc: 'a big red button',
          onUse: () => window.location.reload(),
        },
      ],
    },
    
  ],
  /**
   * 
   *         CHARACTERS 
   * 
  **/
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
      alive: true,
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
                enemy.onTalk = function() {println('it only mumbles gibberish!?')};
                
                room.desc = 'the figure scurried off into a corner, what was going on just now?';
                         
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
    {
      name: 'creatures',
      roomId: 'large hall',
      health: 100,
      turns: 2,
      beaten: false,
      desc: [
        'the first of the CREATURES hisses, Who dares enter our domain?',
        'the 2nd of the CREATURES two whispers, Hmmmmm it is a surface dweller. Interesting.'
      ],
      onTalk: () => println('what is your business here, human ?'),
      topics: [
        {
           option: 'I just wanted to help a KID find his frog !!!',
           line: 'seems you found it ',
           removeOnRead: true,
           onSelected() {
             
             const creature = getCharacter('creatures');
             
             println(`you speak in riddles, human says one of the CREATURES`);
             println('here is your FROG, human...');
             
             createNewItem('reptile',
                           'frog',
                           'img/item/frog.png',
                           `it's the childs frog, you fit it in your pocket`,
                           true
                           );
                           
             creature.onTalk = function() {println('we have a use for you !')};
             creature.topics = [
               {
                 option: 'you DONT',
                 line: 'we do!',
                 removeOnRead: true,
               },
               {
                 option: 'you CANT',
                 line: 'we shall!',
                 removeOnRead: true,
               },
               {
                 option: 'you WONT',
                 line: 'we already have ',             
                 onSelected() {
                   
                   const room = getRoom('large hall');
                   const exitSouth = getExit('south', room.exits);
                   const exitNorth = getExit('north', room.exits);
                   
                   const result = initializeGame('player', 'creatures', 'large hall');
                   
                   if (result === "won" || result === "loss") {
                     
                     creature.topics = [
                       {
                         option: 'you BEAT me',
                         line: 'I sure did',
                         removeOnRead: true,
                         onSelected() {
                           
                           println(`we put a tracker on you though, you 're going to help us now. we need you to open the door in the room to the NORTH because we cant go in there...\n
                           bzzzzz...the smallest one of the CREATURES telepathically says: help usssss...we 'll help you... bzzzzzz`);
                           
                           // change dialogue options
                           creature.topics = [
                             {
                               option: 'WHY you human ?',
                               line: `you came here all curious, and beat our guard.\nyou picked a fight with us too, you're perfect`,
                             },
                             {
                                option: `why we can't open the DOOR ?`,
                                line: `behind it is an ancient orb we need for our teleports. the human magicians have sealed the orb and imprisoned us...\n
                                  bzzzz... imprisoned.... hundreds of cycles .....bzzzzb`,
                             },
                             {
                               option: `are we DANGEROUS ?`,
                               line: `we can be yes, but they sealed us in here and extorted us for information and technologies.\nwe need specific frequencies and gamma rays or we get sick and die !!!`,
                             },
                             {
                                option: `by the way you don't have much TIME`,
                                line: `these gamma rays will kill you if you stay to long, it is radiation you know...\n
                                  bzzzzz.... and the humans will come again ....bzzzzb`,
                                onSelected() {
                                  
                                  // start timer
                                  startTimer();
                                  
                                  console.log('timer started');
                                },
                             },
                           ];
                         },
                       },
                     ];
                     creature.desc = `they're laughing at you!!`;
                     
                     delete exitNorth;
                     delete exitSouth;
                     
                     getRoom('large hall').desc = 'the CREATURES are walking around mumbling and you see exits to the NORTH and SOUTH opening up behind them';
                     
                     console.log(`result is: ${result}`);
                   } 
                 },
               },
             ];
           }
        },
        {
          option: 'just STUMBLED in...',
          line: 'is that so',
          removeOnRead: true, 
        },
      ],
    },
  ],
}); // newDiskTemplate
