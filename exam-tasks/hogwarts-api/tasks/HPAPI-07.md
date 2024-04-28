# HPAPI-07 - Kezdőlap

## Mint látogató szeretném elérni a Hogwarts-ot, hogy megismerkedhessek a házakkal

### Pontszám: 2
### Szolgáltatás: [GET /houses](http://localhost:5000/api-doc#/Houses/getHouses)
### Prioritás: Közepes

Az oldalra érkező látogatóknak mutassuk meg a Házakat, nevüket és a jelképüket, de az oldal tartalma aszerint változik, hogy látogató, belépett vagy beosztott felhasználó nyitja meg az oldalt. 
Látogatók lássak a házak listáját, a házak nevét és jelképét, valamint egy [bejelentkezési formot](./HPAPI-01.md), alatta linket a [regisztrációs oldalra](./HPAPI-02.md).
Belépett felhasználók láthassák a házak tanulói által eddig megszerzett pontokat is (ilyen esetben a lekérdezéshez adjuk hozzá az authorization header-t is), ha az adott tanonc be van osztva valamelyik házba, az legyen kiemelve valamilyen formában (pl. plusz keret, vagy nagyobb méret, más elrendezés). A házak pontjai minden oldalon legyenek elérhetőek.  
Még be nem osztott, de bejelentkezett felhasználóknak hívjuk fel a figyelmét ezen hiányosságra és adjunk lehetőséget a [Teszlek Süveg](./HPAPI-06.md) elérésére (pl. egy linkkel vagy gombbal, amiben egy felugró ablakban kitöltheti a tesztet).
A házakra történő kattintáskor navigáljunk el dedikált oldalakra, ahol az adott házakról tekinthetünk meg további információkat (ezen oldalak megvalósítása nem tartozik ennek a sztorinak a hatáskörébe, lásd [Részletes házinformációk](./HPAPI-08.md)).  

#### Lekérdezés
`http://localhost:5000/houses`

#### Válaszkód
200 OK