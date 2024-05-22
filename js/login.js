
let btn = document.getElementById("login");
let form = document.getElementById("form");

form.onsubmit = function (e) {
    e.preventDefault();

    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    let email = form.email.value;
    let password = form.password.value;
    console.log(form.email.value, form.password.value);

    if (email === "admin@gmail.com" && password === "admin") {
        window.location.href = "../Module_01/admin/user.html"
        return;
    }

    const userForm = {
        email: email,
        password: password,
    }

    const userFind = userList.find(item => item.email === userForm.email && item.password === userForm.password)
    // console.log(user);
    if (!userFind) {
        alert("Khong tim thay");
        return;
    }
    //tìm thấy
    //lưu thông tin lên local
    localStorage.setItem("user_login", JSON.stringify(userFind));
    //chuyển trang
    window.location.href = "./home.html";
}
