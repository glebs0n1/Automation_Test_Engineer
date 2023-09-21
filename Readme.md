/*
        Užbaigti servers.getAvailableServers() funkciją, kuri:
            Iš servers.rows.rows objekto surinktų visus "keys" į masyvą;
            Filtruoja serverius pagal "status" reikšmę ir grąžina tuos, kurių "status" reikšmė yra "enabled";
            servers.rows.available reikšmė yra nustatyta į gautą masyvą;
            Funkcija turi grąžinti masyvą, pvz.: ['production', 'staging'] bei užloginti su logssystem.js;


        Žaidėjai:
                /scripts/players.js faile, turi būti galima:
                 Gauti visų serverių vartotojus ir jų duomenis paduoti į "players.rows.rows" (sukurti funkciją);
                 Gauti visų serverių aktyvius vartotojus (sukurti funkciją);
                 Gauti visų serverių užblokuotus vartotojus, kurių "status" reikšmė lygi "banned" (sukurti funkciją);

                 Gauti visų serverių vartotojus, kurių "coins" reikšmė neigiama (sukurti funkciją);
                 Vartotojams, kurių "coins" reikšmė neigiama, reikšmę pakeisti į 0 (sukurti funkciją);
                 Vartotojui nustatyti ["device_os", "login", "name", "status", "level", "coins"] į norimą reikšmę (užbaigti players.rows.updateRow funkciją);

                ! - Visos funkcijos yra loginamos naudojant logssystem.js;
                ! - Architektūra yra panaši į requests/servers/logssystem failuose esančią;
        */