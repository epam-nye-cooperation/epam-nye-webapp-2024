# HPAPI-15 - Bájital elsajátítása

## Mint tanuló, szeretném elsajítani egy bájital elkészítését

### Pontszám: 2
### Szolgáltatás: [POST /user/learn/potions](http://localhost:5000/api-doc#/Learn/learnPotion)
### Prioritás: Magas
### Előkövetelmények: [HPAPI-07 - Kezdőlap](./HPAPI-07.md), [HPAPI-12 - Bájitalok](./HPAPI-12.md), [HPAPI-13 - Bájital részletes adatai](./HPAPI-13.md), [HPAPI-16 - Megtanult bájitalok](./HPAPI-16.md)

A bejelentkezett és házba beosztott tanuló megtanulhatja egy bájital elkészítését. Bővítsük a [Bájitalok](./HPAPI-12.md) oldalon visszakapott elemeket egy új gombbal, amivel a felhasználó megtanulhatja azt. Ha a felhasználó rákattint erre a gombra, küldjünk egy új POST kérést a szolgáltatás irányába a kiválasztott bájital azonosítójával.  
A szolgáltatás által visszaadott eredménytől függően jelenítsünk meg üzenetet a felhasználó számára (pl. Sikeresen megtanultad a(z) XYZ bájitalt). Siker esetén házak pontjai változnak (lásd: [Kezdőlap](./HPAPI-07.md)), frissítsük ezeket az elemeket. A böngészőben tárolt, megtanult bájitalok listáját frissítsük a megtanult bájital azonosítójával és tiltsuk le a gomb használatát az oldalon az adott elemnél. 
A gomb legyen elérhető a [bájital részletes adatai](./HPAPI-13.md) alatt is, ugyanezzel a mechanizmussal, de zárjuk is be az ablakot ebben az esetben.  
A gomb legyen letiltva, ha a felhasználó még nincs beosztva vagy a már megtanult elemek esetén, valamint akkor is, amíg a tanulás tart (értsd: amíg a válasz visszaérkezik a szervertől)

#### Példa kérés
`POST http://localhost:5000/user/learn/spells`
Body:
```
{
  "spellId": "fire-protection-potion"
}
```

### Példa válasz
200 OK státusz
```
{
  "name": "Fire-Protection Potion",
  "potionId": "fire-protection-potion",
  "wiki": "https://harrypotter.fandom.com/wiki/Fire_Protection_Potion",
  "effect": "Protects drinker from fire",
  "characteristics": "Blue in colour",
  "difficulty": "Beginner",
  "time": "",
  "image": "https://static.wikia.nocookie.net/harrypotter/images/8/8e/HM_y2_Fire_Protection_Potion.png",
  "ingredients": [
    "Bursting mushrooms",
    "Salamander blood",
    "Wartcap powder"
  ],
  "inventors": "",
  "manufacturers": "",
  "sideEffects": "Sensation of ice flooding body"
}
```

#### A szolgáltatás által visszajelzett hibák:
401 - Érvénytelen vagy hiányzó belépő token
403 - A tanuló még nincs beosztva
404 - A varázslat nem található
409 - A varázslatot már megtanulta