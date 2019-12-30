import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

class MyView4 extends PageViewElement {
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


  


  buscarActaNacimiento(){
    //numero de acta a buscar
    let nodpi = this.shadowRoot.querySelector("#numeroDeActaInput").value;
    
    //informacion a desplegar, setear a guiones al inicio
    let numeroActa        = "0000000000";
    let nombre            = "------ ------ ------- -------";
    let dpi               = "9999999910101"
    let fecha   = "-- de ----- de ----";
    let ubicacion = "Guatemala - Guatemala"

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          url: window.urlBaseDpi + '/getDpi',
          tipo: 'POST',
          parametros: {dpi: nodpi}
      })
    };

    fetch(window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      if(myJson['estado'] == 500 || myJson['codigo'] == 500){
        alert("Partida de matrimonio no encontrada.");
      }else{
        numeroActa      = myJson['noacta'] + "";
        nombre          = myJson['nombre'] + " " + myJson['apellido'];
        dpi             = myJson['dpi'];
        fecha           = myJson['fechanac'];
        ubicacion       = myJson['departamento'] + " - " + myJson['municipio'];
      }
        
      let numeroDeCeros = 10 - numeroActa.length;
      let ceros = '';
      for(let i = 1; i<= numeroDeCeros;i++) ceros += '0';

      this.shadowRoot.querySelector("#noActaDiv").innerHTML           = "No. " + ceros + numeroActa;
      this.shadowRoot.querySelector("#nombreEsposo").innerHTML        = nombre;
      this.shadowRoot.querySelector("#dpiEsposo").innerHTML           = dpi;
      this.shadowRoot.querySelector("#fechaMatrimonioDiv").innerHTML  = fecha;
      this.shadowRoot.querySelector("#lugarDiv").innerHTML            = ubicacion;
    }
    );

  }

  registrar() {
    
          
    let dpiEsposo         = this.shadowRoot.querySelector("#dpiEsposoInput").value;

    let data = JSON.stringify({
        url: window.urlBaseDpi + '/setDpi',
        tipo: 'POST',
        parametros: {numeroacta: dpiEsposo}
    });  

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: data
    };

    fetch(window.urlESB,miInit)
    .then(response => response.json())
    .then(data => {
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
          <label class="titulop">No. Acta Nacimiento:</label>    
          <input type="text" id="dpiEsposoInput" class="inputdatos">
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
              Nombre Completo:
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
          <div class="fechaNacimientoDiv" id="lugarDiv">
              Departamento - Municipio
          </div>
        </div>
        <div class="lineaform">
          <button id="btnBuscarNoDeActa" @click="${this.imprimir}">Imprimir</button>
        </div>
      </div>
    </div>
    `;
  }
}
window.customElements.define('my-view4', MyView4);
