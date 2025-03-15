Info Page - Next.js & Contentful Integration

This project is a Next.js application that dynamically fetches and displays content from Contentful. It features a collapsible text structure with sectioned content, basic styling, and optional animations.

Features

📡 Contentful Integration: Fetches entries from Contentful using environment variables.

🔍 Dynamic Content Parsing: Splits fetched data into structured sections with headings and content.

🎛 State Management: Uses useState for tracking content and expanded sections.

🎥 Expandable Sections: Includes a commented-out GSAP animation for smooth section expansion.

🎨 Basic Styling: Utilizes info.module.css for layout and design.

Project Structure

📂 pages/
 ├── 📄 info/page.js   # Main component fetching and rendering Contentful data
📂 styles/
 ├── 🎨 info.module.css  # Styling for the info page
📄 .env.local.example  # Example for setting up Contentful API keys

Installation & Setup

1️⃣ Clone the Repository



npm install
# or
yarn install

3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory and add your Contentful API keys:

NEXT_PUBLIC_CONTENTFUL_SPACE=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token

4️⃣ Run the Development Server

npm run dev
# or
yarn dev

Visit http://localhost:3000 in your browser.


Contributing

Feel free to fork this repository, submit issues, or open pull requests. Contributions are always welcome!

License

This project is licensed under the MIT License.

