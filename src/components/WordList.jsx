
import WordItem from './WordItem';

function WordList({ words, search, onDelete, onEdit }) {
  return (
    <section className="word-list">
      <h2>Список слів</h2>

      {words.length === 0 ? (
        <p>Слів не знайдено.</p>
      ) : (
        words.map((word) => (
          <WordItem
            key={word.id}
            word={word}
            search={search}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </section>
  );
}

export default WordList;
