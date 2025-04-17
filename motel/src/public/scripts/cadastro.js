document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obter valores dos campos
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const cargo = document.getElementById('cargo').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    
    // Validações básicas
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Formatar CPF (remover caracteres não numéricos)
    const cpfFormatado = cpf.replace(/\D/g, '');
    
    if (cpfFormatado.length !== 11) {
        alert('CPF inválido!');
        return;
    }
    
    // Simular envio dos dados (sem banco de dados)
    const funcionario = {
        nome,
        cpf: cpfFormatado,
        cargo,
        email,
        telefone,
        senha
    };
    
    console.log('Dados do funcionário:', funcionario);
    alert('Funcionário cadastrado com sucesso!');
    
    // Limpar formulário
    this.reset();
    
    // Redirecionar para a página de login após 2 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}); 