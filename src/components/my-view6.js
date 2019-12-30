
import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

class MyView6 extends PageViewElement {
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
        padding-top: 20px;
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

      .lugarNacimientoDiv, .sexoDiv{
        text-align: center;
        font-family: -webkit-pictograph;
      }

      .fechaNacimientoDiv, .sexoDiv{
        text-align: center;
        font-family: -webkit-pictograph;
        padding-top: 40px;
      }
      `
      
    ];
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

    fetch( window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      if(myJson['estado'] == 500 || myJson['codigo'] == 500){
        nombre.value = 'No existe persona con ese DPI.';
        apellido.value = 'No existe persona con ese DPI.';
      }else if(myJson['defuncion'] != -1){
        nombre.value = 'Persona fallecida.';
        apellido.value = 'Persona fallecida.';
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
    let nombre            = "------ ------ ------- -------";
    let dpi               = "9999999910101"
    let tipo              = "Tipo: ----";

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.urlBaseLicencia + '/getLicencia',
        tipo: 'POST',
        parametros: {dpi: noActa}
      })
    };

    fetch(window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      if(myJson['estado'] == 500 || myJson['codigo'] == 500){
        alert("Partida de defuncion no encontrada.");
      }else{
        numeroActa      = myJson['nolicencia'] + "";
        nombre          = myJson['nombre'] + " " + myJson['apellido'];
        dpi             = myJson['dpi'];
        tipo            = "Tipo: " + myJson['tipo'];
      }
        
      let numeroDeCeros = 10 - numeroActa.length;
      let ceros = '';
      for(let i = 1; i<= numeroDeCeros;i++) ceros += '0';

      this.shadowRoot.querySelector("#noActaDiv").innerHTML           = "No. " + ceros + numeroActa;
      this.shadowRoot.querySelector("#nombreEsposo").innerHTML        = nombre;
      this.shadowRoot.querySelector("#dpiEsposo").innerHTML           = dpi;
      this.shadowRoot.querySelector("#fechaMatrimonioDiv").innerHTML  = tipo;
      
    }
    );

  }

  registrar() {
    let selector_tipo           = this.shadowRoot.querySelector("#tipoInput");
    let tipaso                  = selector_tipo.options[selector_tipo.selectedIndex].value;
          
    let dpiEsposo         = this.shadowRoot.querySelector("#dpiEsposoInput").value;
    let nombreEsposo      = this.shadowRoot.querySelector("#nombreEsposoInput").value;
    let apellidoEsposo    = this.shadowRoot.querySelector("#apellidoEsposoInput").value;

    
    if(/^\d\d\d\d\d\d\d\d\d\d\d\d\d/.test(dpiEsposo) == false){
      alert("El dpi del esposo no cumple con el formato indicado.");
      return;
    }

    if(nombreEsposo == 'No existe persona con ese DPI.' 
      || nombreEsposo == 'Persona fallecida.'){
      alert("El dpi del esposo es incorrecto.");
      return;
    }
    if(apellidoEsposo == 'No existe persona con ese DPI.' 
    || apellidoEsposo == 'Persona fallecida.'){
      alert("El dpi del esposo es incorrecto.");
      return;
    }
   

    let data = JSON.stringify({
      url: window.urlBaseLicencia + '/setLicencia',
      tipo: 'POST',      
      parametros: {        
        dpi:                      dpiEsposo,
        tipo:                     tipaso,
        anosantiguedad:           apellidoEsposo
      }
    });  

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
        alert(data.mensaje);
    });

    console.log(data);
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

  render() {
    return html`
     <div id="formulario">
      <div id="marcoAgregar">
        <div class="lineaform">
          <label class="titulop">DPI:</label>    
          <input type="text" id="dpiEsposoInput" class="inputdatos" @focusout="${this.buscarEsposo}">
        </div>
        <div class="lineaform2">
          <label class="titulop">Nombre:</label>    
          <input type="text" id="nombreEsposoInput" class="inputdatos">
        </div>
        <div class="lineaform2">
          <label class="titulop">Apellido:</label>    
          <input type="text" id="apellidoEsposoInput" class="inputdatos">
        </div>       
        <div class="lineaform">
          <label class="titulop">Fecha:</label>    
          <select id="tipoInput" class="inputdatos">
            <option value="M">Moto</option>
            <option value="C">Carro</option>
            <option value="A">Carro A</option>
            <option value="B">Carro B</option>
          </select>
        </div>
        <div class="lineaform">
          <button id="btnRegistrar" @click="${this.registrar}">Registrar</button>
        </div>
        <br>
        <div class="lineaform">
          <button id="btnRegistrar" @click="${this.actualizar}">Actualizar</button>
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
              Nombre del Portador:
            </div>
            <div class="nombreDiv" id="nombreEsposo">
              Nombre Nombre Apellido Apellido
            </div>
            <div class="dpiDiv" id="dpiEsposo">
              0000000100101
            </div>            
          </div>
          
            <div class="fechaNacimientoDiv" id="fechaMatrimonioDiv">
              dia de Mes de Año
          </div>
        </div>
        <div id="editor"></div>
        <div class="lineaform">
          <button id="btnBuscarNoDeActa" @click="${this.imprimir}">Imprimir</button>
        </div>
      </div>
    </div>
    `;
  }
}
window.customElements.define('my-view6', MyView6);
