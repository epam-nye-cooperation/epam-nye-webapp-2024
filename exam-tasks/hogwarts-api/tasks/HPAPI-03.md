# HPAPI-03 - Profil és kilépés

## Mint belépett felhasználó, szeretném elérni a regisztráció során megadott adataimat

### Pontok: 1
### Szolgáltatás: [GET /user](http://localhost:5000/api-doc#/Users/AuthController_getProfile)
### Prioritás: magas

A feladat, hogy az oldalon jelezzük, ha a felhasználó már belépett és elérhet zárolt szolgáltatásokat vagy belépés szükséges. Legyen látható a felhasználó vezeték- és keresztneve, illetve email címe és biztosítsunk lehetőséget a kilépésre. Legyen dedikált oldala is ezen adatoknak.
Kilépés esetén a [belépésnél](./HPAPI-01.md) eltárolt tokent töröljük, az authorizációhoz kötött szolgáltatásokat pedig ne engedélyezzük a továbbiakban.  

Az adatok lekéréséhez használjuk az Authorization header-t a request-ben. Hiba esetén léptessük ki a felhasználót és irányítsuk át a belépési oldalra.

#### Sikeres lekérdezés
200 OK válaszkód
```
{
  "userId": "ef9aac86-2e9b-4779-be02-7286f6e6c4d2",
  "email": "severus.snape@hogwarts.co.uk",
  "firstName": "Severus",
  "lastName": "Snape",
  "homeAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  },
  "notificationAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  }
  "house": "slytherin"
}
```

#### A szolgáltatás által visszajelzett hibák:
- 401 Unauthorized - hiányzó vagy érvénytelen Bearer token