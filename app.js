const { createApp } = Vue;

createApp({
    data() {
        return {
            
            nombre: "",
            carrera: "",
            calificacion: null,
            carreras: ["Ingeniería de Sistemas", "software", "electronica","industrial"],
            estudiantes: [],
            siguienteId: 1,
            cupoMaximo: 10,
            filtroCarrera: "todas",
            busqueda:"",
            filtroEstado: "todos"// "todos" | "aprobados" | "reprobados"
         
            
        };
    },

    methods: {
        comprobarFuncionamiento() {
            alert("¡La aplicación está funcionando!");
        },
        
        errorNombre(){
            if(this.nombre.trim() === ""){
                return "El nombre es obligatorio";
                
            }

            if(this.nombre.trim().length < 3){
                return "El nombre debe tener almenos tres letras";
            }
            return"";
        },

        agregarEstudiante(){

            if(this.errorNombre()!== ""){
                return;
            }

            if(!this.carrera){
                alert("por favor, selecciona una carrera")
            }

            if(
                this.calificacion === null ||
                this.calificacion === ""||
                !Number.isFinite(this.calificacion) ||
                this.calificacion < 0 ||
                this.calificacion > 10
            ){
                alert("La calificacion debe estar entre 0 y 10");
                return;
            }



            this.estudiantes.push(this.Nombre);

            this.nombre = "";
        },

    }
}).mount("#app");