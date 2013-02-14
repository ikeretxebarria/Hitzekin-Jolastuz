Synopsis

Juego de letras en Euskera en el que con 10 letras al azar hay que construir palabras en Euskera que se validan contra un diccionario local. Permite el juego online y offline. 

Installation

Requiere la creación del diccionario de palabras en el fichero diccio.js

function populateDB(tx) {

+tx.executeSql('insert into hitzak values ("abar");');

+tx.executeSql('insert into hitzak values ("abantailos");');

+// Horrela hiztegiak dituen hitz guztiak sar itzazu
+
+//Gero sar itzazu 10 letratako hitzak
+   tx.executeSql('insert into hitzak10 values("zuztrapilo");');
+   

Tests

El juego está disponible en www.hitzekinjolastuz.net

License

MIT license.
