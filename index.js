'use strict';

const spawn = require( 'child_process' ).spawn;

const folders = [{
  in: './doc-source-md',
  out: './doc-build-html',
  template: './doc-template-html'
}];

folders.forEach (dir => {
  const convertDir = spawn( 'node_modules/markdown-styles/bin/generate-md', [
    '--layout', dir.template,
    //'--layout github',
    '--input', dir.in,
    '--output', dir.out
    ] );

  convertDir.stdout.on( 'data', data => {
      console.log( `${data}` );
  });

  convertDir.stderr.on( 'data', data => {
      console.log( `ERROR: ${data}` );
  });

  convertDir.on( 'close', code => {
      console.log( `Done. (Exit code: ${code})` );
  });
});
