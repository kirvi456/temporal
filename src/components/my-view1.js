
import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView1 extends PageViewElement {
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
        height: 350px;
        background-image: url('../images/renap_images/nacimiento_bg.jpg');
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

      .lineaPadresDiv{
        margin: auto;
        width: 90%;
        height: 25%;
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
        width: 90%;
        height: 40%;
        padding-top: 4%;
        margin: auto;
      }

      .nombreDiv{
        text-align: center;
        font-family: Palatino Linotype;
        font-weight: bold;
        font-size: xx-large;
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

  buscarMadre(){
    let dpiMadre = this.shadowRoot.querySelector("#dpiMadreInput").value;
    let nombre = this.shadowRoot.querySelector("#nombreMadreInput");
    let apellido = this.shadowRoot.querySelector("#apellidoMadreInput");
    
    if(dpiMadre == "") return;

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json',
        'mode':'no-cors',
        'Access-Control-Allow-Origin': '*'

      },
      body: JSON.stringify({
        url: window.urlBaseDpi + '/getDpi',
        tipo: 'POST',
        parametros: {dpi: dpiMadre}
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
      }else{
        nombre.value = myJson['nombre'];
        apellido.value = myJson['apellido'];
      }

    }
    );

  }


  buscarPadre(){
    let dpiPadre = this.shadowRoot.querySelector("#dpiPadreInput").value;
    let nombre = this.shadowRoot.querySelector("#nombrePadreInput");
    let apellido = this.shadowRoot.querySelector("#apellidoPadreInput");
    
    if(dpiPadre == "") return;

    var miInit = { 
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.urlBaseDpi + '/getDpi',
        tipo: 'POST',
        parametros:{dpi: dpiPadre}
      })

    };

    fetch(window.urlESB, miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
      if(myJson['estado'] == 500 || myJson['codigo'] == 500){
        nombre.value = 'No existe persona con ese DPI.';
        apellido.value = 'No existe persona con ese DPI.';
      }else if(myJson['genero']=='F'){
        nombre.value = 'Dpi de mujer.';
        apellido.value = 'Dpi de mujer.';
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
    let nombrePadre     = "------ ------";
    let apellidoPadre   = "------ ------";
    let dpiPadre        = "-------------";
    let nombreMadre     = "------ ------";
    let apellidoMadre   = "------ ------";
    let dpiMadre        = "-------------";
    let nombre          = "------ ------ ------ -------";
    let lugarNac        = "********* - *********";
    let fechaNac        = "-- de ----- de ----";
    let genero          = "---------";

    let data = JSON.stringify({
        url: window.urlBase + '/getNacimiento',
        tipo: 'POST',
        parametros: {dpipadremadre: noActa}
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
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      if(myJson.length == 0){
        alert("Partida de nacimiento no encontrada.");
      }else{
        this.ArregoDeHijos  = myJson;
        this.limiteInf      = 0;
        this.limiteSup      = myJson.length - 1;
        this.contador       = 0;
        nombrePadre   = myJson[0]['nombrepadre'];
        apellidoPadre = myJson[0]['apellidopadre'];
        dpiPadre      = myJson[0]['dpipadre'];
        nombreMadre   = myJson[0]['nombremadre'];
        apellidoMadre = myJson[0]['apellidomadre'];
        dpiMadre      = myJson[0]['dpimadre'];
        nombre        = myJson[0]['nombre'] + " " + myJson[0]['apellido'];
        lugarNac      = myJson[0]['departamento'] + " - " + myJson[0]['municipio'];
        fechaNac      = myJson[0]['fechanac'];
        genero        = (myJson[0]['genero'] == "F")? "Femenino":"Masculino";
      }
        
      this.shadowRoot.querySelector("#nombrePadreDiv").innerHTML      = nombrePadre;
      this.shadowRoot.querySelector("#apellidoPadreDiv").innerHTML    = apellidoPadre;
      this.shadowRoot.querySelector("#dpiPadreDiv").innerHTML         = dpiPadre;
      this.shadowRoot.querySelector("#nombreMadreDiv").innerHTML      = nombreMadre;
      this.shadowRoot.querySelector("#apellidoMadreDiv").innerHTML    = apellidoMadre;
      this.shadowRoot.querySelector("#dpiMadreDiv").innerHTML         = dpiMadre;
      this.shadowRoot.querySelector("#nombreDiv").innerHTML           = nombre;
      this.shadowRoot.querySelector("#lugarNacimientoDiv").innerHTML  = lugarNac;
      this.shadowRoot.querySelector("#fechaNacimientoDiv").innerHTML  = fechaNac;
      this.shadowRoot.querySelector("#sexoDiv").innerHTML             = genero;
      
    }
    );

  }

  partidaSiguiente(){

    let nombrePadre     = "------ ------";
    let apellidoPadre   = "------ ------";
    let dpiPadre        = "-------------";
    let nombreMadre     = "------ ------";
    let apellidoMadre   = "------ ------";
    let dpiMadre        = "-------------";
    let nombre          = "------ ------ ------ -------";
    let lugarNac        = "********* - *********";
    let fechaNac        = "-- de ----- de ----";
    let genero          = "---------";

    if(this.contador < this.limiteSup){
      this.contador++;
      nombrePadre   = this.ArregoDeHijos[this.contador]['nombrepadre'];
      apellidoPadre = this.ArregoDeHijos[this.contador]['apellidopadre'];
      dpiPadre      = this.ArregoDeHijos[this.contador]['dpipadre'];
      nombreMadre   = this.ArregoDeHijos[this.contador]['nombremadre'];
      apellidoMadre = this.ArregoDeHijos[this.contador]['apellidomadre'];
      dpiMadre      = this.ArregoDeHijos[this.contador]['dpimadre'];
      nombre        = this.ArregoDeHijos[this.contador]['nombre'] + " " + this.ArregoDeHijos[this.contador]['apellido'];
      lugarNac      = this.ArregoDeHijos[this.contador]['departamento'] + " - " + this.ArregoDeHijos[this.contador]['municipio'];
      fechaNac      = this.ArregoDeHijos[this.contador]['fechanac'];
      genero        = (this.ArregoDeHijos[this.contador]['genero'] == "F")? "Femenino":"Masculino";
          
      this.shadowRoot.querySelector("#nombrePadreDiv").innerHTML      = nombrePadre;
      this.shadowRoot.querySelector("#apellidoPadreDiv").innerHTML    = apellidoPadre;
      this.shadowRoot.querySelector("#dpiPadreDiv").innerHTML         = dpiPadre;
      this.shadowRoot.querySelector("#nombreMadreDiv").innerHTML      = nombreMadre;
      this.shadowRoot.querySelector("#apellidoMadreDiv").innerHTML    = apellidoMadre;
      this.shadowRoot.querySelector("#dpiMadreDiv").innerHTML         = dpiMadre;
      this.shadowRoot.querySelector("#nombreDiv").innerHTML           = nombre;
      this.shadowRoot.querySelector("#lugarNacimientoDiv").innerHTML  = lugarNac;
      this.shadowRoot.querySelector("#fechaNacimientoDiv").innerHTML  = fechaNac;
      this.shadowRoot.querySelector("#sexoDiv").innerHTML             = genero;
    }
  }

  partidaAnterior(){

    let nombrePadre     = "------ ------";
    let apellidoPadre   = "------ ------";
    let dpiPadre        = "-------------";
    let nombreMadre     = "------ ------";
    let apellidoMadre   = "------ ------";
    let dpiMadre        = "-------------";
    let nombre          = "------ ------ ------ -------";
    let lugarNac        = "********* - *********";
    let fechaNac        = "-- de ----- de ----";
    let genero          = "---------";

    if(this.contador > 0){
      this.contador--;
      nombrePadre   = this.ArregoDeHijos[this.contador]['nombrepadre'];
      apellidoPadre = this.ArregoDeHijos[this.contador]['apellidopadre'];
      dpiPadre      = this.ArregoDeHijos[this.contador]['dpipadre'];
      nombreMadre   = this.ArregoDeHijos[this.contador]['nombremadre'];
      apellidoMadre = this.ArregoDeHijos[this.contador]['apellidomadre'];
      dpiMadre      = this.ArregoDeHijos[this.contador]['dpimadre'];
      nombre        = this.ArregoDeHijos[this.contador]['nombre'] + " " + this.ArregoDeHijos[this.contador]['apellido'];
      lugarNac      = this.ArregoDeHijos[this.contador]['departamento'] + " - " + this.ArregoDeHijos[this.contador]['municipio'];
      fechaNac      = this.ArregoDeHijos[this.contador]['fechanac'];
      genero        = (this.ArregoDeHijos[this.contador]['genero'] == "F")? "Femenino":"Masculino";
          
      this.shadowRoot.querySelector("#nombrePadreDiv").innerHTML      = nombrePadre;
      this.shadowRoot.querySelector("#apellidoPadreDiv").innerHTML    = apellidoPadre;
      this.shadowRoot.querySelector("#dpiPadreDiv").innerHTML         = dpiPadre;
      this.shadowRoot.querySelector("#nombreMadreDiv").innerHTML      = nombreMadre;
      this.shadowRoot.querySelector("#apellidoMadreDiv").innerHTML    = apellidoMadre;
      this.shadowRoot.querySelector("#dpiMadreDiv").innerHTML         = dpiMadre;
      this.shadowRoot.querySelector("#nombreDiv").innerHTML           = nombre;
      this.shadowRoot.querySelector("#lugarNacimientoDiv").innerHTML  = lugarNac;
      this.shadowRoot.querySelector("#fechaNacimientoDiv").innerHTML  = fechaNac;
      this.shadowRoot.querySelector("#sexoDiv").innerHTML             = genero;
    }
  }

  registrar() {
    let selector_departamento   = this.shadowRoot.querySelector("#departamentoInput");
    let depto                   = selector_departamento.options[selector_departamento.selectedIndex].value;
    let selector_municipio      = this.shadowRoot.querySelector("#municipioInput");
    let muni                    = selector_municipio.options[selector_municipio.selectedIndex].value;
    let selector_genero         = this.shadowRoot.querySelector("#generoInput");
    let genero                  = selector_genero.options[selector_genero.selectedIndex].value;
    
    let nombre =          this.shadowRoot.querySelector("#nombreInput").value;
    let apellido =        this.shadowRoot.querySelector("#apellidoInput").value;        
    let dpiPadre =        this.shadowRoot.querySelector("#dpiPadreInput").value;
    let nombrePadre =     this.shadowRoot.querySelector("#nombrePadreInput").value;
    let apellidoPadre =   this.shadowRoot.querySelector("#apellidoPadreInput").value;
    let dpiMadre =        this.shadowRoot.querySelector("#dpiMadreInput").value;
    let nombreMadre =     this.shadowRoot.querySelector("#nombreMadreInput").value;
    let apellidoMadre =   this.shadowRoot.querySelector("#apellidoMadreInput").value;
    let fechaNacimiento = this.shadowRoot.querySelector("#fechaNacimientoInput").value;

    let realFecha = fechaNacimiento.split('-');
    fechaNacimiento = realFecha[2] + '-' + realFecha[1] + '-' + realFecha[0];

    if(/^[a-zA-ZñÑ ]+$/.test(nombre) == false){
      alert("Nombre no valido.");
      return;
    }
    if(/^[a-zA-ZñÑ ]+$/.test(apellido) == false){
      alert("Nombre no valido.");
      return;
    }
    if(/^\d\d\d\d\d\d\d\d\d\d\d\d\d/.test(dpiPadre) == false){
      alert("El dpi del padre no cumple con el formato indicado.");
      return;
    }
    if(nombrePadre == 'No existe persona con ese DPI.' || nombrePadre == 'Dpi de mujer.'){
      alert("El dpi del padre es incorrecto.");
      return;
    }
    if(apellidoPadre == 'No existe persona con ese DPI.' || apellidoPadre == 'Dpi de mujer.'){
      alert("El dpi del padre es incorrecto.");
      return;
    }
    if(/^\d\d\d\d\d\d\d\d\d\d\d\d\d/.test(dpiMadre) == false){
      alert("El dpi del padre no cumple con el formato indicado.");
      return;
    }
    if(nombreMadre == 'No existe persona con ese DPI.' || nombreMadre == 'Dpi de hombre.'){
      alert("El dpi de la madre es incorrecto.");
      return;
    }
    if(apellidoMadre == 'No existe persona con ese DPI.' || apellidoMadre == 'Dpi de hombre.'){
      alert("El dpi de la madre es incorrecto.");
      return;
    }

    let data = JSON.stringify({
      url: window.urlBase + '/setNacimiento',
      tipo: 'POST',
      parametros: {
        nombre:           nombre,
        apellido:         apellido,        
        dpipadre:         dpiPadre,
        nombrepadre:      nombrePadre,
        apellidopadre:    apellidoPadre,
        dpimadre:         dpiMadre,
        nombremadre:      nombreMadre,
        apellidomadre:    apellidoMadre,
        fechanac:         fechaNacimiento,
        departamento:     depto,
        municipio:        muni,
        genero:           genero,
        dpi:              "",
        matrimonio:       [],
        defuncion:        -1,
        divorcios:        [],
        licencias:        []
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
      if(data.estado == 200){
        alert(data.mensaje);
      }
      else{
        alert(data.mensaje);
      }

    }
    );

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
  meterMunicipios(){
    let selector = this.shadowRoot.querySelector("#departamentoInput");
    let selector_municipios = this.shadowRoot.querySelector("#municipioInput");
    let depto = selector.options[selector.selectedIndex].text;
    let municipios = '';
    if(depto == "Guatemala"){
      municipios = `
      <option value="01">Guatemala</option>
      <option value="02">Santa Catarina Pinula</option>      
      <option value="03">San Jose Pinula</option>      
      <option value="04">San Jose del Golfo</option>
      <option value="05">Palencia</option>
      <option value="06">Chinautla</option>
      <option value="07">San Pedro Ayampuc</option>      
      <option value="08">Mixco</option>
      <option value="09">San Pedro Sacatepequez</option>
      <option value="10">San Juan Sacatepequez</option>
      <option value="11">San Raymundo</option>      
      <option value="12">Chuarrancho</option>
      <option value="13">Fraijanes</option>
      <option value="14">Amatitlan</option>      
      <option value="15">Villa Nueva</option>      
      <option value="16">Villa Canales</option>      
      <option value="17">San Miguel Petapa</option>      
      `;
    }
    if(depto == "El Progreso"){
      municipios = `
      <option value="01">Guastatoya</option>
      <option value="02">Morazan</option>
      <option value="03">S. Agustín Acasaguastlan</option>
      <option value="04">San Cristobal Acasaguastlan</option>
      <option value="05">El Jicaro</option>      
      <option value="06">Sansare</option>      
      <option value="07">Sanarate</option>      
      <option value="08">San Antonio La Paz</option>      
      `;
    }
    if(depto == "Sacatepequez"){
      municipios = `
      <option value="01">Antigua Guatemala</option>
      <option value="02">Jocotenango</option>
      <option value="03">Pastores</option>      
      <option value="04">Sumpango</option>
      <option value="05">Santo Domingo Xenacoj</option>
      <option value="06">Santiago Sacatepequez</option>
      <option value="07">San Bartolome Milpas Altas</option>
      <option value="08">San Lucas Sacatepequez</option>
      <option value="09">Santa Lucia Milpas Altas</option>      
      <option value="10">Magdalena Milpas Altas</option>
      <option value="11">Santa Maria de Jesus</option>
      <option value="12">Ciudad Vieja</option>                  
      <option value="13">San Miguel Duenas</option>
      <option value="14">San Juan Alotenango</option>
      <option value="15">San Antonio Aguas Calientes</option>      
      <option value="16">Santa Catarina Barahona</option>
      `;
    }
    if(depto == "Chimaltenango"){
      municipios = `
      <option value="01">Chimaltenango</option>      
      <option value="02">San Jose Poaquil</option>      
      <option value="03">San Martin Jilotepeque</option>      
      <option value="04">San Juan Comalapa</option>      
      <option value="05">Santa Apolonia</option>
      <option value="06">Tecpan</option>      
      <option value="07">Patzun</option>    
      <option value="08">San Miguel Pochuta</option>
      <option value="09">Patzicia</option>      
      <option value="10">Santa Cruz Balanya</option>      
      <option value="11">Acatenango</option>
      <option value="12">San Pedro Yepocapa</option>      
      <option value="13">San Andres Itzapa</option>      
      <option value="14">Parramos</option>      
      <option value="15">Zaragoza</option>
      <option value="16">El Tejar</option>
      `;
    }
    if(depto == "Escuintla"){
      municipios = `
      <option value="01">Escuintla</option>      
      <option value="02">Santa Lucia Cotzumalguapa</option>      
      <option value="03">La Democracia</option>      
      <option value="04">Siquinala</option>
      <option value="05">Masagua</option>
      <option value="06">Tiquisate</option>
      <option value="07">La Gomera</option>
      <option value="08">Guanagazapa</option>
      <option value="09">San Jose</option>      
      <option value="10">Iztapa</option>      
      <option value="11">Palin</option>            
      <option value="12">San Vicente Pacaya</option>                    
      <option value="13">Nueva Concepcion</option>
      `;
    }    
    if(depto == "Santa Rosa"){
      municipios = `
      <option value="01">Cuilapa</option>
      <option value="02">Barberena</option>
      <option value="03">Santa Rosa de Lima</option>
      <option value="04">Casillas</option>
      <option value="05">San Rafael Las Flores</option>
      <option value="06">Oratorio</option>
      <option value="07">San Juan Tecuaco</option>
      <option value="08">Chiquimulilla</option>
      <option value="09">Taxisco</option>
      <option value="10">Santa Maria Ixhuatan</option>
      <option value="11">Guazacapan</option>
      <option value="12">Santa Cruz Naranjo</option>      
      <option value="13">Pueblo Nuevo Viñas</option>
      <option value="14">Nueva Santa Rosa</option>      
      `;
    }
    
    if(depto == "Solola"){
      municipios = `
      <option value="01">Solola</option>
      <option value="02">San Jose Chacaya</option>
      <option value="03">Santa Maria Visitacion</option>
      <option value="04">Santa Lucia Utatlan</option>
      <option value="05">Nahuala</option>
      <option value="06">Santa Catarina Ixtahuacan</option>
      <option value="07">Santa Clara La Laguna</option>      
      <option value="08">Concepcion</option>
      <option value="09">San Andres Semetabaj</option>
      <option value="10">Panajachel</option>
      <option value="11">Santa Catarina Palopo</option>
      <option value="12">San Antonio Palopo</option>    
      <option value="13">San Lucas Toliman</option>
      <option value="14">Santa Cruz La Laguna</option>
      <option value="15">San Pablo La Laguna</option>      
      <option value="16">San Marcos La Laguna</option>
      <option value="17">San Juan La Laguna</option>      
      <option value="18">San Pedro La Laguna</option>      
      <option value="19">Santiago Atitlan</option>      
      `;
    }

    if(depto == "Totonicapan"){
      municipios = `
      <option value="01">Totonicapan</option>
      <option value="02">San Cristobal Totonicapan</option>
      <option value="03">San Francisco El Alto</option>
      <option value="04">San Andres Xecul</option>
      <option value="05">Momostenango</option>      
      <option value="06">Santa Maria Chiquimula</option>      
      <option value="07">Santa Lucia La Reforma</option>
      <option value="08">San Bartolo Aguas Calientes</option>                
      `;
    }
    
    if(depto == "Quetzaltenango"){
      municipios = `
      <option value="01">Quetzaltenango</option>
      <option value="02">Salcaja</option>
      <option value="03">Olintepeque</option>
      <option value="04">San Carlos Sija</option>
      <option value="05">Sibilia</option>
      <option value="06">Cabrican</option>
      <option value="07">Cajola</option>
      <option value="08">San Miguel Siguila</option>
      <option value="09">San Juan Ostuncalco</option>
      <option value="10">San Mateo</option>
      <option value="11">Concepcion Chiquirichapa</option>
      <option value="12">San Martin Sacatepequez</option>
      <option value="13">Almolonga</option>
      <option value="14">Cantel</option>
      <option value="15">Huitan</option>
      <option value="16">Zunil</option>      
      <option value="17">Colomba Costa Cuca</option>
      <option value="18">San Francisco La Union</option>      
      <option value="19">El Palmar</option>
      <option value="20">Coatepeque</option>
      <option value="21">Genova Costa Cuca</option>      
      <option value="22">Flores Costa Cuca</option>
      <option value="23">La Esperanza</option>      
      <option value="24">Palestina de Los Altos</option>      
      `;
    }
    if(depto == "Suchitepequez"){
      municipios = `
      <option value="01">Mazatenango</option>
      <option value="02">Cuyotenango</option>
      <option value="03">San Francisco Zapotitlan</option>
      <option value="04">San Bernardino</option>
      <option value="05">San Jose El Idolo</option>
      <option value="06">Santo Domingo Suchitepequez</option>
      <option value="07">San Lorenzo</option>
      <option value="08">Samayac</option>
      <option value="09">San Pablo Jocopilas</option>
      <option value="10">San Antonio Suchitepequez</option>
      <option value="11">San Miguel Panam</option>
      <option value="12">San Gabriel</option>
      <option value="13">Chicacao</option>      
      <option value="14">Patulul</option>
      <option value="15">Santa Barbara</option>
      <option value="16">San Juan Bautista</option>
      <option value="17">Santo Tomas La Union</option>
      <option value="18">Zunilito</option>      
      <option value="19">Pueblo Nuevo</option>            
      <option value="20">Rio Bravo</option>      
      `;
    }
    if(depto == "Retalhuleu"){
      municipios = `
      <option value="01">Retalhuleu</option>
      <option value="02">San Sebastian</option>
      <option value="03">Santa Cruz Mulua</option>
      <option value="04">San Martin Zapotitlan</option>
      <option value="05">San Felipe Retalhuleu</option>            
      <option value="06">San Andres Villa Seca</option>
      <option value="07">Champerico</option>            
      <option value="08">Nuevo San Carlos</option>            
      <option value="09">El Asintal</option>
      `;
    }
    if(depto == "San Marcos"){
      municipios = `
      <option value="01">San Marcos</option>
      <option value="02">San Pedro Sacatepequez</option>
      <option value="03">San Antonio Sacatepequez</option>
      <option value="04">Comitancillo</option>
      <option value="05">San Miguel Ixtahuacan</option>
      <option value="06">Concepcion Tutuapa</option>
      <option value="07">Tacana</option>
      <option value="08">Sibinal</option>
      <option value="09">Tajumulco</option>
      <option value="10">Tejutla</option>
      <option value="11">San Rafael Pie de la Cuesta</option>
      <option value="12">Nuevo Progreso</option>
      <option value="13">El Tumbador</option>
      <option value="14">San Jose El Rodeo</option>
      <option value="15">Malacatan</option>      
      <option value="16">Catarina</option>
      <option value="17">Ayutla</option>
      <option value="18">Ocos</option>      
      <option value="19">San Pablo</option>      
      <option value="20">El Quetzal</option>            
      <option value="21">La Reforma</option>
      <option value="22">Pajapita</option>      
      <option value="23">Ixchiguan</option>      
      <option value="24">San Jose Ojetenan</option>      
      <option value="25">San Cristobal Cucho</option>      
      <option value="26">Sipacapa</option>      
      <option value="27">Esquipulas Palo Gordo</option>      
      <option value="28">Rio Blanco</option>      
      <option value="29">San Lorenzo</option>            
      `;
    }    
    if(depto == "Huehuetenango"){
      municipios = `
      <option value="01">Huehuetenango</option>
      <option value="02">Chiantla</option>
      <option value="03">Malacatancito</option>      
      <option value="04">Cuilco</option>
      <option value="05">Nenton</option>
      <option value="06">San Pedro Necta</option>
      <option value="07">Jacaltenango</option>
      <option value="08">San Pedro Soloma</option>
      <option value="09">San Ildefonso Ixtahuacan</option>      
      <option value="10">Santa Barbara</option>
      <option value="11">La Libertad</option>      
      <option value="12">La Democracia</option>
      <option value="13">San Miguel Acatan</option>
      <option value="14">San Rafael la Independencia</option>
      <option value="15">Todos los Santos Cuchumatan</option>
      <option value="16">San Juan Atitan</option>
      <option value="17">Santa Eulalia</option>
      <option value="18">San Mateo Ixtatan</option>
      <option value="19">Colotenango</option>
      <option value="20">San Sebastian Huehuetenango</option>
      <option value="21">Tectitan</option>
      <option value="22">Concepcion Huista</option>
      <option value="23">San Juan Ixcoy</option>
      <option value="24">San Antonio Huista</option>      
      <option value="25">San Sebastian Coatan</option>
      <option value="26">Santa Cruz Barillas</option>
      <option value="27">Aguacatan</option>
      <option value="28">San Rafael Petzal</option>
      <option value="29">San Gaspar Ixchil</option>      
      <option value="30">Santiago Chimaltenango</option>
      <option value="31">Santa Ana Huista</option>
      <option value="32">Union Cantinil</option>
      `;
    }        
    if(depto == "Quiche"){
      municipios = `
      <option value="01">Santa Cruz del Quiche</option>
      <option value="02">Chiche</option>
      <option value="03">Chinique</option>
      <option value="04">Zacualpa</option>      
      <option value="05">Chajul</option>
      <option value="06">Sto. Tomas Chichicastenango</option>      
      <option value="07">Patzite</option>      
      <option value="08">San Antonio Ilotenango</option>      
      <option value="09">San Pedro Jocopilas</option>      
      <option value="10">Cunen</option>      
      <option value="11">San Juan Cotzal</option>      
      <option value="12">Joyabaj</option>      
      <option value="13">Nebaj</option>      
      <option value="14">San Andres Sajcabaja</option>      
      <option value="15">San Miguel Uspantan</option>            
      <option value="16">Sacapulas</option>
      <option value="17">San Bartolome Jocotenango</option>      
      <option value="18">Canilla</option>
      <option value="19">Chicaman</option>
      <option value="20">Ixcan</option>      
      <option value="21">Pachalin</option>      
      <option value="22">Playa Grande</option>            
      `;
    } 
    if(depto == "Baja Verapaz"){
      municipios = `
      <option value="01">Salama</option>
      <option value="02">San Miguel Chicaj</option>
      <option value="03">Rabinal</option>
      <option value="04">Cubulco</option>
      <option value="05">Granados</option>           
      <option value="06">Santa Cruz el Chol</option>
      <option value="07">San Jeronimo</option>      
      <option value="08">Purulha</option>
      `;
    }
    if(depto == "Alta Verapaz"){
      municipios = `
      <option value="01">Coban</option>
      <option value="02">Santa Cruz Verapaz</option>
      <option value="03">San Cristobal Verapaz</option>
      <option value="04">Tactic</option>
      <option value="05">Tamahu</option>
      <option value="06">San Miguel Tucuru</option>                
      <option value="07">Panzos</option>      
      <option value="08">Senahu</option>
      <option value="09">San Pedro Carcha</option>      
      <option value="10">San Juan Chamelco</option>
      <option value="11">Lanquin</option>      
      <option value="12">Santa Maria Cahabon</option>      
      <option value="13">Chisec</option>
      <option value="14">Chahal</option>      
      <option value="15">Fray Bartolome de las Casas</option>      
      <option value="16">La Tinta</option>      
      <option value="17">Raxruha</option>            
      `;
    }      

    if(depto == "Peten"){
      municipios = `
      <option value="01">Flores</option>
      <option value="02">San Jose</option>
      <option value="03">San Benito</option>
      <option value="04">San Andres</option>
      <option value="05">La Libertad</option>
      <option value="06">San Francisco</option>
      <option value="07">Santa Ana</option>
      <option value="08">Dolores</option>
      <option value="09">San Luis</option>
      <option value="10">Sayaxche</option>      
      <option value="11">Melchor de Mencos</option>                  
      <option value="12">Poptun</option>
      `;
    }
    if(depto == "Izabal"){
      municipios = `
      <option value="01">Puerto Barrios</option>      
      <option value="02">Livingston</option>
      <option value="03">El Estor</option>
      <option value="04">Morales</option>
      <option value="05">Los Amates</option>      
      `;
    }
      
    if(depto == "Zacapa"){
      municipios = `
      <option value="01">Zacapa</option>
      <option value="02">Estanzuela</option>
      <option value="03">Rio Hondo</option>
      <option value="04">Gualan</option>      
      <option value="05">Teculutan</option>
      <option value="06">Usumatlan</option>
      <option value="07">Cabanas</option>
      <option value="08">San Diego</option>
      <option value="09">La Union</option>      
      <option value="10">Huite</option>
      `;
    }    
    if(depto == "Chiquimula"){
      municipios = `
      <option value="01">Chiquimula</option>
      <option value="02">San Jose la Arada</option>
      <option value="03">San Juan la Ermita</option>
      <option value="04">Jocotan</option>
      <option value="05">Camotan</option>
      <option value="06">Olopa</option>      
      <option value="07">Esquipulas</option>
      <option value="08">Concepcion Las Minas</option>
      <option value="09">Quezaltepeque</option>      
      <option value="10">San Jacinto</option>    
      <option value="11">Ipala</option>                    
      `;
    }

    if(depto == "Jalapa"){
      municipios = `
      <option value="01">Jalapa</option>
      <option value="02">San Pedro Pinula</option>      
      <option value="03">San Luis Jilotepeque</option>
      <option value="04">San Manuel Chaparron</option>
      <option value="05">San Carlos Alzatate</option>  
      <option value="06">Monjas</option>                      
      <option value="07">Mataquescuintla</option>      
      `;
    }   
    if(depto == "Jutiapa"){
      municipios = `
      <option value="01">Jutiapa</option>
      <option value="02">El Progreso</option>
      <option value="03">Santa Catarina Mita</option>
      <option value="04">Agua Blanca</option>
      <option value="05">Asuncion Mita</option>
      <option value="06">Yupiltepeque</option>
      <option value="07">Atescatempa</option>
      <option value="08">Jerez</option>
      <option value="09">El Adelanto</option>      
      <option value="10">Zapotitlan</option>
      <option value="11">Comapa</option>        
      <option value="12">Jalpatagua</option>
      <option value="13">Conguaco</option>          
      <option value="14">Moyuta</option>      
      <option value="15">Pasaco</option>
      <option value="16">San Jose Acatempa</option>
      <option value="17">Quesada</option>
      `;
    }  


    selector_municipios.innerHTML = municipios;
  }


  render() {
    return html`
     <div id="formulario">
      <div id="marcoAgregar">
        <div class="lineaform">
          <label class="titulop">Nombre:</label>    
          <input type="text" id="nombreInput" class="inputdatos">
        </div>  
        <div class="lineaform">
          <label class="titulop">Apellido:</label>    
          <input type="text" id="apellidoInput" class="inputdatos">
        </div>
        <div class="lineaform">
          <label class="titulop">DPI Padre:</label>    
          <input type="text" id="dpiPadreInput" class="inputdatos" @focusout="${this.buscarPadre}">
        </div>
        <div class="lineaform2">
          <label class="titulop">Nombre Padre:</label>    
          <input type="text" id="nombrePadreInput" class="inputdatos">
        </div>
        <div class="lineaform2">
          <label class="titulop">Apellido Padre:</label>    
          <input type="text" id="apellidoPadreInput" class="inputdatos">
        </div>
        <div class="lineaform">
          <label class="titulop">DPI Madre:</label>    
          <input type="text" id="dpiMadreInput" class="inputdatos" @focusout="${this.buscarMadre}">
        </div>
        <div class="lineaform2">
          <label class="titulop">Nombre Madre:</label>    
          <input type="text" id="nombreMadreInput" class="inputdatos">
        </div>
        <div class="lineaform2">
          <label class="titulop">Apellido Madre:</label>    
          <input type="text" id="apellidoMadreInput" class="inputdatos">
        </div>      
        <div class="lineaform">
          <label class="titulop">Fecha Nacimiento:</label>    
          <input type="date" id="fechaNacimientoInput" class="inputdatos">
        </div>
        <div class="lineaform">
          <label class="titulop" >Departamento:</label>    
          <select id="departamentoInput" class="inputdatos" @change="${this.meterMunicipios}">
            <option value="01">Guatemala</option>
            <option value="02">El Progreso</option>
            <option value="03">Sacatepequez</option>
            <option value="04">Chimaltenango</option>
            <option value="05">Escuintla</option>
            <option value="06">Santa Rosa</option>
            <option value="07">Solola</option>
            <option value="08">Totonicapan</option>           
            <option value="09">Quetzaltenango</option>             
            <option value="10">Suchitepequez</option>
            <option value="11">Retalhuleu</option>                        
            <option value="12">San Marcos</option>
            <option value="13">Huehuetenango</option>         
            <option value="14">Quiche</option>   
            <option value="15">Baja Verapaz</option>                                  
            <option value="16">Alta Verapaz</option>            
            <option value="17">Peten</option>
            <option value="18">Izabal</option>            
            <option value="19">Zacapa</option>            
            <option value="20">Chiquimula</option>            
            <option value="21">Jalapa</option>
            <option value="22">Jutiapa</option>                                                                        
          </select>
        </div>
        <div class="lineaform2">
          <label class="titulop">Municipio:</label>    
          <select id="municipioInput" class="inputdatos">
          <option value="01">Guatemala</option>
          <option value="02">Santa Catarina Pinula</option>      
          <option value="03">San Jose Pinula</option>      
          <option value="04">San Jose del Golfo</option>
          <option value="05">Palencia</option>
          <option value="06">Chinautla</option>
          <option value="07">San Pedro Ayampuc</option>      
          <option value="08">Mixco</option>
          <option value="09">San Pedro Sacatepequez</option>
          <option value="10">San Juan Sacatepequez</option>
          <option value="11">San Raymundo</option>      
          <option value="12">Chuarrancho</option>
          <option value="13">Fraijanes</option>
          <option value="14">Amatitlan</option>      
          <option value="15">Villa Nueva</option>      
          <option value="16">Villa Canales</option>      
          <option value="17">San Miguel Petapa</option>     
          </select>
        </div>
        <div class="lineaform">
          <label class="titulop">Genero:</label>    
          <select id="generoInput" class="inputdatos">
            <option value="M">Hombre</option>
            <option value="F">Mujer</option>
          </select>
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
          <div class="lineaPadresDiv">
            <div class="padreDiv">
              <div class="nombrePadreDiv" id="nombrePadreDiv">
                Nombre Nombre
              </div>
              <div class="apellidoPadreDiv" id="apellidoPadreDiv">
                Apellido Apellido
              </div>
              <div class="dpiPadreDiv" id="dpiPadreDiv">
                DPI Padre
              </div>
            </div>
            <div class="madreDiv">
              <div class="nombrePadreDiv" id="nombreMadreDiv">
                Nombre Nombre
              </div>
              <div class="apellidoPadreDiv" id="apellidoMadreDiv">
                Apellido Apellido
              </div>
              <div class="dpiPadreDiv" id="dpiMadreDiv">
                DPI Madre
              </div>  
            </div>
          </div>
          <div class="lineaPersonaDiv">
            <div class="nombreDiv" id="nombreDiv">
              Nombre Nombre Apellido Apellido
            </div>
            <div class="lugarNacimientoDiv" id="lugarNacimientoDiv">
              Departamento - Municipio 
            </div>
            <div class="fechaNacimientoDiv" id="fechaNacimientoDiv">
              dia de Mes de Año
            </div>
            <div class="sexoDiv" id="sexoDiv">
              Genero
            </div>
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

window.customElements.define('my-view1', MyView1);
