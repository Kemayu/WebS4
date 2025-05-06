let data ;
fetch('https://anapioficeandfire.com/api/').then( response => {
 response.json().then( dataBook => {
 data = dataBook;
 })
});
console.log(data);
