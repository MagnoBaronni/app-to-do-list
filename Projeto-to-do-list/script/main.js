
 //----Recuperar o objeto ou arrey vazio do localStorage ao carregar a página 
    //e adicionar o retorno a variável todos
    window.addEventListener('load' , () => {
        todos = JSON.parse(localStorage.getItem('todos')) || [];


     //----Selecionar a tag input atráveis do id
     const nameImput = document.querySelector('#name') 
     //----Recuperar o valor pela key = username persistido no localStorage e atribui a const 
     const username = localStorage.getItem('username') || ''
     nameImput.value = username
     //----Recuperar o evento (alteração do input) e persistir no localStorage na Key username
     nameImput.addEventListener('change', event => {
        localStorage.setItem('username', event.target.value)
     } )

        
     //----Selecionar o id=new-todo-form e atribuir a constante newTodoForm
     const newTodoForm = document.querySelector('#new-todo-form')
    //---- Recupera o evento submit na const = newTodoForm que persiste no id=new-todo-form
    //---- E receber o evento por parâmetro para função
     newTodoForm.addEventListener('submit', event2 => {
        event2.preventDefault()
    //-----Anular o evento de acontecer pelo parâmetro com o preventDefault    
        console.log(event2) 
    //---- Cria um objeto e persistir todos os values do formulário pelo name dos inputs    
        const todo = {
        content: event2.target.elements.content.value, 
        category: event2.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
        }
    //----Adcionar esses valores recuperados ao objeto 'todos'    
       todos.push(todo)
    //----Adicionar ao localStorage em formato JSON os valores do objeto todos e sua chave
    localStorage.setItem('todos', JSON.stringify(todos))
    //----Limpar o formulário após o submit
    event2.target.reset()
    displayTodos()
    }) 

   //----Chamar a função também ao recarregar página 'load'
    displayTodos()

})


//---------------------------------------------------------------------------------


function displayTodos(){
    const todolist = document.querySelector('#todo-list')
    todolist.innerHTML = ''
   
   //----Pecorrer todo o objeto 'todos' e trazer como parâmetro no todo
    todos.forEach(todo => { 
     
    //---Criar as tags Html da part 3 do documento,
    //adcionar suas respectivas class editadas no css    
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        const label = document.createElement('label')
        const input = document.createElement('input')
        const span =  document.createElement('span')
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const edit = document.createElement('button')
        const deleteButton = document.createElement('button')
    //----Adcionar o estilo do input criado, 
    //adcionar o atributo done(false) so checked do objeto,
    //passando a class bubble ao seu span editada no css 
        input.type = 'checkbox'
        input.checked = todo.done
        span.classList.add('bobble')
    //----Condição:se valor do atributo category do objeto todo for igual a personal,
    //o span recebe a class personal editada no css.
    // se não, ou seja category=='business' passa a class business editada no css
        if( todo.category == 'personal'){
        span.classList.add('personal')
        } else {
        span.classList.add('business')
        }
    //----Atribuir as tags criadas suas respecitivas class editadas no css
    content.classList.add('todo-content')
    actions.classList.add('actions')
    edit.classList.add('edit')
    deleteButton.classList.add('delete')
    //----Interagindo com o input content aparti do innerHTML utilizando o template string,
    //com <> por está incidindo sobre o input e anexando o atributo booleano readonly(somente leitura).
    content.innerHTML = `<input type="text" value="${todo.content}"readonly>`   
    //----Nomes dos Buttons via innerHTML
    edit.innerHTML ='Edit'
    deleteButton.innerHTML = 'Delete'
    //----Atribuição dos tags criadas e editadas separadas anteriormente,
    // aos seus respectivos HTML do document.
    label.appendChild(input)
    label.appendChild(span)
    actions.appendChild(edit)
    actions.appendChild(deleteButton)
    todoItem.appendChild(label)
    todoItem.appendChild(content)
    todoItem.appendChild(actions)
    
    todolist.appendChild(todoItem)
 
    //----Se o done for true adicionar a class done que na formatação css,
    //passa uma linha riscando o valor do todo.content do input ao desmarcar
    //mostrando q já foi feito.
   if(todo.done) {
      todoItem.classList.add('done')
    }
    //----Criado um evento de click no input,
    // que retorna uma parâmetro e seu checked é true,
    // e é atribuido ao todo.done
    input.addEventListener('click', e => {
      todo.done = e.target.checked
    //----Atualizar o localStorage passando true para o done correspondente.  
    localStorage.setItem('todos', JSON.stringify(todos))
   //---Se o todo.done ao ser clicado passa a valer true,
   //quando não, persiste seu valor normal atribuido anteriormente false,
   // com isso atribue ou não a class="done" ao todoItem
   if (todo.done){
    todoItem.classList.add('done')
   }  else {
    todoItem.classList.remove('done')
   }
   //----Chama função para recriar a lista atualizada
     displayTodos()
    })
   
    
 //---------------------------------------------------------------------------------------------------------------------------    
   

    //----É atribuido um evento de click ao botão edit passando os atributos do exato que se quer alterar,
   //executa uma função, que através da class="content" localiza a tag input do edit clicado,
   //em seguida remove o atributo 'readonly' que só permite leitura do input="text",
   //em seguida inside foco no elemento input pelo atributo focus()  
   edit.addEventListener("click", e => {
    const input = content.querySelector('input')
    input.removeAttribute('readonly')
    input.focus()
  //----Inicia novo Evento ao tira o foco blur(), do  elemento input que está sendo editado,
  // é setado true para o elemento readonly do input permitindo apenas leitura, bloqueando alteração,
  // em seguida a edição no input é passada junto com o content no parâmetro, e acessada seu .value e tribui ao todo.content,
  // o LocalStorage é atualizado mais uma vez com as novas edições,
  //após isso o displayTodos é chamado para recriar a lista aparti do localStorage já com as novas mudanças.
    input.addEventListener('blur', e =>{
        input.setAttribute('readonly', true)
        todo.content = e.target.value
        localStorage.setItem('todos', JSON.stringify(todos))
        displayTodos()
       }) 
    })
      
 //----Ao detectar um evento de click no button delete, é esecutado uma função,
 //Aparti desse momento que o button que é clicado traz um clicked:true tornando-o diferente dos demais objeto,
 //utilizando o filter podemos rodar todos comparando com todos os objetos e localizar o diferente,
 //que em seguida não vai pertencer a todos consequentemente não vai ser atualizado.
    deleteButton.addEventListener("click", e => {
       todos = todos.filter(t => t != todo)
       localStorage.setItem('todos', JSON.stringify(todos))
       displayTodos()
    })
 })
}