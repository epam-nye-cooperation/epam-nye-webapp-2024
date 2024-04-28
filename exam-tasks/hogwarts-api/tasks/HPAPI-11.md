# HPAPI-11 - Varázslat részletes adatai

## Mint tanonc, szeretném megismerni a varázslathoz tartozó részletes információkat

### Pontszám: 1
### Szogáltatás: [GET /spells/{spellId}](http://localhost:5000/api-doc#/Spells/getSpell)
### Prioritás: közepes
### Előkövetelmény: [HPAPI-10 - Varázslatok](./HPAPI-10.md)

A varászlatok listájában csak nagyon kevés információ áll rendelkezésre, így szükség van egy módra, hogy a részletesebb információk is elérhetőek legyenek a tanulók részére. Bővítsük a találati listát egy részletek gombbal, amire ha a felhasználó rákattint, kérdezzük le a varázslat részletes adatait a szolgáltatástól és jelenítsük meg ezeket egy felugró ablakban.  
Az ablakban legyen látható a varázslat neve (`name`), az általa kiváltott hatás (`effect`), a kategóriák listája (`category`), a varázslattal járó fényhatás színe (`light`). Jelenítsük meg a varázsigét (`incantation`) és a hozzá tartozó képet (`image`), ha ezek elérhetőek.  
Legyen az ablakban látható egy gomb a Wiki-re, amire kattintva a felhasználó egy új ablakban további hasznos információkhoz juthat a varázslattal kapcsolatban.  
A felugró ablak legyen bezárható, bezárás után az oldal tartalma (pozíció, keresett elemek, stb) ne változzon.  
Ha hiba történt a lekérdezéskor (pl a varázslat nem található), jelenítsünk meg megfelelő üzenetet.

#### Példa lekérdezés
`http://localhost:5000/spells/shooting-spell`

#### Válasz
200 OK státusz
```
{
  "name": "Shooting spell",
  "spellId": "shooting-spell",
  "effect": "Small explosion with a gunshot-sound",
  "wiki": "https://harrypotter.fandom.com/wiki/Shooting_spell",
  "category": [
    "spell"
  ],
  "image": "https://static.wikia.nocookie.net/harrypotter/images/7/73/Shooting_Spell.gif",
  "incantation": "",
  "light": "None"
}
```

#### A szolgáltatás által visszajelzett hibák:
401 - Érvénytelen vagy hiányzó belépő token
404 - A varázslat nem található