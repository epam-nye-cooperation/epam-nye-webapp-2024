# HPAPI-10 - Varázslatok

## Mint tanonc látni szeretném a varázslatok listáját, hogy később megtanulhassam azokat

### Pontszám: 2
### Szolgáltatás: [GET /spells](http://localhost:5000/api-doc#/Spells/searchSpell)
### Prioritás: magas

Ahhoz, hogy egy hallgató megtanulhasson egy varázslatot, meg kell találnia azt. Ehhez szükséges egy kereső, amiben a megfelelő kifejezéssel könnyen fellelhető a varázslat. A találatok listáját lehessen rendezni név és vagy a varázsige szerint növekvő vagy csökkenő sorrendben és limitált elemszámot megjeleníteni az oldalon. Legyen lehetőség szűkíteni a találatokat kategória szerint.  
Ha a felhasználó nem indított keresést, az oldal az összes elérhető varázslatot listázza ki, megtartva a lapozás és rendezés lehetőségét. A paraméterek változtatása során ezek az értékek szerepeljenek az URL címben is, hogy a keresés találati listája megosztható legyen másokkal. Az URL-ben szereplő értékek legyenek láthatóak a keresőben is, a keresés az oldal meglátogatásakor ezen értékek alapján induljon el automatikusan.  
Ezt a funkciót csak bejelentkezett felhasználók érhetik el. A listában jelenjen meg a varázslat neve (`name`) és hatása (`effect`).

#### Bemeneti adatok
A szolgáltatás biztosítja a megfelelő funkciókat, ezeket Query paraméterben kell megkapja
- Keresőkifejezés
  - paraméter: query
  - típus: szöveg
- Rendezés
  - paraméter: orderBy
  - típus: választható elem
  - választható értékek
    - name.ASC (rendezés név szerint növekvő sorrendben)
    - name.DESC (rendezés név szerint csökkenő sorrendben)
    - incantation.ASC (rendezés varázsige szerint növekvő sorrendben)
    - incantation.DESC (rendezés varázsige szerint csökkenő sorrendben)
  - alapértelmezés: név szerint növekvő sorrendben
- Kategória
  - paraméter: category
  - típus: választható elem
  - választható értékek:
    - "charm",
    - "spell"
    - "healing spell"
    - "vanishment"
    - "transfiguration",
    - "dark charm"
    - "jinx"
    - "curse"
    - "magical transportation"
    - "conjuration"
    - "hex"
    - "transformation"
    - "counter-charm"
    - "counter-spell"
    - "dark arts"
    - "counter-curse"
    - "counter-jinx"
    - "binding magical contract"
- Lapozás
  - Megjelenített elemek száma:
    - paraméter: limit
    - típus: szám - célszerű valamilyen listából választani (pl 5, 10, 25, 50, 100)
    - validáció:
      - minimum érték: 1
      - maximum érték: 100
  - Átugrott elemek száma - célszerűen az oldalon látható elemek számával növkeszik vagy csökken
    - paraméter: offset
    - típus: szám
    - validáció:
      - minimum érték: 0
      - a `limit` értékkel osztva nem ad maradékot
    - alapértelmezés: 20

#### Lekérdezés példa:
`http://localhost:5000/spells?orderBy=incantation.ASC&offset=0&limit=20&category=spell`

#### Példa eredmények
200 OK státusz
```
{
  "total": 7,
  "results": [
    {
      "id": "albus-dumbledore-s-forceful-spell",
      "type": "spell",
      "name": "Albus Dumbledore's forceful spell",
      "effect": "Great force",
      "details": "/spells/albus-dumbledore-s-forceful-spell"
    },
    {
      "id": "combat-bolt",
      "type": "spell",
      "name": "Combat Bolt",
      "effect": "Offensive spell; injured the target",
      "details": "/spells/combat-bolt"
    },
    {
      "id": "false-memory-spell",
      "type": "spell",
      "name": "False memory spell",
      "effect": "Implanted a false memory in the victim's mind",
      "details": "/spells/false-memory-spell"
    },
    {
      "id": "fracto-strata",
      "type": "spell",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/c/c4/Fracto_Strata_LEGOY1.png",
      "name": "Fracto Strata",
      "effect": "Destroy weak objects",
      "details": "/spells/fracto-strata"
    },
    {
      "id": "gusts",
      "type": "spell",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/3/37/Gusts.gif",
      "name": "Gusts",
      "effect": "Rush of wind",
      "details": "/spells/gusts"
    },
    {
      "id": "shield-penetration-spell",
      "type": "spell",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/3/36/Shield_Penetration.gif",
      "name": "Shield penetration spell",
      "effect": "Used to break down magical shields",
      "details": "/spells/shield-penetration-spell"
    },
    {
      "id": "shooting-spell",
      "type": "spell",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/7/73/Shooting_Spell.gif",
      "name": "Shooting spell",
      "effect": "Small explosion with a gunshot-sound",
      "details": "/spells/shooting-spell"
    }
  ]
}
```

#### A szolgáltatás által visszajelzett hibák:
400 - Hibás bemeneti paraméterek
401 - Érvénytelen vagy hiányzó belépő token