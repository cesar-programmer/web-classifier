/* eslint-disable no-undef */
let net

const imgEl = document.getElementById('img')
const descEl = document.getElementById('descripcion_imagen')
const webcamElement = document.getElementById('webcam')

// cargar el modelo
async function app () {
  net = await mobilenet.load()
  // clasificar la imagen
  const result = await net.classify(imgEl)
  console.log(result)
  displayImagePrediction()

  // cargar la webcam
  webcam = await tf.data.webcam(webcamElement)
}

// cargar la imagen
imgEl.onload = async function () {
  displayImagePrediction()
}

// ejecutar la clasificación de la imagen y mostrar el resultado
async function displayImagePrediction () {
  try {
    const result = await net.classify(imgEl)
    let formattedHtml = "<div class='classification-results'>"
    result.forEach(item => {
      formattedHtml += `
        <div class='result-item'>
          <span class='class-name'>${item.className}</span>
          <span class='probability'>${(item.probability * 100).toFixed(2)}%</span>
        </div>`
    })
    formattedHtml += '</div>'
    descEl.innerHTML = formattedHtml
  } catch (error) {
    descEl.innerHTML = '<p>Error al cargar la predicción.</p>'
  }
};

let count = 0

async function cambiarImagen () {
  count = count + 1
  imgEl.src = 'https://picsum.photos/200/300?random=' + count
}

app()
