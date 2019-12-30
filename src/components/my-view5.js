
import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView5 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
      
      #formulario{
        width: 60%;
        margin: auto;
      }
      
      #marcoAgregar{
        border: outset;
        margin-top: 20px;
        padding-top: 20px;
        padding-bottom: 30px;
      }

      #marcoVer{
        border: outset;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 20px;
        padding-bottom: 30px;
      }

      #visor{
        width: 90%;
        margin: auto;
        height: 380px;
        background-image: url('../images/renap_images/matrimonio_bg.jpg');
        background-size: 100% 100%;
        background-position:center;
        background-repeat:no-repeat;
      }

      #btnRegistrar{
        background-color: #E91E63;
        border: none;
        margin: auto;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 100%;
      }

      #btnBuscarNoDeActa{
        background-color: #E91E63;
        border: none;
        margin: auto;
        color: white;
        padding: 4px 3px;
        float: right;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        width: 20%;
      }

      .lineaform{
        height: 30px;
        width: 90%;
        margin: auto;
      }

      .lineaform2{
        height: 30px;
        width: 80%;
        margin: auto;
        margin-right: 5%;
      }

      .titulop{
        width: 28%;
        float: left;
        margin: 0;
      }

      .inputdatos{
        float: right;
        margin: 0;
        width: 70%;
      }
      
      .inputdatos2{
        float: left;
        margin: 0;
        width: 50%;
      }

      .lineaNoDiv{
        width: 80%;
        height: 10%;
        margin: auto;
        padding-top: 8%;
      }

      .padreDiv{
        width: 50%;
        float: left;
      }

      .madreDiv{
        width: 50%;
        float: right;
      }

      .nombrePadreDiv{
        width: 60%;
        margin: auto;
        font-size: 100%;
        font-family: -webkit-body;
        text-align: center;
      }

      .apellidoPadreDiv{
        width: 60%;
        margin: auto;
        font-size: 100%;
        font-family: -webkit-body;
        text-align: center;
      }

      .dpiPadreDiv{
        width: 60%;
        margin: auto;
        color: cadetblue;
        font-family: -webkit-body;
        font-weight: bold;
        text-align: center;
      }

      .lineaPersonaDiv{
        width: 80%;
        height: 24%;
        margin: auto;
      }

      .nombreDiv{
        font-family: Palatino Linotype;
        font-weight: bold;
        font-size: xx-large;
        text-align: left;
        padding-left: 20px;
      }

      .dpiDiv{
        padding-left: 25px;
        color: blue;
        font-size: x-small;
      }

      .lugarNacimientoDiv, .fechaNacimientoDiv, .sexoDiv{
        text-align: center;
        font-family: -webkit-pictograph;
      }

      .divbotones{
        height: 25px;
        width: 90%;
        margin: auto;
      }

      .btnSA{
        background-color: #E91E63;
        border: none;
        margin: auto;
        color: white;
        padding: 4px 3px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        width: 45%;
      }

      #btnSA1{
        float: left;
      }

      #btnSA2{
        float: right;
      }
      `
      
    ];
  }

  buscarEsposa(){
    let dpiEsposa   = this.shadowRoot.querySelector("#dpiEsposaInput").value;
    let nombre      = this.shadowRoot.querySelector("#nombreEsposaInput");
    let apellido    = this.shadowRoot.querySelector("#apellidoEsposaInput");
    
    if(dpiEsposa == "") return;

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url:  window.urlBaseDpi + '/getDpi',
        tipo: 'POST',
        parametros:{dpi: dpiEsposa}
      })
    };

    fetch(window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      if(myJson['estado'] == 500 || myJson['codigo'] == 500){
        nombre.value = 'No existe persona con ese DPI.';
        apellido.value = 'No existe persona con ese DPI.';
      }else if(myJson['genero']=='M'){
        nombre.value = 'Dpi de hombre.';
        apellido.value = 'Dpi de hombre.';
      }else if(myJson['estadocivil'] != 'C'){
        nombre.value    = 'Persona esta soltera.';
        apellido.value  = 'Persona esta soltera.';
      }else{
        nombre.value = myJson['nombre'];
        apellido.value = myJson['apellido'];
      }

    }
    );

  }

  imprimir(){
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
    doc.fromHTML(this.shadowRoot.querySelector("#visor"), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
  }


  buscarEsposo(){
    let dpiEsposo   = this.shadowRoot.querySelector("#dpiEsposoInput").value;
    let nombre      = this.shadowRoot.querySelector("#nombreEsposoInput");
    let apellido    = this.shadowRoot.querySelector("#apellidoEsposoInput");
    
    if(dpiEsposo == "") return;

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.urlBaseDpi + '/getDpi',
        tipo: 'POST',
        parametros: {dpi: dpiEsposo}
      })
    };

    fetch(window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      if(myJson['estado'] == 500 || myJson['codigo'] == 500){
        nombre.value = 'No existe persona con ese DPI.';
        apellido.value = 'No existe persona con ese DPI.';
      }else if(myJson['genero']=='F'){
        nombre.value = 'Dpi de mujer.';
        apellido.value = 'Dpi de mujer.';
      }
      else if(myJson['estadocivil'] != 'C'){
        nombre.value    = 'Persona esta soltera.';
        apellido.value  = 'Persona esta soltera.';
      }else{
        nombre.value = myJson['nombre'];
        apellido.value = myJson['apellido'];
      }

    }
    );

  }


  buscarActaNacimiento(){
    //numero de acta a buscar
    let noActa = this.shadowRoot.querySelector("#numeroDeActaInput").value;
    
    //informacion a desplegar, setear a guiones al inicio
    let numeroActa        = "0000000000";
    let nombreEsposo      = "------ ------ ------- -------";
    let dpiEsposo         = "-------------";
    let nombreEsposa      = "------ ------ ------- -------";
    let dpiEsposa         = "-------------";
    let lugarMatrimonio   = "********* - *********";
    let fechaMatrimonio   = "-- de ----- de ----";

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.urlBaseDivorcio + '/getDivorcios',
        tipo: 'POST',
        parametros: {dpi: noActa}
      })
    };

    fetch(window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
        this.contador = 0;
        this.limiteSuperior = 1;
      if(myJson.mensaje == "Partida no registrada."){
        alert("Partida de matrimonio no encontrada.");
      }else{
        this.limiteSuperior = myJson.length - 1;
        this.actas = myJson;
        numeroActa      = myJson['nodivorcio'] + "";
        nombreEsposo    = myJson['nombrehombre'] + " " + myJson['apellidohombre'];
        dpiEsposo       = myJson['dpihombre'];
        nombreEsposa    = myJson['nombremujer'] + " " + myJson['apellidomujer'];
        dpiEsposa       = myJson['dpimujer'];
        fechaMatrimonio = myJson['fecha'];
      }
        
      let numeroDeCeros = 10 - numeroActa.length;
      let ceros = '';
      for(let i = 1; i<= numeroDeCeros;i++) ceros += '0';

      this.shadowRoot.querySelector("#noActaDiv").innerHTML           = "No. " + ceros + numeroActa;
      this.shadowRoot.querySelector("#dpiEsposo").innerHTML           = dpiEsposo;
      this.shadowRoot.querySelector("#nombreEsposo").innerHTML        = nombreEsposo;
      this.shadowRoot.querySelector("#dpiEsposa").innerHTML           = dpiEsposa;
      this.shadowRoot.querySelector("#nombreEsposa").innerHTML        = nombreEsposa;
      this.shadowRoot.querySelector("#lugarMatrimonioDiv").innerHTML  = lugarMatrimonio;
      this.shadowRoot.querySelector("#fechaMatrimonioDiv").innerHTML  = fechaMatrimonio;
      
    }
    );

  }


  partidaAnterior(){
    let numeroActa        = "0000000000";
    let nombreEsposo      = "------ ------ ------- -------";
    let dpiEsposo         = "-------------";
    let nombreEsposa      = "------ ------ ------- -------";
    let dpiEsposa         = "-------------";
    let lugarMatrimonio   = "********* - *********";
    let fechaMatrimonio   = "-- de ----- de ----";

    if(this.contador > 0)
    {
        this.contador--;
        numeroActa      = this.actas[this.contador]['nodivorcio'] + "";
        nombreEsposo    = this.actas[this.contador]['nombrehombre'] + " " + this.actas[this.contador]['apellidohombre'];
        dpiEsposo       = this.actas[this.contador]['dpihombre'];
        nombreEsposa    = this.actas[this.contador]['nombremujer'] + " " + this.actas[this.contador]['apellidomujer'];
        dpiEsposa       = this.actas[this.contador]['dpimujer'];
        fechaMatrimonio = this.actas[this.contador]['fecha'];
      
        
      let numeroDeCeros = 10 - numeroActa.length;
      let ceros = '';
      for(let i = 1; i<= numeroDeCeros;i++) ceros += '0';

      this.shadowRoot.querySelector("#noActaDiv").innerHTML           = "No. " + ceros + numeroActa;
      this.shadowRoot.querySelector("#dpiEsposo").innerHTML           = dpiEsposo;
      this.shadowRoot.querySelector("#nombreEsposo").innerHTML        = nombreEsposo;
      this.shadowRoot.querySelector("#dpiEsposa").innerHTML           = dpiEsposa;
      this.shadowRoot.querySelector("#nombreEsposa").innerHTML        = nombreEsposa;
      this.shadowRoot.querySelector("#lugarMatrimonioDiv").innerHTML  = lugarMatrimonio;
      this.shadowRoot.querySelector("#fechaMatrimonioDiv").innerHTML  = fechaMatrimonio;
    }
}


partidaSiguiente(){
    let numeroActa        = "0000000000";
    let nombreEsposo      = "------ ------ ------- -------";
    let dpiEsposo         = "-------------";
    let nombreEsposa      = "------ ------ ------- -------";
    let dpiEsposa         = "-------------";
    let lugarMatrimonio   = "********* - *********";
    let fechaMatrimonio   = "-- de ----- de ----";

    if(this.contador < this.limiteSuperior)
    {
        this.contador++;
        numeroActa      = this.actas[this.contador]['nodivorcio'] + "";
        nombreEsposo    = this.actas[this.contador]['nombrehombre'] + " " + this.actas[this.contador]['apellidohombre'];
        dpiEsposo       = this.actas[this.contador]['dpihombre'];
        nombreEsposa    = this.actas[this.contador]['nombremujer'] + " " + this.actas[this.contador]['apellidomujer'];
        dpiEsposa       = this.actas[this.contador]['dpimujer'];
        fechaMatrimonio = this.actas[this.contador]['fecha'];
      
        
      let numeroDeCeros = 10 - numeroActa.length;
      let ceros = '';
      for(let i = 1; i<= numeroDeCeros;i++) ceros += '0';

      this.shadowRoot.querySelector("#noActaDiv").innerHTML           = "No. " + ceros + numeroActa;
      this.shadowRoot.querySelector("#dpiEsposo").innerHTML           = dpiEsposo;
      this.shadowRoot.querySelector("#nombreEsposo").innerHTML        = nombreEsposo;
      this.shadowRoot.querySelector("#dpiEsposa").innerHTML           = dpiEsposa;
      this.shadowRoot.querySelector("#nombreEsposa").innerHTML        = nombreEsposa;
      this.shadowRoot.querySelector("#lugarMatrimonioDiv").innerHTML  = lugarMatrimonio;
      this.shadowRoot.querySelector("#fechaMatrimonioDiv").innerHTML  = fechaMatrimonio;
    }
}
  registrar() {
          
    let dpiEsposo         = this.shadowRoot.querySelector("#dpiEsposoInput").value;
    let nombreEsposo      = this.shadowRoot.querySelector("#nombreEsposoInput").value;
    let apellidoEsposo    = this.shadowRoot.querySelector("#apellidoEsposoInput").value;
    let dpiEsposa         = this.shadowRoot.querySelector("#dpiEsposaInput").value;
    let nombreEsposa      = this.shadowRoot.querySelector("#nombreEsposaInput").value;
    let apellidoEsposa    = this.shadowRoot.querySelector("#apellidoEsposaInput").value;
    let fechaMatrimonio   = this.shadowRoot.querySelector("#fechaMatrimonioInput").value;

    let realFecha = fechaMatrimonio.split('-');
    fechaMatrimonio = realFecha[2] + '-' + realFecha[1] + '-' + realFecha[0];


    if(/^\d\d\d\d\d\d\d\d\d\d\d\d\d/.test(dpiEsposa) == false){
      alert("El dpi del esposo no cumple con el formato indicado.");
      return;
    }

    if(nombreEsposo == 'No existe persona con ese DPI.' 
      || nombreEsposo == 'Dpi de mujer.'
      || nombreEsposo == 'Persona esta soltera.'){
      alert("El dpi del esposo es incorrecto.");
      return;
    }
    if(apellidoEsposo == 'No existe persona con ese DPI.' || apellidoEsposo == 'Dpi de mujer.'){
      alert("El dpi del esposo es incorrecto.");
      return;
    }
    if(/^\d\d\d\d\d\d\d\d\d\d\d\d\d/.test(dpiEsposa) == false){
      alert("El dpi de la madre no cumple con el formato indicado.");
      return;
    }
    if(nombreEsposa == 'No existe persona con ese DPI.' 
      || nombreEsposa == 'Dpi de hombre.'
      || nombreEsposa == 'Persona esta soltera.'){
      alert("El dpi de la esposa es incorrecto.");
      return;
    }
    if(apellidoEsposa == 'No existe persona con ese DPI.' || apellidoEsposa == 'Dpi de hombre.'){
      alert("El dpi de la esposa es incorrecto.");
      return;
    }

    let data = JSON.stringify(
      {     
        url: window.urlBaseDivorcio + '/setDivorcio',
        tipo: 'POST',   
        parametros:{
          dpihombre:            dpiEsposo,
          nombrehombre:         nombreEsposo,
          apellidohombre:       apellidoEsposo,
          dpimujer:             dpiEsposa,
          nombremujer:          nombreEsposa,
          apellidomujer:        apellidoEsposa,
          fecha:                fechaMatrimonio
        }
      }
    );  

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: data
    };

    fetch(window.urlESB, miInit)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      if(data.estado == 200){
        alert(data.mensaje);
      }
      else{
        alert(data.mensaje);
      }

    }
    );
  }


  render() {
    return html`
     <div id="formulario">
      <div id="marcoAgregar">
        <div class="lineaform">
          <label class="titulop">DPI Esposo:</label>    
          <input type="text" id="dpiEsposoInput" class="inputdatos" @focusout="${this.buscarEsposo}">
        </div>
        <div class="lineaform2">
          <label class="titulop">Nombre Esposo:</label>    
          <input type="text" id="nombreEsposoInput" class="inputdatos">
        </div>
        <div class="lineaform2">
          <label class="titulop">Apellido Esposo:</label>    
          <input type="text" id="apellidoEsposoInput" class="inputdatos">
        </div>
        <div class="lineaform">
          <label class="titulop">DPI Esposa:</label>    
          <input type="text" id="dpiEsposaInput" class="inputdatos" @focusout="${this.buscarEsposa}">
        </div>
        <div class="lineaform2">
          <label class="titulop">Nombre Esposa:</label>    
          <input type="text" id="nombreEsposaInput" class="inputdatos">
        </div>
        <div class="lineaform2">
          <label class="titulop">Apellido Esposa:</label>    
          <input type="text" id="apellidoEsposaInput" class="inputdatos">
        </div>      
        <div class="lineaform">
          <label class="titulop">Fecha Divorcio:</label>    
          <input type="date" id="fechaMatrimonioInput" class="inputdatos">
        </div>
        <div class="lineaform">
          <button id="btnRegistrar" @click="${this.registrar}">Registrar</button>
        </div>
      </div>

      <div id="marcoVer">
        <div class="lineaform">
          <label class="titulop">Numero de Acta: </label>    
          <input type="text" id="numeroDeActaInput" class="inputdatos2">
          <button id="btnBuscarNoDeActa" @click="${this.buscarActaNacimiento}">Buscar</button>
        </div>
        <div id="visor">
          <div class="lineaNoDiv" id="noActaDiv">
            no. 000000000000
          </div>
          <div class="lineaPersonaDiv">
            <div class="rolDiv">
              Esposo:
            </div>
            <div class="nombreDiv" id="nombreEsposo">
              Nombre Nombre Apellido Apellido
            </div>
            <div class="dpiDiv" id="dpiEsposo">
              0000000100101
            </div>            
          </div>
          <div class="lineaPersonaDiv">
            <div class="rolDiv">
              Esposa:
            </div>
            <div class="nombreDiv" id="nombreEsposa">
              Nombre Nombre Apellido Apellido
            </div>
            <div class="dpiDiv" id="dpiEsposa">
              0000000100101
            </div>            
          </div>
          <div class="lugarNacimientoDiv" id="lugarMatrimonioDiv">
              Departamento - Municipio 
            </div>
            <div class="fechaNacimientoDiv" id="fechaMatrimonioDiv">
              dia de Mes de Año
          </div>
        </div>
        <div class="divbotones">
          <button class="btnSA" id="btnSA1" @click="${this.partidaAnterior}">Anterior</button>
          <button class="btnSA" id="btnSA2" @click="${this.partidaSiguiente}">Siguiente</button>
        </div>
        <div class="lineaform">
          <button id="btnBuscarNoDeActa" @click="${this.imprimir}">Imprimir</button>
        </div>
      </div>
    </div>
    `;
  }
}
window.customElements.define('my-view5', MyView5);
