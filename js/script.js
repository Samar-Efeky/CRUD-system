let productName=document.getElementById("productName");
let productPrice=document.getElementById("productPrice");
let productCategory=document.getElementById("productCategory");
let productDesc=document.getElementById("productDesc");
let searchInput=document.getElementById("searchProduct");
let btnAddProduct=document.getElementById("btnAddProduct");
let nameAlert=document.getElementById("nameAlert");
let priceAlert=document.getElementById("priceAlert");
let categoryAlert=document.getElementById("categoryAlert");
let descAlert=document.getElementById("descAlert");
let productsContainer;
if(localStorage.getItem('productList')==null){
    productsContainer=[];
}
else{
    productsContainer=JSON.parse(localStorage.getItem('productList'));
    displayProducts();
}
//  add product ............................................................................................//
function addProduct(){
    if(validateProductName()==true && validateProductPrice()==true && validateProductCategory()==true && validateProductDesc()==true){
        let product={
            name:productName.value,
            price:productPrice.value ,
            category:productCategory.value,
            desc:productDesc.value
        }
        productsContainer.push(product);
        localStorage.setItem('productList',JSON.stringify(productsContainer));
        clearForm();
        displayProducts();
        productName.classList.remove('is-valid');
        productPrice.classList.remove('is-valid');
        productCategory.classList.remove('is-valid');
        productDesc.classList.remove('is-valid');
    }
    else{
        alert("form is invalid.");
    }
}
//  display product ..........................................................................................//
function displayProducts(){
    let box=``;
    for(let i=0; i<productsContainer.length;i++){
        box+=`  <tr>
                <td rowspan="2" class="py-5">${i+1}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td>${productsContainer[i].desc}</td>
            </tr>
            <tr>
                <td colspan="2"><button onclick='updateProduct(${i});' class="p-2 border-0 text-white rounded-3" id="update">update</button></td>
                <td colspan="3"><button onclick='deleteProduct(${i});' class="p-2 border-0 text-white rounded-3" id="btnDelete">delete</button></td>
            </tr>`;
    }
    document.getElementById("tableBody").innerHTML=box;
}
// delete product ...............................................................................................//
function deleteProduct(index){
    productsContainer.splice(index,1);
    localStorage.setItem('productList',JSON.stringify(productsContainer));
    displayProducts();
}
// clear form .....................................................................................................//
function clearForm(){
    productName.value='';
    productPrice.value='';
    productCategory.value='';
    productDesc.value='';
}
// search product ..............................................................................................//
function searchProduct(searchTerm){
    let box=``;
    let search=false;
    let searchList=document.getElementById('searchList');
    searchList.onclick=function(){
        this.style.display="none";
    }
    for(let i=0; i<productsContainer.length; i++){
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true || 
        productsContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase())==true){
            searchList.style.display='block';
            searchList.innerHTML=`<div>${productsContainer[i].name}</div>`;
            searchList.onclick=function(){
                this.style.display="none";
                box+=`  <tr>
                <td rowspan="2" class="py-5">${i+1}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td>${productsContainer[i].desc}</td>
                </tr>
                <tr>
                    <td colspan="2"><button class="p-2 border-0 text-white rounded-3" id="update">update</button></td>
                    <td colspan="3"><button onclick='deleteProduct(${i});' class="p-2 border-0 text-white rounded-3" id="btnDelete">delete</button></td>
                </tr>`;
                document.getElementById("tableBody").innerHTML=box;
            }
            search=true;
        }
    }
    if(!search){
        searchList.style.display='block';
        searchList.innerHTML='No results....';
        displayProducts();
    }
    if(searchInput.value==''){
        searchList.style.display='none';
        displayProducts();
    }
}
// update product  .............................................................................................................//
function updateProduct(index){
    productName.value=productsContainer[index].name;
    productPrice.value=productsContainer[index].price;
    productCategory.value=productsContainer[index].category;
    productDesc.value=productsContainer[index].desc;
    btnAddProduct.style.backgroundColor='rgb(43, 43, 254)';
    btnAddProduct.innerHTML='updateProduct';
    btnAddProduct.onclick=function(){
        if(validateProductName()==true && validateProductPrice()==true && validateProductCategory()==true && validateProductDesc()==true){
            productsContainer=JSON.parse(localStorage.getItem('productList'));
            productsContainer[index].name=productName.value;
            productsContainer[index].price=productPrice.value;
            productsContainer[index].category=productCategory.value;
            productsContainer[index].desc= productDesc.value;
            localStorage.setItem('productList',JSON.stringify(productsContainer));
            displayProducts();
            clearForm();
            btnAddProduct.innerHTML='addProduct';
            btnAddProduct.style.backgroundColor='rgb(0, 0, 164)';
            btnAddProduct.onclick=function(){
                addProduct();
            }
            productName.classList.remove('is-valid');
            productPrice.classList.remove('is-valid');
            productCategory.classList.remove('is-valid');
            productDesc.classList.remove('is-valid');
        }
        else{
            alert("form is invalid.");
        }
    }
}
// validation form .................................................................................................//
// validate product name ......................................................//
function validateProductName(){
    let regex=/^[A-Z][a-z]{4,10}$/;
    if(regex.test(productName.value)==true){
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        nameAlert.classList.replace("d-block","d-none");
        return true;
    }
    else{
        nameAlert.classList.replace("d-none","d-block");
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        return false;
    }
}
// validate product price .......................................................//
function validateProductPrice(){
    let regex=/^[0-9]{4,10}$/;
    if(regex.test(productPrice.value)==true){
        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid');
        priceAlert.classList.replace("d-block","d-none");
        return true;
    }
    else{
        priceAlert.classList.replace("d-none","d-block");
        productPrice.classList.add('is-invalid');
        productPrice.classList.remove('is-valid');
        return false;
    }
}
// validate product category ......................................................//
function validateProductCategory(){
    let regex=/^[a-z]{5,}$/;
    if(regex.test(productCategory.value)==true){
        productCategory.classList.add('is-valid');
        productCategory.classList.remove('is-invalid');
        categoryAlert.classList.replace("d-block","d-none");
        return true;
    }
    else{
        categoryAlert.classList.replace("d-none","d-block");
        productCategory.classList.add('is-invalid');
        productCategory.classList.remove('is-valid');
        return false;
    }
}
// validate product description ...................................................//
function validateProductDesc(){
    let regex=/^[A-Za-z][a-z]{3,}/;
    if(regex.test(productDesc.value)==true){
        productDesc.classList.add('is-valid');
        productDesc.classList.remove('is-invalid');
        descAlert.classList.replace("d-block","d-none");
        return true;
    }
    else{
        descAlert.classList.replace("d-none","d-block");
        productDesc.classList.add('is-invalid');
        productDesc.classList.remove('is-valid');
        return false;
    }
}
