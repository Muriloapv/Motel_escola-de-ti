// Atualiza o relógio
function atualizarRelogio() {
    const agora = new Date();
    const horario = agora.toLocaleTimeString('pt-BR');
    const data = agora.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('horario').textContent = horario;
    document.getElementById('data').textContent = data;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Carrega os registros do servidor
async function carregarRegistros() {
    try {
        const response = await fetch('/api/registros');
        const registros = await response.json();
        
        const listaRegistros = document.getElementById('listaRegistros');
        listaRegistros.innerHTML = '';

        registros.forEach(registro => {
            const horario = new Date(registro.horario).toLocaleTimeString('pt-BR');
            const data = new Date(registro.horario).toLocaleDateString('pt-BR');
            
            const div = document.createElement('div');
            div.className = 'registro-item';
            div.innerHTML = `
                <div>
                    <strong class="tipo-${registro.tipo.toLowerCase()}">${registro.tipo}</strong>
                    <span>${data} às ${horario}</span>
                </div>
                ${registro.observacao ? `<div class="observacao">${registro.observacao}</div>` : ''}
            `;
            
            listaRegistros.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar registros:', error);
    }
}

// Função para registrar ponto
async function registrarPonto(tipo) {
    const observacao = document.getElementById('observacao').value;
    
    try {
        const response = await fetch('/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, observacao })
        });

        if (response.ok) {
            document.getElementById('observacao').value = '';
            await carregarRegistros();
        } else {
            alert('Erro ao registrar ponto');
        }
    } catch (error) {
        console.error('Erro ao registrar ponto:', error);
        alert('Erro ao registrar ponto');
    }
}

// Event listeners para os botões
document.getElementById('btnEntrada').addEventListener('click', () => registrarPonto('ENTRADA'));
document.getElementById('btnSaida').addEventListener('click', () => registrarPonto('SAIDA'));

// Carrega os registros iniciais
carregarRegistros(); 