let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let adds = document.getElementById('adds');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogery = document.getElementById('catogery');
let submit = document.getElementById('submit');
let mode = "CREATE";
let tmp = 0;

/*   calculate the total*/
function getTotal() {
    if (price.value != ' ') {
        result = (+price.value + +taxes.value + +adds.value) - +discount.value;
        total.style.background = '#040';
        total.innerHTML = result;
    } else {
        total.innerHTML = " ";
        total.style.background = '#f10'
    }
}

/* Create the new record in array and local storage*/
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);

} else {
    dataPro = [];
}


submit.onclick= function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        adds: adds.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogery: catogery.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '') {


        if (mode === "CREATE") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }

            localStorage.setItem('product', JSON.stringify(dataPro));

            clearData();
            showData();

        } else {
            dataPro[tmp] = newPro;
            count.style.display = 'block';
            mode = "CREATE";
            submit.innerHTML = "CREATE";

            clearData();
            showData();
        }


    }
}


/**clear data only from the records */
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    adds.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catogery.value = '';

}

/**read the data from the array */
function showData() {

    getTotal();
    let table = ' ';
    for (let i = 0; i < dataPro.length; i++) {
        table += `  <tr>
        
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].adds}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td>${dataPro[i].total}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `

    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button  onclick="deleteAll()" id="deleteAll">delet ALL ( ${dataPro.length} )</button>`

    }
    else {
        btnDelete.innerHTML = '';
    }
}
showData();


/**delete the record     */

function deleteData(i) {

    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

/**update the fields & disable count & change buttun create to update*/

function updateData(i) {
    title.value = dataPro[i].title.toLowerCase();
    price.value = dataPro[i].price;
    adds.value = dataPro[i].adds;
    taxes.value = dataPro[i].taxes;
    catogery.value = dataPro[i].catogery.toLowerCase();
    count.style.display = 'none';

    getTotal();

    submit.innerHTML = "UPDATE";
    mode = "UPDATE";
    tmp = i;
    scroll({ top: 0 });
}

/**Search  */

let searchMode = 'title';

function getsearchMode(id) {
    let searchbtn= document.getElementById('search');

    if (id == "searchTitle") {
        searchMode = 'title';
    } else {
        searchMode = 'catogery';
    }
    searchbtn.focus();
    searchbtn.placeholder="seach by " + searchMode;
    searchbtn.value = '';
    showData();


}

function searchData(value) {
    let table = '';
    if (searchMode == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `  
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].adds}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td>${dataPro[i].total}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `
            }

        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].catogery.toLowerCase().includes(value.toLowerCase())) {
                table += `  
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].adds}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td>${dataPro[i].total}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `
            }

        }

    }

    document.getElementById('tbody').innerHTML = table;
}







