let focoOriginal, distanciaOriginal, alturaOriginal, unidadeOriginal;

function calculate() {
    let foco = document.getElementById("focus").value;
    let distancia = document.getElementById("distance").value;
    let altura = document.getElementById("height").value;
    let unidade = document.getElementById("unit").value;
    let resultado = document.querySelector(".console--area");
    let imagemEspelho = document.getElementById("imagemEspelho");

    if (!foco || isNaN(foco) || !distancia || isNaN(distancia) || !altura || isNaN(altura)) {
        resultado.innerHTML = `<span style="color: red;">Por favor, preencha todos os campos com números válidos.</span>`;
        return;
    }

    foco = parseFloat(foco);
    distancia = parseFloat(distancia);
    altura = parseFloat(altura);

    focoOriginal = foco;
    distanciaOriginal = distancia;
    alturaOriginal = altura;
    unidadeOriginal = unidade;

    let tipoEspelho, tipoImagem, ampliacao, alturaImagem;

    if (foco > 0) {
        tipoEspelho = "Côncavo";
    } else if (foco < 0) {
        tipoEspelho = "Convexo";
    } else {
        tipoEspelho = "Plano";
    }

    if (foco !== distancia) {
        ampliacao = (foco * distancia) / (foco - distancia);

        ampliacao = parseFloat(ampliacao.toFixed(2));

        if (ampliacao > 0) {
            tipoImagem = "Imagem Real (Fora do Espelho)";
        } else {
            tipoImagem = "Imagem Virtual (Dentro do Espelho)";
        }

        alturaImagem = ampliacao * altura;

        alturaImagem = parseFloat(alturaImagem.toFixed(2));
    } else {
        tipoImagem = "Imagem Imprópria";
        ampliacao = "Indeterminado";
        alturaImagem = "Indeterminado";
    }

    resultado.innerHTML = `
        Tipo de espelho: ${tipoEspelho}<br>
        Tipo de imagem: ${tipoImagem}<br>
        Ampliação: ${ampliacao} ${unidade}<br>
        Altura da imagem: ${alturaImagem} ${unidade}`;

    mostrarImagemEspelho(tipoEspelho, imagemEspelho);
}

function updateResultUnit() {
    let outputUnit = document.getElementById("outputUnit").value;
    let resultado = document.querySelector(".console--area");

    if (outputUnit === "original") {
        calculate();
        return;
    }

    if (focoOriginal === undefined || distanciaOriginal === undefined || alturaOriginal === undefined || unidadeOriginal === undefined) {
        resultado.innerHTML = `<span style="color: red;">Por favor, realize o cálculo inicial antes de alterar a unidade.</span>`;
        return;
    }

    let focoConvertido = converterMedida(focoOriginal, unidadeOriginal, outputUnit);
    let distanciaConvertida = converterMedida(distanciaOriginal, unidadeOriginal, outputUnit);
    let alturaConvertida = converterMedida(alturaOriginal, unidadeOriginal, outputUnit);

    let tipoEspelho, tipoImagem, ampliacao, alturaImagem;

    if (focoConvertido > 0) {
        tipoEspelho = "Côncavo";
    } else if (focoConvertido < 0) {
        tipoEspelho = "Convexo";
    } else {
        tipoEspelho = "Plano";
    }

    if (focoConvertido !== distanciaConvertida) {
        ampliacao = (focoConvertido * distanciaConvertida) / (focoConvertido - distanciaConvertida);

        ampliacao = parseFloat(ampliacao.toFixed(2));

        if (ampliacao > 0) {
            tipoImagem = "Imagem Real (Fora do Espelho)";
        } else {
            tipoImagem = "Imagem Virtual (Dentro do Espelho)";
        }

        alturaImagem = ampliacao * alturaConvertida;

        alturaImagem = parseFloat(alturaImagem.toFixed(2));
    } else {
        tipoImagem = "Imagem Imprópria";
        ampliacao = "Indeterminado";
        alturaImagem = "Indeterminado";
    }

    resultado.innerHTML = `
        Tipo de espelho: ${tipoEspelho}<br>
        Tipo de imagem: ${tipoImagem}<br>
        Ampliação: ${ampliacao} ${outputUnit}<br>
        Altura da imagem: ${alturaImagem} ${outputUnit}
    `;
}

