import React from 'react';
import { mount } from 'cypress/react';
import Btn from '../../src/components/button';

describe('Btn Component', () => {
  it('should render correctly and respond to click', () => {
    const onClick = cy.stub();

    mount(<Btn name="button" label="Entrar" onClick={onClick} width={375} bg='linear-gradient(to bottom right, #D78C4B, #764D29)' />);

    cy.get('button[name="button"]').should('exist').and('contain.text', 'Entrar').click();

    cy.wrap(onClick).should('have.been.calledOnce');
  });
});
