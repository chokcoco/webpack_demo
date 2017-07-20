function deepCopy(obj) {
	var newObj = obj.constructor === Array ? [] : {};

	for (var key in obj) {
		newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
	}	

	return newObj;
}

function isRotateStr(bar, foo) {
	if(bar.length != foo.length) {
		return false;
	}

	var baz = bar + bar;

	if(baz.indexOf(foo) != -1) {
		return true
	}else {
		return false
	}
}

function strSort(str) {
	return str.split("").sort((a, b) => a.charCodeAt() > b.charCodeAt()).join("");
}

function split(str, boz) {
	var arr = [];
	var bozLength = boz.length;
	var pointer = 0;

	while(str.indexOf(boz) != -1) {
		var index = str.indexOf(boz);
		arr.push(str.substr(pointer, index));
		str = str.slice(index + bozLength);
	}

	arr.push(str);

	return arr;
}

function searchClass(element) {
    let classes = [];

    if(element.getAttribute('class')) {
        arr = arr.concat(element.getAttribute('class').split(' '));
    }

    Array.prototype.slice.call(element.children).forEach((elem) => {
        searchClass(elem);
    });

    return new Set(arr);
}