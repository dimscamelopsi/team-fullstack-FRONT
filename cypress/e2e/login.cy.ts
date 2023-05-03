describe('Connect to different dashboard', () => {
    beforeEach(() => {
      cy.viewport(1280, 900);
      cy.visit('user/login');
    });
  
    it('Should connecte and disconnect from the dashboard', () => {
      cy.get('form').within(($form) => {
        cy.get('input[formControlName="login"]').type('Lemaire.Aldegonde');
        cy.get('input[formControlName="password"]').type('12345');
          cy.root().submit();
      });
        
    });
    it('Test connect if your login and password without', () => {
        cy.get('form').within(($form) => {
          cy.get('input[formControlName="login"]').type('1111');
          cy.get('input[formControlName="password"]').type('1111');
          cy.root().submit();
        });
      });
  });