function dda(x1, y1, x2, y2)
{
    const dx = x2 - x1;
    const dy = y2 - y1;
    const passos = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    const x_incr = dx / passos;
    const y_incr = dy / passos;

    console.table({
        dx,
        dy,
        passos,
        x_incr,
        y_incr
    });

    let x = x1, y = y1;
    let pontos = [{ x, y, xVisualizacao: x, yVisualizacao: y }];
    
    for (let i = 0; i < passos; i++)
    {
        x += x_incr;
        y += y_incr;
        pontos.push({ x, y, xVisualizacao: Math.round(x), yVisualizacao: Math.round(y) });
    }
    
    console.table(pontos);
}

dda(parseInt(4/3), 1, 6, 7);
