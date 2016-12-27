/* eslint-env node, jasmine, es6 */
'use strict'

const loremIpsum = {
  // Paragraphs
  p: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet odio volutpat,
    venenatis turpis non, auctor diam. Curabitur imperdiet sapien sed ante commodo, id rhoncus
    lorem mattis. Maecenas vel vehicula eros. Vivamus eu erat ac mauris porta fermentum. Donec
    elementum turpis in felis condimentum vestibulum. Aenean quis lectus eleifend, dignissim
    augue nec, vulputate diam. Phasellus facilisis placerat ex, at cursus mi tincidunt vel.
    Vestibulum scelerisque tellus quis erat feugiat, eu pharetra quam ornare.`,

    `Quisque imperdiet eleifend diam vel feugiat. Etiam consectetur aliquet lobortis. Ut
    ultrices nisl id eleifend eleifend. Curabitur posuere rhoncus dignissim. Aenean consequat
    eget est sit amet dignissim. Suspendisse nec vulputate nunc. Donec dolor odio, finibus in
    pretium a, consequat quis enim. Curabitur nec commodo lorem, pharetra semper nisi. Ut
    bibendum dui condimentum nisi rhoncus pellentesque. Phasellus id convallis augue, ut
    molestie justo. Donec a ipsum id risus congue efficitur. Sed eget dignissim ligula. Quisque
    congue interdum posuere. Sed semper leo vel bibendum sodales. Phasellus tristique bibendum
    egestas. Duis varius sollicitudin nisi, ut vehicula quam dapibus ut.`,

    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque laoreet fermentum laoreet.
    Nullam libero odio, fermentum interdum dignissim et, varius eget erat. Nunc vestibulum
    lobortis convallis. Donec leo neque, feugiat non mattis tincidunt, molestie ut urna.
    Maecenas molestie cursus ligula quis sollicitudin. In finibus tempor bibendum.`,

    `Sed consequat, nisl quis tincidunt consectetur, turpis dui sodales metus, nec sagittis
    turpis orci tincidunt orci. Maecenas pellentesque condimentum risus, ut rutrum lorem
    consequat ut. Nulla condimentum elit sit amet nibh feugiat auctor. Aenean ornare sagittis
    ex, eu ultricies nisi tempus scelerisque. Maecenas eu ornare nulla. Duis consectetur nibh
    ligula, sit amet venenatis quam varius eu. Donec egestas lectus ut dui molestie, nec
    ultricies velit condimentum. Proin risus mi, egestas nec mattis non, consequat sed nisl.`,

    `In at lorem ut leo dignissim luctus. Sed dapibus lorem vitae magna bibendum feugiat. Sed
    eget dapibus quam, imperdiet vulputate felis. Fusce venenatis vel velit ac venenatis.
    Suspendisse lobortis, orci at consequat scelerisque, nisl massa luctus felis, vitae lacinia
    arcu mauris eget urna. In porttitor porttitor dolor eu scelerisque. Nulla nec malesuada
    turpis. Sed pellentesque bibendum massa, eu ultrices elit accumsan eu. Phasellus commodo
    suscipit dui sed venenatis. Aliquam eget volutpat ex. Pellentesque orci sem, feugiat eu
    finibus ac, bibendum id mi.`
  ]
};

const changeLine = (line, dest, source) => {
  dest = dest.split('\n');
  source = source.split('\n');
  dest[line] = source[line];
  return dest.join('\n');
};

const config = {
  loremIpsum: loremIpsum,
  changeLine: changeLine
};

module.exports = config;
