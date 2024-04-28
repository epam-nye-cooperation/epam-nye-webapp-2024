# HPAPI-09 - Házak tanulói

### Pontok: 3
### Szolgáltatás: [GET /houses/{houseId}/members](http://localhost:5000/api-doc#/Houses/getMembers)
### Prioritás: alacsony
### Előkövetelmény: [Házak adatai](./HPAPI-08.md)

Belépett felhasználóknak tegyük lehetővé a házakhoz tartozó tanulók nevét. Az oldal legyen a Ház adatai lap alá rendezve (pl. /slytherin/members).
A lista legyen lapozható, egy oldalon maximum 20 fő jelenjen meg. A hallgatókat lehessen szűrni a nevük vagy e-mail címük alapján, illetve rendezzük őket név szerint növekvő sorrendbe.  
A szolgáltatás visszaadja az összes felhasználót, a fenti műveleteket nekünk kell kliens oldalon megoldani!

A ház adatait tartalmazó oldalt módosítsuk úgy, hogy a ház nevét, pontokat és a jelképet nem változtatjuk meg a navigáláskor. (valódi aloldal). A többi információt helyettesítjük a tagokkal és keresőmezővel, de legyen lehetőség a visszanavigálásra is. Ha be nem lépett felhasználó látogatja meg az oldalt, irányítsuk át az házak adataira (pl. hiányzó token vagy a szolgáltatás 401-es hibakóddal tér vissza).  

#### Lekérdezés
`http://localhost:5000/houses/hufflepuff/members`

#### Válasz
200 OK státusz
```
[
  {
    "userId": "ef9aac86-2e9b-4779-be02-7286f6e6c4d2",
    "firstName": "Severus",
    "lastName": "Snape",
    "email": "severus.snape@hogwarts.co.uk"
  }
]
```

#### A szolgáltatás által visszajelzett hibák:
400 Bad request - hibás házazonosító
401 Unauthorized - hiányzó vagy érvénytelen Bearer token