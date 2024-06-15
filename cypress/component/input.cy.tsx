import React from 'react';
import { mount } from 'cypress/react';
import Input from '../../src/components/input';

describe('Input Component', () => {
  it('should render correctly', () => {
    mount(<Input name="email" value="" placeholder="Email" onChange={() => {}} />);

    cy.get('input[name="email"]').should('exist').and('have.attr', 'placeholder', 'Email');
  });
});