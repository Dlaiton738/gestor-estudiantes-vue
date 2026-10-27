const { createApp } = Vue;

createApp({
    data() {
        return {
            nombre: "",
            mensaje: "Vue.js está funcionando correctamente."
        };
    },

    methods: {
        comprobarFuncionamiento() {
            alert("¡La aplicación está funcionando!");
        }
    }
}).mount("#app");