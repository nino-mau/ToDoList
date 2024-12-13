let iCompleted; // Index of item to toggle as completed.
let cAdd = ""; // Item to add
let iEdit; // Index of item to edit
let cEdit = ""; // Item to do the edit 
let iDelete; // Index of item to delete
let nDelete; // Number of item to delete
let nbItems = 6; // Variable qui correspond au nombre de Todos dans la liste.

const view = {
    displayTodos: function() {
        let todosUl = document.querySelector('.todosListUl'); // Récupérer élément ul
        todosUl.innerHTML = ''; // Clear ul element
        todosObj.myTodos.forEach( function(todos, positionId) {
            let todosTextWithCompletion = '';
            let todosLi = document.createElement('li');
            todosLi.id = positionId;
            todosLi.textContent = todosTextWithCompletion;
            todosUl.appendChild(todosLi); 
            todosLi.appendChild(view.createCheckbox(todos.completed)); 
            todosLi.appendChild(document.createTextNode(todos.texte));
            todosLi.appendChild(view.createDeleteButton());
        });
    },
    createDeleteButton: function() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'deleteButton';
        // deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; // Add icon to button
        return deleteButton;
    },
    setUpEventListeners: function() {
        let todosUlDeleteButton = document.querySelector('.todosListUl');
        todosUlDeleteButton.addEventListener('click', function(event) {
            console.log(event.target.parentNode.id);
            let elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                todosObj.deleteTodos(elementClicked.parentElement.id);
            }
        });
    },
    createCheckbox: function(checked) {
        let doneCheckbox = document.createElement('input');
        doneCheckbox.className = 'doneCheckbox';
        doneCheckbox.type = "checkbox";
        doneCheckbox.checked = checked;
        return doneCheckbox;
    },
    displayLoad: function() {
        let loadingGif = document.createElement('img'); // Récupérer élément ul
        loadingGif.src = "assets/img/ajax-loader.gif";
        loadingGif.alt = 'Loading Gif';
        let todosUl = document.querySelector('.todosListUl');
        todosUl.innerHTML = ''; // Clear ul element
        todosUl.appendChild(loadingGif);
    }
};

const handlers = {
    toggleAll: function() {
        todosObj.toggleAll();
        view.displayTodos();
    },
    addTodos: function() {
        let addButtonTextInput = document.getElementById('addButtonTextInput');
        todosObj.addTodos(addButtonTextInput.value);
        addButtonTextInput.value = '';
        view.displayTodos();
    },
    editTodos: function() {
        let editButtonTextInput = document.getElementById('editButtonTextInput');
        let editButtonPositionInput = document.getElementById('editButtonPositionInput');
        todosObj.editTodos(editButtonPositionInput.valueAsNumber, editButtonTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    loadDatas: function() {
        view.displayLoad();
        fetch("http://activites.handigital-formation.com/downloads/todos.php")
        .then(response => response.json())
        .then(array => {todosObj.setTodos(array); view.displayTodos();}); // Run displayTodos a l'intérieur du then ou il s'executera avant que le then s'execute.
    }
};

const todosObj = {
    myTodos : [
        {
            texte: "Lorem ipsum dolor sit",
            completed: true
        },
        {
            texte: "Consectetur adipiscing",
            completed: true
        },
        {
            texte: "Sed porttitor felis",
            completed: true
        },
        {
            texte: "Morbi facilisis magna",
            completed: true
        },
        {
            texte: "Curabitur pharetra odio",
            completed: true
        }
    ],
    addTodos: function(cAdd){
        let newcAdd = {
            texte: cAdd,
            completed: false
        };
        this.myTodos.push(newcAdd); // This = to do things inside object
        view.displayTodos() // This = the function is inside this object 
        nbItems++;
    },
    editTodos: function(iEdit, cEdit){
        this.myTodos[iEdit].texte = cEdit;
        view.displayTodos();
    },
    deleteTodos: function(iDelete){
        this.myTodos.splice(iDelete, 1);
        view.displayTodos();
        nbItems--;
    },
    toggleCompleted: function(iCompleted){
        this.myTodos[iCompleted].completed = !this.myTodos[iCompleted].completed;
        view.displayTodos;
    },
    toggleAll: function(){
        if (this.myTodos.every((td) => td.completed)) { // Pas de "== true" car la condition if est remplie par défault si true est renvoyé
            this._toggleAllLoop(true)
        }
        else {
            this._toggleAllLoop(false)
        }
        view.displayTodos();
    },
    setTodos: function(newTodosArr) {
        this.myTodos = newTodosArr;
        console.log(this.myTodos);
    },
    _toggleAllLoop: function(bool){
        for (let i = 0; i < this.myTodos.length; i++) {
            this.myTodos[i].completed = bool;
        }
    }
};
    
console.log('********** Todo ***********');
console.log('Nombre items: ', nbItems);
console.log('Ma Todos liste: ', todosObj.myTodos);

view.displayTodos();
view.setUpEventListeners();
// setInterval(todosObj.displayTodos, 5000); // Pour appeler automatiquement toute les 5 secondes la fonction qui affiche les Todos.

// toggleCompleted: function() {
//     let toggleCompletedButtonPositionInput = document.getElementById('toggleCompletedButtonPositionInput');
//     todosObj.toggleCompleted(toggleCompletedButtonPositionInput.valueAsNumber);
//     toggleCompletedButtonPositionInput = '';
//     view.displayTodos();
// },


