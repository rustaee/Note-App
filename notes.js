const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach(note => addNewNote(note));
}
addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = ''){
    //Create the Div element for notes
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML= `
    <div class="tools">
        <button class="save"><i class="fas fa-save"></i></button>
        <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>`;

        //Bringing in the buttons and boxes
        const saveBtn = note.querySelector('.save');
        const editBtn = note.querySelector('.edit');
        const deletetBtn = note.querySelector('.delete');
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        main.innerHTML =  marked(text);
        textArea.value = text;

        deletetBtn.addEventListener('click' , () => {
            note.remove();
            updateLocalStorage();
        });

        editBtn.addEventListener('click' , () => {
            main.classList.add('hidden');
            textArea.classList.remove('hidden');
        });
        
        saveBtn.addEventListener('click' , () => {
            main.classList.remove('hidden');
            textArea.classList.add('hidden');
        });

        textArea.addEventListener('input', (e) => {
            const {value} = e.target;
            main.innerHTML = marked(value);            
            updateLocalStorage();
        })


        document.body.appendChild(note);
}

function updateLocalStorage(){
    const noteTexts = document.querySelectorAll('textarea');
    const notes = [];
    noteTexts.forEach(note => notes.push(note.value))
    localStorage.setItem('notes', JSON.stringify(notes));
}