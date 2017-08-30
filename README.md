# Registration App

## What it does

  * takes in a car registration number and displays it customized
  * able to filter by the town name selected from the radio buttons
  * delete aregistration number
  
## Prerequisites

  * NodeJS
    >NodeJS
    
  * Git
    >Git

    
  * Robomongo
    >Robomongo
    
### Installing Node

  1. goto the [nodejs.org](https://nodejs.org) website to download the package. Make sure you click the right one for your Operating system.
  2. goto the folder where the downloaded file is saved,
      * **Windows OS** - run the installer and follow the prompts, make sure you accept the license, click next a bunch of times than wait for the installation to finish. Once finish you will need to restart your machine.
      * **Linux OS** - right click on the file and click `extract here`, it will create an unzipped folder of the file, go to the folder and open the bin folder, run node.
  3. in your terminal or cmd if you using windows, type the command `node -v` and press enter, you should something like `v4.2.6` which is the current version of your node

### Installing Git

  * if you are running a **Linux** OS in your terminal type `sudo apt-get install git` and press enter
  * if you are running a **Windows** OS, go to the [Git](https://git-scm.com/downloads) website and download the file, after download is finished, go to where the downloded file is saved and double click it, follow the prompts and wait for it to finish installing
  * once installation is finished, in your terminal or cmd type `git --version` and press enter it should print something like `git version 2.7.4`
  
### Installing Robomongo

1. go to the [Robomong](https://robomongo.org/) website and download the installer
2. go to the folder where the downloaded file is stored
3. on a **Linux** machine, right click on the folder and click `extract here` (windows users skip to step 4)
4. open the folder in it open the bin folder and run the Robomongo file

### Forking and Cloning the repository

1. goto the [repo](https://github.com/cale312/shoe_catalogue_api), fork it firts than click the `Clone or Download` button, you can either download the zip or click the clipboard icon to copy the file url
2. open your terminal or git bash if you are using a Windows machine
3. navigate to the folder you want to clone the repository in
4. type `git clone [paste the copied url]` then press enter
5. you should see the folder with all the files in it
* if you downloaded the zip file, just extract it where you want to store the folder

### Running the APP

1. open your terminal or git bash if you are using a Windows machine
2. navigate to the folder you cloned
3. type in the terminal `npm install` to install all the dependencies in the package.json file
	>Npm is a Node Package Manager which comes with installing the node package
4. once all packages have been installed type in `nodemon`, it should print something like `Our app is running on http://localhost:4000`
