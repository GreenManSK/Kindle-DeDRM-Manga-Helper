const AdmZip = require("adm-zip");
const fs = require("fs");
const { argv } = require("process");

const processManga = (path, file) => {
  const zipPath = `${path}/${file}.zip`;
  const targetPath = `${path}/${file}`;

  console.log(`Processing ${file}`);

  const zip = new AdmZip(zipPath);
  var zipEntries = zip.getEntries();
  const cover = zipEntries.find((e) => e.entryName.indexOf("cover") !== -1);
  zip.extractEntryTo(cover, targetPath, false, true);
  fs.renameSync(`${targetPath}/${cover.name}`, `${targetPath}/00001.jpg`);
  zipEntries
    .filter((e) => e.entryName.indexOf("/images/") !== -1)
    .forEach(function (zipEntry) {
      zip.extractEntryTo(zipEntry, targetPath, false, true); // extract the zip entry
    });
};

const path = argv[2];

// get list of files in path
const files = fs.readdirSync(path).filter((f) => f.endsWith(".zip"));

files.forEach((file) => {
  processManga(path, file.replace(".zip", ""));
});
