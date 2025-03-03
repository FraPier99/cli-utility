
import readline from 'readline'
import axios from 'axios'
import chalk from 'chalk'
import { config } from 'dotenv'

config()

const api = process.env.API
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const fetchCurrencies =   async ()=>{




    try{
        const res =  await axios.get(`https://api.exchangeratesapi.io/v1/latest?access_key=${api}=EUR`)
    
    
       return res.data.rates
      
    }
    catch(err){
        console.error(err)
        return null 
    }
    
    
    
    }


    const main = async () =>{

        rl.question(" inserisci un import in EUR ",async function (importo) {

            importo = parseInt(importo)

            if(isNaN(importo) || importo <0){
                console.log('importon nov valido')
                rl.close()
                return 
            }
            const tassiCambio =  await fetchCurrencies()

            if (!tassiCambio) {
                console.log("Errore nel recupero dei tassi di cambio.");
                rl.close();
                return;
            }
            const valute = Object.keys(tassiCambio)
    
    
            console.log('valute disponibili')
            valute.map((item,key)=>{
                console.log(`valuta ${item} numero ${key +1}`)
            })

            rl.question("scegli il numero di una valuta : ",function(num){
                num= parseInt(num)
    
                let valuta = valute[num-1]
                let cambio = tassiCambio[valuta]
                let result = importo * cambio
               
                console.log(chalk.underline(' risultato ⬇️'))
                console.log(chalk.bgBlue.white.bold(`${importo} EUR  = ${result.toFixed(2)} ${valuta}  `))
    
                rl.close()
            })
          
            
        })

      
    }


    main()
