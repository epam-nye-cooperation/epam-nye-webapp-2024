# HPAPI-11 - Bájital részletes adatai

## Mint tanonc, szeretném megismerni a bájitalhoz tartozó részletes információkat

### Pontszám: 1
### Szogáltatás: [GET /potions/{potionId}](http://localhost:5000/api-doc#/Potions/getPotion)
### Prioritás: közepes
### Előkövetelmény: [HPAPI-12 - Bájitalok](./HPAPI-12.md)

A bájitalok listájában csak nagyon kevés információ áll rendelkezésre, így szükség van egy módra, hogy a részletesebb információk is elérhetőek legyenek a tanulók részére. Bővítsük a találati listát egy részletek gombbal, amire ha a felhasználó rákattint, kérdezzük le a bájital részletes adatait a szolgáltatástól és jelenítsük meg ezeket egy felugró ablakban.  
Az ablakban legyen látható a bájital neve (`name`), az általa kiváltott hatás (`effect`), a nehézségi szintet (`difficulty`), a bájital kinézetét (`characteristics`) az összetevők listáját (`ingredients`). Ha elérhetőek, legyen látható a bájitalhoz tartozó kép (`image`), elkészítési idő (`time`), valamint mellékhatás (`sideEffects`).
Legyen az ablakban látható egy gomb a Wiki-re, amire kattintva a felhasználó egy új ablakban további hasznos információkhoz juthat a bájitallal kapcsolatban.  
A felugró ablak legyen bezárható, bezárás után az oldal tartalma (pozíció, keresett elemek, stb) ne változzon.  
Ha hiba történt a lekérdezéskor (pl a bájital nem található), jelenítsünk meg megfelelő üzenetet.

#### Példa lekérdezés
`http://localhost:5000/potions/dragon-dung-fertiliser`

#### Válasz
200 OK státusz
```
{
  "name": "Dragon dung fertiliser",
  "potionId": "dragon-dung-fertiliser",
  "wiki": "https://harrypotter.fandom.com/wiki/Dragon_dung_Fertiliser",
  "effect": "Promotes the growth of plants",
  "characteristics": "Light green in colour",
  "difficulty": "Moderate",
  "time": "",
  "image": "https://static.wikia.nocookie.net/harrypotter/images/7/70/Dragon_dung_fertiliser.JPG",
  "ingredients": [
    "Sloth brain",
    "7 pieces of Dragon dung",
    "Stewed Mandrake",
    "2 rat spleens",
    "Toasted dragonfly thoraxes",
    "3 Flying Seahorses"
  ],
  "inventors": "",
  "manufacturers": "",
  "sideEffects": ""
}
```

#### A szolgáltatás által visszajelzett hibák:
401 - Érvénytelen vagy hiányzó belépő token
404 - A bájital nem található