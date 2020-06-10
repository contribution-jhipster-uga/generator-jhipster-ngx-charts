const chalk = require('chalk');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                    this.message = 'default message';
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Cannot read .yo-rc.json');
                }
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(
                    `\nWelcome to the ${chalk.bold.yellow('JHipster ngx-charts')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`
                );
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(
                        `\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`
                    );
                }
            }
        };
    }

    prompting() {
        const prompts = [
            {
                when: () => typeof this.message === 'undefined',
                type: 'input',
                name: 'message',
                message: 'Please put something',
                default: 'hello world!'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then(answers => {
            this.promptAnswers = answers;
            // To access props answers use this.promptAnswers.someOption;
            done();
        });
    }

    writing() {
        // read config from .yo-rc.json
        this.baseName = this.jhipsterAppConfig.baseName;
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.buildTool = this.jhipsterAppConfig.buildTool;

        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
        const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

        // variable from questions
        if (typeof this.message === 'undefined') {
            this.message = this.promptAnswers.message;
        }

        // needles variables for imports and package in file;
        const needleImport = '// <--! import -->';
        const needlePackage = '// <--! package -->';

        // show all variables
        this.log('\n--- some config read from config ---');
        this.log(`baseName=${this.baseName}`);
        this.log(`packageName=${this.packageName}`);
        this.log(`clientFramework=${this.clientFramework}`);
        this.log(`clientPackageManager=${this.clientPackageManager}`);
        this.log(`buildTool=${this.buildTool}`);

        this.log('\n--- some function ---');
        this.log(`angularAppName=${this.angularAppName}`);

        this.log('\n--- some const ---');
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);

        this.log('\n--- variables from questions ---');
        this.log(`message=${this.message}`);
        this.log('------\n');

        if (this.clientFramework === 'react') {
            // this.template('dummy.txt', 'dummy-react.txt');
        }
        if (this.clientFramework === 'angularX') {
            // add entities Product and Chart
            this.fs.copy(
                this.templatePath('src/main/webapp/app/entities/product'),
                this.destinationPath(`${webappDir}app/entities/product`)
            );
            this.fs.copy(this.templatePath('src/main/webapp/app/entities/chart'), this.destinationPath(`${webappDir}app/entities/chart`));

            // add shared model Product and Chart with enum Color and Country
            this.fs.copy(
                this.templatePath('src/main/webapp/app/shared/model/product.model.ts'),
                this.destinationPath(`${webappDir}app/shared/model/product.model.ts`)
            );
            this.fs.copy(
                this.templatePath('src/main/webapp/app/shared/model/chart-model.ts'),
                this.destinationPath(`${webappDir}app/shared/model/chart-model.ts`)
            );
            this.fs.copy(
                this.templatePath('src/main/webapp/app/shared/model/enumerations/color.model.ts'),
                this.destinationPath(`${webappDir}app/shared/model/enumerations/color.model.ts`)
            );
            this.fs.copy(
                this.templatePath('src/main/webapp/app/shared/model/enumerations/country.model.ts'),
                this.destinationPath(`${webappDir}app/shared/model/enumerations/country.model.ts`)
            );

            // add entities to menu

            this.rewriteFile(
                `${webappDir}app/layouts/navbar/navbar.component.html`,
                '<!-- jhipster-needle-add-element-to-menu - JHipster will add new menu items here -->',
                `<li *ngSwitchCase="true" ngbDropdown class="nav-item dropdown pointer" display="dynamic" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="entity-menu">
                <span>
                <fa-icon icon="th-list"></fa-icon>
                <span>
                Chart
                </span>
                </span>
                </a>
                <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="entity-menu">
                <li>
                <a class="dropdown-item" routerLink="chart/1" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="collapseNavbar()">
                <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                <span>Multiple charts</span>
                </li>
                <li>
                <a class="dropdown-item" routerLink="chart/2" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="collapseNavbar()">
                <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                <span>Single charts</span>
                </li>
                <li>
                <a class="dropdown-item" routerLink="chart/3" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="collapseNavbar()">
                <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                <span>Bubble charts</span>
                </li>
                </ul>
                </li>`
            );
            this.addEntityToMenu('product', false, this.clientFramework);

            // add entity to module
            this.rewriteFile(
                `${webappDir}app/entities/entity.module.ts`,
                '/* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */',
                `,
      {   path: 'chart',
        loadChildren: () =>
          import('./chart/chart.module').then(m => m.ChartsChartModule)
      }`
            );
            this.rewriteFile(
                `${webappDir}app/entities/entity.module.ts`,
                '/* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */',
                `,
      {   path: 'product',
        loadChildren: () =>
          import('./product/product.module').then(m => m.ChartsProductModule)
      }`
            );

            // add BrowserAnimationsModule
            this.rewriteFile(
                `${webappDir}app/app.module.ts`,
                '// jhipster-needle-angular-add-module-import JHipster will add new module here',
                "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';"
            );
            this.rewriteFile(
                `${webappDir}app/app.module.ts`,
                '// jhipster-needle-angular-add-module JHipster will add new module here',
                'BrowserAnimationsModule,'
            );

            let baseNameUpperCase = this.baseName;
            baseNameUpperCase = baseNameUpperCase.cleanup();
            // eslint-disable-next-line no-console
            console.log(baseNameUpperCase);

            this.rewriteFile(
                `${webappDir}app/entities/chart/chart.module.ts`,
                needleImport,
                `import { ${baseNameUpperCase}SharedModule } from 'app/shared/shared.module';`
            );
            this.rewriteFile(
                `${webappDir}app/entities/chart/chart.module.ts`,
                '// <--! sharedmodule -->',
                `imports: [${baseNameUpperCase}SharedModule, RouterModule.forChild(chartRoute), NgxChartsModule],`
            );

            this.rewriteFile(
                `${webappDir}app/entities/product/product.module.ts`,
                needleImport,
                `import { ${baseNameUpperCase}SharedModule } from 'app/shared/shared.module';`
            );
            this.rewriteFile(
                `${webappDir}app/entities/product/product.module.ts`,
                '// <--! sharedmodule -->',
                `imports: [${baseNameUpperCase}SharedModule, RouterModule.forChild(productRoute)],`
            );

            // add npm dependencies ngx-charts

            this.addNpmDependency('@angular/animations', '^9.0.4');
            this.addNpmDependency('@angular/cdk', '^9.1.0');
            this.addNpmDependency('@swimlane/ngx-charts', '^13.0.2');
            this.addNpmDependency('@swimlane/ngx-ui', '^28.4.1');
        }
        if (this.buildTool === 'maven') {
            // this.template('dummy.txt', 'dummy-maven.txt');
        }
        if (this.buildTool === 'gradle') {
            // this.template('dummy.txt', 'dummy-gradle.txt');
        }

        /**
         * Files add in java package
         */

        // add entity to Cache

        this.rewriteFile(
            `${javaDir}config/CacheConfiguration.java`,
            '// jhipster-needle-ehcache-add-entry',
            `createCache(cm, ${this.packageName}.domain.Product.class.getName());`
        );

        // add domain Product and enumartions

        this.template('src/main/java/package/domain/Product.java', `${javaDir}domain/Product.java`);
        this.rewriteFile(`${javaDir}domain/Product.java`, needlePackage, `package ${this.packageName}.domain;`);
        this.rewriteFile(`${javaDir}domain/Product.java`, needleImport, `import ${this.packageName}.domain.enumeration.Country;`);
        this.rewriteFile(`${javaDir}domain/Product.java`, needleImport, `import ${this.packageName}.domain.enumeration.Color;`);

        this.template('src/main/java/package/domain/enumeration/Color.java', `${javaDir}domain/enumeration/Color.java`);

        this.template('src/main/java/package/domain/enumeration/Country.java', `${javaDir}domain/enumeration/Country.java`);

        this.rewriteFile(`${javaDir}domain/enumeration/Color.java`, needlePackage, `package ${this.packageName}.domain.enumeration;`);
        this.rewriteFile(`${javaDir}domain/enumeration/Country.java`, needlePackage, `package ${this.packageName}.domain.enumeration;`);

        // repository

        this.template(
            'src/main/java/package/repository/BubbleSerieEntryProjection.java',
            `${javaDir}repository/BubbleSerieEntryProjection.java`
        );
        this.template(
            'src/main/java/package/repository/MultiSerieEntryProjection.java',
            `${javaDir}repository/MultiSerieEntryProjection.java`
        );
        this.template('src/main/java/package/repository/ProductChartRepository.java', `${javaDir}repository/ProductChartRepository.java`);
        this.template('src/main/java/package/repository/ProductRepository.java', `${javaDir}repository/ProductRepository.java`);
        this.template('src/main/java/package/repository/SerieEntryProjection.java', `${javaDir}repository/SerieEntryProjection.java`);

        this.rewriteFile(`${javaDir}repository/BubbleSerieEntryProjection.java`, needlePackage, `package ${this.packageName}.repository;`);
        this.rewriteFile(`${javaDir}repository/MultiSerieEntryProjection.java`, needlePackage, `package ${this.packageName}.repository;`);
        this.rewriteFile(`${javaDir}repository/ProductChartRepository.java`, needlePackage, `package ${this.packageName}.repository;`);
        this.rewriteFile(`${javaDir}repository/ProductChartRepository.java`, needleImport, `import ${this.packageName}.domain.Product;`);
        this.rewriteFile(`${javaDir}repository/ProductRepository.java`, needlePackage, `package ${this.packageName}.repository;`);
        this.rewriteFile(`${javaDir}repository/ProductRepository.java`, needleImport, `import ${this.packageName}.domain.Product;`);
        this.rewriteFile(`${javaDir}repository/SerieEntryProjection.java`, needlePackage, `package ${this.packageName}.repository;`);

        // service/dto

        this.template('src/main/java/package/service/dto/BubbleEntry.java', `${javaDir}service/dto/BubbleEntry.java`);
        this.template('src/main/java/package/service/dto/BubbleSerieEntry.java', `${javaDir}service/dto/BubbleSerieEntry.java`);
        this.template('src/main/java/package/service/dto/ChartDTO.java', `${javaDir}service/dto/ChartDTO.java`);
        this.template('src/main/java/package/service/dto/MultiSerieEntry.java', `${javaDir}service/dto/MultiSerieEntry.java`);
        this.template('src/main/java/package/service/dto/SerieEntry.java', `${javaDir}service/dto/SerieEntry.java`);

        this.rewriteFile(`${javaDir}service/dto/BubbleEntry.java`, needlePackage, `package ${this.packageName}.service.dto;`);
        this.rewriteFile(`${javaDir}service/dto/BubbleSerieEntry.java`, needlePackage, `package ${this.packageName}.service.dto;`);
        this.rewriteFile(
            `${javaDir}service/dto/BubbleSerieEntry.java`,
            needleImport,
            `import ${this.packageName}.repository.BubbleSerieEntryProjection;`
        );
        this.rewriteFile(`${javaDir}service/dto/ChartDTO.java`, needlePackage, `package ${this.packageName}.service.dto;`);
        this.rewriteFile(`${javaDir}service/dto/MultiSerieEntry.java`, needlePackage, `package ${this.packageName}.service.dto;`);
        this.rewriteFile(
            `${javaDir}service/dto/MultiSerieEntry.java`,
            needleImport,
            `import ${this.packageName}.repository.MultiSerieEntryProjection;`
        );
        this.rewriteFile(`${javaDir}service/dto/SerieEntry.java`, needlePackage, `package ${this.packageName}.service.dto;`);
        this.rewriteFile(
            `${javaDir}service/dto/SerieEntry.java`,
            needleImport,
            `import ${this.packageName}.repository.SerieEntryProjection;`
        );

        // web.rest

        this.template('src/main/java/package/web/rest/ProductChartResource.java', `${javaDir}web/rest/ProductChartResource.java`);
        this.template('src/main/java/package/web/rest/ProductResource.java', `${javaDir}web/rest/ProductResource.java`);

        this.rewriteFile(`${javaDir}web/rest/ProductChartResource.java`, needlePackage, `package ${this.packageName}.web.rest;`);
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.repository.SerieEntryProjection;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.repository.MultiSerieEntryProjection;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.repository.BubbleSerieEntryProjection;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.repository.ProductChartRepository;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.service.dto.SerieEntry;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.service.dto.MultiSerieEntry;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductChartResource.java`,
            needleImport,
            `import ${this.packageName}.service.dto.BubbleSerieEntry;`
        );
        this.rewriteFile(`${javaDir}web/rest/ProductChartResource.java`, needleImport, `import ${this.packageName}.service.dto.ChartDTO;`);

        this.rewriteFile(`${javaDir}web/rest/ProductResource.java`, needlePackage, `package ${this.packageName}.web.rest;`);
        this.rewriteFile(`${javaDir}web/rest/ProductResource.java`, needleImport, `import ${this.packageName}.domain.Product;`);
        this.rewriteFile(
            `${javaDir}web/rest/ProductResource.java`,
            needleImport,
            `import ${this.packageName}.repository.ProductRepository;`
        );
        this.rewriteFile(
            `${javaDir}web/rest/ProductResource.java`,
            needleImport,
            `import ${this.packageName}.web.rest.errors.BadRequestAlertException;`
        );

        // fake data

        this.template('src/main/resources/config/liquibase/fake-data/product.csv', `${resourceDir}config/liquibase/fake-data/product.csv`);
        this.template(
            'src/main/resources/config/liquibase/changelog/20200303210743_added_entity_Product.xml',
            `${resourceDir}config/liquibase/changelog/20200303210743_added_entity_Product.xml`
        );
        // Changelog added

        this.addLiquibaseChangelogToMaster(
            '20200303210743_added_entity_Product',
            '<!-- jhipster-needle-liquibase-add-changelog - JHipster will add liquibase changelogs here -->'
        );
    }

    install() {
        const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        const injectDependenciesAndConstants = err => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            }
        };
        const installConfig = {
            bower: false,
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    }

    end() {
        this.log('End of ngx-charts generator');
    }
};

// Attaching our method to the String Object
// eslint-disable-next-line no-extend-native
String.prototype.cleanup = function() {
    const re = /([^a-zA-Z0-9][a-zA-Z])/g;
    const tamp = this.replace(re, function(x) {
        return x.toUpperCase();
    }).replace(/[^a-zA-Z0-9]/g, '');
    return tamp.charAt(0).toUpperCase() + tamp.slice(1);
};
