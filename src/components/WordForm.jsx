
import { useState, useEffect } from 'react';

function WordForm({ onAddWord, editingWord }) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingWord) {
      setWord(editingWord.word);
      setDefinition(editingWord.definition);
      setExample(editingWord.example);
      setError('');
    }
  }, [editingWord]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!word.trim() || !definition.trim()) {
      setError('Заповніть слово та його визначення!');
      return;
    }

    onAddWord({
      id: editingWord ? editingWord.id : crypto.randomUUID(),
      word: word.trim(),
      definition: definition.trim(),
      example: example.trim()
    });

    setWord('');
    setDefinition('');
    setExample('');
    setError('');
  }

  return (
    <section>
      <h2>
        {editingWord ? 'Редагувати слово' : 'Додати нове слово'}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введіть слово"
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />

        <textarea
          placeholder="Визначення слова"
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
        />

        <textarea
          placeholder="Приклад використання"
          value={example}
          onChange={(event) => setExample(event.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">
          {editingWord ? 'Зберегти зміни' : 'Додати слово'}
        </button>
      </form>
    </section>
  );
}

export default WordForm;
