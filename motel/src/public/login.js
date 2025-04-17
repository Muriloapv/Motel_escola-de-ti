document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulação de login (sem banco de dados)
    if (username === 'admin' && password === 'admin') {
        // Redireciona para a página principal após login bem-sucedido
        window.location.href = '/index.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}); 