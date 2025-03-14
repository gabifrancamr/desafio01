import { useState } from 'react'
import './App.css'

function App() {
  const [method, setMethod] = useState('get')
  const [showResult, setShowResult] = useState(false)
  const [urlGet, setUrlGet] = useState('https://jsonplaceholder.typicode.com/posts/1')

  const [urlPost, setUrlPost] = useState('https://jsonplaceholder.typicode.com/posts')
  const [headerContent, setHeaderContent] = useState('{"Content-Type":"application/json"}')

  const [bodyContent, setBodyContent] = useState('{"title": "Meu primeiro POST","body": "Estou enviando dados para a API","userId": 1}')

  const [result, setResult] = useState('')
  const [headers, setHeaders] = useState('')
  const [erro, setErro] = useState('')

  function handleChangeMethod() {
    if (method === 'get') {
      setMethod('post')
    } else {
      setMethod('get')
    }
  }

  async function handleSendRequests(e) {
    e.preventDefault()

    try {
      if (method === 'get') {
        const response = await fetch(urlGet, {
          method: method.toUpperCase(),
          headers: JSON.parse(headerContent)
        })

        const data = await response.json()
        setHeaders(Object.fromEntries(response.headers.entries()))
        setResult(data)
      } else {
        const response = await fetch(urlPost, {
          method: method.toUpperCase(),
          headers: JSON.parse(headerContent),
          body: JSON.stringify(JSON.parse(bodyContent))
        });

        const data = await response.json();
        setHeaders(Object.fromEntries(response.headers.entries()));
        setResult(data);
      }
    } catch (error) {
      setErro(error.message)
      setResult('')
    }

    setShowResult(true)
  }

  function handleChangeUrlGet(e) {
    setUrlGet(e.target.value)
  }

  function handleChangeUrlPost(e) {
    setUrlPost(e.target.value)
  }

  function handleChangeHeaderContext(e) {
    setHeaderContent(e.target.value)
  }

  function handleChangeBodyContext(e) {
    setBodyContent(e.target.value)
  }


  return (
    <div>
      {!showResult ? (
        <div>
          <h1>Cliente HTTP Personalizado</h1>

          <form onSubmit={handleSendRequests}>
            <div className='method'>
              <span>Método:</span>
              <select value={method} onChange={handleChangeMethod} name="metodos-http" id="metodos">
                <option value="get">GET</option>
                <option value="post">POST</option>
              </select>
            </div>

            <div>
              <label htmlFor="url">URL:</label>
              <input
                type="text"
                name="url"
                id="url"
                required
                placeholder='Digite a URL'
                value={method === 'get' ? urlGet : urlPost}
                onChange={method === 'get' ? handleChangeUrlGet : handleChangeUrlPost} />
            </div>

            <div>
              <label htmlFor="headers">Headers (JSON):</label>
              <textarea
                name="headers"
                id="headers"
                required
                rows="10"
                value={headerContent}
                onChange={handleChangeHeaderContext} />
            </div>

            {method === 'post' && (
              <div>
                <label htmlFor="body">Corpo da Requisição (JSON - Apenas para POSTs):</label>
                <textarea
                  name="body"
                  id="body"
                  required
                  rows="10"
                  value={bodyContent}
                  onChange={handleChangeBodyContext} />
              </div>
            )}

            <button type="submit">Enviar requisição</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Resposta</h2>
          {erro ? (
            <p style={{ color: 'red' }}>{erro}</p>
          ) : (
            <div>
              <p><strong>Método:</strong> {method.toUpperCase()}</p>
              <p><strong>Status:</strong> 200</p>
              <p><strong>Headers:</strong></p>
              <pre>{JSON.stringify(headers, null, 2)}</pre>
              <p><strong>Body:</strong></p>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
          <button type="button" onClick={() => setShowResult(false)}>Fazer outra requisição</button>
        </div>

      )
      }

    </div >
  )
}

export default App
