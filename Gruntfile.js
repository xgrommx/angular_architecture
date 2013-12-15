// TODO: https://github.com/ericclemmons/grunt-angular-templates   - Compile angular templates
// TODO: csso-stylus -- CSS minification after autoprefixer
// TODO: https://github.com/btford/ngmin

module.exports = function(grunt) {
    "use strict";

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        app: {
            rootPath: require('path').resolve('public'),
            distPath: '<%= app.rootPath %>/app.dist'
        },

        connect: {
            server: {
                options: {
                    hostname: 'sitename.local',
                    port: 8008,
                    base: '<%= app.rootPath %>',
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')(),
                            require('grunt-connect-pushstate/lib/utils').pushState(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        stylus: {
            options: {
                use: [
                    function() {
                        return require('autoprefixer-stylus')("ff >= 20", "chrome >= 20", "safari >= 6", "ios >= 6", "android >= 4", "opera >= 12.1", "ie >= 10");
                    }
                ],
                import: [
                    '<%= app.rootPath %>/app/common/views/body/style/autoImport/variables.styl',
                    '<%= app.rootPath %>/app/common/views/body/style/autoImport/functions.styl',
                    '<%= app.rootPath %>/app/common/views/body/style/autoImport/mixins.styl'
                ]
            },

            compile: {
                files: {
                    '<%= app.distPath %>/style.css': [
                        '<%= app.rootPath %>/app/common/views/body/style/autoCompile/before.styl',
                        '<%= app.rootPath %>/**/style.styl',
                        '<%= app.rootPath %>/app/common/views/body/style/autoCompile/after.styl'
                    ]
                }
            }
        },

        watch: {
            stylus: {
                files: '<%= app.rootPath %>/**/*.styl',
                tasks: 'stylus'
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: {
                    livereload: true
                },
                files: ['<%= app.distPath %>/**/*']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [ 'stylus', 'connect', 'watch' ]);
};
