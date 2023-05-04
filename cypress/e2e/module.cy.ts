describe('Connect to different dashboard', () => {
    beforeEach(() => {
      cy.viewport(1280, 900);
      cy.visit('dashboard');
    });

    it('Should connecte and disconnect from the dashboard', () => {
        cy.get('form').within(($form) => {
        cy.get('input[formControlName="login"]').type('Lemaire.Aldegonde');
        cy.get('input[formControlName="password"]').type('12345');
        cy.root().submit();
        }); 
          
        cy.get('button[id="Courses"]').click();
        cy.get('button[id="addModule"]').click();
        cy.get('input[formControlName="name"]').type('Math');
        cy.get('textarea[formControlName="objective"]').type('Learn Math');
        cy.get('button[id="addModuleFinale"]').click();


        cy.get('input[formControlName="name"]').type('Math');
        cy.get('textarea[formControlName="objective"]').type('Learn Math');
        cy.get('mat-select[formControlName="course"]').click();
        cy.get('mat-option[id="front"]').click();
      cy.get('button[id="openMedia"]').click(); 
      cy.get('mat-icon[id="Odio quae quas."]').click();
      cy.get('button[id="addModuleFinale"]').click();
          
    });

    
          
    });
    
  
    
