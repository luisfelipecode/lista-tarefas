const form = document.querySelector('form');
const lista = document.querySelector('.lista');

form.addEventListener('submit', (e) => {
	e.preventDefault();
});

function createCloseButton(li) {
	const span = document.createElement('span');
	const btnApagar = document.createElement('button');
	btnApagar.innerHTML = '<i class="fas fa-times"></i>';
	btnApagar.setAttribute('class', 'close');
	btnApagar.setAttribute('title', 'Apagar Tarefa');
	li.appendChild(span);
	span.appendChild(btnApagar);
	btnApagar.addEventListener('click', () => {
		li.remove();
		saveLocalStorage();
	});
}

function createEditButton(li) {
	const span = document.createElement('span');
	const btnEditar = document.createElement('button');
	btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
	btnEditar.setAttribute('class', 'edit');
	btnEditar.setAttribute('title', 'Editar Tarefa');
	li.appendChild(span);
	span.appendChild(btnEditar);
	btnEditar.addEventListener('click', () => {
		const input = document.getElementById('tarefa');
		input.value = li.innerText;
		li.remove();
		saveLocalStorage();
	});
}

function addTarefa() {
	const input = document.getElementById('tarefa').value;
	const li = document.createElement('li');
	if (input === '') return;
	{
		li.innerText = input;
		createCloseButton(li);
		createEditButton(li);
		lista.appendChild(li);
		document.querySelector('#tarefa').value = '';
		saveLocalStorage();
	}
}

function saveLocalStorage() {
	const tarefas = document.querySelectorAll('.lista li');
	const tarefasArray = [];
	tarefas.forEach((tarefa) => {
		tarefasArray.push(tarefa.innerText);
	});
	localStorage.setItem('tarefas', JSON.stringify(tarefasArray));
}

exibirTarefas();
function exibirTarefas() {
	if (JSON.parse(localStorage.getItem('tarefas')) === null) return;
	JSON.parse(localStorage.getItem('tarefas')).forEach((tarefa) => {
		const li = document.createElement('li');
		li.innerText = tarefa;
		createCloseButton(li);
		createEditButton(li);
		lista.appendChild(li);
	});
}
