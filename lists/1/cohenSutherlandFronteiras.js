/*
Para descobrir isso rodei dois testes. Peguei os dados das outras questões:

"Para a imagem a seguir, considere os limites da janela de visualização
como (xmin, ymin) = (0, 1) e (xmax, ymax) = (8,7) e os pontos que definem
a reta como o ponto inicial (-1-2) e o final (6, 7)."

E rodei a versão original do algoritmo e uma versão alterada onde eu troco
a checagem do bit 2 com o 0 zero, ou seja, fronteiras de cima e de baixo,
e o algoritmo disse que o segmento estava completamente dentro, o que é mentira

Valores iniciais do algoritmo original:
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   x1    │   -1   │
│   y1    │   -2   │
│   x2    │   6    │
│   y2    │   7    │
│  xmin   │   0    │
│  ymin   │   1    │
│  xmax   │   8    │
│  ymax   │   7    │
└─────────┴────────┘

Iterações:
┌─────────┬────────────────────┬─────────────────────┬────┬────┬────┬────┬───────┬────────────────────┬─────────────────────┐
│ (index) │         x1         │         y1          │ x2 │ y2 │ c1 │ c2 │ cfora │        xint        │        yint         │
├─────────┼────────────────────┼─────────────────────┼────┼────┼────┼────┼───────┼────────────────────┼─────────────────────┤
│    0    │         0          │ -0.7142857142857142 │ 6  │ 7  │ 5  │ 0  │   5   │         0          │ -0.7142857142857142 │
│    1    │ 1.3333333333333333 │          1          │ 6  │ 7  │ 4  │ 0  │   4   │ 1.3333333333333333 │          1          │
└─────────┴────────────────────┴─────────────────────┴────┴────┴────┴────┴───────┴────────────────────┴─────────────────────┘


Valores do algoritmo alterado:

┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   x1    │   -1   │
│   y1    │   -2   │
│   x2    │   6    │
│   y2    │   7    │
│  xmin   │   0    │
│  ymin   │   1    │
│  xmax   │   8    │
│  ymax   │   7    │
└─────────┴────────┘
Segmento completamento dentro
┌─────────┬────┬────┬────┬────┬────┬────┬───────┬──────┬──────┐
│ (index) │ x1 │ y1 │ x2 │ y2 │ c1 │ c2 │ cfora │ xint │ yint │
├─────────┼────┼────┼────┼────┼────┼────┼───────┼──────┼──────┤
│    0    │ 6  │ 7  │ 6  │ 7  │ 5  │ 0  │   5   │  6   │  7   │
└─────────┴────┴────┴────┴────┴────┴────┴───────┴──────┴──────┘
*/

function region_code(x, y, xmin, ymin, xmax, ymax)
{
    let codigo = 0;

    if (x < xmin) codigo += 1;
    if (x > xmax) codigo += 2;
    if (y < ymin) codigo += 4;
    if (y > ymax) codigo += 8;

    return codigo;
}

function bitOn(number, index) {
    let binary = number.toString(2);
    return binary[binary.length - 1 - index];
}

function cohenSutherland(x1, y1, x2, y2, xmin, ymin, xmax, ymax)
{
    let aceite = false, feito = false;
    let valores = [];

    console.table({
        x1,
        y1,
        x2,
        y2,
        xmin,
        ymin,
        xmax,
        ymax
    });
    
    while (!feito)
    {
        const c1 = region_code(x1, y1, xmin, ymin, xmax, ymax);
        const c2 = region_code(x2, y2, xmin, ymin, xmax, ymax);
        let cfora;

        if (c1 == 0 && c2 == 0)
        {
            // console.log("Segmento completamento dentro");
            aceite = true;
            feito = true;
        }

        else if (c1 != 0 && c2 != 0)
        {
            // console.log("Segmento completamente fora");
            feito = true;
        }

        else
        {
            if (c1 != 0)
            {
                // console.log("Determina um ponto exterior");
                cfora = c1;
            }
            else cfora = c2;

            let xint, yint;

            if (bitOn(cfora, 2) == "1")
            {
                // console.log("Limite acima");
                yint = ymax;
                xint = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
            }

            else if (bitOn(cfora, 1) == "1")
            {
                // console.log("Limite direito");
                xint = xmax;
                yint = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
            }

            else if (bitOn(cfora, 0) == "1")
            {
                // console.log("Limite abaixo");
                yint = ymin;
                xint = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
            }

            else if (bitOn(cfora, 3) == "1")
            {
                // console.log("Limite esquerdo");
                xint = xmin;
                yint = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
            }

            if (c1 == cfora)
            {
                x1 = xint;
                y1 = yint;
            }

            else
            {
                x2 = xint;
                y2 = yint;
            }

            valores.push({
                x1: x1.toFixed(2),
                y1: y1.toFixed(2),
                x2: x2.toFixed(2),
                y2: y2.toFixed(2),
                c1: c1.toString(2).padStart(4, '0'),
                c2: c2.toString(2).padStart(4, '0'),
                cfora: cfora.toString(2).padStart(4, '0'),
                xint: xint.toFixed(2),
                yint: yint.toFixed(2),
            });
        }
    }

    console.table(valores);

    if (aceite)
    {
        // desenhar a linha entre (round(x1), round(y1), round(x2), round(y2))
    }
}

cohenSutherland(-1, -2, 6, 7, 0, 1, 8, 7);
