// string object storing different awnsers, description, etc...
const gameStrings = () => ({
  
  battle: [
    {
      room: 'cellar',
      name: 'joey',
      playerResponse: [ 
                        `You Swing At The Kangaroo !!!`,
                        `joey will be no more !!!`,
                        `you try to punch joey`,
                        `take this, creepy kangaroo man !!!`,
                        `right in the pouch !!!`,
                      ],
      enemyResponse: [
                        `eat the pain !!!`,
                        `chew on that !!!`,
                        `aaaaaarrrgggh`,
                        `wow, that stings !!!`,
                        `you dirty ....!!!`,
                     ],
      modifierPositive: [
                          `landed a lucky punch !!!`,
                          'pulled a dirty trick',
                          `found a weakspot`,
                          `right on the nose`,
                          `below the waist`,
                        ],
      modifierNegative: [
                          `ouch, below the waist`,
                          `that landed extra hard`,
                          `you tripped`,                          
                          `suckerpunched !!!`,
                          `stepped on a bee...`,
                        ],                
    },
    {
      room: "large hall",
      name: "creatures",
      playerResponse: [
                        `I'll have you for lunch!`,
                        `take this, alien creeps`,
                        `I'll kick you back to Ur-Anus!!`,
                        `you googley eyed freak!!!`,
                      ],
      enemyResponse: [
                        `bzzzz, ? a telepathically blow to the brain!! it was the tallest one!`,
                        `you are acoustically hit in the gut`,
                        `blinded by a blue light by the 2nd creature`,
                        `slammed to the floor by invisible hands`,
                     ],
      modifierPositive: [
                          `kicked him in the shin!`,
                          `poked one in the eye`,
                          `threw a pebble in creature two his big eye!`,
                          `the frog jumped on the tall guy, landed a sucker punch on his chin thing!`,
                        ],
      modifierNegative: [
                          `the 2nd creature teleports behind me and the other pushes me and I topple over`,
                          `they did a swift probe, in the butt! dirty alien tricksters`,
                          `they make me hallucinate, wich is kinda nice... Ouch, suckerpunched me right on the nose`,
                        ],
    },
  ],
  
});
