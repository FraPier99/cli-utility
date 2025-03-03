import inquirer from "inquirer";

import { execSync } from "child_process";




const mainMenu = async () =>{

const {scelta} = await inquirer.prompt([

{type:"list",
    name:"scelta",
message:"seleziona un'operazione",
choices: [
    "🔐 Genera una password sicura",
    "💱 Converti valuta (EUR -> altro)",
    "⚽ Cerca giornata Serie A",
    "📅 Cerca giornate stagione X",
    "❌ Esci"
]

}

])

switch(scelta){


    case "🔐 Genera una password sicura":
        execSync ("node scripts/generatore_password.js",{ stdio: "inherit" });
        break;

    case "💱 Converti valuta (EUR -> altro)":
       execSync ("node scripts/cambio_valuta.js", { stdio: "inherit" });
        break;

    case "⚽ Cerca giornata Serie A":
        execSync ("node scripts/cercaGiornata.js", { stdio: "inherit" });
        break;

    case "📅 Cerca giornate stagione X":
       execSync ("node scripts/cercaStagione.js", { stdio: "inherit" }) 
       break

    case "❌ Esci":
        console.log("👋 Uscita dal programma.");
        process.exit();
       
       
       

       
}





}

mainMenu()