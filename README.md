# Fast Food - Meat Your Maker

## Overview
This project is a fast food delivery service that would allow people to order and pay for food the easy way. Through this app, you can order, not just preset menu items, but also create your own!
The main user of the app is the customer, but the app also supports admin accounts with their own special privileges.

## Running the app
#### Steps:
1. Download and install, and then start MongoDB Compass: https://www.mongodb.com/products/tools/compass
2. Launch Git Bash
3. Clone the repository
   ```bash  
   git clone https://github.com/Rei0101/oarwa-projekt-ff.git
   cd oarwa-projekt-ff
   ```
4. Open the project in Visual Studio Code
   ```bash  
   code .
   ```
6. Create a .env file in the root directory, based on the provided .env.example. Update the variables to match your local setup.
7. Open the terminal and install dependencies
   ```bash  
   npm install
   ```
8. Seed the database with dummy data (optional)
   ```bash  
   npm run seed
   ```
9. Run app client and server concurrently
   ```bash  
   npm run dev
   ```
