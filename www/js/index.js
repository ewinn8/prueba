/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(document).ready(function() {


     url = "http://productoswebs.com/backend/funciones.php"


    $('#btnLogin').click(function(){
        
        form = $(this).parents("#LoginForm");
        check = checkCampos(form);
        if(check) {
            formData = $('#LoginForm').serialize()
            $.ajax({

            type: "POST",
            url: url,
            cache: false,
            data: formData,
            success: function(resp){
                 
               
                if(resp=='NOLOGUEO'){
                    $('#respuesta').html("<span>Usario o Contraseña incorrecta</span>")           
                }else{

                    session=resp.split("/")
                    localStorage.setItem("NOMBRE", session[0])
                    localStorage.setItem("SESSION", session[1])
                    nombre=localStorage.getItem("NOMBRE")
                    session=localStorage.getItem("SESSION")
                    $('#users_log').html(nombre);
                    $('#iframew').attr("src", "http://productoswebs.com/backend/mapa.php?login="+session);
                    console.log(session);
                   

                        $.mobile.changePage("#inicio", {reloadPage:false});
                        $('#users').html(nombre);
                        
                        
                    
                    

                }   
            },
            error: function(e){
                alert("NO se pudo completar la accion"+e)
            }
        })
            
        }
        else {
            alert("Debe deligenciar usuario y password")
        }
        
    })

    $('#buscar').click(function(){
        
            formData = $('#fmr_buscar').serialize()
            $.ajax({

                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){
                    
                    if(resp==''){
                        $('#resultado_filtro').html("<span>¡ No hay resultados para esta Busqueda !</span>")           
                    }else{
                        $('#resultado_filtro').html(resp).trigger('create');   
                    }   
                },
                error: function(){
                    alert("NO se pudo completar la accion")
                }
            })

     }) 

     $('#btn_histo').click(function(){
            cedula=session=localStorage.getItem("CEDULA_C")   
            parametros = {"funcion" : 'cargarHistoricoGestion', "cedula":cedula}
            $.ajax({

                type: "POST",
                url: url,
                cache: false,
                data: parametros,
                success: function(resp){                  
                  $('#historico_Gestiones').html(resp).trigger('create');  
                },
                error: function(){
                    alert("NO se pudo completar la accion")
                }
            })

     }) 

     $("input[name='file']").on("change", function(){
            

            var f = $(this);
            var formData = new FormData(document.getElementById("formulario"));
            formData.append("dato", "valor");

            $.ajax({
                url:   "http://200.116.54.58:8080/events/backend/UpFile.php",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function(datos)
                {
                    dat=datos.split("/")
                    $('#confirmacion').html(dat[0])
                    loadImage(dat[1])

                    
                }
            });
    });
   
})


function checkCampos(obj) {
        var camposRellenados = true;
        obj.find("input").each(function() {
        var $this = $(this);
                if( $this.val().length <= 0 ) {
                    camposRellenados = false;
                    return false;
                }
        });
        if(camposRellenados == false) {
            return false;
        }
        else {
            return true;
        }
 }

function cargarPanelGestion(id, cedula){

        localStorage.setItem("CEDULA_C", cedula)
        $('#btn_gurdar').show()
        parametros = {"funcion" : 'cargarPanelGestion', "cedula":cedula}
               
        $.ajax({

            type: "POST",
            url:   "http://200.116.54.58:8080/events/backend/funciones.php",
            cache: false,
            data: parametros,
            success: function(resp){
                $('#panelgestion').html(resp).trigger('create');
                $("#cedulas").val(cedula)
                $("#file").val("")

                               
            }
            })

}
function loadImage(cedula){
    parametros = {"funcion" : 'loadImage', "cedula":cedula}
               
        $.ajax({

            type: "POST",
            url:   "http://200.116.54.58:8080/events/backend/funciones.php",
            cache: false,
            data: parametros,
            success: function(resp){
                $('#listImage').html(resp).trigger('create');
             
            }
            })

}
function cargarMotivos(id){
    parametros = {"funcion" : 'cargarMotivos', 'perfil':id}
               
        $.ajax({

            type: "POST",
            url:   "http://200.116.54.58:8080/events/backend/funciones.php",
            cache: false,
            data: parametros,
            success: function(resp){
                $('#motivos').html(resp).trigger('create');
              
                               
            }
        })

}

function guardarGestion(){

            url = "http://200.116.54.58:8080/events/backend/funciones.php"
            $('#login_user').val(localStorage.getItem("NOMBRE"))
            formData = $('#frm_gestion').serialize()
            $('#btn_gurdar').hide()
            $.ajax({

                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){
                     alert("Gestion Guardada!")
                     $('#panelgestion').html(resp).trigger('create');
                },
                error: function(){
                    alert("NO se pudo completar la accion")
                }
            })

} 

function capturePhoto(){
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
    navigator.camera.getPicture(subirImagen, cameraError, { quality: 100,
     destinationType: Camera.DestinationType.FILE_URI });

}

function subirImagen(fileURL) {
            
    options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);

    cedula=session=localStorage.getItem("CEDULA_C") 
    var params = new Object();
    params.cedula = cedula
                
    options.params = params;

     ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://200.116.54.58:8080/events/backend/UpFile.php"), uploadSuccess, uploadFail, options);

}


function uploadSuccess(r){
     $.mobile.loading( "hide" );
     cedula=session=localStorage.getItem("CEDULA_C") 
     $('#confirmacion').html("Imagen Cargada con exito !")
     loadImage(cedula)


}
function uploadFail(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);

}

 function cameraError(){
    alert('No se puedo inicializar Camara')
 }
 function cameraOptions(){
    alert('OPciones')
 }


/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */








