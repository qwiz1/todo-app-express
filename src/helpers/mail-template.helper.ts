type HtmlPayload = {
  link?: string;
  subject?: string;
  content?: string;
};

const getHtmlTemplate = (htmlPayload: HtmlPayload) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
      </head>
      <body>
          <main>
            <header>
              <h1>${htmlPayload.subject}</h1>
            </header>
            <div class="email-body">
              <p>${htmlPayload.content}</p> 
              <a href="${htmlPayload.link}">${htmlPayload.link}</a>
            </div>
          </main>
      </body>
    </html>
  `;

export { getHtmlTemplate };
