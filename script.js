// Function to log in
function loginUser(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
          if (!response.ok) throw new Error("Login Falhou");
          return response.json();
        })
        .then((data) => {
          alert(data.message); // Exibir mensagem de sucesso
          window.location.href = "dashboard.html"; // Redireciona para a dashboard
        })
        .catch((error) => {
           console.error(error);
           alert("Usuários ou senha invalidos. tente novamente");
        });
}

    // Função par registrar um novo usuário
    function registerUser(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },  
          body: JSON.stringify({ username, password }),
        })
          .then((response) => {
          if (!response.ok) throw new Error("Error registering user");
          return response.json();
        })
        .then((data) => {
          alert(data.message); // Display the success message
          window.location.href = "index.html"; // Redirects to the login page
        })
        .catch((error) => {
          console.error(error);
          alert("Error registering user. Try again.");
        });
    }  
    
    // Function to search and display users on the dashboard
function loadUsers() {
    fetch("http://localhost:3000/users")
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching users");
        return response.json();
      })
      .then((data) => {
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Clear the list before adding
        data.forEach((user) => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item d-flex justify-content-between align-items-center";
          listItem.innerHTML =`
             <span>${user.username}</span>
             <span class="badge bg-primary rounded-pill">ID: ${user.id}</span>
           `;
           userList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Error loading users.");
      });
}