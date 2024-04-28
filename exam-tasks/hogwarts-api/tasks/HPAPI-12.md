# HPAPI-12 - Bájitalok

## Mint tanonc látni szeretném a bájitalok listáját, hogy megismerhessem és megtanulhassam azokat

### Pontszám: 2
### Szolgáltatás: [GET /potions](http://localhost:5000/api-doc#/Potions/searchPotion)
### Prioritás: magas

Ahhoz, hogy egy hallgató elsajátíthasson egy bájitalt, meg kell találnia azt. Ehhez szükséges egy kereső, amiben a megfelelő kifejezéssel könnyen fellelhető az elixír. A találatok listáját lehessen rendezni név és vagy a nehézség szerint növekvő vagy csökkenő sorrendben és limitált elemszámot megjeleníteni az oldalon. Legyen lehetőség szűkíteni a találatokat a nehézség szerint.  
Ha a felhasználó nem indított keresést, az oldal az összes elérhető bájitalt listázza ki, megtartva a lapozás és rendezés lehetőségét. A paraméterek változtatása során ezek az értékek szerepeljenek az URL címben is, hogy a keresés találati listája megosztható legyen másokkal. Az URL-ben szereplő értékek legyenek láthatóak a keresőben is, a keresés az oldal meglátogatásakor ezen értékek alapján induljon el automatikusan.  
Ezt a funkciót csak bejelentkezett felhasználók érhetik el. A listában jelenjen meg a bájital neve (`name`) és hatása (`effect`).

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
    - diffuculty.ASC (rendezés nehézség szerinte növekvő sorrendben)
    - diffuculty.DESC (rendezés nehézség szerint csökkenő sorrendben)
  - alapértelmezés: név szerint növekvő sorrendben
- Nehézség
  - paraméter: difficulty
  - típus: választható elem
  - választható értékek:
    - "Beginner"
    - "Moderate"
    - "Advanced"
    - "Ordinary Wizarding Level"
    - "Master"
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
`http://localhost:5000/potions?query=dragon&orderBy=name.ASC&offset=0&limit=20&difficulty=Moderate`

#### Példa eredmények
200 OK státusz
```
{
  "total": 1,
  "results": [
    {
      "id": "dragon-dung-fertiliser",
      "type": "potion",
      "image": "https://static.wikia.nocookie.net/harrypotter/images/7/70/Dragon_dung_fertiliser.JPG",
      "name": "Dragon dung fertiliser",
      "effect": "Promotes the growth of plants",
      "details": "/potions/dragon-dung-fertiliser"
    }
  ]
}
```

#### A szolgáltatás által visszajelzett hibák:
401 - Érvénytelen vagy hiányzó belépő token