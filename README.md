# Todo Lite – React + Vite + TypeScript

En liten webbapplikation för att hantera att-göra-listor. Projektet är byggt i **React** med **Vite** och **TypeScript** och innehåller både enhets- och integrationstester med **Vitest** och **Testing Library**.

## ✨ Funktioner
- Lägg till nya todos
- Markera som klara/avmarkera (toggle)
- Filtrera på **Alla**, **Öppna** eller **Klart**
- Ta bort en todo
- Lagring i `localStorage`

## 📂 Struktur
```
src/
  App.tsx              // Huvudkomponent
  components/
    TodoForm.tsx       // Formulär för att lägga till todo (enhetstestas)
    TodoList.tsx       // Lista över todos (rendering och props)
  lib/
    storage.ts         // Wrapper för localStorage (mockas i tester)
  types.ts             // Typdefinition för Todo
  test/
    setup.ts           // Setup för Vitest och jest-dom
    TodoForm.unit.test.tsx
    App.integration.test.tsx
    App.branches.integration.test.tsx
    storage.unit.test.tsx
```

## 🛠️ Installation
Kräver Node 18+ och npm.

```bash
git clone https://github.com/<ditt-namn>/todo-lite.git
cd todo-lite
npm install
```

## 🚀 Köra applikationen
```bash
npm run dev
```

Öppna sedan [http://localhost:5173](http://localhost:5173).

Bygga för produktion:
```bash
npm run build
npm run preview
```

## 🧪 Testning
Kör tester:
```bash
npm run test
```

Kör tester med coverage:
```bash
npm run coverage
```

### Teststrategi
- **Enhetstest**: `TodoForm` testas för validering, onAdd-callback och reset av input.
- **Integrationstest**: `App` testas end-to-end (lägg till, toggle, filter, delete).
- **Branch coverage**: extra tester täcker alla grenar i `App.tsx` och `storage.ts`.
- **Mockning**: `localStorage` och `crypto.randomUUID` mockas för förutsägbara tester.

## ✅ Kravuppfyllnad
- [x] Minst två komponenter (`TodoForm`, `TodoList`)
- [x] Enhets- och integrationstester
- [x] Code coverage **100%**
- [x] Git & GitHub används (commit-historik, branches, push)
- [x] README.md finns
- [x] Inlämning i tid
- [x] Presentation förberedd

## 💡 Reflektion
Jag valde en Todo-applikation eftersom det är ett tydligt exempel för att visa:
- **Prop-integration** mellan komponenter (form → app → lista).
- **Mockning** av beroenden (lagring, UUID).
- **Tester** som täcker alla grenar (validering, tom input, JSON-fel, filterlogik).

Det jag lärde mig mest på var att skriva tester för branch-coverage och att mocka `crypto.randomUUID` för att kunna skriva deterministiska integrationstester.

## 📦 Tekniker
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [jest-dom](https://github.com/testing-library/jest-dom)
