import React, { useState } from 'react';
import Search from './component/search';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find Movies You'll Enjoy Without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  );
};

export default App;
