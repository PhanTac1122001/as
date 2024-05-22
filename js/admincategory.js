// const listProduct = [
//     {
//         id: 1,
//         name: "áo trắng",
//         size: "XL",
//         price: 200000,
//         quantity: 10,
//         status: "Còn hàng"
//     },
//     {
//         id: 1,
//         name: "áo trắng",
//         size: "XL",
//         price: 200000,
//         quantity: 10,
//         status: "Còn hàng"
//     }
// ]

// let jsonProduct = JSON.stringify(listProduct);
// // jsonProduct =JSON.parse(jsonProduct);

// localStorage.setItem("name", 'caovl')
// localStorage.setItem(listProduct, jsonProduct)
// console.log(jsonProduct);
// console.log(jsonProduct.splice(0,1));

// //read hiện thị sản phẩm ra html
// function render() {
//     const tableProduct = document.getElementById("table-product")
//     let stringHTML = ``;
//     for (let i in listProduct) {
//         stringHTML += `
//         <tr>
//             <td>${listProduct[i].id}</td>
//             <td>${listProduct[i].name}</td>
//             <td>${listProduct[i].size}</td>
//             <td>${listProduct[i].price}</td>
//             <td>${listProduct[i].quantity}</td>
//             <td>${listProduct[i].status}</td>
//             <td><button>Update</button>
//             <button>Delete</button>
//             </td>
//             </tr>
//                 `
//     }
//     tableProduct.innerHTML = stringHTML;
// }
// render();



// function addProduct() {
//     const addNew = inputHTML.value;
//     listProduct.push(addNew);
//     inputHTML.value = "";
//     render();


// }

const btnAdd = document.getElementById("btn-add")
const form = document.getElementById("form-scope")
const categoryName = document.getElementById('name')
const errorName = document.getElementById("error-name")
const btnCancel = document.getElementById("btn-cancel")
const btnSubmit = document.getElementById("btn-submit")
const btnSearch = document.getElementById("btn-search")
const tableCategory = document.getElementById("tbody")

let idUpdate = null;
const CATEGORY_LOCAL = "categorys";

btnSearch.addEventListener("click", function () {
    const textSearch = document.getElementById("text-search").value.toLowerCase();

    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const categoryFilter = categorys.filter(item => item.name.toLowerCase().includes(textSearch))

    render(categoryFilter);
})

btnAdd.addEventListener('click', function () {
    form.classList.remove('hidden')
})

btnCancel.addEventListener("click", function () {
    categoryName.value = '';
    errorName.innerHTML = '';
    btnSubmit.innerText = "Add";
    idUpdate = null;
    form.classList.add("hidden");
})
function submitForm(event) {
    event.preventDefault();
    if (idUpdate) {
        const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
        if (categoryName.value.length < 2) {
            errorName.innerText = `Lỗi`;
            return;
        } else {
            errorName.innerText = ``;
        }

        const index = categorys.findIndex(item => item.name === categoryName.value)
        if (index !== -1) {
            errorName.innerText = "Name bị trùng";
            return
        }
        else {
            errorName.innerText = "";
        }
        const indexUpdate = categorys.findIndex(item => item.id === idUpdate)
        categorys[indexUpdate].name = categoryName.value;
        localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

        btnCancel.click()

        idUpdate = null;
        render()



        return
    }
    else {
        errorName.innerText = "";
    }

    let id = 1;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
    if (categorys.length > 0) {
        id = categorys[categorys.length - 1].id + 1
    }
    if (categoryName.value.length < 2) {
        errorName.innerText = `Lỗi`;
        return;
    } else {
        errorName.innerText = ``;
    }

    const index = categorys.findIndex(item => item.name === categoryName.value)
    if (index !== -1) {
        errorName.innerText = "Name bị trùng";
        return
    }
    else {
        errorName.innerText = "";
    }
    const category = {
        id,
        name: categoryName.value,
        status: true,

    }

    categorys.push(category)

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))


    categoryName.value = "";

    form.classList.add("hidden")

    render();

}

function render(data) {
    let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL));
    if (Array.isArray(data)) {
        categorys = data
    }


    let stringHTML = ``;

    for (let i in categorys) {
        stringHTML += `<tr>
    <td>${categorys[i].id}</td>
    <td>${categorys[i].name}</td>
    <td>${categorys[i].status ? "Active" : "Block"}</td>
    <td>
    <button onclick="initUpdate(${categorys[i].id})">Update</button>
    <button onclick="changeStatus(${categorys[i].id})">${categorys[i].status ? "Block" : "Active"}</button>
    <button onclick="deleteCategorys(${categorys[i].id})">Delete</button>
    </td>
    </tr>
    `}
    tableCategory.innerHTML = stringHTML;
}

render();


function deleteCategorys(id) {

    const result = confirm(`Are you sure delete id:${id}`)
    if (!result) {
        return;
    }
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id);

    categorys.splice(index, 1)
    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys));

    render();
}


function initUpdate(id) {
    idUpdate = id;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categoryName.value = categorys[index].name;
    form.classList.remove("hidden")
    btnSubmit.innerText = "Update";
}

function changeStatus(id) {
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categorys[index].status = !categorys[index].status

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

    render();
}