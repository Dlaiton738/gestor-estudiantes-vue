const { createApp } = Vue;

createApp({
    data() {
        return {
            Nombre: "",
            Edad:"",
            Cruso:"",
            Nota: "",
            estudiantes:[]
            
        };
    },

    methods: {
        comprobarFuncionamiento() {
            alert("¡La aplicación está funcionando!");
        },

        agregarEstudiante(){

            if(this.Nombre.trim()=== ""){
                alert("por favor, ingrese un nombre de estudiante");
                return;
            }
            this.estudiantes.push(this.Nombre);

            this.nombre = "";
        }
    }
}).mount("#app");