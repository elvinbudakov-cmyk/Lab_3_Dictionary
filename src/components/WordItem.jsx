
import { Link } from 'react-router-dom';

function WordItem({ word, search, onDelete, onEdit }) {
  function highlightText(text) {
    if (!search.trim()) {
      return text;
    }

    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeSearch})`, 'gi');

    const parts = text.replace(regex, '|||$1|||').split('|||');

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase()
        ? <mark key={index}>{part}</mark>
        : part
    );
  }

  return (
    <article className="word-item">
      <h3>{highlightText(word.word)}</h3>

      <p>{highlightText(word.definition)}</p>

      <Link to={`/words/${word.id}`}>
        Переглянути деталі
      </Link>

      <div>
        <button onClick={() => onEdit(word)}>
          Редагувати
        </button>

        <button onClick={() => onDelete(word.id)}>
          Видалити
        </button>
      </div>
    </article>
  );
}

export default WordItem;
