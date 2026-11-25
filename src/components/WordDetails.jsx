
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WordForm from './WordForm';

function WordDetails({ words, onUpdateWord }) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const word = words.find((item) => String(item.id) === id);

  if (!word) {
    return (
      <section>
        <h2>Слово не знайдено</h2>
        <Link to="/">Повернутися до словника</Link>
      </section>
    );
  }

  function saveWord(updatedWord) {
    onUpdateWord(updatedWord);
    setIsEditing(false);
  }

  return (
    <section>
      <h2>{word.word}</h2>

      <h3>Визначення</h3>
      <p>{word.definition}</p>

      <h3>Приклад використання</h3>
      <p>{word.example || 'Приклад відсутній.'}</p>

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Скасувати' : 'Редагувати слово'}
      </button>

      {isEditing && (
        <WordForm
          editingWord={word}
          onAddWord={saveWord}
        />
      )}

      <p>
        <Link to="/">Повернутися до словника</Link>
      </p>
    </section>
  );
}

export default WordDetails;
