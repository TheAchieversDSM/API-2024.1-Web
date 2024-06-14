import React from 'react';
import { mount } from 'cypress/react';
import InputPassword from '../../src/components/password';

describe('InputPassword Component', () => {
  it('should render correctly', () => {
    mount(<InputPassword name="pwd" value="" placeholder="Senha" onChange={() => console.log('hi')} />);

    cy.get('input[name="pwd"]').should('exist').and('have.attr', 'placeholder', 'Senha');
  });
});
