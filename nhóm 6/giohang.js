  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    newQuantity = parseInt(newQuantity);
  
    if (newQuantity <= 0) {
      return alert("Số lượng phải lớn hơn 0!");
    }
  
    cart[index].quantity = newQuantity;  // Cập nhật lại số lượng
    localStorage.setItem("cart", JSON.stringify(cart));  // Lưu giỏ hàng đã cập nhật
    renderCart();  // Vẽ lại giỏ hàng
  }
  
  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);  // Xóa sản phẩm tại chỉ số index
    localStorage.setItem("cart", JSON.stringify(cart));  // Lưu giỏ hàng sau khi xóa
    renderCart();  // Vẽ lại giỏ hàng
  }
  
  // Gọi hàm renderCart khi trang web được tải
  document.addEventListener("DOMContentLoaded", renderCart);
  
  // Hàm thêm sản phẩm vào giỏ hàng
  function addToCart(image, name, price) {
    const quantity = parseInt(document.getElementById("quantity").value);
  
    if (quantity <= 0 || isNaN(quantity)) {
      return alert("Vui lòng nhập số lượng hợp lệ!");
    }
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.name === name);
  
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    if (existingProduct) {
      existingProduct.quantity += quantity;  // Tăng số lượng nếu sản phẩm đã có
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      cart.push({ image, name, price, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));  // Lưu giỏ hàng đã cập nhật
    alert("Đã thêm sản phẩm vào giỏ hàng!");  // Thông báo người dùng
  }

// Hàm để hiển thị giỏ hàng từ localStorage
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];  // Lấy giỏ hàng từ localStorage
    const cartItems = document.getElementById("cart-items");      // Bảng hiển thị các sản phẩm trong giỏ hàng
    const cartTotal = document.getElementById("cart-total");      // Phần hiển thị tổng tiền
  
    cartItems.innerHTML = "";  // Xóa nội dung bảng giỏ hàng
    let total = 0;  // Khởi tạo tổng tiền
  
    // Duyệt qua từng sản phẩm trong giỏ hàng để hiển thị
    cart.forEach((item, index) => {
      const subTotal = item.price * item.quantity;  // Tính tổng phụ cho từng sản phẩm
      total += subTotal;  // Cộng vào tổng tiền
      cartItems.innerHTML += `
        <tr>
          <td><img src="${item.image}" alt="${item.name}" width="150"></td>
          <td>${item.name}</td>
          <td><input type="number" value="${item.quantity}" min="1" class="form-control" onchange="updateQuantity(${index}, this.value)"></td>
          <td>${item.price.toLocaleString()}.000 VND</td>
          <td>${subTotal.toLocaleString()}.000 VND</td>
          <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Xóa</button></td>
        </tr>
      `;
    });
  
    cartTotal.innerText = `Tổng: ${total.toLocaleString()}.000 VND`;  // Hiển thị tổng tiền
  }
  