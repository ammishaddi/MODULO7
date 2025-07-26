import { useState } from 'react';

const Ollama = () => {
  
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  
  const askOllama = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  setLoading(true);
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({
      model:"deepseek-r1:1.5b",
      prompt: input,
      stream: false,
      })
    });
    const data = await res.json();
    setResponse(data.response);
  } catch (error) {
    console.error('Error:', error);
    setResponse('Falló la conexión con Ollama');
  } finally {
    setLoading(false);
  }
};


  return (
     <section>
      <form onSubmit={askOllama}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="¿Qué estás pensando?"
          disabled={loading}
        />
        <button disabled={loading}>
          {loading ? 'Pensando...' : 'Preguntar'}
        </button>
      </form>

      {loading && <p>Consultando a DeepSeek...</p>}

      {response && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>
      )}
    </section>
  );
};

export default Ollama;