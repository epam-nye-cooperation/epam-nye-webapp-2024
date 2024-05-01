# WSA-09 - Kosárba helyezés

## Mint felhasználó, szeretném összegyűjteni a termékeket egy kosrában, hogy később megvásárolhassam azokat.

### Pontszám: 4
### Szolgáltatás: - (kliens oldalon belül)
### Prioritás: magas
### Előkövetelmények: [WSA-07 - Terméklisták](./WSA-07.md), [WSA-08 - Termékek](./WSA-08.md)

Biztosítsunk lehetőséget a termékek kosárba helyezésére minden olyan oldalon, ahol termékelem található (Terméklisták, termékek). A kosárba helyezés egy formot jelent, amiben egy beviteli mező (csak számot fogad el), illetve egy gomb található. A gombra történő kattintáskor a mezőben megadott darabszámot és termékazonosítót mentsük el a böngészőben. Ha egy termékből már található elem a felhasználó kosarában, úgy jelenítsünk meg egy üzenetek: 'Már {x} darab a kosaradban'.  
Egy termékből több darab is bekerülhet a kosárba, de össszesen a raktáron található elemek számával megegyező lehet benne. Amennyiben elérte a határszámot, a kosárba helyezés gombot tiltsuk le (disabled), több elem nem kerülhet a kosárba. Ha a frissítés gombra kattintunk, ne vesszenek el a korábban kosárba helyezett elemek.  
Minden oldalon legyen látható egy ikon, ami mellett megtalálható a kosárban található elemek száma (pl. ha egy termékből 5 darab van, egy másikból pedig 3, akkor 8-as szám). Egy termék kosárba helyezésekor ez a szám automatikusan frissüljön. Az ikonra történő kattintáskor navigáljunk el a [kosár oldalra](./WSA-10.md).