function converterMedida(valor, unidadeAtual, unidadeDesejada) {
    const fatoresConversao = {
        cm: { cm: 1, m: 0.01, mm: 10 },
        m: { cm: 100, m: 1, mm: 1000 },
        mm: { cm: 0.1, m: 0.001, mm: 1 },
    };

    return valor * fatoresConversao[unidadeAtual][unidadeDesejada];
}

function mostrarImagemEspelho(tipoEspelho, elementoImagem) {
    let imagemSrc;
    switch (tipoEspelho) {
        case "Côncavo":
            imagemSrc = "https://lh6.googleusercontent.com/proxy/1HuGf1pN_DwQAanpvqz5ktaa-gFrP7aUThY_birNi1jq3Y2_tdhbVnqUdC-oBIe_Q1MVeySY65r7kKkkawEPQs186BsS9iICwsZ5URCdhD8k7q-IMz6jVTlBBTGWS7SU2YhPpZL6Ug"
            break;
        case "Convexo":
            imagemSrc = "data:image/jpeg;base64,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";
            break;
        case "Plano":
            imagemSrc = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUSExMWFhIXFxcYGBYVFxgWGxoXFRUXFhUYGRcbHSghGBolHhUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGS0lICU3LTcxNTYzNzAtNzUtNi0wLzI3LS0tLS0rLTctLTItNzY1LS03KzUrKzE3LS0zLSs3OP/AABEIALYBFQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQQCBQYDB//EAEMQAAIBAgMEBAoJAwMEAwAAAAECAAMRBBIhBRMxQSJRYfAGFCMyUnGBkaPSFUJTobHB0eHxM2KTQ3KSByRjg3Oiwv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAwIE/8QAJxEBAQABAwMEAQUBAAAAAAAAAAECESExA0HBElFhgXETQpHR8AT/2gAMAwEAAhEDEQA/APuMREBERAREQEREBERAREQEREBESvj8UKVKpVYErTRnIHEhFLEC/PSBYicxsrw5wdZQ92poaS1CallylqrUd0wvfeZ1tYcbi17y/U8KtnrlviqIzU96t6i60+kN5x826sL8NIG4iafB+FGAqlhTxNJyql2CsGIVWysSBroSAfWOsTLBbfo1ay0qRzq1JqoqKQV6FUUmXrzBrg9ViIG2iIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAlfH4VatKpSYkLURkJHEB1Km1+essRA5N/ALDZ2qpUrU6rCh0kKaVMNYJVCshXOQAGuCCBwvrMX8BsGtN6Zq1AKtFcOzFkux39XEFh0bbxnquTYW6gJ10pbTzeStn/qpfJ1a3zf29cDS4rwJoPmO9rKzeM6qyi3jdWnVqW6OoBpKADpYkG957+D3gnQwjK1N3JVKqANkAtWr79uiiKBZjYAAADS06CICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAmv2uB5G4U+WS2Yka9LUdbdk2EobWP9HW3lk+qG9Lr83/dygX4iICIiAiIgIiICIiAiQzAC5NgOJM8cFjKVVBUpVEqIeDU2DqbaGzA2ge8REBERAREQEREBERAREQE06+EuFOJ8UDk1eFwpybzKX3W883e5AWyXvYXm3Iny/wAIdjNs6qK2FwwqBioo2FRt1VVcis1MZt/XrNWqg1XKWVAM4JBIfRfpBRW3LAqxGZCeDgecFPMrzHHW/CXJz2z8dT2hTYZDu1y+WRujv1LCoKL8W3bAeUAym9gTZhLmz8c6v4vXtvbEo40Wqo4kDk4+svtGnCNfRMsdceZzPM8+3PHG1iIlZEREBERASjtS/krZv6qXysF014+kvZL01+17eRvl/rJbNm49LzbfW6r6QNhECICIiAiIgIieOMxSUkLuwVVFyT31PK3OFktukMZikpI1R2CoouSe+p5W5zy8dO53u7e+UsKRyhyQCQguwUMbcCRx1Imi2jjAiHHYpWCIV3NDS4aowp02e5C71mZQLkKl9TxM5Pwo26NpbrDDDPUwlS29UU3aqtdS16QZWy0aqndMC4NN1dmLBV6UaZ444z083v7fj/fXzHhftpsRXanQZ3o16Iw5oAk79nq1KdUUSfJ0a9Di2Y2ZW6VlAad34MbC8VWqWcPUrVN5UZUWkuYU0p9GmpIW4pgnU3Yk9gnwd2F4vnd6m9xFXLvaoUUs+S4Qmmpyh7GxYC5sOQAG5lZEREBERAREQEREBERAREQE88RRV1ZHAZGBVlPAqwsQewgz0iBwVXweXBYo496tGjhKOZy1mFTdbnc08LYHKtBWOYKoJZsmlxc7vZmOp4+nUV1yMrKRTzAV6N0VqbVACd1VuSwF9AQDrcDoHQEWIuJ88x+xK2BxVGphjSp02WrTFSrTd0orlFeqa7CoHq1arpfeuwVRTI85hcuOVxusdhs/HOr+L17b2xyOBZaqjiQOTj6y+0acNrOb2XtCntChmZQqEKyMGIe+oFVAyqyLmF0f6ykGwvaX9n451fxevbea5KgFlqqOJHU4+svtGnCNssZ1J6see88zzO3442sRErAiIgJR2pfyVs39VPNUNprxv5o7eUvShtYf0tP9ZPrBfS6/O/284F+IiAiIgIieGMxSUkNR2yqvEn7gBzJ4ADjCyW3SGMxSUkNR2Coo1J9w05knS3OaHHYkJTfH4tWFKiC9OiBcqOAdxwNU356IDqRqZZp0alT/ALmtTY5AWo4YWuCAbM1yFNY8ACQFvxvczQbS8M6jYhKeHRKlImmpVqdR2qs1ZqOJpq6nJSeiAGYODcNfQC5ja2dKaY8977fE836m3Op274SVsfkw1GkGUO6YrDK9Cs/QZGpqwD/0nXMM6suVrXYBbN23g34PphlvcvVKqhqNYvu0JNKmzgDeZAxUORcgaz22J4P4fCgrSXo5nKBrHdLUILU6RtdaZYZstzqeoADaysCIiAiIgIiICIiAiIgIiICIiAiIgJ5YnDpURqdRVdGBVlYBlYHQgg6Edk9YgfJvCzwX8WrriGSnXpPiCQpXIzPWc1bYqpfy1JDSprSpCwZjTU3IGbutnY6hj6GV7LWAptUpBvKUKjKHXkGRxe4uAeRA1E3zKDoZ8y8KNg1cEd7hahoJu6iLWWnvPF6fQq1cwJZsRiK9QABmItb0uJccrjdY7nZ+OdXGHr23ljkqAWWqo4kDk4+svtGnDazntj7Rw+0sOSA4ysFYNlFSnVVVdWDIWUOA6todL2NiCBrtleFGI8aOCqUld1YrvA2S6rqHKnQkrrYewSa6PVj0L15cunN5vZx9z+u3b47KIiV5Ca/a5HkblR5ZLZgTr0tBbg3bNhKO083krZ/6qXydWt839vXAvREQERNZ4Q7TbDUGrLT3mW11zBOJte5BvqRpxh3hhc8pjjzVzGYtKSGo7ZUXifuAA5knQAcbzW4TCvWcV66lQutGifqdTvyNUjlwX13M1/gvXfGgYqsAFVyKNNdVBAsahv5z3LKDytpxnUyct+pjf+e3p/u7/HxPN+vfX5XjduY3G7/CPSqIbquSmjruKrGoqUsRUVmapTZcjisiZL2vdQRO18EvB/xWnmds+JdVFV8xbNkzbsE2G8Kq2TekBmCgt1DceJ0t5vsi73Lk3lhmyXzZc3HLfW095XlIiICIiAiIgIiICIiAiIgIiICIiAmLuACSbAaknkIdgASTYDUk9UoKprEMwtRGqqfrnkzD0eoe0wPRdpKdQlUjkd22o6+En6QH2dX/ABtLMgmBX+kB9nV/xtPHF16VVGp1KNRqbqVZWpsQVYWII6pevIIgUcHWpUlCJSqKv+xiSebMx1ZjzYkk854YylQqBwaNQFyGLLTYNnUAI4a1wygCx7Jtb9XGRb+YdY5ZY3XG6NNs/bTKRRrq+81yOKZG9UC98v1XA4j2jThsjtEehV/xtIx+DSqhpsDbQgjRlYeayn6rDkZSwGNdX3Fexq67upwWqo59lQc19o04RrljOpPVjz3nmeZ2/HDF+FWEpVFo1GZajZbKUa/TYql9OjmYFRe1yCBeRtbHKdzem58sh6SsuvS1HWeycztLYGKfGVnbN4u+Iw+IZw6FTSwlOmy0RTsXz72lfSy5XJve4m+2htSmEwxrVaaVGekSrZeJUkizE5ePG5t1ysGzr7YpIuZw6roLspUXOgFzznp9JL6FX/G04fw/wlevUTd0zVQ4avTpAUhVpb+qVS7m9qfQzWqHQA1BxNj0ezsdRp4YEs2SiNyXcEFzR8kSo4tdlIHMmFktukbDFbapU1LuKiqOZRvUPWb6WmtwtU1agrV6dQZT5KjkJCf+R+RqEexRw1uZlhMI9VxWrjLbWlRP1P735bw//W9hrczZ2/nlJy2tnSnpx573xPN+ptzjQxVNBlSlUVbk2FMgXYlmPtJJ9szG019Cp/jaNToJK2HDU9f6D85WNuu9DtJRxSr/AI2kfSa2vkqW/wDjaCeZ1+/7uf4TBzfv39whGf0onoVP+DTIbRH2dX/G08wgHnceofmZLMzdi+4QMvpJeOSr/jaQu01PBKn+NpiSPd7P49usxa504Dq7/iYGf0sno1P+DSTtNRrkqf8ABp4FwOHHv74yMTdifz/YdsD2O1UH1an/AAaZDaSZlUrUBY2F0I9cqtWRCOiXc6Ko5n1n8eAl3CYYgl3N6h4nkB6K9Q/HjAtREQEREBERASGYAXJsBqSYZgBc6Ac5rgDXNzpRBuAf9Q8mI9DqHPjAkA1iGOlEaqp+ueTMPR6hz4mXrxIgI/CJF/5gCbRb+IA784v3/eA7/wA9cgnv34SO94HZ7+/CAPbp2SttDBpVTI46OhBGhVhwZTxDDkZ7FpB7YXHK43WOcyV6lYYfE1iqZehur0jiLXLF6oN1IFr01y3sTdlOUWsTsnDUhTWnQRRvlJFNUQa3uW06Y6+ubDH4VKyFHGnEW0KsODK3Jh1zQ4/aW53aYordaqlKrBrVVF/NC/6wuBk4HiOycN7h+rvhN+88zzO3bbi1tDZWGpq1dD4q3E1aICXPABqYGWsToLMpPVY2MrbCNSrV/wC6XLWpBWSiFyrZx/XAzN0i2dbEkpYjnma/hcM9VxXrgrbWlRP1P735bwj/AIg2GtyY20mV8PiOGSqtJu2niSKRQniRvDRfTnTEJbOlPTjz3vieb9TbnbHuOX7ybdfu78J8s2HinpYnxuspzqmLNcik6VWqvUvRwuZjaplSk5UKAFWmDcBrn6gzfxKwZE9+Xf1zEt7e/Vz9sxsT6u/e8m4HDX8Pb1/hAW5nv+sA8lH6/tJK82P6+wcpi1XkNPVz9Z5wJsBx1PUOH7+yQWJ9nsA79msxt19/b+Q+6QWJ0Hs/jlAksB6+/AcvbrMQGbsHM8vfzMkIBx1b0R+Zh2vx9gHAfr7PfAlbDzdf7j+Q7meVaqF62YnRRxY+3h6zw7JhWxFrDUk6KBxJ6h1S7s7A5Om2tQ8epR6K9nbzgTgMHlu7WNQ8SOAHor2dvOXYiAiIgIiICQxtqeEE2muvvzc6UBwH2h6z/Z2c/VxAL1zc6UBwB/1COZHodQ5+qX4H3QTAd7SLzEOCbXF9dL66cdPaJl3/AJMCLSe/8CYu4GpNu06CIC8j74J90xJgSzTAm8Qe33QIv1SJJ7iRaAvK20MAldDTcEjQgg2ZWGqujfVYHUGW8vX379shm9g7++JdBqNnY10cYbEEGqb7uqBZayjj6qo5pw5jS9nhA4Y0KPFnr029SYdhXZuwXpounOoJb2hgUroUcdEkEEGzBh5rKw1DA8CJqNkq1LEsuKYtXZQtGqQFVqK9IqoGiVb3Zxxay20UAd2ereOeNq3OLwdOqAKqK4U5gHANjYgEX802JHtM97Ad/wAv1kgk8O/qH5yDYd/xP5CcOixPYOf7nnBcDhx6/wBBy9chiTx07P25SLfx+v7+6BiQTFwO/e/4SRc8PaeXt6/bFwOGp9I8B6hAZeZNh959Q5Rm5DQfefWe4mLNzJue/u76SMpPHQdXM9v7mBGbkO/r6/wmFU2Fzc3NlA4seQUc/XwEV64UaC5JsANbnkP7j69JcwOEYeUqG9Qj2KPRX8zzgRgMDlOdrGofco9FfzPOXoiAiIgIiICQTJlfHYQVVyFmUX1y217DcHSBV1rn/wAA+Ifk/H1cdT/1F2bUxGz6tGlT3jlqBCDIbqmJpO4s5Cnoq2hIBtabsYFvt6vw/kjxFvt6vw/kgfP8dU2jhaBahTqUcPTwWIJU08LRWjVRMQ61ClNnDktuhkXQaNc3YSTU241ANTNfK1QG7DCmuEbC+cFUimae/NwL5rW+rPoHiT/b1fh/JIGBb7er8P5IHzbHeDu097VrUg9OsGx1VKlPc9J3wuDWkCHzAK9Si4tx6PEaE9JsttqHG+WDihmqFr7nc7s003Ip2O8FUPmzZtPO/tt0owLfb1fh/JHiLfb1fh/JA+aA7TxtHEL5WpSLV0s+4CF6O0FFHc5bP0aaVAxfqW15sy22nq1x5SnTarSCHyDFE8cK1ijG+YbghukunCxIJPb/AEe329X4fyQcA329X4fyQOFX6cG5B3hIKrmHi+U5ca4qNib6kHCimRuxxLaA2t3v4TD6OP21X4fyR9Hn7ar8P5IGf3DrkX6pidnt9vV+H8kLs9hwr1fh/JAzy248e/ugtbv3t+MwGz247+r8P5JA2cftqvw/kgTm6pKpzPvP5DnMRs0/bVfh/JJbZ7HjWq/D+SAap1e/n+w9UrbQ2fTrUylXzdCCNGVhqrIeKsDqDLA2cb331W//AK/kk/RxvffVb/8Ar+SWXTeHLT4DaNVHGGrnyhvu6trCso6+qqBxTnxGlwNqbD19/dPLH7CWshSpVqkEg3G7BDA3VlYJdWB1BE9F2ToBv6ptzO7ue02TjLlZd3MlmwD7+ocf2/GZGmB53Hkokps4jhWq/D+ST4g1776pfrtT+ScunnUJ4H2KPzmKhm0Ue3q/Se30edfLVNeOlL5IOziRbfVbdXkx/wDiB5IoBsvSbmeQ79c8cTWyi+rEmw/ubqUcz2/hLY2cQLb6pbqtT+SZ4fAhWzlmdrWBa2g6gAABA89n4Ir06mtQ8uSg8h29Z5y/EQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAxdwASeAFz6hPl1fwmxOIG/ON8UpMW3FKnS3rsqkrmfquQRqbEg2Gmv0zHITTcDiUYD1lTPkXgHj3oKTSw6Vq5VQqvUWk2XUMULCx6Q1Gh4WvY226d0x1mmusm/Hf32a9HpYZ3K562YzXSc3eT5231uzs/+n/hPUxQq0axDVaVvKKMoqIxIBy8iLa8OI7Z02Nxop2JBIN/NF7AC5PqE+e+CdLEHahq1GQ1XRmrrSIKU1sFRCwJBa4TgTw4k3mz2Xs+sGyqrU2fFVN4yUDTfdF8QwzVzcVAb07WAy3EueOOWV0vGn4+frVznhelcfVLpdbp3k1umvzppXTfTdK50aw0JykAG5Fu3geH62t4PGpUvlvpa9x1i/f1TjcP9I50DmoLZcpKMwYLVqB8+VcucqF1YjipGt57UMLjgobeYgsKWDextrVaowxKkZeARVuvK9+Mn6On7o4vVws2xv8ALtYiJiEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERATU4zwawdVQj0VIBYi11ILsXexBBALEm3DWIj4dYZ5YZerG6VZ2Xsmhh1y0aYQHjbifWTqfbLsRBllllfVldaREQ5IiIH//Z";
            break;
        default:
            imagemSrc = "";
    }

    if (imagemSrc) {
        elementoImagem.innerHTML = `<img src="${imagemSrc}" alt="${tipoEspelho}">`;
    } else {
        elementoImagem.innerHTML = "";
    }
}
