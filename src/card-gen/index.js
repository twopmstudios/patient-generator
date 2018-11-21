const program = require('commander');
const util = require('util');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

program 
  .version('1.0.0')
  .arguments('<data> <template> <outdir>')
  .action((dataPath, templatePath, outdir) => {
    console.log('data', dataPath);
    console.log('template', templatePath);
    console.log('outdir', outdir);

    readFile(dataPath)
      .then(dataContent => {
        const json = JSON.parse(dataContent.toString('utf8'));
        // console.log(json);

        return readFile(templatePath)
          .then(x => [json, x])
      })
      .then(([json, templateContent]) => {
        const template = templateContent.toString('utf8');
        
        console.log(`Writing ${json.length} files...`);

        json.forEach((patient, idx) => {
          console.info(`[Rendering] '${idx}'`);
          const output = Mustache.render(template, patient);
          console.info(`[Writing]   '${idx}'`);
          writeFile(path.join(outdir, idx + '.svg'), output);
          console.info(`[Completed] '${idx}'`);
        });

        console.log(`Wrote ${json.length} files!`);

      });
  });

program.parse(process.argv);