<p align="center">
  <img src="https://github.com/ozzs/musicPlayer/blob/main/assets/MonoBoxLogo.png" alt="MusicPlayerLogo" width="300">
  <br />

  <h4 align="center">A lightweight, self-hosted, ad-free player to play music from your local library on your mobile device, in a friendly and simple UI.</h4>
  <br />
</p>

<p align="center">
  <img alt="React-Native" src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img alt="Javascript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/-Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
  <img alt="SQLite" src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white" />
</p>

## Table of Content
- [Key Features](#key-features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [How to use](#how-to-use)
- [Support](#support)

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
* ``songs`` contains all the songs in the app library.
* ``sovers`` contains all the artworks of the songs in the ``songs`` folder.

Now you can copy all the songs you want to display in the app into the ``songs`` folder.

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
music_folder_url = "..\songs"
cover_folder_url = "..\covers"
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

## Support
The product is still in its initial stages, so we would really appreciate feedback and donations 😄 <br />
And don't forget to star us — it motivates us a lot! :star:

### Project resources
* <a href="https://github.com/ozzs/musicPlayer">Source Code</a>
* <a href="https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com">React-Query</a>
* <a href="https://sqlmodel.tiangolo.com">SQLModel</a>
* <a href="https://fastapi.tiangolo.com">FastAPI</a>
* <a href="https://react-native-track-player.js.org">React Native Track Player</a>

### Create a bug report or submit a feature request
If you see an error message or run into an issue, or maybe you have an idea, or you're missing a capability that would make development easier and more robust, please [create a bug report or submit feature request](https://github.com/ozzs/monobox/issues/new). <br /> <br />
If a similar feature request already exists, don't forget to leave a "+1".
If you add some more information such as your thoughts and vision about the feature, your comments will be embraced warmly 😃
