const del = require('del');
const gulp = require('gulp');
const sequence = require('sequence');

//example of a copy task
copyTasks = {
  //copy all items in a src/public folder to a build/public folder
  copyPublic: function(){
    gulp.src('./public/**/*')
      .pipe(gulp.dest('../build/public'))
  },
  //copy whatever random files are at the root of src to build.
  copyRoot: function(){
    gulp.src('./**/*', '!gulpfile.js')
      .pipe(gulp.dest('../build'))
  }
}

//use gulp-sequence to run tasks sequentially.
gulp.task('copyPublic', copyTasks.copyPublic);
gulp.task('copyRoot', copyTasks.copyRoot);
gulp.task('copyAll', function(cb){
  sequence('copyPublic', 'copyRoot', cb);
});

//use the force: true option if files are outside the current directory.
//e.g. gulpfile is in src and you're deleting in build
cleanTasks = {
  cleanPublic: function(){
    return del.sync([
      //clean the contents of the folder but not the folder itself.
      '../build/public/**',
      '!../build/public'
    ], {
      force: true
    })
  },
  //ex to check which files/folders WOULD BE deleted if a the script were run w/o dryRun.
  dryRunTest: function(){
    return del([
      '../build/public/**',
      '!../build/public'
    ], {
      dryRun: true,
      force: true
    })
    .then(paths => {
      console.log('files and folders that would be deleted:\n', paths.join('\n'));
    })
  }
}

gulp.task('cleanPublic', cleanTasks.cleanPublic);
gulp.task('dryRunTest', cleanTasks.dryRunTest);
