var pos = $('#center').position(),
    radiusSat = $('#sat1').width() * 0.5,
    radius = $('#center').width() * 0.5,
    cx = pos.left + radius,
    cy = pos.top + radius,
    x, y, angle = 0, angles = [],
    spc = 360 / 5,
    deg2rad = Math.PI / 180,
    i = 0;

for(;i < 5; i++) {
    angles.push(angle);
    angle += spc;
}

/// space out radius
radius += (radiusSat + 10);

loop();

function loop() {

    for(var i = 0; i < angles.length; i++) {

        angle = angles[i];

        x = cx + radius * Math.cos(angle * deg2rad);
        y = cy + radius * Math.sin(angle * deg2rad);

        $('#sat' + i).css({left:x - radiusSat, top:y - radiusSat});

        angles[i] = angles[i] + 1;
        if (angles[i] > 360) angles[i] = 0;
    }

    requestAnimationFrame(loop);
}