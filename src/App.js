import React, { useState, useEffect } from "react";
import api from './services/api'
import Repository from './components/Repository'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response =  await api.post('/repositories', {
      title: "Repositório do Node",
      url: "https://github.com/nodejs/node",
      techs: ["Node.js", "Javascript"]
    })
    const newRepository = response.data
    setRepositories([...repositories, newRepository])
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <Repository/>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
