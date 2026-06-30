# PROGRESS.md — Italian Meals App

Progresso dello sviluppo dell'app **Italian Meals**, realizzata con Expo / React Native, riusando i pattern visti nei laboratori del corso (Lab 01–17).

---

## Stato generale

| Lab | Argomento | Stato |
|---|---|---|
| 01–06 | Setup progetto, architettura modulare (`src/components`, `src/screens`, `src/services`) | ✅ Completato |
| 07 | Avatar rotondo con fallback (pattern previsto, da integrare in Login/Settings) | ⚠️ Componente non ancora creato |
| 09–10 | `useState` / `useEffect`, side effects asincroni | ✅ Applicato in tutte le schermate dati |
| 11 | Form controllati (Login) | ✅ Completato |
| 13–14 | React Navigation, route params, deep linking | ✅ Completato (lista → dettaglio → preferiti) |
| 15 | REST calls (`fetch`) e workflow asincroni con stati UI | ✅ Completato |
| 16 | Persistenza locale con AsyncStorage (preferiti) | ✅ Completato |
| 17 | Stato globale con Context (`FavoritesContext`) | ✅ Completato |

---

## Struttura del progetto (cartella `src/`)

```
src/
  components/
    PrimaryButton.tsx      ✅ Bottone riutilizzabile (Lab 05)
    FavoriteButton.tsx     ✅ Cuore ♡/♥ per i preferiti (Lab 16)
  context/
    FavoriteContext.tsx    ✅ FavoriteProvider + useFavorites() — favoriteIds, isLoading, isFavorite(), toggleFavorite() (Lab 17)
    AuthContext.tsx        ✅ AuthProvider + useAuth() — user, login(), logout() (Lab 11, pattern Lab 17)
  navigation/
    AppNavigator.tsx       ✅ Stack Navigator (Login, MealsList, MealDetail, Favorites) + deep linking (Lab 13-14, 17)
  screens/
    LoginScreen.tsx         ✅ Form controllato con sfondo immagine, validazione, stati invio (Lab 11)
    MealsListScreen.tsx    ✅ Lista piatti italiani da TheMealDB (Lab 15, 17)
    MealDetailScreen.tsx   ✅ Dettaglio piatto (Lab 15, 17)
    FavoritesScreen.tsx    ✅ Lista dei soli piatti preferiti, filtrata da favoriteIds (Lab 17)
    SetttingScreen.tsx      ⏳ File creato, vuoto — da implementare (nome con typo da correggere)
  services/
    mealsApi.ts             ✅ fetchItalianMeals(), fetchMealById() (Lab 15)
    storage.ts               ✅ loadFavoriteIds(), saveFavoriteIds(), resetFavorites() (Lab 16)
    auth.ts                  ✅ MOCK_USERS, validateLogin() (Lab 11)
  types/
    meal.ts                  ✅ MealSummary, MealDetail, LoadStatus, MealsListState, MealDetailState

App.tsx (root)               ✅ Avvolge l'app con AuthProvider > FavoriteProvider > AppNavigator
```

**Da pulire:** `src/HomeScreen.tsx` e `src/DetailScreen.tsx` (nella root di `src/`, non in `screens/`) sono residui del Lab 14 con dati finti (array `DATA` statico) e non sono più collegati a nulla nel navigator. Possono essere rimossi in sicurezza.

---

## Schermate implementate

### 1. Login (`LoginScreen.tsx`) — Lab 11
- Form controllato: `TextInput` per email e password legati allo state (`value` + `onChangeText`)
- Validazione tramite `services/auth.ts` (`MOCK_USERS`, `validateLogin`): credenziali corrette → login riuscito e naviga alla lista; credenziali errate → messaggio "Email o password non validi", mostrato solo dopo il tentativo di submit
- Stati di invio espliciti (`idle / loading / error / success`), pulsante disabilitato durante l'invio
- `KeyboardAvoidingView` + `ScrollView` con `keyboardShouldPersistTaps="handled"` per la gestione della tastiera su mobile
- Sfondo con immagine di piatti italiani (`ImageBackground`) e form in un container rosso scuro semi-trasparente
- Schermata iniziale dell'app (`initialRouteName="Login"` nel navigator), header nascosto
- `navigation.replace("MealsList")` al login riuscito, per impedire di tornare al login con "indietro"

### 2. Lista piatti (`MealsListScreen.tsx`) — Lab 15, 16, 17
- `FlatList` che carica i piatti italiani da `GET /filter.php?a=Italian`
- Stato unico `{ status, items, message }` con valori `idle / loading / error / empty / success`
- Stato `loading`: `ActivityIndicator` + testo "Caricamento piatti italiani..."
- Stato `error`: messaggio + bottone **Retry** che richiama `loadMeals()`
- Stato `empty`: messaggio "Nessun piatto italiano disponibile"
- Pulsanti **"Lista" / "Preferiti (N)"** sotto il titolo per passare tra le due viste (Lab 17)
- Contatore **"Piatti preferiti: N"** sotto i pulsanti, aggiornato in automatico tramite Context
- Ogni riga: immagine miniatura, nome piatto, bottone cuore ♡/♥ allineato a destra (`flex: 1` sul nome per spingere il bottone)
- Tap su una riga → naviga al dettaglio passando `idMeal`
- Sfondo rosso scuro (`#d13c3c`)
- `accessibilityLabel` su righe e bottone Retry

