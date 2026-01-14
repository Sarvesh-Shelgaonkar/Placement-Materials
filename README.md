# 🚀 DSA Progress Tracker

A clean and fast web application to track your progress on 100 essential DSA problems. Built with React + Vite.

## ✨ Features

- ✅ **100 DSA Problems** - Curated list of important problems
- 📊 **Progress Tracking** - Mark problems as solved/unsolved
- 🔍 **Smart Filters** - Filter by topic and difficulty
- 📄 **Pagination** - Fast loading with 20 problems per page
- 💾 **Local Storage** - Your progress is saved automatically
- 📚 **Learning Resources** - Curated notes and study materials
- 🎨 **Clean UI** - Simple and intuitive interface
- 📱 **Responsive** - Works on all devices

## 🎯 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Local Storage** - Data persistence

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deploy on Render

### Method 1: Using GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Sarvesh-Shelgaonkar/DSA-OWN.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` config
   - Click **"Create Static Site"**
   - Your app will be live in a few minutes! 🎉

### Method 2: Manual Deploy

```bash
# Build the project
npm run build

# Upload the 'dist' folder to Render
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── data/           # DSA problems data
│   ├── hooks/          # Custom React hooks
│   └── App.jsx         # Main app component
├── public/             # Static assets
├── render.yaml         # Render deployment config
└── package.json        # Dependencies
```

## 🎨 Available Pages

- **Home (/)** - DSA problems list with filters
- **/notes** - Learning resources hub
- **/dsa-pdf-notes** - DSA study materials
- **/cpp-stl-notes** - C++ STL reference
- **/sql-notes** - SQL learning resources
- **/system-design-notes** - System design concepts
- **/core-subjects-notes** - CS fundamentals
- **/webdev-notes** - Web development resources

## 💡 Usage

1. **Browse Problems** - View all 100 DSA problems
2. **Filter** - Select topic or difficulty to filter
3. **Track Progress** - Click checkbox to mark solved
4. **View Resources** - Access learning materials in Notes section
5. **Progress Auto-Saved** - Everything saves in your browser

## 🔧 Configuration

### Change Problems Per Page

Edit `src/pages/DSAProblemsPage.jsx`:
```javascript
const problemsPerPage = 20; // Change this number
```

## 📝 License

MIT License - Feel free to use this for your own learning!

## 🤝 Contributing

This is a personal learning tracker, but feel free to fork and customize for your needs!

---

**Made with ❤️ for DSA learners**

Happy Coding! 💻
