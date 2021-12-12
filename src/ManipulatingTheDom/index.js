import React from 'react';


const Form = ({ showed }) => {
    /* Siempre que necesitemos una variable que pueda modificarse usamos el React hook useState Obtenemos los valores escritos en los campos inputs - textareas */
    
    const [title,setTitle] = React.useState("");
    const [body,setBody] = React.useState("");

    // El React Hook useRef sirve para hacer referencia a un objeto del DOM
    const firstInput = React.useRef();

    //useEffect porque Actualizar el DOM es un efecto secundario = mandarle el foco al primer control
    React.useEffect(() => {
        if(showed) {
            console.log(firstInput);
            firstInput.current.focus();
        }
    }, [showed])

    const sendForm = (ev) => {
        ev.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userIde: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response=>response.json())
        .then(json=> console.log(json))
    }

    return (
        // Siempre usar form en un Formulario o romperiamos cosas que by default hace esta etiqueta
        // Escuchar el evento onSubmit y aqui si enviar el formulario
        <form onSubmit={ (ev)=> sendForm(ev) } >
            <div>
                <label htmlFor="title"> Title </label>
                {/* onChange Sincronizar lo que esta en el campo con la variable en este caso {setTitle} */}
                <input type="text" id="title" onChange={(ev) => setTitle(ev.target.value)} ref={firstInput} />
            </div>
            <div>
                <label htmlFor="body"> Post </label>
                <textarea id="body" onChange={(ev) => setBody(ev.target.value)}></textarea>
            </div>
            {/* Esto tambien romperia el formulario solo se enviaria la data al dar click al boton */}
            {/* <button onClick={()=> Enviar FORM }></button> */}
            <input type="submit" value="Send" />
            {/* Tambien se puede escribir asi */}
            {/* <button type="submit">Enviar</button> */}
        </form>
    )
}

const Accordion = () => {
    const [show, setShow] = React.useState(false);
    return (
        <div>
            <button onClick={() => {setShow(!show)}}>Show Form</button> 
            {show && <Form showed={show} />}
        </div>
    )
}

export {Accordion};