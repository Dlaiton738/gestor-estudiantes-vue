const { createApp } = Vue;

createApp({
  data() {
    return {
      Nombre: "",
      Edad: "",
      curso: "",
      Nota: "",
      estudiantes: [],
      siguienteId: 1,

      filtroCarrera: "Todas",
      busqueda: "",
      filtroEstado: "Todos",
    };
  },

  methods: {
    comprobarFuncionamiento() {
      alert("¡La aplicación está funcionando!");
    },

    agregarEstudiante() {
      if (this.Nombre.trim() === "") {
        alert("Por favor, ingrese un nombre de estudiante");
        return;
      }

      if (this.Nota === "" || Number(this.Nota) < 0 || Number(this.Nota) > 10) {
        alert("La calificación debe estar entre 0 y 10");
        return;
      }

      this.estudiantes.push({
        id: this.siguienteId++,
        nombre: this.Nombre.trim(),
        edad: this.Edad,
        carrera: this.curso.trim(),
        calificacion: Number(this.Nota),
      });

      this.Nombre = "";
      this.Edad = "";
      this.curso = "";
      this.Nota = "";
    },

    estudiantesFiltrados() {
      return this.estudiantes.filter((est) => {
        const coincideCarrera =
          this.filtroCarrera === "Todas" || est.carrera === this.filtroCarrera;

        const coincideNombre = est.nombre
          .toLowerCase()
          .includes(this.busqueda.toLowerCase());

        const coincideEstado =
          this.filtroEstado === "Todos" ||
          (this.filtroEstado === "Aprobados" && est.calificacion >= 6) ||
          (this.filtroEstado === "Reprobados" && est.calificacion < 6);

        return coincideCarrera && coincideNombre && coincideEstado;
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
      this.estudiantes = this.estudiantes.filter((est) => est.id !== id);
    },
  },
}).mount("#app");
