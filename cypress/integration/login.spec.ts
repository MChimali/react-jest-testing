import * as loginFunction from '../../src/pods/login/login.api';

describe('login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should focus on the input name when it clicks on it', () => {
    //Arrange
    //Act
    cy.visit('/');
    cy.get('input[name="user"]').as('userInput');
    cy.get('@userInput').click();
    //Assert
    cy.get('@userInput').should('have.focused');
  });

  it('should fill the values when writing on inputs', () => {
    //Arrange
    const user = 'justo';
    const password = '1';

    //Act
    cy.visit('/');
    cy.get('input[name="user"]').as('userInput');
    cy.get('input[name="password"]').as('userPassword');
    cy.get('@userInput').type(user);
    cy.get('@userPassword').type(password);

    //Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@userPassword').should('have.value', password);
  });

  it("should display 'Usuario y/o password no válidos' in message", () => {
    //Arrange
    const spy = cy.spy(loginFunction, 'isValidLogin').as('loginFunction');
    const user = 'justo';
    const password = '1';

    //Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('userPassword');
    cy.findByRole('button').as('loginButton');
    cy.get('@userInput').type(user);
    cy.get('@userPassword').type(password);
    cy.get('@loginButton').click();

    //Assert

    cy.findAllByText('Usuario y/o password no válidos').should('exist');
  });

  it("should navigate to '/submodule-list' when fed correct login details", () => {
    //Arrange
    const user = 'admin';
    const password = 'test';

    //Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('userPassword');
    cy.findByRole('button').as('loginButton');
    cy.get('@userInput').type(user);
    cy.get('@userPassword').type(password);
    cy.get('@loginButton').click();

    //Assert
    cy.url().should('eq', 'http://localhost:8080/#/submodule-list');
  });
});
