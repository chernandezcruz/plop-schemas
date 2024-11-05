import pluralize from 'pluralize'
import _ from 'lodash'

export default function (plop) {
    // create your generators here
    plop.setHelper('singular', (text) => pluralize.singular(text));
    plop.setHelper('plural', (text) => pluralize.plural(text));

    plop.setHelper('singular-pascalCase', (text) => {
        const singular = pluralize.singular(text);
        return _.upperFirst(_.camelCase(singular))
    });

    plop.setHelper('singular-camelCase', (text) => {
        const singular = pluralize.singular(text);
        return _.camelCase(singular)
    });

    plop.setHelper('plural-pascalCase', (text) => {
        return _.upperFirst(_.camelCase(text))
    });

    plop.setHelper('plural-camelCase', (text) => {
        return _.camelCase(text)
    });


    plop.setGenerator('basics', {
        description: 'this is a skeleton plopfile', prompts: [{
            type: 'input',
            name: 'name',
            message: 'What is the name of your feature?',
            filter: (value) => value.trim().toLocaleLowerCase()
        }], // array of inquirer prompts
        actions: [
            {
                // types
                type: 'add',
                path: 'src/features/{{plural name}}/types/{{singular name}}-types.ts',
                templateFile: 'plop-templates/types/types.hbs',
            },
            {
                // services
                type: "add",
                path: 'src/features/{{plural name}}/services/{{singular name}}-service.ts',
                templateFile: 'plop-templates/services/services.hbs',
            },
            {
                // hooks
                type: 'add',
                path: 'src/features/{{plural name}}/hooks/use-{{plural name}}.ts',
                templateFile: 'plop-templates/hooks/hooks.hbs',
            },
            {
                // index.ts in types folder
                type: 'add',
                path: 'src/features/{{plural name}}/types/index.ts',
                templateFile: 'plop-templates/types/types-index.hbs',
            },
            {
                // index.ts in services folder
                type: 'add',
                path: 'src/features/{{plural name}}/services/index.ts',
                templateFile: 'plop-templates/services/services-index.hbs',
            },
            {
                // index.ts in hooks folder
                type: 'add',
                path: 'src/features/{{plural name}}/hooks/index.ts',
                templateFile: 'plop-templates/hooks/hooks-index.hbs',
            },
        ]  // array of actions
    });
};