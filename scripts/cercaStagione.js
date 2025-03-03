import axios from "axios";
import readLine from 'readline'
import fs from 'fs'
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// root principale
const rootPath = process.cwd()

const rl =  readLine.createInterface({

    input:process.stdin,
    output:process.stdout
})

const createCsv = async (partite,n,stagione) =>{
    


    const folder_name = `partite_s_${stagione}`
    const folderPath = path.join(rootPath, folder_name);

    try{

        if(!fs.existsSync( folderPath)){
            fs.mkdirSync( folderPath, { recursive: true })
      console.log(`cartella creata: ${folderPath}`)
        }

      
        
    }

    catch(err){
        console.error('Errore creazione cartella',err)
        return 
    }
  
   const filePath = path.join(folderPath,`giornata_${n}.csv`)


   console.log(`📄 Salvando il file in: ${filePath}`);
   
   const csvWriter = createObjectCsvWriter({
path:filePath,
header:[

    { id: 'numero', title: 'Numero' },
    { id: "date_time", title: "Data" },
    { id: "home_team_name", title: "Squadra Casa" },
    { id: "away_team_name", title: "Squadra Trasferta" },
    { id: "home_goal", title: "Gol Casa" },
    { id: "away_goal", title: "Gol Trasferta" },
    { id: "score", title: "Esito Partita" }
]

   })

   const formattedMatches = partite.map((item,index)=>({


    numero: index + 1,
    date_time: item.date_time ? new Date(item.date_time).toLocaleString() : "N/D",
    home_team_name: item.home_team_name ?? "N/D",
    away_team_name: item.away_team_name ?? "N/D",
    home_goal: item.home_goal ?? "N/D",
    away_goal: item.away_goal ?? "N/D",
    score: new Date() < new Date(item.date_time)
        ? "PARTITA ANCORA DA GIOCARE"
        : item.home_goal > item.away_goal
        ? item.home_team_name
        : item.home_goal < item.away_goal
        ? item.away_team_name
        : "Pareggio"



   }))

  await   csvWriter.writeRecords(formattedMatches)
}


const fetchMatches = async (n) =>{

    try{
    
        const res =  await axios.get(`https://www.legaseriea.it/api/stats/live/match?extra_link&lang=it&order=oldest&match_day_id=${n}`)
    
    
    
        if(!res.data || !res.data.data ){
            console.log('nessuna partita trovata per questa giornata')
            return null
        }
    
        return res.data.data
    }
    catch(err){
        console.error(err)
        return null
    }
    
      }




const seasons = [
    { index: 0, stagione: '2024/2025',start_id:264705,end_id:264927},
    { index: 1, stagione: '2023/2024',start_id:157707,end_id:157929},
    // { index: 2, item: '2022/2021',start_id:150194,end_id:150323 }
  ]


  const main =  () =>{
   
    seasons.forEach((season)=>{
        console.log(`${season.index+1} - ${season.stagione}`)
    })
    rl.question('scegli il numero di riferimento per la stagione', async function(num){
      
          num = parseInt(num)

          if(isNaN(num) || !num  || num< 0 || num >seasons.length){
            console.log('valore non corretto')
            rl.close()
            return 
          }
        let choice = seasons[num-1]
        let {index,stagione,start_id,end_id} = choice
        console.log(`stagione scelta ${stagione}`)

        let   n_giornata = 1
        while(start_id <= end_id){
      
         const giornata = await  fetchMatches(start_id)

        if(!giornata || giornata.length <0){
console.log('nessuna partita trova per la giornata n°', n_giornata)
rl.close()
return 

        }else{
            const matches = giornata.map(({ home_team_name, away_team_name, home_goal, away_goal, date_time }, index) => ({
                numero: index + 1,  
                date_time: date_time && !isNaN(Date.parse(date_time)) ?
                new Date(date_time).toUTCString() :'N/D',
                home_team_name,  
                away_team_name,
                home_goal,
                away_goal,
                score: date_time &&  new Date() < new Date(date_time)
                    ? "PARTITA ANCORA DA GIOCARE"
                    : home_goal > away_goal
                    ? home_team_name
                    : home_goal < away_goal
                    ? away_team_name
                    : "Pareggio"
    
              
            }));
            console.log(`cerco la giornata n° ${n_giornata}`)
            console.log('ancora qualche secondo')
            await new Promise(resolve => setTimeout(resolve, 10000)); // Aspetta  almeno 10 secondi - EVITA troppe richieste al s
            await createCsv(matches,n_giornata, stagione);
            console.log(`csv giornata n°${n_giornata} creato`)
            console.log('controlla la cartella')
        } 

        start_id = start_id + 6 
        n_giornata++

     
  

        }
    
        rl.close()
    })
   
  }

  main()

  