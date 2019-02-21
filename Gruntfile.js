module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		srcPath: '.',
        distPath: './dist',
        
        concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
					'<%= srcPath %>/css/animations.css',
                    '<%= srcPath %>/css/arrow.css',
                    '<%= srcPath %>/css/fonts.css',
                    '<%= srcPath %>/css/reset.css',
                    '<%= srcPath %>/css/styles.css',
				],
				dest: '<%= distPath %>/css/styles.css',
			}
        },
        
        cssmin: {
            desktop: {
                files: [{
                    expand: true,
                    cwd: '<%=distPath%>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%=distPath%>/css',
                    ext: '.min.css'
                }]
            },
            options: {
                'banner': null,
                'keepSpecialComments': '*',
                'report': 'min'
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                mangle: false
            },
            dist: {
				files: [{
                    src: '<%=srcPath%>/js/scripts.js',
                    dest: '<%=distPath%>/js/scripts.min.js'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
};
