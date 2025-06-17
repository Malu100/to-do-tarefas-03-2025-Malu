// Simulação de banco de dados local
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Cadastro de usuário
const formUsuario = document.getElementById('formUsuario');
if (formUsuario) {
  formUsuario.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    usuarios.push({ nome, email });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('mensagemUsuario').innerText = 'Usuário cadastrado!';
    formUsuario.reset();
  });
}

// Preencher usuários no select
const selectUsuario = document.getElementById('usuario');
if (selectUsuario) {
  usuarios.forEach((u, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = u.nome;
    selectUsuario.appendChild(opt);
  });
}

// Cadastro de tarefa
const formTarefa = document.getElementById('formTarefa');
if (formTarefa) {
  formTarefa.addEventListener('submit', e => {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const prioridade = document.getElementById('prioridade').value;
    const id_usuario = document.getElementById('usuario').value;
    const data_cadastro = new Date().toISOString().slice(0, 10);

    tarefas.push({ descricao, setor, prioridade, id_usuario, data_cadastro, status: 'a fazer' });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    document.getElementById('mensagemTarefa').innerText = 'Tarefa cadastrada!';
    formTarefa.reset();
  });
}

// Exibir tarefas no quadro
function exibirTarefas() {
  const statusMap = {
    'a fazer': document.getElementById('tarefas-afazer'),
    'fazendo': document.getElementById('tarefas-fazendo'),
    'pronto': document.getElementById('tarefas-pronto')
  };

  if (!statusMap['a fazer']) return;

  Object.values(statusMap).forEach(el => el.innerHTML = '');

  tarefas.forEach((tarefa, i) => {
    const div = document.createElement('div');
    div.className = 'tarefa';
    div.innerHTML = `<strong>${tarefa.descricao}</strong><br>${tarefa.setor} - ${tarefa.prioridade}<br><em>${usuarios[tarefa.id_usuario]?.nome || 'Sem usuário'}</em>`;
    statusMap[tarefa.status].appendChild(div);
  });
}

exibirTarefas();