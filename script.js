/* =========================
   AMAZON CLONE SCRIPT
   ========================= */

/* CART STORAGE */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

/* ADD TO CART */

function addToCart(name, price)
{
    let product =
    {
        id: Date.now(),
        name: name,
        price: price
    };

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}

/* UPDATE COUNT */

function updateCartCount()
{
    let countElement =
    document.getElementById("cart-count");

    if(countElement)
    {
        countElement.innerText = cart.length;
    }
}

/* SEARCH PRODUCTS */

const searchInput =
document.getElementById("searchInput");

if(searchInput)
{
    searchInput.addEventListener(
    "keyup",
    function()
    {
        let value =
        searchInput.value.toLowerCase();

        let cards =
        document.querySelectorAll(
        ".product-card"
        );

        cards.forEach(card =>
        {
            let text =
            card.innerText.toLowerCase();

            card.style.display =
            text.includes(value)
            ? "block"
            : "none";
        });
    });
}

/* CATEGORY FILTER */

const categorySelect =
document.getElementById("category");

if(categorySelect)
{
    categorySelect.addEventListener(
    "change",
    function()
    {
        let selected =
        categorySelect.value;

        let cards =
        document.querySelectorAll(
        ".product-card"
        );

        cards.forEach(card =>
        {
            if(
                selected === "All" ||
                card.dataset.category === selected
            )
            {
                card.style.display =
                "block";
            }
            else
            {
                card.style.display =
                "none";
            }
        });
    });
}

/* DARK MODE */

const darkBtn =
document.getElementById(
"darkModeBtn"
);

if(darkBtn)
{
    if(
        localStorage.getItem(
        "darkMode"
        ) === "enabled"
    )
    {
        document.body.classList.add(
        "dark"
        );
    }

    darkBtn.addEventListener(
    "click",
    function()
    {
        document.body.classList.toggle(
        "dark"
        );

        if(
            document.body.classList.contains(
            "dark"
            )
        )
        {
            localStorage.setItem(
            "darkMode",
            "enabled"
            );
        }
        else
        {
            localStorage.setItem(
            "darkMode",
            "disabled"
            );
        }
    });
}

/* HERO IMAGE SLIDER */

let slideIndex = 0;

showSlides();

function showSlides()
{
    let slides =
    document.getElementsByClassName(
    "slides"
    );

    for(
        let i = 0;
        i < slides.length;
        i++
    )
    {
        slides[i].style.display =
        "none";
    }

    slideIndex++;

    if(
        slideIndex > slides.length
    )
    {
        slideIndex = 1;
    }

    if(slides.length > 0)
    {
        slides[
        slideIndex - 1
        ].style.display =
        "block";
    }

    setTimeout(
    showSlides,
    3000
    );
}

/* LOAD CART PAGE */

function loadCart()
{
    let cartContainer =
    document.getElementById(
    "cartItems"
    );

    let totalElement =
    document.getElementById(
    "cartTotal"
    );

    if(
        !cartContainer ||
        !totalElement
    )
    {
        return;
    }

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(
    (item,index)=>
    {
        total += item.price;

        cartContainer.innerHTML +=

        `
        <div class="cart-item">

            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

            Remove

            </button>

        </div>
        `;
    });

    totalElement.innerHTML =
    "₹" + total;
}

/* REMOVE ITEM */

function removeItem(index)
{
    cart.splice(index,1);

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    loadCart();

    updateCartCount();
}

/* CLEAR CART */

function clearCart()
{
    cart = [];

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    loadCart();

    updateCartCount();
}

/* CHECKOUT */

function placeOrder()
{
    alert(
    "Order Placed Successfully!"
    );

    localStorage.removeItem(
    "cart"
    );

    window.location.href =
    "index.html";
}

/* LOGIN */

function loginUser()
{
    let email =
    document.getElementById(
    "email"
    ).value;

    let password =
    document.getElementById(
    "password"
    ).value;

    if(
        email === "" ||
        password === ""
    )
    {
        alert(
        "Please fill all fields"
        );

        return;
    }

    localStorage.setItem(
    "userEmail",
    email
    );

    alert(
    "Login Successful"
    );

    window.location.href =
    "index.html";
}

/* LOGOUT */

function logout()
{
    localStorage.removeItem(
    "userEmail"
    );

    alert(
    "Logged Out"
    );
}

/* SHOW USER */

window.onload =
function()
{
    updateCartCount();

    loadCart();

    let user =
    localStorage.getItem(
    "userEmail"
    );

    let userBox =
    document.getElementById(
    "userDisplay"
    );

    if(
        user &&
        userBox
    )
    {
        userBox.innerHTML =
        "Hello, " + user;
    }
};

function chatbot(){

    let q =
    document.getElementById("userQuestion")
    .value.toLowerCase();

    let answer = "";

    if(q.includes("laptop"))
        answer =
        "🤖 AI Suggestion: Check our latest laptops.";

    else if(q.includes("mobile"))
        answer =
        "🤖 AI Suggestion: Smartphones are currently on sale.";

    else if(q.includes("fashion"))
        answer =
        "🤖 AI Suggestion: Trending fashion products are available.";

    else if(q.includes("gaming"))
        answer =
        "🤖 AI Suggestion: Explore gaming accessories and consoles.";

    else
        answer =
        "🤖 AI Assistant: Please search a product category.";

    document.getElementById("answer")
    .innerHTML = answer;
}