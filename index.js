'use strict';

const spawn = require( 'child_process' ).spawn;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const folders = [{
  in: './doc-source-md',
  out: './dist',
  template: './mapcat-gray'
}];

folders.forEach (dir => {
  const convertDir = spawn( 'node_modules/markdown-styles/bin/generate-md', [
    '--layout', dir.template,
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
      console.log( `Convert done. (Exit code: ${code})` );
      console.log( 'Set external links to open in new tab in the following pages: ' );
      changeLinks(dir.out);
  });
});

function changeLinks(dir) {
    fs.readdir(dir, function(error, files) {
        if (error) {
            console.log('ERROR:', error);
        }
        files.filter(function(file) {
            if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
                changeLinks(path.join(dir, file));
            } else {
                return file.substr(-5) === '.html';
            }
        }).forEach(function(file) {
            fs.readFile(path.join(dir, file), 'utf-8', function(error, data) {
                if (error) {
                    console.log('ERROR:', error);
                } else {
                    const dom = new JSDOM(data);
                    var document = dom.window.document;
                    var links = document.querySelectorAll('a');
                    links.forEach(function(link) {
                        if(link.href.substr(0,4) === 'http') {
                            link.setAttribute('target', '_blank');
                            link.setAttribute('rel', 'noopener');
                        }
                    });
                    fs.writeFile(path.join(dir, file), dom.serialize(), function(error) {
                        if (error) {
                            console.log('ERROR:', error);
                        } else {
                            console.log(path.join(dir, file));
                        }
                    });
                }
            });
        });
    });
}
