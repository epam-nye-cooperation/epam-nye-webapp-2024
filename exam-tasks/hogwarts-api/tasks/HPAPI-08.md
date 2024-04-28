# HPAPI-08 - Házak részletes adatai

## Mint látogató szeretnék többet megtudni az iskolai Házairól, hogy választhassak

### Pontok: 1
### Szolgáltatás: [GET /houses/{houseId}](http://localhost:5000/api-doc#/Houses/getHouseById)
### Prioritás: Közepes

A Házak saját oldalain további információkat lehet megtekinteni, például, hogy hol található, ki alapította az adott házat, a korábbi és mostani Házvezetők, színek vagy jellemek.  
Az oldalon jelenítsük meg a következő információkat:
- A ház neve (`name`)
- A ház jelképe (`image`)
- Közös helyiség (`commonRoom`)
- Állat (`animal`)
- Ház szelleme (`ghost`)
- Alapító neve (`founder`)
- Jellemek (`treats`)
- A ház színei (`houseColors`)
- Mostani és korábbi házvezetők (`heads`)
- Belépett felhasználók mutassuk meg a házak tanuló által eddig gyűjtött pontokat (`points`) - kilépett felhasználók ezt nem látják.

Ha olyan ház azonosítót ad meg az URL-ben a felhasználó, ami nem létezik, irányítsuk át a kezdőlapra.

#### Lekérés példa:
`http://localhost:5000/houses/gryffindor`

#### Lekérdezés eredménye:
200 OK státusz
```
{
  "animal": "Lion",
  "commonRoom": "Gryffindor Tower",
  "element": "Fire",
  "founder": "Godric Gryffindor",
  "ghost": "Nearly-Headless Nick",
  "heads": [
    {
      "firstName": "Minerva",
      "lastName": "McGonagall"
    },
    {
      "firstName": "Godric",
      "lastName": "Gryffindor"
    }
  ],
  "houseColors": "Scarlet and gold",
  "houseId": "gryffindor",
  "name": "Gryffindor",
  "traits": [
    "Courage",
    "Chivalary",
    "Nerve",
    "Daring",
    "Determination",
    "Bravery"
  ],
  "image": "https://static.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png/revision/latest?cb=20190222162949",
  "points": 0
}
```

#### A szolgáltatás által visszajelzett hibák:
404 Not found - a keresett ház nem található