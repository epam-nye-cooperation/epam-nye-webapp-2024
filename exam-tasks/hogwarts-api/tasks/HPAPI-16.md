# HPAPI-14 - Megtanult bájitalok

## Mint tanuló szeretném ismerni az általam megtanult bájitalok

### Pontszám: 2
### Szolgáltatás: [GET /user/learn/potions](http://localhost:5000/api-doc#/Learn/getLearnedPotions)
### Prioritás: Magas
### Előkövetelmények: [HPAPI-01 Belépés](./HPAPI-01.md), [HPAPI-03 - Profil és kilépés](./HPAPI-03.md), [HPAPI-06 - Teszlek Süveg](./HPAPI-06.md)

Ahhoz, hogy a bájitalok listáján a hallgató meg tudja különböztetni a már megtanult és elérhető bájitalokat, tudnia kell, hogy melyiket tanulta már meg korábban. Ehhez küldjünk egy lekérdezést a szolgáltatás irányába és a visszaérkező választ tároljuk el a böngészőben a bejelentkezés után, kilépésnél pedig töröljük ezt az információt.  
A szolgáltatás csak bejelentkezett és házba beosztott felhasználók részére elérhető, más esetben hibát jelez. Belépés után ellenőrizzük, hogy a felhasználó rendelkezik-e megfelelő jogosultságokkal és csak akkor küldjük el a kérést, ha ezeknek eleget tesz. Ha belépéskor még nem volt beosztva, de időközben elvégzi a ceremóniát, frissítsük a listát.

#### Példa lekérdezés
`http://localhost:5000/user/learn/potions`

#### Példa válasz
200 OK státusz
```
[
  "fire-protection-potion"
]
```

#### A szolgáltatás által visszajelzett hibák:
401 Unauthorized - Érvénytelen vagy hiányzó belépő token
403 Forbidden - A tanuló még nincs házhoz beosztva