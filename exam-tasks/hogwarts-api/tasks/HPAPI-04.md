# HPAPI-04 - Adatok módosítása

## Mint belépett felhasználó, szeretném módosítani a korábban megadott adataimat

### Pontok: 2
### Szolgáltatás: [PUT /user](http://localhost:5000/api-doc#/Users/AuthController_updateProfile)
### Prioritás: közepes

A feladat egy olyan form létrehozása, ahol a felhasználó módosítani tudja az általa megadott vezeték- és keresztnevet. A módosítást követően az új adatok legyenek láthatóak az oldalon (lásd [Profil és kilépés](./HPAPI-03.md))  
Hibás adatok nem küldhetőek a szolgáltatáshoz, kliens oldalon ellenőrizzük azokat. Amennyiben 401-es hibát kapunk válaszul, [léptessük ki a felhasználót](./HPAPI-03.md) és irányítsuk át a belépési oldalra.  
Az oldal csak belépett felhasználók számára elérhető, az URL cím beütésekor érvényesítsük a felhasználó adatait és hiba esetén irányítsuk át a belépő oldalra.  
A felhasználó eltávolíthatja az értesítési címét, a küldésnél figyeljünk arra, hogy ebben az esetben a `notificationAddress` mező értékét hagyjuk el a request body-jából. A jelszót és email címet ezen az oldalon nem lehet megváltoztatni, ahogy a Teszlek Süveg házat sem tudja a felhasználó módosítani.

#### Bemeneti adatok:
Lásd: [regisztráció](./HPAPI-02.md). Az email cím, jelszó és jelszó megerősítése mezőket itt el kell hagyni.

#### Példa bemeneti adatra:
```
{
  "homeAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  },
  "firstName": "Severus",
  "lastName": "Snape"
}
```

#### Sikeres adatmódosítás
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
  }
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - a bevitt adatok érvénytelenek
- 401 Unauthorized - hiányzó vagy érvénytelen token