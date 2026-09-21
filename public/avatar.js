const emocionesValidas = ["alegria", "amor", "ansiedad", "asco", "calma", "enfado", "esperanza", "miedo", "neutral", "nostalgia", "sorpresa", "tristeza"];
const avatarA = document.querySelector('#avatarA');
const avatarB = document.querySelector('#avatarB');
const estado = document.querySelector('#estado');
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
// Funciones adaptadas del avatar de jocarsa; véase docs/PROCEDENCIA.md.
function normalizarEmocion(emocion)
{
    if (!emocion) {
        return "neutral";
    }
    emocion =
        emocion
            .toLowerCase()
            .trim();
    if (
        !emocionesValidas.includes(
            emocion
        )
    ) {
        return "neutral";
    }
    return emocion;
}
function imagenEmocion(emocion)
{
    emocion =
        normalizarEmocion(
            emocion
        );
    return (
        "expresiones/" +
        emocion +
        ".png"
    );
}
function mezclarEmociones(
    emocionOrigen,
    emocionDestino,
    factor
)
{
    emocionOrigen =
        normalizarEmocion(
            emocionOrigen
        );
    emocionDestino =
        normalizarEmocion(
            emocionDestino
        );
    if (movimientoReducido.matches) {
        avatarA.src = imagenEmocion(factor < 0.5 ? emocionOrigen : emocionDestino);
        avatarA.style.opacity = 1;
        avatarB.style.opacity = 0;
        return;
    }
    factor =
        Math.max(
            0,
            Math.min(
                1,
                factor
            )
        );
    if (
        emocionOrigen ===
        emocionDestino
    ) {
        avatarA.src =
            imagenEmocion(
                emocionOrigen
            );
        avatarA.style.opacity =
            1;
        avatarB.style.opacity =
            0;
        return;
    }
    avatarA.src =
        imagenEmocion(
            emocionOrigen
        );
    avatarB.src =
        imagenEmocion(
            emocionDestino
        );
    avatarA.style.opacity =
        1 - factor;
    avatarB.style.opacity =
        factor;
}
function actualizarAvatar(
    indiceParrafo,
    indicePalabra,
    totalPalabras
)
{
    let posicion;
    if (totalPalabras <= 1) {
        posicion = 0.5;
    } else {
        posicion =
            indicePalabra /
            (totalPalabras - 1);
    }
    const emocionActual =
        normalizarEmocion(
            parrafos[
                indiceParrafo
            ].emocion
        );
    if (posicion < 0.5) {
        let emocionAnterior;
        if (indiceParrafo > 0) {
            emocionAnterior =
                normalizarEmocion(
                    parrafos[
                        indiceParrafo - 1
                    ].emocion
                );
        } else {
            emocionAnterior =
                "neutral";
        }
        const factor =
            0.5 +
            posicion;
        mezclarEmociones(
            emocionAnterior,
            emocionActual,
            factor
        );
    }
    else {
        let emocionSiguiente;
        if (
            indiceParrafo <
            parrafos.length - 1
        ) {
            emocionSiguiente =
                normalizarEmocion(
                    parrafos[
                        indiceParrafo + 1
                    ].emocion
                );
        } else {
            emocionSiguiente =
                "neutral";
        }
        const factor =
            posicion -
            0.5;
        mezclarEmociones(
            emocionActual,
            emocionSiguiente,
            factor
        );
    }
    const datos =
        parrafos[
            indiceParrafo
        ];
    estado.innerHTML = `
        <div class="emocion">
            ${normalizarEmocion(
                datos.emocion
            ).toUpperCase()}
        </div>
        <div>
            Párrafo:
            ${indiceParrafo + 1}
            /
            ${parrafos.length}
        </div>
        <div>
            Posición:
            ${Math.round(
                posicion * 100
            )}%
        </div>
        <div>
            Valencia:
            ${datos.valencia}
        </div>
        <div>
            Intensidad:
            ${datos.intensidad}
        </div>
        <div>
            Activación:
            ${datos.activacion}
        </div>
    `;
}
