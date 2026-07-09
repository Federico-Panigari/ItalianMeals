# 🍝 Italian Meals App

**Progetto finale — React Native / Expo**
**Autore:** Federico Panigari
**Corso:** React Native — Web & Mobile app developer

---

## 📱 Descrizione

Italian Meals App è un'applicazione mobile realizzata con **Expo / React Native** che permette di esplorare piatti italiani tramite le API di [TheMealDB](https://www.themealdb.com/), salvare i preferiti, gestire il proprio profilo e personalizzare l'interfaccia con tema chiaro/scuro.

L'app integra le competenze dei laboratori 01–19: navigazione, REST API, AsyncStorage, Context globale, accessibilità e UI responsive.

---

## 🚀 Come installare e avviare il progetto

### Prerequisiti

- [Node.js LTS](https://nodejs.org/) (v18 o superiore)
- [Expo Go](https://expo.dev/go) installato sul dispositivo mobile (Android o iOS), oppure un emulatore Android/iOS configurato
- Git

### Passi

```bash
# 1. Clona il repository
git clone <url-repo>

# 2. Entra nella cartella del progetto
cd ItalianMeals

# 3. Installa le dipendenze
npm install

# 4. Avvia il progetto
npx expo start
```

Dopo aver avviato il progetto:
- Premi `a` per aprire su emulatore **Android**
- Premi `i` per aprire su simulatore **iOS**
- Scansiona il **QR code** con l'app **Expo Go** sul tuo dispositivo reale

---

## 🔑 Utenti mock per il login

L'autenticazione è locale (nessuna API esterna). Usa uno di questi utenti per accedere:

| Nome | Email | Password |
|---|---|---|
| Mario Rossi | mario.rossi@student.it | React2026! |
| Giulia Bianchi | giulia.bianchi@student.it | Expo2026! |
| Luca Verdi | luca.verdi@student.it | Mobile2026! |

---

## 🌐 Endpoint API utilizzati

Documentazione completa: [https://www.themealdb.com/documentation](https://www.themealdb.com/documentation)
Riferimento endpoint: [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)

| Endpoint | URL | Utilizzo |
|---|---|---|
| Lista piatti italiani | `GET https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian` | Schermata lista piatti |
| Dettaglio piatto | `GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}` | Schermata dettaglio |

> **Nota:** API gratuita per uso didattico. Test key: `1` (già inclusa negli URL).

---

## 🔗 Deep Linking

### Configurazione

Il deep linking è configurato in `src/navigation/AppNavigator.tsx` con i seguenti path:

| Route | Path |
|---|---|
| Lista piatti | `home` |
| Dettaglio piatto | `meal/:idMeal` |
| Preferiti | `favorites` |
| Profilo | `profile` |

### Prefixes configurati

```
italianmeals://
exp://<ip>:<porta>/--/
```

### Comando di test (Expo Go su emulatore Android)

Con Metro avviato e l'app aperta sulla schermata lista, esegui in un terminale separato:

```bash
# Apre il dettaglio del piatto con idMeal 52772 (Lasagne)
npx uri-scheme open "exp://10.0.2.2:8081/--/meal/52772" --android

# Con l'IP della tua macchina (sostituisci con il tuo)
npx uri-scheme open "exp://192.168.1.x:8081/--/meal/52772" --android
```

> **Validazione deep link:** se `idMeal` è mancante o non valido, l'app mostra un messaggio chiaro senza crash.

---

## 🗂️ Struttura del progetto

```
src/
  components/       Avatar, FavoriteButton, PrimaryButton
  context/          AuthContext, FavoriteContext, ThemeContext
  navigation/       AppNavigator (Stack + deep linking)
  screens/          Login, MealsList, MealDetail, Favorites, Profile, Settings
  services/         auth.ts, mealsApi.ts, storage.ts
  theme/            colors.ts (token + lightTheme/darkTheme), styles.ts
  types/            meal.ts
App.tsx             ThemeProvider > AuthProvider > FavoriteProvider > AppNavigator
```

---

## 🧠 Scelta dello stato globale e motivazione

Il progetto usa **React Context** (pattern insegnato nel Lab 17) per tre contesti distinti:

| Context | Cosa gestisce |
|---|---|
| `AuthContext` | Utente loggato (`user`, `login()`, `logout()`) |
| `FavoriteContext` | Preferiti (`favoriteIds`, `isFavorite()`, `toggleFavorite()`) con persistenza AsyncStorage (`app:v1:favs`) |
| `ThemeContext` | Tema light/dark (`theme`, `toggleTheme()`) con persistenza AsyncStorage (`app:v1:theme`) |

**Perché Context e non Redux/Zustand:**
Il Lab 17 insegna "parti da Context — è sufficiente quando 2-3 schermate condividono lo stesso valore". L'app ha esattamente questa dimensione: 3 stati globali (auth, preferiti, tema), ognuno consumato da 2-4 schermate. Context mantiene l'API piccola e non introduce dipendenze esterne. Si passerebbe a Zustand solo se l'app crescesse significativamente e si manifestassero problemi di re-render o debug difficili.

---

## ⚠️ Edge case gestiti

| Scenario | Comportamento |
|---|---|
| **Errore di rete** sulla lista o dettaglio | Messaggio "Caricamento fallito. Controlla la connessione." + pulsante **Retry** |
| **HTTP non-2xx** dalla API | `res.ok` controllato, errore lanciato esplicitamente (mai "success" silenzioso) |
| **Lista piatti vuota** (API ritorna `null`) | Messaggio "Nessun piatto italiano disponibile" |
| **Login fallito** (credenziali errate) | Messaggio "Email o password non validi", mostrato solo dopo il submit, nessuna navigazione |
| **idMeal mancante** nel deep link | Messaggio "ID piatto non valido." senza crash |
| **idMeal non trovato** nel dettaglio | Messaggio "Piatto non trovato" senza crash |
| **Preferiti vuoti** in FavoritesScreen | Messaggio "Nessun preferito ancora. Tocca ♡ su un piatto dalla lista." |
| **Chiave AsyncStorage assente** (primo avvio) | Array vuoto restituito di default |
| **JSON corrotto** in AsyncStorage | Reset silenzioso a array vuoto, mai un crash |
| **Immagine avatar non caricabile** | Fallback con testo "?" nel componente Avatar |
| **Profilo senza utente** | Messaggio "Nessun utente loggato." senza crash |
| **Font scaling grande** (accessibilità Android) | `maxFontSizeMultiplier={1.4}` sui titoli, `numberOfLines={2}` sulle card |

---

## ♿ Accessibilità

- `accessibilityLabel` su tutte le card, pulsanti Retry, FavoriteButton, Avatar e campi login
- `accessibilityRole="button"` su `Pressable` interattivi
- `accessibilityRole="header"` sui titoli principali
- `maxFontSizeMultiplier={1.4}` per proteggere il layout con font grandi
- Feedback visivo alla pressione con `opacity: 0.7` su `pressed`
- Contrasto testo/sfondo verificato in entrambi i temi (light e dark)

---

## 🎨 Tema light / dark

Il tema si attiva dallo **Switch** in Impostazioni. La scelta persiste al riavvio dell'app tramite AsyncStorage (`app:v1:theme`). Tutti i colori dell'app usano `theme.colors.*` da `ThemeContext` — nessun colore hardcoded nei componenti.

---

## 📸 Screenshot laboratori

> Link Google Doc (screenshot Lab 13–22):
> [https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.0#heading=h.wu29v8o1b6lm](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.0#heading=h.wu29v8o1b6lm)

---

## 📦 Dipendenze principali

| Pacchetto | Versione | Utilizzo |
|---|---|---|
| `expo` | ~54.0.33 | Framework principale |
| `react-native` | 0.81.5 | UI nativa |
| `@react-navigation/native` | ^7.3.1 | Navigazione |
| `@react-navigation/native-stack` | ^7.17.3 | Stack Navigator |
| `@react-native-async-storage/async-storage` | 2.2.0 | Persistenza locale |
| `expo-linking` | ~8.0.12 | Deep linking |
| `react-native-reanimated` | ~4.1.1 | Animazioni |

---

## 📝 Note

- La sessione utente **non persiste** al riavvio dell'app (solo in memoria con `useState`) — al refresh si torna al login
- Il tema e i preferiti **persistono** al riavvio tramite AsyncStorage
- L'API TheMealDB è gratuita per uso didattico, non richiede autenticazione





