document.addEventListener('DOMContentLoaded', () => {
    const animals = [];

    // Referencias a los elementos de la página
    const animalForm = document.getElementById('animal-form');
    const animalsList = document.getElementById('animals');
    const sexDistributionChartCtx = document.getElementById('sexDistributionChart').getContext('2d');
    const ageDistributionChartCtx = document.getElementById('ageDistributionChart').getContext('2d');

    document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    const mainContent = document.getElementById('main-content');

    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');

    // Usuarios simulados para demostración
    const users = [];

    // Función de inicio de sesión
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
            alert('Inicio de sesión exitoso');
            authModal.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Función de registro
    registerButton.addEventListener('click', () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;

        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (users.some((u) => u.username === username)) {
            alert('El usuario ya existe');
            return;
        }

        users.push({ username, password });
        alert('Registro exitoso. Ahora puedes iniciar sesión');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // Referencias a los modales
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    // Botones para abrir modales
    const openLoginModalButton = document.getElementById('open-login-modal');
    const openRegisterModalButton = document.getElementById('open-register-modal');

    // Botones dentro de los formularios
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');

    // Lista de usuarios simulados
    const users = [];

    // Función para mostrar y ocultar modales
    function showModal(modal) {
        modal.style.display = 'flex';
    }

    function hideModal(modal) {
        modal.style.display = 'none';
    }

    // Abrir el modal correspondiente
    openLoginModalButton.addEventListener('click', () => showModal(loginModal));
    openRegisterModalButton.addEventListener('click', () => showModal(registerModal));

    // Manejar inicio de sesión
    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
            alert('Inicio de sesión exitoso');
            hideModal(loginModal);
            mainContent.style.display = 'block';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Manejar registro de usuarios
    registerButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const passwordConfirm = document.getElementById('register-password-confirm').value.trim();

        if (!username || !password || !passwordConfirm) {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (users.some((u) => u.username === username)) {
            alert('El usuario ya existe');
            return;
        }

        users.push({ username, password });
        alert('Registro exitoso. Ahora puedes iniciar sesión');
        hideModal(registerModal);
    });
});

    // Agregar nuevo animal
    animalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById('animal-id').value;
        const raza = document.getElementById('animal-raza').value;
        const salud = document.getElementById('animal-salud').value;
        const sexo = document.getElementById('animal-sexo').value;
        const edad = parseInt(document.getElementById('animal-edad').value);

        const newAnimal = { id, raza, salud, sexo, edad };
        animals.push(newAnimal);

        updateAnimalList();
        updateCharts();
    });

// Actualizar la lista de animales
function updateAnimalList() {
    animalsList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Raza</th>
                    <th>Sexo</th>
                    <th>Edad</th>
                    <th>Salud</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;

    const tbody = animalsList.querySelector('tbody');
    animals.forEach((animal) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${animal.id}</td>
            <td>${animal.raza}</td>
            <td>${animal.sexo}</td>
            <td>${animal.edad}</td>
            <td>${animal.salud}</td>
        `;
        tbody.appendChild(tr);
    });
}


    // Actualizar los gráficos
    function updateCharts() {
        const sexData = animals.reduce(
            (acc, animal) => {
                acc[animal.sexo]++;
                return acc;
            },
            { Macho: 0, Hembra: 0 }
        );

        const ageData = animals.reduce((acc, animal) => {
            const ageGroup = animal.edad <= 2 ? '0-2 años' : animal.edad <= 5 ? '3-5 años' : '6+ años';
            acc[ageGroup]++;
            return acc;
        }, { '0-2 años': 0, '3-5 años': 0, '6+ años': 0 });

        renderSexChart(sexData);
        renderAgeChart(ageData);
    }

    // Renderizar gráfico de distribución por sexo
    function renderSexChart(data) {
        new Chart(sexDistributionChartCtx, {
            type: 'pie',
            data: {
                labels: ['Macho', 'Hembra'],
                datasets: [{
                    data: [data.Macho, data.Hembra],
                    backgroundColor: ['#4CAF50', '#FF5722'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // Renderizar gráfico de distribución por edad
    function renderAgeChart(data) {
        new Chart(ageDistributionChartCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Cantidad de Animales',
                    data: Object.values(data),
                    backgroundColor: ['#2196F3', '#FFC107', '#9C27B0'],
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
