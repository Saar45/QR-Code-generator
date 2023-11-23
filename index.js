import inquirer from "inquirer";

import qr from "qr-image";

import fs from "fs";

console.log("WELCOME TO MY QR IMAGE GENERATOR YOU LAZY BUGGER!!!");

inquirer
  .prompt([
    {
      message: "Type in a URL: ",
      name: "URL",
    },
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Get ahold of our url
    const url = answers.URL;

    // Save our URL into a file!
    fs.appendFile("URL.txt", url, function (err) {
      if (err) throw err;
      console.log("Saved! Please click on the qr_img.png file to scan the qr code..");
    });

    // Transform the URL to a qr image thanks to the qr module
    let qr_img = qr.image(url);

    // Get ahold of our transformed image and save it locally using node's built-in file system module
    qr_img.pipe(fs.createWriteStream("qr_img.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
