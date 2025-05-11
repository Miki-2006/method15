export const getSynonymsFromDatamuse = async (word, setSynonyms) => {
    try {
        const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
        const data = await res.json();

        if (res.ok && data[0]) {
            setSynonyms(data.slice(0, 5))
        } else {
            console.log("Ошибка при поиске синонимов слова");
        }
    } catch (err) {
        console.log("Ошибка Datamuse", err);
    }
}

export const getSoundsLikeFromDatamuse = async (word, setSoundsLike) => {
    try {
        const res = await fetch(`https://api.datamuse.com/words?sl=${word}`)
        const data = await res.json();

        if (res.ok && data[0]) {
            setSoundsLike(data.slice(0, 5))
        } else {
            console.log("Ошибка при поиске sound like слова");
        }
    } catch (err) {
        console.log("Ошибка Datamuse", err);
    }
}

export const getStartWithFromDatamuse = async (word, setStartsWith) => {
    try {
        const res = await fetch(`https://api.datamuse.com/words?sp=${word.slice(0, 2)}*`)
        const data = await res.json();

        if (res.ok && data[0]) {
            setStartsWith(data.slice(0, 5))
        } else {
            console.log("Ошибка при поиске start with слова");
        }
    } catch (err) {
        console.log("Ошибка Datamuse", err);
    }
}