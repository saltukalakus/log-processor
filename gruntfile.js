module.exports = function(grunt) {
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += ' - <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'app/*.js', 'app/**/*.js'],
            options: {
                maxlen: 80,
                quotmark: 'single'
            }
        },
        concat: {
            options: {
                separator: ';\n',
                banner: banner
            },
            build: {
                files: [{
                    src: ['app/*.js', 'app/**/*.js'],
                    dest: 'build/<%= pkg.name %>.js'
                }]
            },
            uglify: {
                options: {
                    banner: banner,
                },
                build: {
                    files: {
                        'build/<%= pkg.name %>.min.js':
                            ['build/<%= pkg.name %>.js'],
                    }
                }
            },
            simplemocha: {
                options: {
                    globals: ['expect'],
                    timeout: 3000,
                    ignoreLeaks: false,
                    ui: 'bdd',
                    reporter: 'tap'
                },
                all: { src: ['tests/*.js', 'tests/**/*.js'] }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('prod', ['jshint','concat', 'uglify']);
    grunt.registerTask('dev', ['jshint', 'simplemocha']);
    grunt.registerTask('default', 'dev');
};