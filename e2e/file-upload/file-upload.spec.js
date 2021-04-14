describe('File Upload test', function () {
  beforeEach(function () {
    cy.visit('http://localhost:8000')
  })

  context('Upload file', function () {
    it('should upload file successfully', function () {
      cy.fixture('images/email.png').as('emailImage')
      cy.get('input[name=file]').then(function (el) {
        const blob = Cypress.Blob.base64StringToBlob(this.emailImage, 'image/png')
        const file = new File([blob], 'email.png', { type: 'image/png' })
        const list = new DataTransfer()
        list.items.add(file)
        el[0].files = list.files
        el[0].dispatchEvent(new Event('change', { bubbles: true }))
      })
      cy.get('input[type=button]').click();
      cy.get('#result').should('contain', 'Success');
    })
  })
})