### 3. Dettaglio piatto (`MealDetailScreen.tsx`) — Lab 15, 16, 17
- Carica i dati da `GET /lookup.php?i={idMeal}`
- Stesso pattern di stato unico di `MealsListScreen` (con stato aggiuntivo `idle` gestito esplicitamente per evitare crash al primo render)
- Validazione `idMeal` mancante → messaggio chiaro, niente crash
- Mostra immagine, titolo (con bottone cuore ♡/♥ affiancato), categoria/area, istruzioni
- Bottone **"← Torna indietro"** (`navigation.goBack()`)
- Sfondo rosso scuro diverso dalla lista (`#8b2323`) per distinguere le due schermate

### 4. Preferiti (`FavoritesScreen.tsx`) — Lab 17
- Carica tutti i piatti italiani e li filtra mantenendo solo quelli con `idMeal` presente in `favoriteIds` (dal Context)
- Pulsanti **"Lista" / "Preferiti (N)"** per tornare a `MealsListScreen`
- Stato vuoto gestito esplicitamente con messaggio: *"Nessun preferito ancora. Tocca ♡ su un piatto dalla lista."*
- Stato `isLoading` dal Context: evita di mostrare "nessun preferito" prima che AsyncStorage abbia finito la lettura iniziale
- Stesso stile visivo della lista principale (sfondo, layout riga, bottone cuore)

### 5. Navigazione (`AppNavigator.tsx`) — Lab 13–14, 17
- Stack Navigator: `Login` (schermata iniziale, header nascosto) → `MealsList` → `MealDetail`, più la route `Favorites`
- Deep linking configurato: prefisso `myapp://`, route `meal/:idMeal` e `favorites`

---

## Preferiti — AsyncStorage e Context (Lab 16–17)

- Chiave di storage: **`app:v1:favs`**, array di `idMeal` (stringhe)
- `services/storage.ts`: unico punto che tocca `AsyncStorage`, con validazione del JSON e reset automatico in caso di dati corrotti o chiave assente (mai un crash)
- `FavoriteButton`: componente "dumb" lato API esterna (riceve solo `idMeal`), ma legge `isFavorite`/`toggleFavorite` direttamente da `useFavorites()` — niente prop drilling
- `FavoriteContext.tsx`: `FavoriteProvider` carica i preferiti una sola volta al mount dell'app (`isLoading` finché la lettura non è completa) e li condivide tra `MealsListScreen`, `MealDetailScreen` e `FavoritesScreen` tramite l'hook `useFavorites()` — espone `favoriteIds`, `isLoading`, `isFavorite(idMeal)`, `toggleFavorite(idMeal)`
- Toggle sincronizzato su tutte e tre le schermate, nessun `useState` duplicato per i preferiti nelle screen
- `FavoritesScreen.tsx`: filtra `fetchItalianMeals()` per i soli `idMeal` presenti in `favoriteIds`, con edge case lista vuota gestito

---

## Login — AuthContext (Lab 11)

- `services/auth.ts`: array `MOCK_USERS` (3 utenti con email, password, nome, avatar) e `validateLogin(email, password)`, nessuna API esterna, login solo locale
- `AuthContext.tsx`: `AuthProvider` con stato `user` (`MockUser | null`), funzioni `login()` (ritorna `true`/`false`) e `logout()`, stesso pattern Provider/hook di `FavoriteContext`
- `App.tsx` avvolge l'app con `AuthProvider` esternamente a `FavoriteProvider`

---

## Edge case gestiti

- Errore di rete/HTTP sulla lista e sul dettaglio → messaggio + Retry
- Lista piatti vuota → messaggio dedicato
- `idMeal` mancante o non valido nel deep link → messaggio chiaro, niente crash
- Preferiti: chiave assente in AsyncStorage → array vuoto
- Preferiti: JSON corrotto o non valido → array vuoto, reset silenzioso senza crash
- Login: credenziali errate → messaggio chiaro, niente crash, nessuna navigazione

---

## Screenshot da inserire (consegna finale)

Segna ✅ quando hai inserito lo screenshot corrispondente in questo file o nel Google Doc.

- [ ] Login (form, errore credenziali) — *da fare dopo Lab 11*
- [ ] Header profilo con avatar + nome — *da fare dopo Lab 07/11*
- [ ] Login — form vuoto
- [ ] Login — errore credenziali sbagliate
- [ ] Lista piatti caricata (con pulsanti Lista/Preferiti)
- [ ] Ricerca/filtro sulla lista — *da fare*
- [ ] Dettaglio piatto
- [ ] Preferiti — lista senza preferiti (0, cuori vuoti) — già fatto in precedenza, da rifare con i nuovi pulsanti
- [ ] Preferiti — lista con preferiti persistiti dopo riavvio (cuori pieni)
- [ ] Schermata dedicata "I tuoi preferiti" (Lab 17) con piatti filtrati
- [ ] Schermata "I tuoi preferiti" — stato vuoto con messaggio dedicato
- [ ] Header profilo con avatar + nome utente — *da fare dopo Lab 07*
- [ ] Impostazioni (logout) — *da fare*
- [ ] Stato errore con Retry
- [ ] Accessibilità (almeno 2 accorgimenti — già presenti: `accessibilityLabel` su card, bottoni preferiti, Retry, campi login)
- [ ] Deep link aperto da URL esterno (`exp://.../--/meal/52772`)

---

## Prossimi passi

1. Icona profilo in alto a sinistra su `MealsListScreen`, che porterà a `ProfileScreen`
2. `ProfileScreen` con `Avatar` (componente Lab 07 da creare) + nome utente da `useAuth()`
3. `SettingsScreen` (correggere il nome file da `SetttingScreen.tsx`) con logout (`useAuth().logout()`)
4. Ricerca/filtro testuale sulla lista piatti
5. Pulizia file orfani (`src/HomeScreen.tsx`, `src/DetailScreen.tsx`)
6. README.md finale con istruzioni di installazione ed esecuzione