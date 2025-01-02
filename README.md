
# Car Inventory System

## Overview
This project is a full-stack application designed to manage a car inventory. It includes:
- A **React** frontend for user interaction.
- A **Node.js** backend for API handling.
- An **MS SQL Server** database to store the car data.

This guide will explain step-by-step how to set up, run, and test the application.

---

## Prerequisites

Before starting, ensure the following tools are installed on your system:

### 1. Docker Desktop
- **Purpose**: Docker Desktop allows you to run applications in isolated containers.
- **How to Install**:
  1. Visit [Docker Desktop](https://www.docker.com/products/docker-desktop).
  2. Download and install Docker Desktop for your operating system (Windows or Mac).
  3. Follow the installation instructions provided on the website.
  4. **How to Verify**: Open Docker Desktop. You should see the Docker logo in your system tray or application bar. To confirm it works, open a terminal (Command Prompt or PowerShell) and type:
     ```
     docker --version
     ```
     If Docker is installed correctly, it will display the version number.

### 2. Git
- **Purpose**: Git allows you to clone the project repository from GitHub.
- **How to Install**:
  1. Visit [Git Downloads](https://git-scm.com/downloads).
  2. Download and install Git for your operating system.
  3. Follow the installation steps (keep the default options).
  4. **How to Verify**: Open a terminal and type:
     ```
     git --version
     ```
     If Git is installed correctly, it will display the version number.

### 3. Visual Studio Code (Text Editor)
- **Purpose**: Visual Studio Code (VS Code) allows you to view and edit project files.
- **How to Install**:
  1. Visit [Visual Studio Code](https://code.visualstudio.com/).
  2. Download and install the editor.
  3. Open the application and familiarize yourself with the interface.

### 4. Web Browser
- **Purpose**: A web browser like Google Chrome or Mozilla Firefox is required to access the frontend of the application.
- **How to Install**:
  - For Google Chrome, visit [Google Chrome](https://www.google.com/chrome/) and follow the download instructions.
  - For Mozilla Firefox, visit [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) and follow the download instructions.

---

## How to Start the Application

### Step 1: Clone the Repository
1. Open a terminal (Command Prompt or PowerShell). In Windows - open your Start Menu and search Command Prompt.
2. Navigate to the folder where you want to save the project. For example:
   ```
   cd C:\Users\Projects
   ```
3. Clone the repository by typing:
   ```
   git clone https://github.com/roiilan/car-inventory-demo.git
   ```
   
4. Navigate into the project folder:
   ```
   cd car-inventory-demo
   ```

### Step 2: Run the Application with Docker
1. Ensure Docker Desktop is running on your computer.
   - Open Docker Desktop from your Start Menu or Applications folder.
   - Wait until the Docker icon appears in the system tray, indicating it is active.

2. In the terminal (from step 1.4) , type:
   ```
   docker-compose up --build
   ```
   - This command will:
     - Build and start the **frontend**, **backend**, and **database**.
     - Automatically download any missing components.

3. **How to Verify**:
   - You will see messages in the terminal indicating the services are running.
   - Check that there are no error messages.

### Step 3: Access the Application
1. Open your web browser (Google Chrome or Mozilla Firefox).
2. To access the **frontend** (user interface), go to:
   ```
   http://localhost:3000
   ```
   You should see table with data.

3. To test the **backend API**, go to:
   ```
   http://localhost:5000/token
   ```
   You should see access token appear on the screen.


---

## How to Test the Application

### Fetch Data
1. Open the frontend at [http://localhost:3000](http://localhost:3000).
2. The table will display all car data stored in the database.

### Update Data
1. Double-click any cell in the table (except the `ID` column) to edit its value.
2. Press Enter to save your changes.


---

## Troubleshooting

### Common Issues:
1. **Docker is not running**:
   - Open Docker Desktop and ensure it is active.

2. **Port conflicts**:
   - If ports `3000` or `5000` are already in use, stop any other applications using these ports or change the ports in the `docker-compose.yml` file.

---


## How to Generate a New Token

This guide explains two ways to generate a new token: 
1. Using a web browser.
2. Using the Postman application.

### **Method 1: Using a Web Browser**

#### Step 1: Open Your Web Browser
1. Ensure you have a web browser installed, such as:
   - [Google Chrome](https://www.google.com/chrome/)
   - [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/)
2. Open the browser by clicking its icon in your Start Menu or Desktop.

#### Step 2: Navigate to the Token URL
1. In the browser's address bar (at the top of the window), type the following URL:
   ```
   http://localhost:5000/token
   ```
2. Press Enter.

#### Step 3: View the Token
1. The browser will display a new token on the screen.
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTYwOTc3NzIwMH0.sQxHoXaZBAsTJsVLOzQ2LE2A4z5Xkd6OwDjSezd3e6g`
2. Copy the token by selecting it with your mouse, right-clicking, and choosing "Copy."



### **Method 2: Using Postman**

#### What is Postman?
Postman is a tool that allows you to send requests to your application's backend and see the responses.

#### Step 1: Install Postman
1. Go to the [Postman website](https://www.postman.com/downloads/).
2. Download and install the application for your operating system.
3. Open Postman by clicking its icon in your Start Menu or Applications folder.

#### Step 2: Create a New Request
1. In Postman, click the **"New"** button at the top-left corner.
2. Select **"Request"** from the dropdown.

#### Step 3: Configure the Request
1. In the new request window:
   - Select **GET** as the request type (dropdown on the left).
   - In the request URL field, type:
     ```
     http://localhost:5000/token
     ```
2. Click the **"Send"** button on the right side of the request window.

#### Step 4: View and Copy the Token
1. In the response section below, you will see the token returned by the backend.
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTczNTcyNzkyMCwiZXhwIjoxNzY3MjYzOTIwfQ.zElFwAZ7VYvMG5OzZcQRYksaxc7U2KuPGjvWoYUNhT8`
2. Copy the token:
   - Select the token text with your mouse.
   - Right-click and choose **"Copy"**.

---

## **Where to Use the Token**
- Paste the token in the **Authorization** header when making requests to the backend API.
- For example, if you're testing the `/cars` API, include the token in the request header as follows:
   ```
   Authorization: Bearer <your-token>
   ```

---

## Sample JWT Token
Use the following JWT token for testing API requests:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTczNTcyNzkyMCwiZXhwIjoxNzY3MjYzOTIwfQ.zElFwAZ7VYvMG5OzZcQRYksaxc7U2KuPGjvWoYUNhT8
```
---


## Additional Help
If you encounter any issues or need further assistance, please contact the project owner - Roi Ilan.
To hire my programming services, please contact at the email address roiilan23@gmail.com.