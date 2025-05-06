let data;
fetch('https://anapioficeandfire.com/api/books').then(response => {
    response.json().then(dataBook => {
        data = dataBook;
        console.log("data :", data);
    })
});
