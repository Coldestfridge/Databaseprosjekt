\subsection{Deployment}
The project uses XAMPP with phpMyAdmin as the database. XAMPP uses MySQL with MariaDB to build a functional database. XAMPP can be installed here: \texttt{https://www.apachefriends.org/}

\textbf{1. Clone the project}

If you have the source code, skip this step and follow from step 2.
Clone the program by using the following command:\\
\begin{minted}[bgcolor=code-bg, linenos, style=vs]{bash}
git clone git@gitlab.stud.idi.ntnu.no:eirikalv/idatg2204-group-01.git
\end{minted}

\textbf{2. Install required packages}

Once the project is cloned, you can open it in Visual Studio Code or another editor program and install the required packages. It is required to run \mintinline{text}{npm install} in both the \mintinline{text}{ElectroMart} folder and the \mintinline{text}{ElectroMart_backend} folder. You do this by running the following commands, assuming you are in the project root:
\begin{minted}[bgcolor=code-bg, linenos, style=vs]{bash}
cd ElectroMart
npm install
cd ElectroMart-backend
npm install
\end{minted}
This will install all the required packages by reading the package.json file.

\textbf{3. Initialize the database}

This step requires XAMPP to be installed and the MySQL database server and Apache server started.

Once the dependencies are installed, you need to set up the database by copying the contents of the DDL.sql file into phpMyAdmin (Everything can be pasted at once). This will create the tables, set up relations, and add in roles, views, and permissions. 

\textbf{4. Populate the database}

After the DDL.sql commands have been run, you need to insert data into the tables. Copy the contents in insertData.sql and paste them in phpMyAdmin. You should now see that data has been inserted into each table. Make sure that you are using the electromart database.

\textbf{5. Start the services}

When data is inserted you can finally run the project. This is done by opening two terminal windows either in your editor, or the terminal of your choice. 

One terminal window needs to run the backend, which can be done by using the following commands, assuming you are in the project root:
\begin{minted}[bgcolor=code-bg, linenos, style=vs]{bash}
cd ElectroMart/ElectroMart-backend
node server.js
\end{minted}

NB! The default port for our backend is 5000, this can cause some issues for MacOS, where the Airplay Receiver is listening on port 5000. To allow the backend to work, the port and its associated uses must be changed to another port.

The other terminal window is used to run the frontend; the following commands assume you are in the project root:
\begin{minted}[bgcolor=code-bg, linenos, style=vs]{bash}
cd ElectroMart
npm run dev
\end{minted}

\textbf{6. Access the webpage}

Once the frontend runs, you will get the localhost URL and port logged to the terminal window, which can be clicked or pasted in your browser to access the website. 
