describe('Connect to different dashboard', () => {
    beforeEach(() => {
      cy.viewport(1280, 900);
      cy.visit('dashboard');
    });

    it('Should connecte and disconnect from the dashboard', () => {
        cy.get('form').within(($form) => {
        cy.get('input[formControlName="login"]').type('Lemaire.Aldegonde');
        cy.get('input[formControlName="password"]').type('GfNScUbIzt6VJzZEtfgH');
        cy.root().submit();
        });

        cy.get('button[id="Courses"]').click();
        cy.get('button[id="addModule"]').click();
        cy.get('input[formControlName="name"]').type('JavaScript');
        cy.get('textarea[formControlName="objective"]').type('Learn react');
        cy.get('button[id="addModuleFinale"]').click();


        cy.get('input[formControlName="name"]').type('JavaScript');
        cy.get('textarea[formControlName="objective"]').type('Learn JavaScript');
        cy.get('mat-select[formControlName="course"]').click();
        cy.get('mat-option[id="React"]').click();
      cy.get('button[id="openMedia"]').click();
      cy.get('mat-icon[id="Odio quae quas."]').click();
      cy.get('button[id="addModuleFinale"]').click();

    });



    });



