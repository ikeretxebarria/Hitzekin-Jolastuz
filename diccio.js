            function iniciabd(){
                
                var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                db.transaction(queryDB, errorCB);
                
            }
            function queryDB(tx) {
                
               // tx.executeSql('DROP TABLE hitzak10');            
                tx.executeSql('CREATE TABLE IF NOT EXISTS hitzak ( palabra)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS hitzak10 ( palabra)');
                tx.executeSql('SELECT * FROM hitzak10 where palabra ="zuztrapilo"', [], querySuccess, errorCB);
            }
            function querySuccess(tx, results) {
                var len = results.rows.length;
                if (len==0)
                {
                    var db = window.openDatabase("Database", "1.0", "hitzakdb", 2000000);
                    db.transaction(populateDB, errorCB, successCB);
                }
            }
            
            
            
            function populateDB(tx) {
tx.executeSql('insert into hitzak values ("abar");');
tx.executeSql('insert into hitzak values ("abantailos");');
// Horrela hiztegiak dituen hitz guztiak sar itzazu

//Gero sar itzazu 10 letratako hitzak
   tx.executeSql('insert into hitzak10 values("zuztrapilo");');

                
            }
            
            function errorCB(tx, err) {
              //  alert("Error processing SQL: "+err);
            }
            
            
            function successCB() {
                //  $.mobile.loadingMessage("Cargando");
               // alert("Ok");
            }