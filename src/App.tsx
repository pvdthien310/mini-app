import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { gapi } from 'gapi-script';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const CLIENT_ID = window._env_.CLIENT_ID;
  const SPREADSHEET_ID = window._env_.SPREADSHEET_ID;
  const RANGE = 'Sheet1!A1'; // Or append mode: 'Sheet1'
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
          ],
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          console.log(authInstance);
          setIsSignedIn(authInstance.isSignedIn.get());
        });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleAddRow = async () => {
    const values = [['John Doe', 'johndoe@example.com', '2025-04-04']];
    const body = {
      values,
    };

    await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: body,
    });

    alert('Row added!');
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR 1
        </p>
      </div>
      <div>
        <h1>Google Sheets Writer</h1>
        {!isSignedIn && (
          <button onClick={handleLogin}>Login with Google</button>
        )}
        {isSignedIn && <button onClick={handleAddRow}>Add Row</button>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
