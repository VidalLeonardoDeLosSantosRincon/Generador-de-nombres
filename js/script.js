//setting form
let setForm = function(){
    let originTexts = ["Estados Unidos","Mexico","Argentina","Brasil","Colombia","Japon","España","Francia","Italia","Rusia"];
    let originValues = ["united states","mexico","argentina","brazil","colombia","japan","spain","france","Italy","russia"];

    for(let i in originTexts){
        document.getElementById("origen").innerHTML+=`
        <option value="${originValues[i]}">${originTexts[i]}</option>`;
    }
};
setForm();

//clases
class Interfaz{
    showMessage(type,message){
        let msg="";
        if(type && message){
            if(type==="error"){
                message.map((ms)=>{
                   msg+=`${ms}\n`;
                });
                alert(msg);
            }
        }
    }
}

let cargarNombres = function(){

    const origen =document.getElementById("origen");
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    const genero =document.getElementById("genero");
    const generoSeleccionado = genero.options[genero.selectedIndex].value;
    const cantidadNombres = document.getElementById("cantidad-nombres").value;

    const interfaz = new Interfaz();
    let msg = [];
    let minNum = 0;
    let maxNum =500;

    if(origenSeleccionado.trim()==="" && generoSeleccionado.trim()==="" && cantidadNombres.trim()===""){
        msg.push("No se ingreso un origen","No se ingreso un genero","No se ingreso la cantidad de nombres");
        interfaz.showMessage("error",msg);
    }else if(origenSeleccionado.trim()==="" && generoSeleccionado.trim()==="" && cantidadNombres.trim()!==""){
        if(isNaN(Number(cantidadNombres)*1)===true){
            msg.push("No se ingreso un origen","No se ingreso un genero","La cantidad de nombres debe ser un valor numerico");
            interfaz.showMessage("error",msg);
        }else{
            if(Number(cantidadNombres)<minNum){
                msg.push("No se ingreso un origen","No se ingreso un genero","La cantidad de nombres no debe ser un valor numerico negativo");
                interfaz.showMessage("error",msg);
            }else{
                if(Number(cantidadNombres)>maxNum){
                    msg.push("No se ingreso un origen","No se ingreso un genero",`La cantidad de nombres no debe pasar de ${maxNum}`);
                    interfaz.showMessage("error",msg);
                }else{
                    msg.push("No se ingreso un origen","No se ingreso un genero");
                    interfaz.showMessage("error",msg);
                }
            }
        }
    }else if(origenSeleccionado.trim()!=="" && generoSeleccionado.trim()==="" && cantidadNombres.trim()===""){
        msg.push("No se ingreso un genero","No se ingreso la cantidad de nombres");
        interfaz.showMessage("error",msg);
    }else if(origenSeleccionado.trim()==="" && generoSeleccionado.trim()!=="" && cantidadNombres.trim()===""){
        msg.push("No se ingreso un origen","No se ingreso la cantidad de nombres");
        interfaz.showMessage("error",msg);
    }else if(origenSeleccionado.trim()==="" && generoSeleccionado.trim()!=="" && cantidadNombres.trim()!==""){
        if(isNaN(Number(cantidadNombres)*1)===true){
            msg.push("No se ingreso un origen","La cantidad de nombres debe ser un valor numerico");
            interfaz.showMessage("error",msg);
        }else{
            if(Number(cantidadNombres)<minNum){
                msg.push("No se ingreso un origen","La cantidad de nombres no debe ser un valor numerico negativo");
                interfaz.showMessage("error",msg);
            }else{
                if(Number(cantidadNombres)>maxNum){
                    msg.push("No se ingreso un origen",`La cantidad de nombres no debe pasar de ${maxNum}`);
                    interfaz.showMessage("error",msg);
                }else{
                    msg.push("No se ingreso un origen");
                    interfaz.showMessage("error",msg);
                }
            }
        }
    }else if(origenSeleccionado.trim()!=="" && generoSeleccionado.trim()==="" && cantidadNombres.trim()!==""){
        if(isNaN(Number(cantidadNombres)*1)===true){
            msg.push("No se ingreso un genero","La cantidad de nombres debe ser un valor numerico");
            interfaz.showMessage("error",msg);
        }else{
            if(Number(cantidadNombres)<minNum){
                msg.push("No se ingreso un genero","La cantidad de nombres no debe ser un valor numerico negativo");
                interfaz.showMessage("error",msg);
            }else{
                if(Number(cantidadNombres)>maxNum){
                    msg.push("No se ingreso un genero",`La cantidad de nombres no debe pasar de ${maxNum}`);
                    interfaz.showMessage("error",msg);
                }else{
                    msg.push("No se ingreso un genero");
                    interfaz.showMessage("error",msg);
                }
            }
        }
    }else if(origenSeleccionado.trim()!=="" && generoSeleccionado.trim()!=="" && cantidadNombres.trim()===""){
        msg.push("No se ingreso la cantidad de nombres");
        interfaz.showMessage("error",msg);
    }else if(origenSeleccionado.trim()!=="" && generoSeleccionado.trim()!=="" && cantidadNombres.trim()!==""){ 
        if(isNaN(Number(cantidadNombres)*1)===true){
            msg.push("La cantidad de nombres debe ser un valor numerico");
            interfaz.showMessage("error",msg);
        }else{
            if(Number(cantidadNombres)<minNum){
                msg.push("La cantidad de nombres no debe ser un valor numerico negativo");
                interfaz.showMessage("error",msg);
            }else{
                if(Number(cantidadNombres)>maxNum){
                    msg.push(`La cantidad de nombres no debe pasar de ${maxNum}`);
                    interfaz.showMessage("error",msg);
                }else{
                    console.log("todo bien");
                    let url = `http://uinames.com/api/?region=${origenSeleccionado}&gender=${generoSeleccionado}&amount=${cantidadNombres}`;
                    let xhr;
                    window.XMLHttpRequest? xhr = new XMLHttpRequest(): xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    xhr.open("GET",url,true);
                    xhr.onload = function(){
                        if(this.status===200){
                            let res = JSON.parse(this.responseText);
                            let template="";

                            if(Array.isArray(res)==true){
                                res.forEach((person)=>{
                                    if(person.name.trim()!==""){
                                        template+=`<div class="elem">${person.name}</div>`;
                                    }else{ 
                                        template+=`<div class="elem" style="color:red;">Desconocido</div>`;
                                    }
                                });
                            }else{
                                if(res.name.trim()!==""){
                                    template+=`<div class="elem">${res.name}</div>`;
                                }else{
                                    template+=`<div class="elem" style="color:red;">Desconocido</div>`;
                                }
                            }
                            document.getElementById("name-list").innerHTML=template;
                        }
                    };
                    xhr.send();
                }
            }
        }
    }    
};

//event listeners
let btnGenerarNombres = document.querySelector("#btn-generar");
btnGenerarNombres.addEventListener("click",cargarNombres);