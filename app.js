const { createApp } = Vue;

createApp({
    data() {
        return {
            nombre: "",
            carrera: "",
            calificacion: null,
            nombreTocado: false,
            carreraTocada: false,
            calificacionTocada: false,
            carreras: [
                "Ingeniería de Sistemas",
                "software",
                "electronica",
                "industrial"
            ],
            estudiantes: [],
            siguienteId: 1,
            cupoMaximo: 10,
            filtroCarrera: "Todas",
            busqueda: "",
            filtroEstado: "Todos",
            formularioEnviado: false,
            errorDuplicado: false,
            errorCupo: false,
        };
    },

    methods: {
        errorNombre() {
            if (this.nombre.trim() === "") {
                return "El nombre es obligatorio";
            }

            if (this.nombre.trim().length < 3) {
                return "El nombre debe tener al menos tres letras";
            }

            return "";
        },

        errorCarrera() {
            if (this.carrera === "") {
                return "Debes seleccionar una carrera";
            }

            if (!this.carreras.includes(this.carrera)) {
                return "La carrera seleccionada no es válida";
            }

            return "";
        },

        errorCalificacion() {
            if (
                this.calificacion === null ||
                this.calificacion === "" ||
                !Number.isFinite(this.calificacion)
            ) {
                return "La calificación es obligatoria y debe ser numérica";
            }

            if (this.calificacion < 0 || this.calificacion > 10) {
                return "La calificación debe estar entre 0 y 10";
            }

            return "";
        },

        agregarEstudiante() {
            this.formularioEnviado = true;
            this.errorDuplicado = false;
            this.errorCupo = false;

            if (
                this.errorNombre() ||
                this.errorCarrera() ||
                this.errorCalificacion()
            ) {
                return;
            }

            if (this.esDuplicado()) {
                this.errorDuplicado = true;
                return;
            }

            if (this.estudiantes.length >= this.cupoMaximo) {
                this.errorCupo = true;
                return;
            }

            this.errorCupo = false;

            this.estudiantes.push({
                id: this.siguienteId++,
                nombre: this.nombre.trim(),
                carrera: this.carrera,
                calificacion: Number(this.calificacion)
            });

            this.nombre = "";
            this.carrera = "";
            this.calificacion = null;
            this.formularioEnviado = false;
            this.errorDuplicado = false;
            this.nombreTocado = false;
            this.carreraTocada = false;
            this.calificacionTocada = false;
        },

        esDuplicado() {
            return this.estudiantes.some((estudiante) => {
                return (
                    estudiante.nombre.trim().toLowerCase() ===
                    this.nombre.trim().toLowerCase() &&
                    estudiante.carrera === this.carrera
                );
            });
        },

        lugaresDisponibles(carrera) {
            const inscritos = this.estudiantes.filter((estudiante) => {
                return estudiante.carrera === carrera;
            }).length;

            return this.cupoMaximo - inscritos;
        },

        estudiantesFiltrados() {
            return this.estudiantes.filter((est) => {
                const coincideCarrera =
                    this.filtroCarrera === "Todas" ||
                    est.carrera === this.filtroCarrera;

                const coincideNombre = est.nombre
                    .toLowerCase()
                    .includes(this.busqueda.toLowerCase());

                const coincideEstado =
                    this.filtroEstado === "Todos" ||
                    (this.filtroEstado === "Aprobados" &&
                        est.calificacion >= 6) ||
                    (this.filtroEstado === "Reprobados" &&
                        est.calificacion < 6);

                return coincideCarrera &&
                    coincideNombre &&
                    coincideEstado;
            });
        },

        colorNota(nota) {
            if (nota >= 6) {
                return "verde";
            } else if (nota >= 4) {
                return "naranja";
            } else {
                return "rojo";
            }
        },

        aumentarCalificacion(est) {
            if (est.calificacion < 10) {
                est.calificacion++;
            }
        },

        disminuirCalificacion(est) {
            if (est.calificacion > 0) {
                est.calificacion--;
            }
        },

        eliminarEstudiante(id) {
            this.estudiantes = this.estudiantes.filter(
                (est) => est.id !== id
            );
        },

        borrarTodo() {
            this.estudiantes = [];
        }
    }
}).mount("#app");