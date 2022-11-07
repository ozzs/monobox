<p align="center">
  <img src="https://github.com/ozzs/musicPlayer/blob/main/assets/MonoBoxLogo.png" alt="MusicPlayerLogo" width="300">
  <br />
</p>

<h4 align="center"> A lightweight, self-hosted, ad-free player to play music from your local library on your mobile device, in a friendly and simple UI. </h4>
<br />

## Table of Content
- [Key Features](#key-features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Key Features
* Simple & Easy to use music player
* Listen from your local library
* Create and customize your own playlists
* Open Source Code:
  - Frontend: React-Native with TypeScript and Node.js
  - Backend: Python with SQLModel and FastAPI
* Dark / Light themes
* No ads

## Installation
First and foremost, make sure your mobile device and PC are using the same wireless network, 
otherwise the application will not be able to communicate with the server running on the computer.
<br /> <br />
Then, in the root of the project, create 2 folders: 
* ``Songs`` contains all the songs in the app library.
* ``Covers`` contains all the artworks of the songs in the ``Songs`` folder.

Now you can copy all the songs you want to display in the app into the ``Songs`` folder.

### Backend Setup
From the root, you need to navigate to the ``backend`` folder. from your terminal:
```
cd backend
```

The ``requirements.txt`` file lists all the Python libraries that the music player depends on, and they can be installed from your terminal using:
```
pip install -r requirements.txt
```

Then, in the ``main.py`` file, you have this block of code, where you need to insert your PC's IP address (notice the comment):
```python
host_ip = "0.0.0.0" # Change to your PC's IP
host_port = 5000
music_folder_url = "..\Songs"
cover_folder_url = "..\Covers"
```
The default port is 5000, but you can also change it if you want the server to listen to a different port, 
although it is required to change this in the Frontend as well.
<br /> <br />
Finally, run the following command from your terminal to set up your server and create your database:
```
python main.py
```

### Frontend Setup
After setting up the Backend, open a new terminal for the Frontend.
<br />
The ``package.json`` file lists all the React / React-Native libraries that the music player depends on, so let's install them from the terminal using:
```
npm install
```

In order for the application to communicate with the server in the Backend, we need to insert the PC's IP address to the Frontend as well.
<br />
So now we need to navigate to the ``mobile/utils`` folder from the root of the project, and then to the ``BaseAPI.tsx`` file.
<br />
Inside ``BaseAPI.tsx`` you have the following block of code, where you need to insert the same IP address as you did in the Backend (notice the comment):
```js
export const BASE_API_URL = '0.0.0.0' // Change to your PC's IP
export const BASE_API_PORT = 5000
```
If you decided to change the default port in ``main.py``, this is the place to change it as well.
<br /> <br />
Now you're all set!
<br />
You are welcome to try the application yourself or continue to the next section to learn about its features and how to use it.

## How To Use

### Project resources
* <a href="https://github.com/ozzs/musicPlayer">Source Code</a>

### Create a bug report

### Submit a feature request
