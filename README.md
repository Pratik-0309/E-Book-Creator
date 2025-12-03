# 🚀 E-Book-Creator: Your Easy AI Book Writer

Hello! This app, **E-Book-Creator**, is like having a helpful assistant that writes books with you.

It’s a complete tool that uses **Smart AI** and cool technology (**MERN stack**) to help you quickly create, design, and save professional-looking eBooks in just minutes.

Got an idea? Let's turn it into a beautiful book!

---

## ✨ What This App Can Do (Cool Features!)

### 🤖 Smart Writing & Ideas
* **Instant Plan (Outline):** Give it a topic, and the AI will create a complete book plan (chapter titles and ideas) right away. No more planning headaches!
* **Fast Drafting:** Need content? The AI can write the first draft of your chapters for you.
* **Easy Editing:** Use our simple, modern text box (like a smart notebook) to change the AI's words and add your own thoughts.

### 🎨 Design & Your Workspace
* **Custom Cover:** Upload your own great cover picture (JPEG, PNG) for your book.
* **Your Book Home:** A simple screen (Dashboard) to see, change, or delete all the books you've started.
* **Works Everywhere:** The app looks great and is easy to use on your phone, tablet, or computer.

### 📤 Saving & Sharing (Export)
When your book is finished, you can save it in the perfect format:
* **DOCX File:** Great if you need to keep editing it in Microsoft Word later.

---

## 🛠️ The Tech Stuff (How it's Built)

This app is a **MERN** project—that's a popular recipe for building modern apps. 



| Part of the App | Technology | Simple Explanation |
| :--- | :--- | :--- |
| **What You See** | **React.js** | Makes the pages fast, interactive, and pretty (the Frontend). |
| **The Server** | **Node.js** & **Express.js** | Handles all the requests and talks to the AI (the Backend). |
| **Saving Your Work** | **MongoDB** | A safe place to store all your book drafts and info. |
| **The Intelligence** | **Google Gemini API** (or similar) | This is the powerful brain that generates the content and ideas. |

---

## 🚀 How to Start Using It (Getting Set Up)

Want to run this app on your own computer? Follow these easy steps!

### What You Need First
* [Node.js](https://nodejs.org/) (The latest version is best)
* [MongoDB](https://www.mongodb.com/try/download/community) (To save your books)

### Step-by-Step Installation

1.  **Get the Code:**
    ```bash
    git clone [https://github.com/Pratik-0309/E-Book-Creator.git](https://github.com/Pratik-0309/E-Book-Creator.git)
    cd E-Book-Creator
    ```

2.  **Set up the Server (Backend):**
    ```bash
    cd backend
    npm install 
    # Create the secret key file (.env)
    touch .env 
    ```
    **Fill in your `backend/.env` file with these details:**
    ```env
    PORT=5000
    MONGO_URI=<Your database link/connection string>
    GEMINI_API_KEY=<Your key for the AI tool>
    JWT_SECRET=<A long, random secret password>
    ```
    Start the server:
    ```bash
    npm start
    ```

3.  **Set up the App (Frontend):**
    Open a *second* terminal window.
    ```bash
    cd ../frontend 
    npm install
    # Create the connection file (.env)
    touch .env
    ```
    **Fill in your `frontend/.env` file:**
    ```env
    VITE_BACKEND_URL=http://localhost:5000/api
    ```
    Start the app:
    ```bash
    npm run dev
    ```

You can now open your web browser and go to `http://localhost:5173` to see the app running!

---

## 💡 Quick Guide on How to Write!

1.  **Sign In:** Make an account so your book is saved safely.
2.  **New Book:** Click "New Book" and type in your main topic.
3.  **Get a Plan:** Click the **"AI Generate Outline"** button.
4.  **Write Drafts:** Click into a chapter and press **"AI Draft Content"** to get words on the page.
5.  **Make it Yours:** Use the editor to fix the words, add your voice, and make it perfect.
6.  **Download:** Hit the **DOCX** button to save your finished book!

---
