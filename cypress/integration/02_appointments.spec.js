describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');

    cy.visit('/');

    cy.contains('Monday').wait(1000);
  });
  it('should book an interview', () => {
    cy.get('.appointment__add-button')
      .first()
      .click()
      .wait(50)
      .get('.appointment__create-input')
      .type('Lydia Miller-Jones', { delay: 10 })
      .wait(50)
      .get('.interviewers__item')
      .first()
      .click()
      .wait(10)
      .get('.button--confirm')
      .click();
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should Edit an interview', () => {
    cy.contains('.text--regular', 'Archie Cohen').wait(50);
    cy.get('[alt="Edit"]').should('be.hidden').invoke('show').click();
    cy.get('[alt="Tori Malcolm"]').click();
    cy.get('.appointment__create-input').type('Archie Cohen', { delay: 10 });
    cy.get('.button--confirm').click();
  });

  it('should cancel an interview', () => {
    cy.contains('.text--regular', 'Archie Cohen').wait(50);
    cy.get('[alt=Delete]').click({ force: true });
    cy.contains('Button', 'Confirm').click();
    cy.get('.appointment__card--status').should('have.length', 1).wait(2000);
    cy.get('.appointment__card--status').should('have.length', 0);
  });
});
