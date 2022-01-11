let valores = [];

const nombre = document.getElementById('nombre');
const empCode = document.getElementById('empCode');
const salary = document.getElementById('salary');
const city = document.getElementById('city');
const alertaNoExisteContsiner = document.getElementById('alertaNoExisteContainer');

const btnAgregar = document.getElementById('btnAgregar');

let idinput = document.getElementById('idinput');

class Usuario{
    constructor(id, nombre ,empCode,salary,city){
        this.id = id;
        this.nombre = nombre;
        this.empCode = empCode;
        this.salary = salary;
        this.city = city;

    }
}

const editar = (id) => {

    idinput =document.getElementById('idinput');
    idinput.value = id;

    const valoresLS = JSON.parse(localStorage.getItem('valores'));
    const valorLS = valoresLS.find(valor => valor.id === id);

    nombre.value = valorLS.nombre;
    empCode.value = valorLS.empCode;
    salary.value = valorLS.salary;
    city.value = valorLS.city;

    btnAgregar.innerText = 'Actualizar';
    btnAgregar.classList.remove('btn-success');
    btnAgregar.classList.add('btn-warning');


}
const eliminarPre =(id) => {
    const idEliminar = document.getElementById('idEliminar');
    idEliminar.innerText = id;
}
const eliminar = () => {

    const id = document.getElementById('idEliminar').innerText;
    

    const valoresLS = JSON.parse(localStorage.setItem('valores'));
    const valoresLSFiltrados = valoresLS.filter(valor => valor.id !== id);
    localStorage.setItem('valores',JSON.stringify(valoresLSFiltrados));
    obtenerValores();
         nombre.focus();
}

const cancelarEditar = () => {
    nombre.value ='';
    empCode.value ='';
    salary.value ='';
    city.value ='';
    idinput.value ='';

    nombre.focus();

    btnAgregar.innerText = 'Agregar';
    btnAgregar.classList.remove('btn-warning');
    btnAgregar.classList.add('btn-success');
}
const agregar = () => {

    if (nombre && nombre.value !== ''){

       if(!idinput.value){

           const user = new Usuario(uuidv4(), nombre.value, empCode.value, salary.value, city.value );

           valor = JSON.parse(localStorage.getItem('valores')) || [];
           valores.push(user);
           localStorage.setItem('valores',JSON.stringify(valores));
           obtenerValores();

           alertaNoExisteContainer.style.display = 'block';
           alertaNoExisteContainer.classList.remove('alert-warning');
           alertaNoExisteContainer.classList.remove('alert-danger');
           alertaNoExisteContainer.classList.remove('alert-success');

           alertaNoExiste.innerText = 'Registro agregado!';

           setTimeout(() => {

            alertaNoExisteContainer.style.display = 'none';
           }, 2000);

           limpieza();
         
        } else {


            const valoresLS = JSON.parse(localStorage.getItem('valores'));
            const valorLS = valoresLS.find(valor => valor.id === idinput.value);

            if(!valorLS){
                alertaNoExisteContainer.style.display = 'block';
                alertaNoExisteContainer.classList.remove('alert-success');
                alertaNoExisteContainer.classList.remove('alert-danger');
                alertaNoExisteContainer.classList.add('alert-warning');

                alertaNoExiste.innerText = 'Este usuario no existe';

                setTimeout(() =>{
                    alertaNoExisteContainer.style.display = 'none';
                },2000);


                cancelarEditar();

            } else{

                valorLS.nombre = nombre.value;
                valorLS.empCode = empCode.value;
                valorLS.salary = salary.value;
                valorLS.city =city.value;
                localStorage.setItem('valores',JSON.stringify(valoresLS));
                obtenerValores();

                alertaNoExisteContainer.style.display = 'block';
                alertaNoExisteContainer.classList.remove('alert-warning');
                alertaNoExisteContainer.classList.remove('alert-danger');
                alertaNoExisteContainer.classList.add('alert-success');

                alertaNoExiste.innerText = 'informacionactualizada!';

                setTimeout(() => {
                    alertaNoExisteContainer.style.display = 'none';
                }, 2000);
                cancelarEditar();

            }
        }

        nombre.focus();

    } else{

        alertaNoExisteContainer.style.display ='block';
        alertaNoExisteContainer.classList.remove('alert-warning');
        alertaNoExisteContainer.classList.remove('alert-success');
        alertaNoExisteContainer.classList.add('alert-danger');

        alertaNoExiste.innerText = 'Ingrese un nombre';

        setTimeout(() => {
            alertaNoExisteContainer.style.display = 'none';

        }, 2000);

        nombre.focus();
    }

}

function uuidv4() {

    return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

window.onload = () => {
    valores = JSON.parse(localStorage.getItem('valores')) || [];
    obtenerValores();
}

const obtenerValores = () =>{
    const valoresLS = JSON.parse(localStorage.getItem('valores'));

    const tabla = document.getElementById('tbodyUsuario');
    tabla.innerHTML = '';

    if (valoresLS !== null){

        valoresLS.map((valor,index) => {

            const templateRr = `<tr>
            <td>${index}</td>
            <td>${valor.nombre}</td>
            <td>${valor.empCode}</td>
            <td>${valor.Salary}</td>
            <td>${valor.city}</td>
            <td>
            <button class='btn btn-warning' onclick='editar("${valor.id}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
            </td>
            <td>
            <button class='btn btn-danger' onclick='eliminarPre("${valor.id}")' data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button> 
             </td>
         </tr>`;
         tabla.innerHTML += templateRr;

        });
    }
};

const linpieza = () => {
    nombre.value = '';
    empCode.value = '';
    salary.value = '';
    city.value = '';

}

