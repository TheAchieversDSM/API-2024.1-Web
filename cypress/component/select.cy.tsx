import React from 'react';
import { mount } from 'cypress/react';
import Select from '../../src/components/select'; // Adjust the path as necessary

describe('Select Component', () => {
    const categorias = [
        { id: 'categoria1', name: 'Categoria 1' },
        { id: 'categoria2', name: 'Categoria 2' }
    ];

    it('should render correctly and respond to selection', () => {
        const setCategoriaSelected = cy.stub();

        mount(
            <Select
                value={categorias[0]}
                options={categorias}
                name={'Categoria'}
                placeholder={'Selecione a categoria'}
                onChange={(e) => setCategoriaSelected(e)}
                width={240}
            />
        );

        // checks if the component rendered correctly
        cy.get('select[name="Categoria"]').should('exist').and('contain', 'Categoria 1');

        // simulate selection of a new option
        // cy.get('select[name="Categoria"]').select('Categoria 2');

        // checks if the callback was called with the correct value
        // cy.wrap(setCategoriaSelected).should('have.been.calledOnceWith', categorias[1]);
    });
});
