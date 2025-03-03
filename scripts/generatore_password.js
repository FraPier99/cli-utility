import readline from "readline";
import crypto from 'crypto'
import chalk from "chalk";

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";


function getRandomSecure(max) {
    return crypto.randomInt(0, max);
}

function addItem(str) {
    let res = [];
    for (let i = 0; i < 2; i++) { // x2
      let char = getRandomSecure(str.length); // indice casuale
      res.push(str[char]);
    }
    return res.join('');
    // 1,2-A-B etc
  }


  function randomize(values) {
    let index = values.length, randomIndex;
  
    while (index != 0) {
      randomIndex = getRandomSecure(index);
      index--;
  
      // Scambia
      [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
  
    return values;
  }
  
const rl= readline.createInterface({
    input:process.stdin,
    output: process.stdout
})

rl.question('Scegli lunghezza password  ',function(num){


    num = parseInt(num)

    if(isNaN(num) || num <8){
        console.log('inserisci un numero >= 8')
        rl.close()
        return 
    }

    if(num >35){
        console.log('davvero ti serve un passowrd così lunga?')
        console.log('non credo..')
        rl.close()
        return 
      
    }
    const sets =  [lowercase, uppercase, numbers, specialChars]
    const pass = [];

    sets.forEach(set=>pass.push(addItem(set)))
    while(pass.length < num){
        let randomSet = sets[getRandomSecure(sets.length)]
        pass.push(randomSet[getRandomSecure(randomSet.length)])

        
    }
    console.log('⬇️ -password creata ⬇️')
console.log(chalk.bgGreen.black.bold(randomize(pass).join('')))
rl.close()
})

