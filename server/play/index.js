// List API
// list controller
// feature : Pagination, sort, search, filter

const d = [{ id: "raktim shreshta" }, { id: 12 }, { id: 3 }, { id: 4 }];

// Pagination
limit = 2;
page = 1;

const startIndex = (page - 1) * limit; //0
const endIndex = startIndex + limit;
const result = d.slice(startIndex, endIndex);
console.log(result);

// Sort
const ageSorter = (a, b) => a - b;
d.sort(ageSorter);

// Search
const id = 1;
const searchResult = d.find((data) => data.id === id);
console.log(searchResult);
