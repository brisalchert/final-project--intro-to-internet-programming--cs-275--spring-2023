const { src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    cleanCSS = require(`gulp-clean-css`),
    del = require(`del`),
    babel = require(`gulp-babel`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

let lintJS = () => {
    return src(`dev/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let lintCSS = () => {
    return src(`dev/css/style.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintHTML = () => {
    return src(`dev/html/index.html`)
        .pipe(htmlValidator());
};

let transpileJSForDev = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let copyCSSForDev = () => {
    return src(`dev/css/style.css`)
        .pipe(dest(`temp/css`));
};

let copyHTMLForDev = () => {
    return src(`dev/html/index.html`)
        .pipe(dest(`temp`));
};

let compressCSSForProd = () => {
    return src(`dev/css/style.css`)
        .pipe(cleanCSS({compatibility: `ie8`}))
        .pipe(dest(`prod/css`));
};

let compressHTML = () => {
    return src(`dev/html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp/`
            ]
        }
    });

    watch(`dev/js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`dev/css/*.css`, series(lintCSS, copyCSSForDev))
        .on(`change`, reload);

    watch(`dev/html/*.html`, series(lintHTML, copyHTMLForDev))
        .on(`change`, reload);
};

async function clean() {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`./temp`, `prod`];

    for (i = 0; i < foldersToDelete.length; i++) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
}

exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.lintHTML = lintHTML;
exports.transpileJSForDev = transpileJSForDev;
exports.compressCSSForProd = compressCSSForProd;
exports.compressHTML = compressHTML;
exports.transpileJSForProd = transpileJSForProd;
exports.clean = clean;
exports.default = series(
    lintCSS,
    lintJS,
    lintHTML,
    transpileJSForDev,
    copyCSSForDev,
    copyHTMLForDev,
    serve
);
exports.serve = series(
    lintCSS,
    lintJS,
    lintHTML,
    transpileJSForDev,
    copyCSSForDev,
    copyHTMLForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSSForProd,
    transpileJSForProd
);
