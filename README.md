# Idea Sanctuary

![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)

A playful, tactile Markdown-compatible note-taking application designed for capturing thoughts with a premium masonry experience. This project was developed as part of my personal portfolio to demonstrate advanced CSS layout techniques and robust browser-native persistence.

## 🚀 Features

- **Persistent Storage:** Seamlessly reads and writes to the browser's `localStorage` utilizing `useEffect` synchronization.
- **Masonry Grid Layout:** Employs advanced modern CSS properties (`column-count`, `break-inside: avoid`) to render notes identically to Google Keep or Pinterest.
- **Note Customization:** Users can color-code notes (Yellow, Blue, Green, Pink) and pin important thoughts to the top of the grid.
- **Seamless Editing:** A beautifully blurred modal intercepts edit events. Using `useRef`, the modal automatically focuses the title input upon opening.
- **Instant Search:** Leverages `useMemo` to filter notes by title or content instantly as the user types.

## 🛠️ Technologies Used

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (Masonry Utilities & Complex Modals)
- **Icons:** Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lakipop/Idea-Sanctuary.git
   cd Idea-Sanctuary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Developer:** LakiDev (LSR Vidanaarachchi)<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*A Personal Portfolio Project*
