# HPAPI-14 - Varázslat elsajátítása

## Mint tanuló, szeretném elsajítani egy varázslat használatát

### Pontszám: 2
### Szolgáltatás: [POST /user/learn/spells](http://localhost:5000/api-doc#/Learn/learnSpell)
### Prioritás: Magas
### Előkövetelmények: [HPAPI-07 - Kezdőlap](./HPAPI-07.md), [HPAPI-10 - Varázslatok](./HPAPI-10.md), [HPAPI-11 - Varázslat részletes adatai](./HPAPI-11.md), [HPAPI-14 - Megtanult varázslatok](./HPAPI-14.md)

A bejelentkezett és házba beosztott tanuló megtanulhat egy varázsigét. Bővítsük a Varázslatok oldalon visszakapott elemeket egy új gombbal, amivel a felhasználó megtanulhatja a bűbáj használatát. Ha a felhasználó rákattint erre a gombra, küldjünk egy új POST kérést a szolgáltatás irányába a kiválasztott varázslat azonosítójával.  
A szolgáltatás által visszaadott eredménytől függően jelenítsünk meg üzenetet a felhasználó számára (pl. Sikeresen megtanultad a(z) XYZ varázslatot). Siker esetén házak pontjai változnak (lásd: [Kezdőlap](./HPAPI-07.md)), frissítsük ezeket az elemeket. A böngészőben tárolt, megtanult varázslatok listáját frissítsük a megtanult varázslat azonosítójával és tiltsuk le a gomb használatát az oldalon az adott elemnél.  
A gomb legyen elérhető a [varázslat részletes adatai](./HPAPI-11.md) alatt is, ugyanezzel a mechanizmussal, de zárjuk is be az ablakot ebben az esetben.  
A gomb legyen letiltva, ha a felhasználó még nincs beosztva vagy a már megtanult elemek esetén, valamint akkor is, amíg a tanulás tart (értsd: amíg a válasz visszaérkezik a szervertől)

#### Példa kérés
`POST http://localhost:5000/user/learn/spells`
Body:
```
{
  "spellId": "unlocking-charm"
}
```

### Példa válasz
200 OK státusz
```
{
  "name": "Unlocking Charm",
  "spellId": "unlocking-charm",
  "effect": "Unlocked objects",
  "wiki": "https://harrypotter.fandom.com/wiki/Unlocking_Charm",
  "category": [
    "charm"
  ],
  "image": "https://static.wikia.nocookie.net/harrypotter/images/0/0e/Alohomora.gif",
  "incantation": "Alohomora(ah-LOH-ho-MOR-ah)",
  "light": "Invisible, blue, yellow, or purple"
}
```

#### A szolgáltatás által visszajelzett hibák:
401 - Érvénytelen vagy hiányzó belépő token
403 - A tanuló még nincs beosztva
404 - A varázslat nem található
409 - A varázslatot már megtanulta