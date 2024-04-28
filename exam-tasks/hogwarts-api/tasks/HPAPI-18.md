# HPAPI-18 - Általános keresés

## Mint tanuló, szeretnék egyszerre keresni a bájitalok és varázslatok között

### Pontszám: 2
### Szolgáltatás: [GET /search](http://localhost:5000/api-doc#/Search/search)
### Prioritás: alacsony
### Előkövetelmények: [HPAPI-10 - Varázslatok](./HPAPI-10.md), [HPAPI-12 - Bájitalok](./HPAPI-12.md)

A szabad szavas keresés mindkét esetben működik, a visszaadott eredmények ugyanabban a formában jelenjenek meg, mint a tipizált esetben ([bájitalok](./HPAPI-12.md), [varázslatok](./HPAPI-10.md)). A listát lehessen szűkíteni típus szerint.  
A találatra történő kattintáskor felugró ablakban jelenjeneken a részletek, a típusnak megfelelő formában.  
Ha a tanulás modul teljesítésre került, itt is legyen elérhető.

#### Bemeneti paraméterek
- Kifejezés
  - paraméter: query
  - típus: szöveg
- Típus
  - paraméter: type
  - típus: választható érték
  - választható értékek:
    - potion (bájital)
    - spell (varázslat)
  - nem kötelező megadni, hiányzó érték esetén mindkettőre keres
- Rendezés
  - paraméter: orderBy
  - típus: választható érték
  - választható értékek:
    - name.ASC - alapértelmezett
    - name.DESC
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

#### Példa lekérdezés
`http://localhost:5000/search?query=dragon&orderBy=name.ASC&offset=0&limit=20`

#### Példa válasz
200 OK státusz
```
{
  "total": 4,
  "results": [
    {
      "id": "draconifors-spell",
      "type": "spell",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/3/35/DraconiforsPAS.png",
      "name": "Draconifors Spell",
      "effect": "Turns object into dragon",
      "details": "/spells/draconifors-spell"
    },
    {
      "id": "dragon-dung-fertiliser",
      "type": "potion",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/7/70/Dragon_dung_fertiliser.JPG",
      "name": "Dragon dung fertiliser",
      "effect": "Promotes the growth of plants",
      "details": "/potions/dragon-dung-fertiliser"
    },
    {
      "id": "dragon-poison",
      "type": "potion",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/9/92/Dragon_Poison.JPG",
      "name": "Dragon Poison",
      "effect": "Poisonous",
      "details": "/potions/dragon-poison"
    },
    {
      "id": "dragon-tonic",
      "type": "potion",
      "name": "Dragon Tonic",
      "effect": "Cures sick dragons",
      "details": "/potions/dragon-tonic"
    }
  ]
}
```

#### A szolgáltatás által visszajelzett hibák:
400 - hibás bemenet
401 - Érvénytelen vagy hiányzó belépő token