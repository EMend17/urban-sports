
const pathToCSV = './assets/datos/Pases.csv';
var datos;
var datasetsClasificados = [];
var nombres = []
function cargaDeDatos(){
    
    fetch(pathToCSV)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo: ${response.statusText}`);
            }
            return response.text();
        })
        .then(csvData =>  processData(csvData))
        .catch(error => console.error(error));
}
function processData(csvData) {
    
    let lines = csvData.split('\n');
    let i = 0
    let clusters1 = [];
    let clusters2 = [];
    let clusters3 = [];
    for( line of lines){
        if(i == 0) {
            i++;
            continue;
        }
        let data = line.split(',')
        
        data[4] == 0 ? clusters1.push([data[0],data[2],data[3]]) : data[4] == 1 ? clusters2.push([data[0],data[2],data[3]]) : clusters3.push([data[0],data[2],data[3]])
        i++;
        
    }
    datos = [clusters1,clusters2,clusters3]
}

function getDatasets(){
    
    let datasetExcelente = []
    let datasetBueno = []
    let datasetRegular = []
    let dataExcelente = []
    let dataBueno = []
    let dataRegular = []
    let promedios = []
    let suma = 0
    for( i in datos[0]){
        suma += Number(datos[0][i][1])
    }
    let promedio = suma / datos[0].length
    promedios.push(promedio)
    suma = 0
    for( i in datos[1]){
        suma += Number(datos[1][i][1])
    }
    promedio = suma / datos[1].length
    promedios.push(promedio)
    suma = 0
    for( i in datos[2]){
        suma += Number(datos[2][i][1])
    }
    promedio = suma / datos[2].length
    promedios.push(promedio)
    let maximo = Math.max(...promedios);
    let indice = promedios.indexOf(maximo);

    for (i in datos[indice]){
        dataExcelente.push([datos[indice][i][0],datos[indice][i][1],datos[indice][i][2]])
        let data = {
            x:datos[indice][i][1],
            y:datos[indice][i][2],
            label:datos[indice][i][0]
        }
        nombres.push(datos[indice][i][0])
        datasetExcelente.push(data)
    }
    datasetsClasificados.push(dataExcelente)
    
    promedios[indice] = 0;
    maximo = Math.max(...promedios);
    indice = promedios.indexOf(maximo);
    for (i in datos[indice]){
        dataBueno.push([datos[indice][i][0],datos[indice][i][1],datos[indice][i][2]])
        let data = {
            x:datos[indice][i][1],
            y:datos[indice][i][2],
            label:datos[indice][i][0]
        }
        nombres.push(datos[indice][i][0])
        datasetBueno.push(data)
    }
    datasetsClasificados.push(dataBueno)
    
    promedios[indice] = 0;
    maximo = Math.max(...promedios);
    indice = promedios.indexOf(maximo);
    for (i in datos[indice]){
        dataRegular.push([datos[indice][i][0],datos[indice][i][1],datos[indice][i][2]])
        let data = {
            x:datos[indice][i][1],
            y:datos[indice][i][2],
            label:datos[indice][i][0]
        }
        nombres.push(datos[indice][i][0])
        datasetRegular.push(data)
    }
    datasetsClasificados.push(dataRegular)
    return [datasetExcelente,datasetBueno,datasetRegular]
}


function generarTabla(){
    let tabla = document.createElement("table");
    let container = document.createElement("div");
    let tag_tr = document.createElement("tr");
    let tag_td = document.createElement("td");
    tag_td.innerHTML = "Clasificacion";
    tag_tr.appendChild(tag_td);
    tag_td = document.createElement("td");
    tag_td.innerHTML = "Jugador";
    tag_tr.appendChild(tag_td);
    tag_td = document.createElement("td");
    tag_td.innerHTML = "Pases completados";
    tag_tr.appendChild(tag_td);
    tag_td = document.createElement("td");
    tag_td.innerHTML = "Yardas ganadas";
    tag_tr.appendChild(tag_td);
    tag_tr.style.backgroundColor = "dimgrey"
    tag_tr.style.color = "white"

    tabla.appendChild(tag_tr);
    for(i in datasetsClasificados){
        
        for(j in datasetsClasificados[i]){
            tag_tr = document.createElement("tr");
            tag_td = document.createElement("td");
            let clasificacion = i == 0 ? "Excelente" : i == 1 ? "Bueno" : "Regular"
            tag_td.innerHTML = clasificacion
            i == 0 ?  tag_td.style.backgroundColor = "rgb(0,255,0,0.5)" : i == 1 ?  tag_td.style.backgroundColor = "rgb(255,255,0,0.5)" :  tag_td.style.backgroundColor = "rgb(255,0,0,0.5)"
            tag_tr.appendChild(tag_td);
            for(k in datasetsClasificados[i][j]){
                tag_td = document.createElement("td");
                tag_td.innerHTML = datasetsClasificados[i][j][k];
                tag_tr.appendChild(tag_td);
            }
            
            
            tabla.appendChild(tag_tr);
        }
    }
    container.id = "container-2";
    container.appendChild(tabla);
    let main = document.getElementById("tabla-datos")
    main.appendChild(container)

    let container2 = document.createElement("div");
    nombres = Array.from(new Set(nombres))
    
    let jugador1 = nombres[0]
    let jugador2 = nombres[1]
    let jugador3 = nombres[2]
    let pases1 = []
    let pases2 = []
    let pases3 = []
    let yardas1 = []
    let yardas2 = []
    let yardas3 = []
    let clasificacion1 = []
    let clasificacion2 = []
    let clasificacion3 = []
    for(i in datasetsClasificados){
        for(j in datasetsClasificados[i]){
            jugador1 == datasetsClasificados[i][j][0] ? pases1.push(datasetsClasificados[i][j][1]) :  jugador2 == datasetsClasificados[i][j][0] ? pases2.push(datasetsClasificados[i][j][1]) : pases3.push(datasetsClasificados[i][j][1])  
            jugador1 == datasetsClasificados[i][j][0] ? yardas1.push(datasetsClasificados[i][j][2]) :  jugador2 == datasetsClasificados[i][j][0] ? yardas2.push(datasetsClasificados[i][j][2]) : yardas3.push(datasetsClasificados[i][j][2])  
            jugador1 == datasetsClasificados[i][j][0] ? clasificacion1.push(i) :  jugador2 == datasetsClasificados[i][j][0] ? clasificacion2.push(i) : clasificacion3.push(i)  
        }
    }
    let promedioPases1 = 0
    let promedioYardas1 = 0
    for( i in pases1){
        promedioPases1 += Number(pases1[i])
        promedioYardas1 += Number(yardas1[i])
    }
    promedioPases1 /= pases1.length
    promedioYardas1 /= yardas1.length
    let promedioPases2 = 0
    let promedioYardas2 = 0
    for( i in pases2){
        promedioPases2 += Number(pases2[i])
        promedioYardas2 += Number(yardas2[i])
    }
    promedioPases2 /= pases2.length
    promedioYardas2 /= yardas2.length
    let promedioPases3 = 0
    let promedioYardas3 = 0
    for( i in pases3){
        promedioPases3 += Number(pases3[i])
        promedioYardas3 += Number(yardas3[i])
    }
    promedioPases3 /= pases3.length
    promedioYardas3 /= yardas3.length

    promediosPases = [promedioPases1,promedioPases2,promedioPases3]
    maximoPases = Math.max(...promediosPases)
    promediosYardas = [promedioYardas1,promedioYardas2,promedioYardas3]
    maximoYardas = Math.max(...promediosYardas)
    let indicePases = promediosPases.indexOf(maximoPases)
    let indiceYardas = promediosPases.indexOf(maximoPases)
    console.log(indicePases)
    console.log(indiceYardas)
    
    let numClasificacion1 = clasificacion1.reduce(function(obj,numero){
        if(obj[numero] === undefined){
            obj[numero] = 1;
        }else{
            obj[numero]++;
        }
        return obj;
    },{})
    console.log(numClasificacion1)
    let numClasificacion2 = clasificacion2.reduce(function(obj,numero){
        if(obj[numero] === undefined){
            obj[numero] = 1;
        }else{
            obj[numero]++;
        }
        return obj;
    },{})
    let numClasificacion3 = clasificacion3.reduce(function(obj,numero){
        if(obj[numero] === undefined){
            obj[numero] = 1;
        }else{
            obj[numero]++;
        }
        return obj;
    },{})
    numClasificaciones = [numClasificacion1,numClasificacion2,numClasificacion3]
    let content = ""
    if( indicePases == indiceYardas){
        content ="El jugador <b>" + nombres[indicePases] + "</b> obtuvo un promedio de pases lanzados de " + promediosPases[indicePases] + " y un promedio de yardas ganadas de " + promediosYardas[indiceYardas] + " en " + pases1.length + " partidos, ademas de acuerdo a la clasificación en <span class= 'excelente'>" +
        numClasificaciones[indicePases][0] + "</span> partidos tuvo un desempeño <span class= 'excelente'>EXCELENTE</span>, mientras que en <span class= 'Bueno'>" + numClasificaciones[indicePases][1] + " </span> partidos obtuvo un desempeño <span class= 'Bueno'>BUENO</span> y solamente en <span class= 'regular'>" + numClasificaciones[indicePases][2] + "</span> partidos un desempeño <span class= 'regular'>REGULAR</span>"
    }
    let container_text = document.createElement("div");
    content += "<br>"
    content += "<br>"
    content += "En la tabla se puede observar las estadisticas de los demás jugadores en relación con los <b>pases lanzados</b> y <b>yardas ganadas</b>, además, la clasificación de desempeño que tuvo en el partido"
    console.log(content)
    container_text.id = "txt-content"
    container_text.innerHTML = content
    
    main.appendChild(container_text)
}

