export const getDefinitionFromDictionaryApi = async (word, setDefinition, setError) => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();

      if (res.ok && data[0]?.meanings[0]?.definitions[0]) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
        
      } else {
        console.log("Ошибка при поиске слова");
        setError(true)
      }
    } catch (err) {
      console.log("Ошибка DictionaryApi", err);
    }
}