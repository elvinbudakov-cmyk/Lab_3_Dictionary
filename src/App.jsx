
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WordList from './components/WordList';
import WordForm from './components/WordForm';
import WordDetails from './components/WordDetails';

const initialWords = [
  {
    id: '1',
    word: 'Алгоритм',
    definition: 'Послідовність дій для розв’язання задачі.',
    example: 'Алгоритм сортування впорядковує дані.'
  },
  {
    id: '2',
    word: 'Компонент',
    definition: 'Незалежна частина інтерфейсу користувача.',
    example: 'Компонент React відображає інформацію.'
  },
  {
    id: '3',
    word: 'Програмування',
    definition: 'Процес створення комп’ютерних програм.',
    example: 'Програмування дозволяє автоматизувати задачі.'
  }
];

function App() {
  const [words, setWords] = useState(() => {
    try {
      const saved = localStorage.getItem('dictionaryWords');
      return saved ? JSON.parse(saved) : initialWords;
    } catch {
      return initialWords;
    }
  });

  const [search, setSearch] = useState('');
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    localStorage.setItem('dictionaryWords', JSON.stringify(words));
  }, [words]);

  function updateWord(updatedWord) {
    setWords(words.map((item) =>
      item.id === updatedWord.id ? updatedWord : item
    ));
  }

  function addWord(newWord) {
    if (editingWord) {
      updateWord(newWord);
      setEditingWord(null);
    } else {
      setWords([...words, newWord]);
    }
  }

  function deleteWord(id) {
    if (window.confirm('Видалити це слово?')) {
      setWords(words.filter((item) => item.id !== id));
    }
  }

  function editWord(word) {
    setEditingWord(word);
    window.scrollTo(0, 0);
  }

  const filteredWords = words
    .filter((item) =>
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.word.localeCompare(b.word, 'uk'));

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <WordForm
                  onAddWord={addWord}
                  editingWord={editingWord}
                />

                <h2>Пошук слова або визначення</h2>

                <input
                  type="text"
                  placeholder="Введіть слово або частину визначення..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <WordList
                  words={filteredWords}
                  search={search}
                  onDelete={deleteWord}
                  onEdit={editWord}
                />
              </>
            }
          />

          <Route
            path="/words/:id"
            element={
              <WordDetails
                words={words}
                onUpdateWord={updateWord}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
