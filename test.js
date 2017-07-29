const createTable = function(item, length) {
  let table = new Array(length);
  table[0] = 0;

  for(let i = 1; i < length; i++) {
    var section = item.substring(0, i + 1);
    var sectionLength = section.length;
    var val = 0;

    for(let j = sectionLength - 1; j > 0; j--) {
    	const prefix = section.substring(0, j);
      const suffix = section.slice(-j);
      if(prefix === suffix) {
      	val = prefix.length;
        break;
      }
    }

    table[i] = val;
  }

  return table;
}

const search = function(item, str, table) {
	const m = item.length;
  const n = str.length;
  const searchable = n - m + 1;

  let match = false;

  for(let i = 0; i < searchable; i++) {
  	let partial = "";

  	for(let j = 0; j < m; j++) {
    	const char = item[j];
    	if(char === str[i + j]) {
      	match = true;
        partial += char;
      } else {
      	match = false;
        break;
      }
    }

  	const partialLength = partial.length;
    let tableValue = undefined;
    let skip = 0;
    if(match === true) {
    	break;
    } else if(partialLength !== 0 && (tableValue = table[partialLength - 1]) > 0 && (skip = partialLength - table[partialLength - 1]) > 0) {
    	i += skip;
    }
  }

  return match;
}

const search = function(item, strings) {
  let results = [];

  for(let i = 0; i < strings.length; i++) {
    if(search(item, strings[i]) === true) {
      results.push(i);
    }
  }

  return results;
}
