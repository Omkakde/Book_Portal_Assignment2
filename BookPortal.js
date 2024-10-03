import readline from 'readline-sync';

let booksList = [
    { book_name: "Gitanjali              ", price: 200, status: "available", quantity: 3 },
    { book_name: "The White Tiger        ", price: 150, status: "available", quantity: 2 },
    { book_name: "Rich Dad Poor Dad      ", price: 100, status: "available", quantity: 5 },
    { book_name: "The Palace of Illusions", price: 250, status: "available", quantity: 1 },
    { book_name: "The Great Gatsby       ", price: 180, status: "unavailable",quantity: 0 },
    { book_name: "To Kill a Mockingbird  ", price: 170, status: "available", quantity: 3 },
    { book_name: "The Alchemist          ", price: 190, status: "available", quantity: 2 },
    { book_name: "1984                   ", price: 210, status: "unavailable", quantity: 0 }
];
let cart = [];

function menu() {
    while (true) {
        console.log(`
    1) show available books
    2) add book
    3) show cart
    4) Exit`);
        let input = readline.question("    Enter option :");
        switch (input) {
            case '1':
                showBooks();
                break;
            case '2':
                AddBookToCart();
                break;
            case '3':
                showCart();
                break;
            case '4':
                console.log("Exiting the program. Goodbye!");
                return;
            default:
                console.log("Invalid option. Please try again.");
        }
    }
}

function showBooks() {
    console.log(`                          *** Available Books ****             
            +--------+------------------------+-------------+-------------+
            | Index  | Book                   | Price       | quantity    |
            +--------+------------------------+-------------+-------------+`);
    let idx = 0;
    booksList.forEach(book => {
        if (book.status == "available") {
            console.log(`          
            | ${idx}      | ${book.book_name}|    ${book.price}      |    ${book.quantity}        |`);
        }
        idx++;
    });
}

function AddBookToCart() {
    showBooks();

    const input = readline.question("    Enter Book Index :");
    let book = booksList[input];

    if (input < 0 || input >= booksList.length || booksList[input].quantity <= 0) {
        console.log("Invalid book index or book is not available. Please try again.");
        return;
    } else {
        const quantity = parseInt(readline.question("    Enter Quantity: "), 10);
        if ( quantity <= 0 || quantity > booksList[input].quantity) {
            console.log(`Invalid quantity. Please enter a value between 1 and ${booksList[input].quantity}.`);
            return;
        }

        booksList[input].quantity -= quantity;

        if (booksList[input].quantity === 0) {
            booksList[input].status = "unavailable";
            console.log("unavailable");    // UC3
        }

        let cartBook = {
            book_name: book.book_name,
            price: book.price,
            quantity: quantity,
            total_price: book.price * quantity
        };

        cart.push(cartBook);

        console.log(`\n Book "${cartBook.book_name.trim()}" has been added to your cart.`);
    }
}

function showCart() {
    console.log(`                          *** My Cart ****             
        +------------------------+-------------+-------------+-------------+
        | Book                   | Price       | Quantity    | Total Price |
        +------------------------+-------------+-------------+-------------+`);
    let totalCartValue = 0;

    cart.forEach(book => {
        let totalPrice = book.price * book.quantity;
        console.log(`          
        | ${book.book_name}|    ${book.price}      |    ${book.quantity}        |    ${totalPrice}       |`);
        totalCartValue += totalPrice;
    });

    console.log(`\nTotal Cart Value: ${totalCartValue}`);
}

menu();
 