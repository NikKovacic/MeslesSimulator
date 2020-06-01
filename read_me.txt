Trenutno na strani uporabljam bootstrap s pomocjo "BootstrapCDN" in ne povezave iz mape "bootstrap-4.3.1", ker sem ocenil da je za potrebe te semirske naloge to ustrezna rešitev. 
Ker pa v navodilih piše da priložimo vse uporabljene knjižnice tudi to dodajam. Ter jo z veseljem spremenim ce tako želite.

V primeru, da želite bi se uporabila povezava iz mape z datotekama opis_modela.html in simulacija.html.
To bi naredil tako, da bi zamenjal 14 vrstico v datoteki simulacija.html:

iz

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

v

<link rel="stylesheet" href="bootstrap-4.3.1/css/bootstrap.min.css">

ter 12 vrstico v datoteki opis_modela.html

iz 

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

v

<link rel="stylesheet" href="bootstrap-4.3.1/css/bootstrap.min.css">

Hvala za razumevanje.