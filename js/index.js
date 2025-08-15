document.addEventListener("DOMContentLoaded", function() {
    loadPage()
    const bookList = document.querySelector("#list")
    const bookPanel = document.querySelector("#show-panel")
    const currentUser = { id: 999, username: "Wade" }

    function loadPage(){
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => renderBooks(data))
    }

    
    function renderBooks(books){
        books.forEach(book => {
            const bookLi = document.createElement("li")
            const ul = document.createElement("ul")
            


            bookLi.textContent = book.title
            bookLi.addEventListener("click",()=>{
                bookPanel.innerHTML = ""

                const likeBttn = document.createElement("button")
                likeBttn.textContent = "❤️"
                likeBttn.addEventListener("click", () => {
                    const userIndex = book.users.findIndex(u => u.id === currentUser.id);

                    if (userIndex === -1) {
                        // Add current user
                        book.users.push(currentUser);
                    } else {
                        // Remove current user
                        book.users.splice(userIndex, 1);
                    }

                    // Clear and re-render the user list
                    ul.innerHTML = "";
                    book.users.forEach(user => {
                        const userLi = document.createElement("li");
                        userLi.textContent = user.username;
                        ul.append(userLi);
                    });

                    handleUser(book); // persist to backend
                });


                const img = document.createElement("img")
                img.src = book.img_url

                book.users.forEach(user => {
                    const userLi = document.createElement("li")
                    userLi.textContent=user.username

                    ul.append(userLi)
                    bookPanel.append(ul)
                })

                bookPanel.append(img,likeBttn)

            })

            bookList.append(bookLi)

        })
    }


    function handleUser(book){
        fetch(`http://localhost:3000/books/${book.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify(book)
        })
            
    }

});
