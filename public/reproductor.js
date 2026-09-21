// Un único temporizador controla la lectura y puede cancelarse al pausar.
class ReproductorAvatar {
    constructor(historia) {
        this.historia = historia;
        this.palabras = historia.map(parrafo => parrafo.texto.trim().split(/\s+/));
        this.total = this.palabras.reduce((total, palabras) => total + palabras.length, 0);
        this.texto = document.querySelector('#textoBocadillo');
        this.contador = document.querySelector('#contador');
        this.mensaje = document.querySelector('#mensaje');
        this.botonReproducir = document.querySelector('#reproducir');
        this.botonPausar = document.querySelector('#pausar');
        this.temporizador = null;
        this.reiniciar();
    }

    reiniciar() {
        clearTimeout(this.temporizador);
        this.temporizador = null;
        this.indiceParrafo = 0;
        this.indicePalabra = 0;
        this.leidas = 0;
        this.estado = 'preparado';
        this.texto.textContent = 'Pulsa Reproducir para comenzar.';
        this.contador.textContent = 'Preparado';
        this.mensaje.textContent = 'Preparado para reproducir.';
        mezclarEmociones('neutral', 'neutral', 0);
        estado.textContent = 'Neutral';
        this.actualizarControles();
    }

    actualizarControles() {
        this.botonReproducir.disabled = this.estado === 'reproduciendo' || this.estado === 'finalizado';
        this.botonPausar.disabled = this.estado !== 'reproduciendo';
        this.botonReproducir.textContent = this.estado === 'pausado' ? 'Continuar' : 'Reproducir';
        const porcentaje = Math.round(this.leidas / this.total * 100);
        document.querySelector('#progreso').style.width = porcentaje + '%';
        document.querySelector('#barra').setAttribute('aria-valuenow', porcentaje);
    }

    reproducir() {
        if (this.estado === 'reproduciendo' || this.estado === 'finalizado') return;
        this.estado = 'reproduciendo';
        this.mensaje.textContent = 'Reproduciendo relato.';
        this.actualizarControles();
        this.avanzar();
    }

    pausar(motivo = 'Lectura en pausa.') {
        if (this.estado !== 'reproduciendo') return;
        clearTimeout(this.temporizador);
        this.temporizador = null;
        this.estado = 'pausado';
        this.mensaje.textContent = motivo;
        this.actualizarControles();
    }

    avanzar() {
        if (this.estado !== 'reproduciendo') return;
        if (this.indiceParrafo >= this.historia.length) {
            this.estado = 'finalizado';
            this.temporizador = null;
            this.contador.textContent = 'Historia finalizada';
            this.mensaje.textContent = 'Historia finalizada. Puedes reiniciar el relato.';
            mezclarEmociones('neutral', 'neutral', 0);
            this.actualizarControles();
            return;
        }
        if (this.indicePalabra === 0) this.texto.replaceChildren();
        const palabras = this.palabras[this.indiceParrafo];
        const span = document.createElement('span');
        span.textContent = (this.indicePalabra ? ' ' : '') + palabras[this.indicePalabra];
        this.texto.appendChild(span);
        this.contador.textContent = `Párrafo ${this.indiceParrafo + 1} de ${this.historia.length}`;
        actualizarAvatar(this.indiceParrafo, this.indicePalabra, palabras.length);
        this.indicePalabra++;
        this.leidas++;
        let espera = Number(document.querySelector('#velocidad').value);
        if (this.indicePalabra === palabras.length) {
            this.indicePalabra = 0;
            this.indiceParrafo++;
            espera = 900;
        }
        this.actualizarControles();
        this.temporizador = setTimeout(() => this.avanzar(), espera);
    }
}

const reproductor = new ReproductorAvatar(parrafos);
document.querySelector('#reproducir').addEventListener('click', () => reproductor.reproducir());
document.querySelector('#pausar').addEventListener('click', () => reproductor.pausar());
document.querySelector('#reiniciar').addEventListener('click', () => reproductor.reiniciar());
document.addEventListener('visibilitychange', () => {
    if (document.hidden) reproductor.pausar('Pausa al pasar a segundo plano. Pulsa Continuar al volver.');
});
window.addEventListener('pagehide', () => reproductor.pausar());
// Solo se precargan las expresiones usadas por la historia de demostración.
const imagenes = [...new Set(['neutral', ...parrafos.map(p => normalizarEmocion(p.emocion))])].map(emocion => {
    const imagen = new Image();
    imagen.src = imagenEmocion(emocion);
    return imagen;
});
