import axios from "axios";
import readline, { createInterface } from 'readline'
import fs from 'fs'
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const rootPath = process.cwd()

const createCsv = async (partite,giornata) =>{

    const folder_name = `giornata_cercata`
    const folderPath = path.join(rootPath,folder_name)
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

    const filePath= path.join(folderPath,`partite_giornata_${giornata}-38.csv`)

    console.log(`📄 Salvando il file in: ${filePath}`);


    const csvWriter = createObjectCsvWriter({
path:filePath,
header:[ { id: 'numero', title: 'Numero' },
    { id: "date_time", title: "Data" },
    { id: "home_team_name", title: "Squadra Casa" },
    { id: "away_team_name", title: "Squadra Trasferta" },
    { id: "home_goal", title: "Gol Casa" },
    { id: "away_goal", title: "Gol Trasferta" },
    { id: "score", title: "Esito Partita" }



]


    })


    const formattedMatches = partite.map((item, index) => ({
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
    }));
    

   
await csvWriter.writeRecords(formattedMatches)
  
}



const fetchMatches = async (n) =>{

try{

    const res = await axios.get(`https://www.legaseriea.it/api/stats/live/match?extra_link&lang=it&order=oldest&match_day_id=${n}`)

    if(!res.data || !res.data.data){
        console.log('nessun dato trovato per questa giornata')
        return null 
    }
    return res.data.data

}catch(err){
    console.error(err)
    return null
}

}


const main = async () =>{
    rl.question('Scegli una giornata 1-38 ',  async function(numero){

    numero = parseInt(numero)
    if(isNaN(numero) || numero > 38 || numero <1){
console.log('Giornata non valia !')
rl.close()

return 
      
    }

console.log('Recupero delle partite in corso')

const match_day_id = 264705 + ((numero -1) * 6)
    const games  = await fetchMatches(match_day_id)


    if (!games || !Array.isArray(games) || games.length === 0) {
        console.log('❌ Nessuna partita trovata.');
        rl.close();
        return;
    }
    

    const matches = games.map(({ home_team_name, away_team_name, home_goal, away_goal, date_time }, index) => ({
        numero: index + 1,  // ✅ Stesso nome dell'header
        date_time:  date_time &&  !isNaN(Date.parse(date_time)) ? new Date(date_time).toUTCString() : 'N/D',
        home_team_name, // ✅ Stesso nome dell'header
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
    
    
    console.table(matches)
    await createCsv(matches,numero)
  
 
    rl.close()
    })

}

main()


