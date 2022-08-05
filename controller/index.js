function getProductApi() {
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    })
    promise.then(function (result) {
        console.log('result', result.data);
        renderArrProduct(result.data)
    })
    promise.catch(function (err) {
        console.log(error);
    })
}

window.onload = function () {
    getProductApi();
}

//Chức năng Create sản phẩm:
document.querySelector('#btnCreate').onclick = function () {
    let item = new SanPham();
    item.id = document.querySelector('#id').value;
    item.name = document.querySelector('#name').value;
    item.price = document.querySelector('#price').value;
    item.img = document.querySelector('#img').value;
    item.description = document.querySelector('#description').value;
    item.type = document.querySelector('#type').value;

    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: item
    })
    promise.then(function(result){
        getProductApi();
    })
    promise.catch(function(err){
        console.log(error);
    })
}

//Xóa sản phẩm theo id:
function xoaSanPham (idClick) {
    console.log(idClick);

    let promise = axios ({
        url:'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idClick,
        method: 'DELETE',
    });
    promise.then (function(result){
        console.log(result.data)
        getProductApi();
    })
    promise.catch (function(error){
        console.log(error);
    })

}

//Sửa thông tin sản phẩm:
function suaSanPham (idClick) {
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/'+ idClick,
        method: 'GET'
    })
    promise.then(function(result){
        let ttsp = result.data;
        //Load thông tin sản phẩm lên giao diện
        document.querySelector('#id').value = ttsp.id;
        document.querySelector('#name').value = ttsp.name;
        document.querySelector('#price').value = ttsp.price;
        document.querySelector('#img').value = ttsp.img;
        document.querySelector('#description').value = ttsp.description;
        document.querySelector('#type').value = ttsp.type;
    })
    //Xử lý thất bại
    promise.catch (function(error){
        console.log(error)
    })
}

//Cập nhật sản phẩm:
document.querySelector('#btnUpdate').onclick = function () {
    let spNew = new SanPham ();
    spNew.id = document.querySelector('#id').value;
    spNew.name = document.querySelector('#name').value;
    spNew.price = document.querySelector('#price').value;
    spNew.img = document.querySelector('#img').value;
    spNew.description = document.querySelector('#description').value;
    spNew.type = document.querySelector('#type').value;
    //gọi API:
    let promise = axios ({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + spNew.id,
        method: 'PUT',
        data: spNew 
    })
    promise.then(function(result){
        console.log('result',result.data);
        getProductApi();
    });
    promise.catch (function(error){
        console.log(error);
    })

}

//Chức nắng tìm kiếm:




/////--------------Render danh sách sản phẩm:
function renderArrProduct(arrProd) {
    let html = '';
    for (let i = 0; i < arrProd.length; i++) {
        let prod = arrProd[i];
        html += `
                   <tr>
                      <td>${prod.id}</td>
                      <td>${prod.img}</td>
                      <td>${prod.name}</td>
                      <td>${prod.price}</td>
                      <td>${prod.description}</td>
                      <td>${prod.type}</td>
                      <td>
                          <button class="btn btn-danger" onclick="xoaSanPham('${prod.id}')">Xoá</button>
                          <button class="btn btn-primary mx-2" onclick="suaSanPham('${prod.id}')" >Sửa</button>
                     </td>
                   </tr>
               `
    }
    document.querySelector('tbody').innerHTML = html;
}