                     function LeerRecord(){
                         var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                         db.transaction(queryLeeRecord, errorCB);
                    }
                    
                    
                     function queryLeeRecord(tx){
                      //  tx.executeSql('DROP TABLE IF EXISTS Records');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Records (Valor,Nombre)');
                        tx.executeSql('SELECT * FROM Records order by Valor desc limit 5', [], querySuccessLee, errorCB);
                        
                    }
                    function querySuccessLee(tx, results) {
                        
                        
                        var len = results.rows.length;
						var limiterecord=0;
						var s = "<table class='table'><tbody><tr><th>Izena</th><th><center>Puntuazioa</center></th></tr>";
                        if (len>0){
                               
                               if (len>5) len=5;
                         	   for(i=0;i<len;i++)
                                 {
                             	    s = s + "<tr><td>" + results.rows.item(i).Nombre +"</td><td><center>" +   results.rows.item(i).Valor + "</center></td></tr>";
                                     
                                  }
                           s = s + "</tbody></table>";  
                           document.getElementById("taula").innerHTML=s;   
                         }
                         }
                    
                     function errorCB(){
                          alert("Databasearekin arazo bat sortu da. Parka itzazu eragozpenak.");
                     }
           