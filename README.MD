# 📌 CLI Utility 🚀

Un set di strumenti CLI per generare password, convertire valuta e cercare giornate di Serie A.

## 📌 **Struttura del progetto**
```
📂 progetto-cli
 ├── 📂 scripts               # Contiene gli script separati
 │    ├── 📄 generatorePassword.js
 │    ├── 📄 cambioValuta.js
 │    ├── 📄 cercaGiornata.js
 │    ├── 📄 cercaStagione.js
 ├── 📄 main.js               # Menu interattivo con Inquirer
 ├── 📄 .gitignore            # Esclude node_modules e .env
 ├── 📄 package.json          # Gestione npm
 ├── 📄 README.md             # Documentazione del progetto
```

---


# 📌 Tecnologie utilizzate

Il progetto utilizza le seguenti tecnologie e librerie di Node.js:

Node.js - Runtime per eseguire il codice JavaScript lato server.

Axios - Per effettuare richieste HTTP verso API esterne.

Readline - Per gestire l'input da linea di comando.

Inquirer - Per creare interfacce CLI interattive con menu e opzioni.

Chalk - Per migliorare la visualizzazione della CLI con colori e stili personalizzati.


## 🛠 Funzionalità
✅ **🔐 Genera una password sicura**  
✅ **💱 Converti valuta da EUR ad altre valute**  
✅ **⚽ Cerca giornate Serie A (season corrente)**  
✅ **📅 Analizza giornate per stagione (in corso e precedente)**  
✅ **📂 Esporta dati in CSV**  

---

## 📌 **Dettaglio delle Funzionalità**
### 🔐 **Genera una password sicura**
Questo script genera una password (lunghezza a scelta,*minima 8*) casuale sicura utilizzando `crypto.randomInt` per ottenere numeri casuali sicuri. Utilizza lettere in low/upper case, caratteri alfanumerici e simboli speciali. 


1. Seleziona **"🔐 Genera una password sicura"** dal menu.
2. Verrà generata una password casuale e mostrata a schermo.

---

### 💱 **Converti valuta (EUR -> altro)**
Questo script permette di convertire un importo in Euro in altre valute utilizzando dati aggiornati da un'API(exchangeratesapi.io) di cambio valuta.


(*Crea un file .env come in .env.example prima di avviare lo script*)

1. Seleziona **"💱 Converti valuta (EUR -> altro)"** dal menu.
2. Inserisci l'importo in Euro.
3. Digita il codice della valuta in cui vuoi convertire (es. USD, GBP, JPY).
4. Il sistema recupera il tasso di cambio e mostra l'importo convertito.

---

### ⚽ **Cerca giornata Serie A**
Questo script permette di cercare e visualizzare i risultati delle partite di una giornata specifica della stagione di Serie A in corso.

1. Seleziona **"⚽ Cerca giornata Serie A"**.
2. Inserisci il numero della giornata (1-38).
3. Il sistema recupera e mostra le partite di quella giornata con squadre e risultati.
4. Puoi visualizzare il file .csv generato in `giornata_cercata`


---

### 📅 **Cerca giornate stagione X**
Questo script consente di visualizzare tutte le partite di una specifica stagione della Serie A.

Al momento solo per 2024/2025 e 2023/2024

1. Seleziona **"📅 Cerca giornate stagione X"**.
2. Scegli la stagione desiderata dal menu interattivo.
3. Il sistema recupera le giornate una alla volta (1=>38)
4. Viene creato un folder  (`partite_s_xxxx-xxxx`) relavito alla season scelta dove vengono inserite le giornate in formato .csv
5. Puoi interrompere lo script in qualsiasi momento con ctrl +c


---


## 📥 **Installazione**
1. **Clona il repository**  
```bash
git https://github.com/FraPier99/cli-utility.git

```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Esegui il menu CLI**
```bash
node main.js
```

---

## 🚀 **Utilizzo**
Una volta avviato `main.js`, il menu interattivo ti permette di scegliere tra diverse opzioni:  
```
📌 Seleziona un'operazione:
> 🔐 Genera una password sicura
  💱 Converti valuta (EUR -> altro)
  ⚽ Cerca giornata Serie A
  📅 Cerca giornate stagione X
  ❌ Esci
```
Usa le **frecce ↑ ↓** per navigare e premi **INVIO** per eseguire lo script.

---



### 👍 **TODO**
- (Prossimi miglioramenti WIP)


---


