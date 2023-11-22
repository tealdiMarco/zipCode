const { info } = require("console");
const http = require("http");
const url = require("url");
/* Permette di accedere a i file del server in lettura e scrittura */
const fs = require("fs");







var server = http.createServer(function(request, response){

    let indirizzo = request.headers.host + request.url;
    let infoUrl = url.parse(indirizzo, true);

    let header,contesto;
    
    switch (infoUrl.pathname){
        case "/zips":
                contesto={ risp:response,tipo:"application/json" }
                fs.readFile("zips.json",inviaFile.bind(contesto));
                
            break;
        case "/add":
            let obj = "";

            request.on("data", (dato)=>{
                obj += dato;
            });

            request.on("end", ()=>{
                console.log(JSON.parse(obj));
                let file = JSON.parse(fs.readFileSync("zips.json"));
                file.push(JSON.parse(obj));
                fs.writeFile("zips.json", file, (err)=>{
                    if(err){
                        risposta.writeHead(500, {"Content-type":"text/plain"});
                        risposta.write("La scrittura non è andata a buon fine.");
                        risposta.end();
                    }else{
                        risposta.writeHead(200, {"Content-type":"text/plain"});
                        risposta.write(JSON.stringify({"risposta":"on god"}));
                        risposta.end();
                    }
                });
            });
                
            break;
        default:
            if(infoUrl.pathname.split('.')[1]=="html")
            {
                fs.exists("public/"+infoUrl.pathname.split('/')[1],(esiste)=>{

                    if(esiste)
                    {
                        contesto={ risp:response,tipo:"text/html" }
                        fs.readFile("public"+infoUrl.pathname,inviaFile.bind(contesto));
                        
                    }
                    else{
                        contesto={ risp:response,text:"Nessuna Risorsa Trovata",tipo:"text/plain",cod:404 }
                        inviaRisposta(contesto);
                    }
                    
                })
                
            }
            else{
                contesto={ risp:response,text:"Nessuna Risorsa Trovata",tipo:"text/plain",cod:404 }
            
                inviaRisposta(contesto);
            }
            

            break;
    }

    

});
server.listen(1337);
console.log("Il server è stato avviato sulla porta 1337");

//todo| Prelevo il file letto e lo invio al client |
function inviaFile(err,file){

        let contesto={ risp:this.risp,text:file,tipo:this.tipo,cod:200 }
    
    inviaRisposta(contesto)
}

function inviaRisposta(contesto){
    /*
        200-> successo
        400-> Richiesta non corretta
        401-> no autorizzazioni
        404-> risosrsa non trovata
        500-> Errore del server
    */

    header = {"Content-Type":contesto.tipo,
    "Access-Control-Allow-Origin":"*",} 
    contesto.risp.writeHead(contesto.cod,header);
    contesto.risp.write(contesto.text);
    contesto.risp.end();
}