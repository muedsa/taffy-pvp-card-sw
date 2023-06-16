const gulp = require("gulp");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

const outDir = tsProject.options.outDir;

gulp.task("clean", () =>
  gulp.src(outDir, { read: false, allowEmpty: true }).pipe(clean(outDir))
);

gulp.task("build", () =>
  tsProject.src().pipe(tsProject()).pipe(gulp.dest(outDir))
);

gulp.task(
  "default",
  gulp.series(gulp.parallel("clean"), gulp.parallel("build"))
);
