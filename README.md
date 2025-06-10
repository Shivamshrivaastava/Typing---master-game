# Typing Master Game 🚀

A beautiful, full-featured typing speed and accuracy game built with React, TypeScript, and Firebase. Test your typing skills across multiple difficulty levels and compete on global leaderboards!

![Typing Master Game](https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)
[live link](https://typing-master-the-game.netlify.app/)

## ✨ Features

### 🎯 Core Gameplay
- **Real-time typing test** with live WPM and accuracy tracking
- **Three difficulty levels**: Easy, Medium, and Hard
- **Diverse text samples** covering technology, science, philosophy, and more
- **Visual feedback** with color-coded character highlighting
- **Progress tracking** with character-by-character analysis

### 📊 Statistics & Analytics
- **Live statistics display** showing:
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Time elapsed
  - Character progress
- **Real-time updates** during typing sessions
- **Completion celebration** with final results

### 🏆 Leaderboard System
- **Global leaderboards** for each difficulty level
- **Anonymous user authentication** via Firebase
- **Automatic username generation** with fun typing-themed names
- **Score persistence** across sessions
- **Top 10 rankings** with beautiful rank indicators

### 🎨 Beautiful UI/Design
- **Modern gradient backgrounds** and smooth animations
- **Responsive design** that works on all devices
- **Hover effects and micro-interactions**
- **Clean, professional interface** with intuitive navigation
- **Color-coded difficulty selection**
- **Real-time visual feedback** during typing

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore + Authentication)
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project (optional - already configured)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd typing-master-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing!

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Select Difficulty**: Choose from Easy, Medium, or Hard difficulty levels
2. **Start Typing**: Click in the text input area and begin typing the displayed text
3. **Track Progress**: Watch your WPM, accuracy, and progress update in real-time
4. **Complete the Text**: Finish typing to see your final results and leaderboard ranking
5. **Try Again**: Reset and try a new text sample to improve your skills

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── DifficultySelector.tsx
│   ├── Leaderboard.tsx
│   ├── StatsDisplay.tsx
│   └── TypingArea.tsx
├── config/              # Configuration files
│   └── firebase.ts      # Firebase configuration
├── data/                # Static data
│   └── textSamples.ts   # Typing text samples
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Authentication hook
├── services/            # API services
│   ├── authService.ts   # Firebase auth service
│   └── leaderboardService.ts # Firestore operations
├── utils/               # Utility functions
│   └── typingCalculations.ts # WPM, accuracy calculations
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Configuration

### Firebase Setup
The app is pre-configured with Firebase, but you can update the configuration in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

### Adding New Text Samples
Add new typing texts in `src/data/textSamples.ts`:

```typescript
{
  id: 'unique-id',
  text: 'Your typing text here...',
  difficulty: 'easy' | 'medium' | 'hard',
  category: 'Category Name'
}
```

## 📊 Features in Detail

### Difficulty Levels
- **Easy**: Simple words and common sentences
- **Medium**: Complex sentences with varied vocabulary
- **Hard**: Technical terms and complex sentence structures

### Scoring System
- **WPM Calculation**: (Correct characters ÷ 5) ÷ (Time in minutes)
- **Accuracy**: (Correct characters ÷ Total typed characters) × 100
- **Real-time Updates**: Statistics update every second during gameplay

### User System
- **Anonymous Authentication**: Users are automatically signed in
- **Username Generation**: Fun, typing-themed usernames (e.g., "SwiftTyper123")
- **Score Persistence**: Scores are saved to Firebase Firestore

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. Key design elements:
- Gradient backgrounds: `bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`
- Card components with shadows and borders
- Hover effects and smooth transitions
- Responsive grid layouts

### Colors & Themes
- **Primary**: Blue tones for main actions
- **Success**: Green for correct typing
- **Error**: Red for mistakes
- **Warning**: Yellow/Orange for medium difficulty

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables if needed

### Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for backend services
- **Tailwind CSS** for beautiful styling
- **Lucide React** for clean, modern icons
- **Vite** for fast development experience
- **React** for the component architecture

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Happy Typing! 🎯** Improve your speed and accuracy with Typing Master!
