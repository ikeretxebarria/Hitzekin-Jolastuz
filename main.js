// JavaScript Document
			var palabra="";
            var letraspalabra = new Array(10);
            var habilitadas = new Array(10);
            var timerID;
            var segundos = 60;
            var hitza="";
            var idpregunta=1;
            var puntuazioa = 0;
            var hitzak = new Array(100);
			var izena="";
			var params = String(window.location.search);
            var fila=1;
            function iniciajuego(){
                //Comprobamos si existe la base de datos y si no existe la creamos
                fila=1;
                
				//window.resizeTo(1024,768);
                clearTimeout(timerID);
                for (i=1;i<=100;i++) hitzak[i]="";
                if (window.innerHeight<512)
                document.getElementById("lista").innerHTML='<table class="table"><tbody><tr><th width="70%">Hitza</th><th width="10%"></th><th width="20%">Puntuak</th></tr></tbody></table></p>';
                else
                if (window.innerHeight<700)
                document.getElementById("lista").innerHTML='<table class="table"><tbody><tr><th width="70%">Hitza</th><th width="10%"></th><th width="20%">Puntuak</th></tr></tbody></table></p>';
                else
                document.getElementById("lista").innerHTML='<table class="table"><tbody><tr><th width="70%">Hitza</th><th width="10%"></th><th width="20%">Puntuak</th></tr></tbody></table></p>';
                document.getElementById("txthitza").innerHTML="<center>_____________</center>";
				if (params.length>6)
				      izena=unescape(params.substring(7, params.length));
                document.getElementById("tiempo").innerHTML="<center><b>Prest!</b></center>";
                document.getElementById("jolastuberriro").innerHTML="";
                //Cargamos una palabra de 10 letras al azar
                puntuazioa=0;
                document.getElementById("puntuazioa").innerHTML="<center><b>Puntuazioa: "+ puntuazioa + "</b></center>";

                NumPalabras = 5600;
                var randomnumber=Math.floor(Math.random()*NumPalabras)+1;
                while(idpregunta==randomnumber){
                    randomnumber=Math.floor(Math.random()*NumPalabras)+1;
                }
                idpregunta = randomnumber;    
                var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                db.transaction(queryDBhitzak10, errorCB);
            }
            
            function queryDBhitzak10(tx) {
                tx.executeSql('SELECT * FROM hitzak10 Limit 1 offset ' + idpregunta , [], querySuccesshitzak, errorCB);
            }
            function querySuccesshitzak(tx, results) {
                var len = results.rows.length;
                if (len>0)
                    palabra =results.rows.item(0).palabra;
                puntuazioa=0;
                document.getElementById("puntuazioa").innerHTML="<center><b>Puntuazioa: "+ puntuazioa + "</b></center>";

                //Guardamos la palabra como solución
                //Desordenamos las letras y las visualizamos, cada botón llama a pulsaletra con la letra y el orden del botón
                desordena();
                var pp="";
                var s = "";
                for (i=1;i<=5;i++){
                   pp = pp + palabra.substring(letraspalabra[i]-1,letraspalabra[i]);
                   s+='<td><div id="' + i  + '"><input type="button" class="button" onclick="return pulsaletra(' + i + ',';
                    s+="'" + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + "'";
                    s+=');" value="' + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + '"/></div></td>';
                }
                s=s+"</tr><tr>";
                for (i=6;i<=10;i++){
                   pp = pp + palabra.substring(letraspalabra[i]-1,letraspalabra[i]);
                   s+='<td><div id="' + i  + '"><input type="button" class="button" onclick="return pulsaletra(' + i + ',';
                    s+="'" + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + "'";
                    s+=');" value="' + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + '"/></div></td>';
                }
                document.getElementById("letras").innerHTML = "<center><table><tr>" + s + "</tr></table></center>";
                //Todos las letras habilitadas
                for (i=1;i<=10;i++)
                   habilitadas[i]=0;
                //Botones de enviar y borrar habilitados
                document.getElementById("Botoiak").innerHTML='<center><input type="button" class="button" onclick="return borrar(0);" value="&nbsp;&nbsp;&nbsp;Ezabatu&nbsp;&nbsp;&nbsp;"/>&nbsp;&nbsp;<input type="button" class="button" onclick="return anadir();" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bidali&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/></center>';
                
                //Inicializamos contador tiempo
                segundos = 60;
                timerID = setTimeout("tiempo()", 1000);
				 
                
            }
            function tiempo(){
                
                if (segundos >0){
                    timerID = setTimeout("tiempo()", 1000);document.getElementById("tiempo").innerHTML="<center><b>" + segundos + "</center></b>";segundos--;}
                else
                     timeup();
                
            }
            function pulsaletra(orden,letra){
                var s = "";
                document.getElementById(orden).innerHTML=s;
                //Añadimos a la palabra la letra y la visualizamos
                hitza=hitza+letra;
                document.getElementById("txthitza").innerHTML="<center><b>" + hitza + "</b></center>" ;
               // document.getElementById("hitza").innerHTML = 
                //Deshabilitamos botón letra
                habilitadas[orden]=1;
                pp="";
                s='<input type="button" class="botoiaoff" value=" "/>&nbsp;';
                document.getElementById(orden).innerHTML=s;
            }
            
            
            function borrar(todo) {
                //Habilitamos todos los botones
                //Borramos palabra
                var s = "";
                //Añadimos a la palabra la letra y la visualizamos
               // document.getElementById("hitza").innerHTML = "";
                document.getElementById("txthitza").innerHTML="<center>___________</center>";
                hitza="";
                //Deshabilitamos botón letra
                pp="";
                for (i=1;i<=5;i++){
                    pp = pp + palabra.substring(letraspalabra[i]-1,letraspalabra[i]);
                    if (todo==0){
                        s+='<td><div id="' + i  + '"><input type="button"  class="button" onclick="return pulsaletra(' + i + ',';
                        s+="'" + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + "'";
                        s+=');" value="' + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + '"/>&nbsp;</div></td>'; 
                        habilitadas[i]=0;
                    }else{
                        habilitadas[i]=1;
                        s+='<td><div id="' + i + '">' + '<input type="button" class="botoiaoff" value=" "/>&nbsp;' + '</div></td>';}
                }
                s=s + "</tr><tr>";                
                for (i=6;i<=10;i++){
                    pp = pp + palabra.substring(letraspalabra[i]-1,letraspalabra[i]);
                    if (todo==0){
                        s+='<td><div id="' + i  + '"><input type="button"  class="button" onclick="return pulsaletra(' + i + ',';
                        s+="'" + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + "'";
                        s+=');" value="' + palabra.substring(letraspalabra[i]-1,letraspalabra[i]) + '"/>&nbsp;</div></td>'; 
                        habilitadas[i]=0;
                    }else{
                        habilitadas[i]=1;
                        s+='<td><div id="' + i + '">' + '<input type="button" class="botoiaoff" value=" "/>&nbsp;' + '</div></td>';}
                }                
                document.getElementById("letras").innerHTML = "<center><table><tr>" + s + "</tr></table></center>";
            }
            
            function anadir(){
                //Comprobamos si no está añadida
                for(i=1;hitzak[i]!="";i++)
                    if (hitzak[i]==hitza){
                        borrar(0);
                        return;}
                hitzak[i]=hitza;
                //Comprobamos si existe en el diccionario
                var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                db.transaction(queryDBhitzak, errorCB);
                
            }
            function queryDBhitzak(tx) {
                tx.executeSql('SELECT * FROM hitzak where palabra ="' + hitza + '"', [], querySuccesshitza, errorCB);
            }
            function querySuccesshitza(tx, results) {
                var len = results.rows.length;
                if (len>0){
                    //Calcular puntos y actualizar
                    var puntos = 0;
                    puntos = hitza.length;
                    if (puntos == 10)  puntos = 50;
                    if (puntos == 9) puntos = 30;
                    if (puntos == 8)  puntos = 15;
                    document.getElementById("lista").innerHTML = enlista (results.rows.item(0).palabra,puntos); 
                    puntuazioa=puntuazioa + puntos;
                    document.getElementById("puntuazioa").innerHTML = "<center><b>Puntuazioa: "+ puntuazioa + "</b></center>";
                }else{
                    document.getElementById("lista").innerHTML=enlista( hitza + " ez da aurkitu hiztegian.",0);
                }
                 borrar(0);  
            }    
            
            function timeup(){
                //Mostramos mensaje time up
                document.getElementById("tiempo").innerHTML="<center><b>Denbora agortu da</b></center>";
                //Borramos botón enviar
                borrar(1);
                  //Mostramos link volver a jugar
                document.getElementById("jolastuberriro").innerHTML='<center><br /><input type="button" class="button" onclick="return iniciajuego();"  value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Berriro jolastu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/></center>';
                document.getElementById("txthitza").innerHTML= "<center><b>" + palabra + "</b></center>";
                alert("Hitz eskutua " + palabra + " zen.");
                document.getElementById("letras").innerHTML = "<b>&nbsp;</b>";
                document.getElementById("Botoiak").innerHTML="";
				                //Si ha conseguido record lo grabamos
								LeerRecord();
                    }
                    
                    
                    function LeerRecord(){
                         var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                         db.transaction(queryLeeRecord, errorCB);
                    }
                    
                    function GrabarRecord(){
                        
                       // alert(document.getElementById("nombre").value);
                        var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                        db.transaction(queryGrabaRecord, errorCB);
                    }
                    function queryGrabaRecord(tx) {
                        //alert(document.getElementById("nombre").value);
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Records (Valor,Nombre)');
                        tx.executeSql('INSERT INTO Records values (' + puntuazioa + ',"' + izena + '");', [], querySuccessGrabar, errorCB);

                        
                    }
                    function querySuccessGrabar(tx, results) {
                        	alert("Errekorra gordeta");		  
                        

                    }
                    
                     function queryLeeRecord(tx){
                      //  tx.executeSql('DROP TABLE IF EXISTS Records');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Records (Valor,Nombre)');
                        tx.executeSql('SELECT * FROM Records order by Valor desc limit 5', [], querySuccessLee, errorCB);
                        
                    }
                    function querySuccessLee(tx, results) {
                        
                        
                        var len = results.rows.length;
						var limiterecord=0;
                        if (len>0){
                               
                               if (len>5) len=5;
                         	   for(i=0;i<len;i++)
                                 {
                             	    j= i+1;
                                    limiterecord=results.rows.item(i).Valor;
                                  }
                                  if (len<5) limiterecord = 1;
                                } //if
								if (puntuazioa>=limiterecord) {
								    izena =  prompt("Errekor berria ezarri duzu!. Idatz ezazu zure izena");
								    GrabarRecord();							    
								}
                    }
            
            //*****************
            // AUXILIARES
            //****************
            function desordena(){
                var x= 0;
                var carta = 1;
                x = Math.round(( Math.random() * 10) + 0);
                var i = 0;
                for (i=1;i<=10;i++) letraspalabra[i]=0;
                while (carta<11)
                {
                    while (letraspalabra[x]!=0)
                    {
                        x++;
                        if (x==11) x = 0;
                    }
                    letraspalabra[x]=carta;
                    x = Math.round(( Math.random() * 10) + 0);
                    carta++;
                }
            }
            function deshabilita(){
                alert("h");
                document.getElementById("1").innerHTML="";
            }
            function errorCB(){
            alert("Databasearekin arazo bat sortu da. Parka itzazu eragozpenak.");
            }
           
			function enlista(palabro, punt)
			{
			var pppp="";
			fila++;
			var auxHTML = document.getElementById("lista").innerHTML;
			//Buscamos la línea correspondiente a fila +1
			var dividido = auxHTML.split('</tbody>');
				    if (punt > 0)
			      pppp =dividido[0] + "<tr><td>" + palabro + "</td><td><center><img src='ok.png' height='10'/></center></td><td>" + punt + "</td></tr></tbody>" + dividido[1];
			     else
			     pppp = dividido[0] + "<tr><td>" + palabro + "</td><td><center><img src='nook.jpg' height='10' /></center></td><td>" + punt + "</td></tr></tbody>" + dividido[1];
			     
			return pppp;
			}