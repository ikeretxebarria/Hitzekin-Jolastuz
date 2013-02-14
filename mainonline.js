
// JavaScript Document
			var palabra="";
            var letraspalabra = new Array(10);
            var habilitadas = new Array(10);
            var timerID;
            var timerPlay;
            var timerRecord;
            var segundos = 30;
            var hitza="";
            var idpregunta=1;
            var puntuazioa = 0;
            var hitzak = new Array(100);
			var izena="";
			var params = String(window.location.search);
            var fila=1;
            var idPartida="";
            var izena = "";
            function iniciajuegoonline(){
            //Llamamos por AJAX a play.php
            izena = document.formulario.Nombre.value;
            if (izena=="")
            {
               alert("Sar ezazu izena");
               return false;
            }
            document.getElementById("inicio").innerHTML="";
            solicitaplay();
            
            }
            
            function solicitaplay() {
 
        var xmlHttpReq = false;
        var strURL="http://www.ikeretxebarria.net/b/play.php";
        // Mozilla/Safari
        
        if (window.XMLHttpRequest) {
            xmlHttpReq = new XMLHttpRequest();
            if (xmlHttpReq.overrideMimeType) {
                xmlHttpReq.overrideMimeType('text/xml');
                // See note below about this line
            }
        // IE
        } else if (window.ActiveXObject) { // IE
            try {
                xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
            }
        }
        if (!xmlHttpReq) {
            alert('Ez dago interneterako konekziorik. Konekta zaitez lehenago online jolasteko.');
            return false;
        }   
        xmlHttpReq.open('GET', strURL, true);
        xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');        
        xmlHttpReq.onreadystatechange = function() { 
            callBackFunction(xmlHttpReq); 
        };
        xmlHttpReq.send("");
    }
            
    function callBackFunction(xmlRequest) {
        if (xmlRequest.readyState == 4) {
            if (xmlRequest.status == 200) {
          if(xmlRequest.responseText.indexOf( "Esperar")==-1){
             //Recoger palabra
               palabra = xmlRequest.responseText.substring(12,22);
             idPartida = xmlRequest.responseText.substring(0,12);
             document.getElementById("inicio").innerHTML="";
             iniciajuego();
             
          }
          else
          {
           
           
             //Volver a llamar a play
             clearTimeout(timerPlay);
             timerPlay=setTimeout("solicitaplay()", 3000);
              document.getElementById("txthitza").innerHTML = '<center>Partida berri baten zain. Itxaron mesedez.</center>';
          }
                             } else {
                alert('Ez dago interneterako konekziorik. Konekta zaitez online jolasteko.');
            }
        }
    }
            
           function EnviaRecord(){
            var xmlHttpReq = false;
        var strURL="http://www.ikeretxebarria.net/b/resultado.php?idPartida=" + idPartida + "&Nombre=" + izena + "&Puntos=" + puntuazioa;
        // Mozilla/Safari
        
        if (window.XMLHttpRequest) {
            xmlHttpReq = new XMLHttpRequest();
            if (xmlHttpReq.overrideMimeType) {
                xmlHttpReq.overrideMimeType('text/xml');
                // See note below about this line
            }
        // IE
        } else if (window.ActiveXObject) { // IE
            try {
                xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
            }
        }
        if (!xmlHttpReq) {
            alert('ERROR AJAX:( Cannot create an XMLHTTP instance');
            return false;
        }   
        xmlHttpReq.open('GET', strURL, true);
        xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');        
        xmlHttpReq.onreadystatechange = function() { 
            recordGrabado(xmlHttpReq); 
        };
        xmlHttpReq.send("");
           } 
            
            
            
             function recordGrabado(xmlRequest) {
        if (xmlRequest.readyState == 4) {
            if (xmlRequest.status == 200) {
                  if(xmlRequest.responseText=="Ok"){
                                 
                                 clearTimeout(timerRecord);
                                 timerRecord=setTimeout("leeRecords()", 10000);
                                 document.getElementById("txthitza").innerHTML+="<br/><center>Aurkarien emaitzak itxaroten...</center>"
                               }
     
                             } else {
                alert('ERROR: AJAX request status = ' + xmlRequest.status);
            }
        }
    }
            
            function leeRecords(){
              
                 var xmlHttpReq = false;
        var strURL="http://www.ikeretxebarria.net/b/leeresultados.php?idPartida=" + idPartida;
        // Mozilla/Safari
        
        if (window.XMLHttpRequest) {
            xmlHttpReq = new XMLHttpRequest();
            if (xmlHttpReq.overrideMimeType) {
                xmlHttpReq.overrideMimeType('text/xml');
                // See note below about this line
            }
        // IE
        } else if (window.ActiveXObject) { // IE
            try {
                xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
            }
        }
        if (!xmlHttpReq) {
            alert('ERROR AJAX:( Cannot create an XMLHTTP instance');
            return false;
        }   
        xmlHttpReq.open('GET', strURL, true);
        xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');        
        xmlHttpReq.onreadystatechange = function() { 
            muestrarecords(xmlHttpReq); 
        };
        xmlHttpReq.send("");
              
            }
            
            function muestrarecords(xmlRequest){  
              if (xmlRequest.readyState == 4) {
            if (xmlRequest.status == 200) {
                  {
                                 document.getElementById("jolastuberriro").innerHTML='<center><input type="button" class="button" onclick="return iniciaonline();"  value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Berriro jolastu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/></center>';
                                  document.getElementById("lista").innerHTML=xmlRequest.responseText;
                                 document.getElementById("txthitza").innerHTML = "<center><b>" + palabra + "</b></center>" ;
                  
                               }
     
                             } else {
                alert('ERROR: AJAX request status = ' + xmlRequest.status);
            }
        }
              
              
              
           
               
            }
            
            
            function iniciajuego(){
                //Comprobamos si existe la base de datos y si no existe la creamos
                fila=1;
                
				//window.resizeTo(1024,768);
                clearTimeout(timerID);
                for (i=1;i<=100;i++) hitzak[i]="";
                
                document.getElementById("lista").innerHTML='<table class="table" width="100%"><tbody><tr><th width="70%">Hitza</th><th width="10%"></th><th width="20%">Puntuak</th></tr></tbody></table></p>';
                
                document.getElementById("txthitza").innerHTML="&nbsp;";
				if (params.length>6)
				      izena=unescape(params.substring(7, params.length));
                document.getElementById("tiempo").innerHTML="<center>" + izena + " prest!</center>";
                document.getElementById("jolastuberriro").innerHTML="";
                //Cargamos una palabra de 10 letras al azar
                puntuazioa=0;
                document.getElementById("puntuazioa").innerHTML="<b>Puntuazioa : </b>"+puntuazioa;
                puntuazioa=0;
                document.getElementById("puntuazioa").innerHTML="<b>Puntuazioa: </b>"+puntuazioa;

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
                segundos = 30;
                timerID = setTimeout("tiempo()", 1000);
				 
                
            }
            function tiempo(){
                
                if (segundos >0){
                    timerID = setTimeout("tiempo()", 1000);document.getElementById("tiempo").innerHTML="<center>" + segundos + "</center>";segundos--;}
                else
                     timeup();
                
            }
            function pulsaletra(orden,letra){
                var s = "";
                document.getElementById(orden).innerHTML=s;
                //Añadimos a la palabra la letra y la visualizamos
                hitza=hitza+letra;
                document.getElementById("txthitza").innerHTML="<center>" + hitza + "</center>" ;
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
                document.getElementById("txthitza").innerHTML="&nbsp;";
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
                    document.getElementById("puntuazioa").innerHTML = "<b>Puntuazioa:</b> "+puntuazioa;
                }else{
                    document.getElementById("lista").innerHTML=enlista( hitza + " ez da aurkitu hiztegian.",0);
                }
                 borrar(0);  
            }    
            
            function timeup(){
                //Mostramos mensaje time up
                document.getElementById("tiempo").innerHTML="<center>Denbora agortu da </center>";
                //Borramos botón enviar
                borrar(1);
                  //Mostramos link volver a jugar
                 document.getElementById("letras").innerHTML= "";
                 document.getElementById("txthitza").innerHTML = "<center><b>" + palabra + "</b></center>";
                document.getElementById("Botoiak").innerHTML="";
				                //Si ha conseguido record lo grabamos
								EnviaRecord();
                    }
                    
                    
                    function iniciaonline(){
                    document.getElementById("jolastuberriro").innerHTML= "";
                    solicitaplay();
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